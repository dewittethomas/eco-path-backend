import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { ClassificationResult, ClassificationResultId, WasteScanId, WasteType } from "EcoPath/Domain/mod.ts";

Deno.test("Create ClassificationResult - Success", () => {
  const id = ClassificationResultId.create();
  const scanId = WasteScanId.create();
  const wasteType = WasteType.Plastic;
  const confidence = 0.87;
  const timestamp = new Date();

  const result = ClassificationResult.create(id, scanId, wasteType, confidence, timestamp);

  assertEquals(result.id, id);
  assertEquals(result.scanId, scanId);
  assertEquals(result.wasteType, wasteType);
  assertEquals(result.confidence, confidence);
  assertEquals(result.timestamp, timestamp);
});

Deno.test("Create ClassificationResult - Fail (Missing Fields)", async (t) => {
  const id = ClassificationResultId.create();
  const scanId = WasteScanId.create();
  const wasteType = WasteType.Metal;
  const confidence = 0.8;
  const timestamp = new Date();

  const cases = [
    { scanId: null as unknown as WasteScanId, wasteType, confidence, timestamp, msg: "missing scanId" },
    { scanId, wasteType: null as unknown as WasteType, confidence, timestamp, msg: "missing wasteType" },
    { scanId, wasteType, confidence: null as unknown as number, timestamp, msg: "missing confidence" },
    { scanId, wasteType, confidence, timestamp: null as unknown as Date, msg: "missing timestamp" },
  ];

  for (const c of cases) {
    await t.step(`Fails with ${c.msg}`, () => {
      assertThrows(() => {
        ClassificationResult.create(id, c.scanId, c.wasteType, c.confidence, c.timestamp);
      });
    });
  }
});

Deno.test("Create ClassificationResult - Fail (Invalid Confidence)", async (t) => {
  const id = ClassificationResultId.create();
  const scanId = WasteScanId.create();
  const wasteType = WasteType.Cardboard;
  const timestamp = new Date();

  const cases = [
    { confidence: -0.1, msg: "negative confidence" },
    { confidence: 1.5, msg: "confidence above 1" },
  ];

  for (const c of cases) {
    await t.step(`Fails with ${c.msg}`, () => {
      assertThrows(() => {
        ClassificationResult.create(id, scanId, wasteType, c.confidence, timestamp);
      });
    });
  }
});

Deno.test("Create ClassificationResult - Fail (Future Timestamp)", () => {
  const id = ClassificationResultId.create();
  const scanId = WasteScanId.create();
  const wasteType = WasteType.BioWaste;
  const confidence = 0.5;
  const timestamp = new Date(Date.now() + 60_000);

  assertThrows(() => {
    ClassificationResult.create(id, scanId, wasteType, confidence, timestamp);
  });
});
