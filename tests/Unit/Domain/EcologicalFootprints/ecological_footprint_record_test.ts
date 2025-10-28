import { assertEquals, assertThrows } from '@std/assert';
import {
    EcologicalFootprintRecord,
    EcologicalFootprintRecordId,
    EcologicalFootprint,
    UserId,
    WasteType
} from 'EcoPath/Domain/mod.ts';

function makeValidEcologicalFootprint(): EcologicalFootprint {
    const totalWaste = new Map<WasteType, number>([
        [WasteType.Glass, 0],
        [WasteType.Plastic, 10],
        [WasteType.Metal, 2],
        [WasteType.PaperAndCardboard, 5],
        [WasteType.GeneralWaste, 0],
        [WasteType.BioWaste, 0],
    ]);

    return EcologicalFootprint.create(50, 100, totalWaste);
}

function makeValidEcologicalFootprintRecord() {
    return {
        id: EcologicalFootprintRecordId.create(),
        userId: UserId.create(),
        fromDate: new Date(2023, 0, 1),
        toDate: new Date(2023, 1, 1),
        ecologicalFootprint: makeValidEcologicalFootprint()
    };
}

Deno.test('EcologicalFootprintRecord - Creates successfully', () => {
    const data = makeValidEcologicalFootprintRecord();

    const record = EcologicalFootprintRecord.create(
        data.id,
        data.userId,
        data.fromDate,
        data.toDate,
        data.ecologicalFootprint
    );

    assertEquals(record.id.equals(data.id), true);
    assertEquals(record.userId.equals(data.userId), true);
    assertEquals(record.fromDate.getTime(), data.fromDate.getTime());
    assertEquals(record.toDate.getTime(), data.toDate.getTime());
});

Deno.test('EcologicalFootprintRecord - Fails with missing or invalid data', async (t) => {
    const valid = makeValidEcologicalFootprintRecord();
    const futureDate = new Date(Date.now() + 60_000);

    const invalidCases = [
        {
            userId: null as unknown as UserId,
            fromDate: valid.fromDate,
            toDate: valid.toDate,
            ecologicalFootprint: valid.ecologicalFootprint,
            msg: 'missing userId'
        },
        {
            userId: valid.userId,
            fromDate: futureDate,
            toDate: valid.toDate,
            ecologicalFootprint: valid.ecologicalFootprint,
            msg: 'future fromDate'
        },
        {
            userId: valid.userId,
            fromDate: valid.fromDate,
            toDate: futureDate,
            ecologicalFootprint: valid.ecologicalFootprint,
            msg: 'future toDate'
        },
        {
            userId: valid.userId,
            fromDate: valid.fromDate,
            toDate: valid.toDate,
            ecologicalFootprint: null as unknown as EcologicalFootprint,
            msg: 'missing ecologicalFootprint'
        }
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                EcologicalFootprintRecord.create(
                    valid.id,
                    c.userId,
                    c.fromDate,
                    c.toDate,
                    c.ecologicalFootprint
                );
            });
        });
    }
});

Deno.test('EcologicalFootprintRecord - Correctly references EcologicalFootprint values', () => {
    const data = makeValidEcologicalFootprintRecord();
    const record = EcologicalFootprintRecord.create(
        data.id,
        data.userId,
        data.fromDate,
        data.toDate,
        data.ecologicalFootprint
    );

    assertEquals(record.ecologicalFootprint.totalGasUsage, data.ecologicalFootprint.totalGasUsage);
    assertEquals(record.ecologicalFootprint.totalElectricityUsage, data.ecologicalFootprint.totalElectricityUsage);
    assertEquals(record.ecologicalFootprint.totalWaste.get(WasteType.Plastic), 10);
});
