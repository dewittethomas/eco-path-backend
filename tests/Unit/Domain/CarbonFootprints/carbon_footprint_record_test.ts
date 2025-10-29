import { assertEquals, assertThrows } from '@std/assert';
import {
    CarbonFootprintRecord,
    CarbonFootprintRecordId,
    CarbonFootprint,
    UserId,
    WasteType
} from 'EcoPath/Domain/mod.ts';

function makeValidCarbonFootprint(): CarbonFootprint {
    const totalWaste = new Map<WasteType, number>([
        [WasteType.Glass, 0],
        [WasteType.Plastic, 10],
        [WasteType.Metal, 2],
        [WasteType.PaperAndCardboard, 5],
        [WasteType.GeneralWaste, 0],
        [WasteType.BioWaste, 0],
    ]);

    return CarbonFootprint.create(50, 100, totalWaste);
}

function makeValidCarbonFootprintRecord() {
    return {
        id: CarbonFootprintRecordId.create(),
        userId: UserId.create(),
        fromDate: new Date(2023, 0, 1),
        toDate: new Date(2023, 1, 1),
        CarbonFootprint: makeValidCarbonFootprint()
    };
}

Deno.test('CarbonFootprintRecord - Creates successfully', () => {
    const data = makeValidCarbonFootprintRecord();

    const record = CarbonFootprintRecord.create(
        data.id,
        data.userId,
        data.fromDate,
        data.toDate,
        data.CarbonFootprint
    );

    assertEquals(record.id.equals(data.id), true);
    assertEquals(record.userId.equals(data.userId), true);
    assertEquals(record.fromDate.getTime(), data.fromDate.getTime());
    assertEquals(record.toDate.getTime(), data.toDate.getTime());
});

Deno.test('CarbonFootprintRecord - Fails with missing or invalid data', async (t) => {
    const valid = makeValidCarbonFootprintRecord();
    const futureDate = new Date(Date.now() + 60_000);

    const invalidCases = [
        {
            userId: null as unknown as UserId,
            fromDate: valid.fromDate,
            toDate: valid.toDate,
            CarbonFootprint: valid.CarbonFootprint,
            msg: 'missing userId'
        },
        {
            userId: valid.userId,
            fromDate: futureDate,
            toDate: valid.toDate,
            CarbonFootprint: valid.CarbonFootprint,
            msg: 'future fromDate'
        },
        {
            userId: valid.userId,
            fromDate: valid.fromDate,
            toDate: futureDate,
            CarbonFootprint: valid.CarbonFootprint,
            msg: 'future toDate'
        },
        {
            userId: valid.userId,
            fromDate: valid.fromDate,
            toDate: valid.toDate,
            CarbonFootprint: null as unknown as CarbonFootprint,
            msg: 'missing CarbonFootprint'
        }
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                CarbonFootprintRecord.create(
                    valid.id,
                    c.userId,
                    c.fromDate,
                    c.toDate,
                    c.CarbonFootprint
                );
            });
        });
    }
});

Deno.test('CarbonFootprintRecord - Correctly references CarbonFootprint values', () => {
    const data = makeValidCarbonFootprintRecord();
    const record = CarbonFootprintRecord.create(
        data.id,
        data.userId,
        data.fromDate,
        data.toDate,
        data.CarbonFootprint
    );

    assertEquals(record.CarbonFootprint.totalGasUsage, data.CarbonFootprint.totalGasUsage);
    assertEquals(record.CarbonFootprint.totalElectricityUsage, data.CarbonFootprint.totalElectricityUsage);
    assertEquals(record.CarbonFootprint.totalWaste.get(WasteType.Plastic), 10);
});
