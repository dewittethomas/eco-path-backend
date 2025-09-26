import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { SmartMeter, SmartMeterId, MeterType, Location } from "EcoPath/Domain/mod.ts";

Deno.test("Create SmartMeter - Success", () => {
    const id = SmartMeterId.create();

    const location = Location.create("11", "Main Street", "New York", "1000");

    const smartMeter = SmartMeter.create(id, MeterType.ELECTRICITY, location);

    assertEquals(smartMeter.id, id);
    assertEquals(smartMeter.meterType, MeterType.ELECTRICITY);
    assertEquals(smartMeter.location.houseNumber, "11");
    assertEquals(smartMeter.location.street, "Main Street");
    assertEquals(smartMeter.location.city, "New York");
    assertEquals(smartMeter.location.postalCode, "1000");
});

Deno.test("Create SmartMeter - Fails with empty meter type", () => {
    const id = SmartMeterId.create();

    const location = Location.create("11", "Main Street", "New York", "1000");

    assertThrows(() => {
        SmartMeter.create(id, "" as MeterType, location);
    });
});

Deno.test("Create SmartMeter - Fails with missing location", () => {
    const id = SmartMeterId.create();

    assertThrows(() => {
        SmartMeter.create(id, MeterType.ELECTRICITY, null as unknown as Location);
    });
});