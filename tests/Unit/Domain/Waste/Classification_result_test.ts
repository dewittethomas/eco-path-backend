import { assertEquals, assertThrows } from "@std/assert";
import { ClassificationResult, ClassificationResultId, WasteScanId, WasteType } from "EcoPath/Domain/mod.ts";

Deno.test("Create ClassificationResult - Success", () => {
    const id = ClassificationResultId.create();
    const scanId = WasteScanId.create();
    const wasteType = WasteType.Plastic;
    const timestamp = new Date();

    const result = ClassificationResult.create(id, scanId, wasteType, timestamp);

    assertEquals(result.id, id);
    assertEquals(result.scanId, scanId);
    assertEquals(result.wasteType, wasteType);
    assertEquals(result.timestamp, timestamp);
});

Deno.test("Create ClassificationResult - Fail (Missing Fields)", async (t) => {
    const id = ClassificationResultId.create();
    const scanId = WasteScanId.create();
    const wasteType = WasteType.Metal;
    const timestamp = new Date();

    const cases = [
        { scanId: null as unknown as WasteScanId, wasteType, timestamp, msg: "missing scanId" },
        { scanId, wasteType: null as unknown as WasteType, timestamp, msg: "missing wasteType" },
        { scanId, wasteType, timestamp: null as unknown as Date, msg: "missing timestamp" },
    ];

    for (const c of cases) {
        await t.step(`Fails with ${c.msg}`, () => {
            assertThrows(() => {
                ClassificationResult.create(id, c.scanId, c.wasteType, c.timestamp);
            });
        });
    }
});

Deno.test("Create ClassificationResult - Fail (Future Timestamp)", () => {
    const id = ClassificationResultId.create();
    const scanId = WasteScanId.create();
    const wasteType = WasteType.BioWaste;
    const timestamp = new Date(Date.now() + 60_000);

    assertThrows(() => {
        ClassificationResult.create(id, scanId, wasteType, timestamp);
    });
});
