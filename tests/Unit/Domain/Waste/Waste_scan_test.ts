import { assertEquals, assertThrows } from '@std/assert';
import { WasteScan, WasteScanId, UserId } from 'EcoPath/Domain/mod.ts';

function makeValidWasteScanData() {
    return {
        wasteScanId: WasteScanId.create(),
        userId: UserId.create(),
        timestamp: new Date(2000, 1, 1),
        image: btoa('hello world')
    };
}

Deno.test('WasteScan - Create Successfully', () => {
    const data = makeValidWasteScanData();
    const scan = WasteScan.create(data.wasteScanId, data.userId, data.timestamp, data.image);

    assertEquals(scan.id.equals(data.wasteScanId), true);
    assertEquals(scan.userId.equals(data.userId), true);
    assertEquals(scan.timestamp.getTime(), data.timestamp.getTime());
    assertEquals(scan.image, data.image);
});

Deno.test('WasteScan - Fails on Missing or Invalid Fields', async (t) => {
    const valid = makeValidWasteScanData();

    const invalidCases = [
        { ...valid, userId: null as unknown as UserId, msg: 'null userId' },
        { ...valid, timestamp: null as unknown as Date, msg: 'null timestamp' },
        { ...valid, image: '   ', msg: 'whitespace image' },
        { ...valid, image: 'invalid@@base64', msg: 'invalid base64 format' }
    ];

    for (const c of invalidCases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                WasteScan.create(WasteScanId.create(), c.userId, c.timestamp, c.image);
            });
        });
    }
});

Deno.test('WasteScan - Fails on Future Timestamp', () => {
    const futureTimestamp = new Date(Date.now() + 60_000);
    const data = makeValidWasteScanData();

    assertThrows(() => {
        WasteScan.create(WasteScanId.create(), data.userId, futureTimestamp, data.image);
    });
});