import { assertEquals, assertThrows } from '@std/assert';
import { EcologicalFootprint, WasteType } from 'EcoPath/Domain/mod.ts';
import { WasteCarbonFactors } from 'EcoPath/Domain/Waste/WasteCarbonFactors.ts';

function makeValidWasteData(): Map<WasteType, number> {
    return new Map([
        [WasteType.Plastic, 10],
        [WasteType.Paper, 5],
        [WasteType.GreenGlass, 2],
    ]);
}

function makeValidEcologicalFootprint(): EcologicalFootprint {
    return EcologicalFootprint.create(100, 200, makeValidWasteData());
}

Deno.test('EcologicalFootprint - Creates successfully', () => {
    const footprint = makeValidEcologicalFootprint();

    assertEquals(footprint.totalGasUsage, 100);
    assertEquals(footprint.totalElectricityUsage, 200);
    assertEquals(footprint.totalWaste.get(WasteType.Plastic), 10);
    assertEquals(footprint.totalWaste.get(WasteType.Paper), 5);
    assertEquals(footprint.totalWaste.get(WasteType.GreenGlass), 2);
});

Deno.test('EcologicalFootprint - Fails on invalid or negative values', async (t) => {
    const validWaste = makeValidWasteData();

    const invalidCases = [
        { gas: -1, electricity: 200, waste: validWaste, msg: 'negative gas usage' },
        { gas: 100, electricity: -50, waste: validWaste, msg: 'negative electricity usage' },
        { gas: 100, electricity: 200, waste: new Map([[WasteType.Paper, -10]]), msg: 'negative waste weight' },
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                EcologicalFootprint.create(c.gas, c.electricity, c.waste);
            });
        });
    }
});

Deno.test('EcologicalFootprint - Calculates carbon equivalent correctly', () => {
    const waste = new Map<WasteType, number>([
        [WasteType.Plastic, 10],
        [WasteType.Paper, 5]
    ]);

    const footprint = EcologicalFootprint.create(50, 100, waste);

    const gasFactor = 2.2;
    const electricityFactor = 0.55;
    const wasteEquivalent =
        (WasteCarbonFactors[WasteType.Plastic] * 10) +
        (WasteCarbonFactors[WasteType.Paper] * 5);

    const expected = (50 * gasFactor) + (100 * electricityFactor) + wasteEquivalent;

    assertEquals(footprint.calculateCarbonEquivalent(), expected);
});

Deno.test('EcologicalFootprint - Handles waste types with no carbon factor gracefully', () => {
    const waste = new Map<WasteType, number>([
        ['UNKNOWN' as WasteType, 10],
        [WasteType.GreenGlass, 3]
    ]);

    const footprint = EcologicalFootprint.create(0, 0, waste);
    const result = footprint.calculateCarbonEquivalent();

    assertEquals(typeof result, 'number');
    assertEquals(result >= 0, true);
});
