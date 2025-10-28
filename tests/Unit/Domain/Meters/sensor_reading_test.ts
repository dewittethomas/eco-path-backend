import { assertEquals, assertThrows } from '@std/assert';
import { SensorReading, Unit, SmartMeter, SmartMeterId, MeterType, Location } from 'EcoPath/Domain/mod.ts';

function makeValidLocation() {
    return Location.create('11', 'Main Street', 'New York', '1000');
}

function makeValidSmartMeter() {
    return SmartMeter.create(
        SmartMeterId.create(),
        MeterType.GAS,
        makeValidLocation()
    );
}

function makeValidSensorReadingData() {
    return {
        smartMeter: makeValidSmartMeter(),
        timestamp: new Date(2000, 1, 1),
        value: 10,
        unit: Unit.CubicMeter
    }
}

Deno.test('SensorReading - Create successfully', () => {
    const data = makeValidSensorReadingData();
    const reading = SensorReading.create(data.smartMeter, data.timestamp, data.value, data.unit);

    assertEquals(reading.smartMeter.id.equals(data.smartMeter.id), true);
    assertEquals(reading.timestamp.getTime(), data.timestamp.getTime());
    assertEquals(reading.value, data.value);
    assertEquals(reading.unit, data.unit);
});

Deno.test('SensorReading - Fails with invalid or missing fields', async (t) => {
    const smartMeter = makeValidSmartMeter();
    const timestamp = new Date();

    const invalidCases = [
        { smartMeter: null as unknown as SmartMeter, timestamp, value: 10, unit: Unit.KilowattHour, msg: 'missing SmartMeter' },
        { smartMeter, timestamp: null as unknown as Date, value: 10, unit: Unit.KilowattHour, msg: 'missing timestamp' },
        { smartMeter, timestamp, value: 0, unit: Unit.KilowattHour, msg: 'zero value' },
        { smartMeter, timestamp, value: -5, unit: Unit.KilowattHour, msg: 'negative value' },
        { smartMeter, timestamp, value: 10, unit: null as unknown as Unit, msg: 'missing unit' },
        { smartMeter, timestamp: new Date(Date.now() + 60_000), value: 10, unit: Unit.Liter, msg: 'future timestamp' },
        { smartMeter, timestamp, value: 10, unit: 'invalid' as unknown as Unit, msg: 'invalid enum unit' }
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                SensorReading.create(c.smartMeter, c.timestamp, c.value, c.unit);
            });
        });
    }
});

Deno.test('SensorReading - Equals method compares correctly', () => {
    const smartMeter = makeValidSmartMeter();
    const timestamp = new Date(2000, 1, 1);

    const reading1 = SensorReading.create(smartMeter, timestamp, 50, Unit.CubicMeter);
    const reading2 = SensorReading.create(smartMeter, new Date(2000, 1, 1), 50, Unit.CubicMeter);
    const reading3 = SensorReading.create(smartMeter, timestamp, 25, Unit.CubicMeter);

    assertEquals(reading1.equals(reading2), true);
    assertEquals(reading1.equals(reading3), false);
});
