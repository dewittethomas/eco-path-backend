import { assertEquals, assertThrows } from '@std/assert';
import { CarbonFootprint, WasteType } from 'EcoPath/Domain/mod.ts';
import { WasteCarbonFactors } from 'EcoPath/Domain/Waste/WasteCarbonFactors.ts';

function makeValidWasteData(): Map<WasteType, number> {
    return new Map([
        [WasteType.Glass, 0],
        [WasteType.Plastic, 10],
        [WasteType.Metal, 2],
        [WasteType.PaperAndCardboard, 5],
        [WasteType.GeneralWaste, 0],
        [WasteType.BioWaste, 0],
    ]);
}

function makeValidCarbonFootprint(): CarbonFootprint {
    return CarbonFootprint.create(100, 200, makeValidWasteData());
}

Deno.test('CarbonFootprint - Creates successfully', () => {
    const footprint = makeValidCarbonFootprint();

    assertEquals(footprint.totalGasUsage, 100);
    assertEquals(footprint.totalElectricityUsage, 200);
    assertEquals(footprint.totalWaste.get(WasteType.Glass), 0);
    assertEquals(footprint.totalWaste.get(WasteType.Plastic), 10);
    assertEquals(footprint.totalWaste.get(WasteType.Metal), 2);
    assertEquals(footprint.totalWaste.get(WasteType.PaperAndCardboard), 5);
    assertEquals(footprint.totalWaste.get(WasteType.GeneralWaste), 0);
    assertEquals(footprint.totalWaste.get(WasteType.BioWaste), 0);
});

Deno.test('CarbonFootprint - Fails on invalid or negative values', async (t) => {
    const validWaste = makeValidWasteData();

    const invalidCases = [
        { gas: -1, electricity: 200, waste: validWaste, msg: 'negative gas usage' },
        { gas: 100, electricity: -50, waste: validWaste, msg: 'negative electricity usage' },
        { gas: 100, electricity: 200, waste: new Map([[WasteType.PaperAndCardboard, -10]]), msg: 'negative waste weight' },
    ];

    for (const c of invalidCases) {
        await t.step(`Throws with ${c.msg}`, () => {
            assertThrows(() => {
                CarbonFootprint.create(c.gas, c.electricity, c.waste);
            });
        });
    }
});

Deno.test('CarbonFootprint - Calculates carbon equivalent correctly', () => {
    const waste = new Map<WasteType, number>([
        [WasteType.Glass, 0],
        [WasteType.Plastic, 10],
        [WasteType.Metal, 0],
        [WasteType.PaperAndCardboard, 5],
        [WasteType.GeneralWaste, 0],
        [WasteType.BioWaste, 0],
    ]);

    const footprint = CarbonFootprint.create(50, 100, waste);

    const gasFactor = 2.2;
    const electricityFactor = 0.55;
    const wasteEquivalent =
        (WasteCarbonFactors[WasteType.Plastic] * 10) +
        (WasteCarbonFactors[WasteType.PaperAndCardboard] * 5);

    const expected = (50 * gasFactor) + (100 * electricityFactor) + wasteEquivalent;

    assertEquals(footprint.calculateCarbonEquivalent(), expected);
});

Deno.test('CarbonFootprint - Handles waste types with no carbon factor gracefully', () => {
    const waste = new Map<WasteType, number>([
        ['UNKNOWN' as WasteType, 10],
        [WasteType.Glass, 3]
    ]);

    const footprint = CarbonFootprint.create(0, 0, waste);
    const result = footprint.calculateCarbonEquivalent();

    assertEquals(typeof result, 'number');
    assertEquals(result >= 0, true);
});
