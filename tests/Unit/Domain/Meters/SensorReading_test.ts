import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { SensorReading, Unit, SmartMeter, SmartMeterId, MeterType, Location } from "EcoPath/Domain/mod.ts";

Deno.test("Create SensorReading - Success", () => {
    const location = Location.create("11", "Main Street", "New York", "1000");

    const smartMeterId = SmartMeterId.create();
    const smartMeter = SmartMeter.create(smartMeterId, MeterType.ELECTRICITY, location);

    const timestamp = new Date("2023-10-01T10:00:00Z")

    const sensorReading = SensorReading.create(smartMeter, timestamp, 150.5, Unit.KilowattHour);

    assertEquals(sensorReading.smartMeter, smartMeter);
    assertEquals(sensorReading.timestamp, timestamp);
    assertEquals(sensorReading.value, 150.5);
    assertEquals(sensorReading.unit, Unit.KilowattHour);
});


Deno.test("Create SensorReading - Fail (Required Fields)", async (t) => {
    const location = Location.create("11", "Main Street", "New York", "1000");

    const smartMeterId = SmartMeterId.create();
    const smartMeter = SmartMeter.create(smartMeterId, MeterType.ELECTRICITY, location);

    const timestamp = new Date();

    const cases = [
        { timestamp: null as unknown as Date, value: 150.5, unit: Unit.KilowattHour, msg: "empty timestamp" },
        { timestamp: timestamp, value: 0, unit: Unit.KilowattHour, msg: "zero value" },
        { timestamp: timestamp, value: -10, unit: Unit.KilowattHour, msg: "negative value" },
        { timestamp: timestamp, value: 150.5, unit: null as unknown as Unit, msg: "empty unit" },
    ];

    for (const c of cases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                SensorReading.create(smartMeter, c.timestamp, c.value, c.unit);
            });
        });
    }
});

Deno.test("Create SensorReading - Fails with missing SmartMeter", () => {
    const timestamp = new Date("2023-10-01T10:00:00Z")

    assertThrows(() => {
        SensorReading.create(null as unknown as SmartMeter, timestamp, 150.5, Unit.KilowattHour);
    });
});
