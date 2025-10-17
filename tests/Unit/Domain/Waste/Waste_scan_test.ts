import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert";

import { WasteScan, WasteScanId, UserId } from "EcoPath/Domain/mod.ts";

Deno.test("Create WasteScan - Success", () => {
  const userId = UserId.create();
  const scanId = WasteScanId.create();
  const timestamp = new Date();
  const image = "aGVsbG93b3JsZA==";

  const scan = WasteScan.create(scanId, userId, timestamp, image);

  assertEquals(scan.id, scanId);
  assertEquals(scan.userId, userId);
  assertEquals(scan.timestamp, timestamp);
  assertEquals(scan.image, image);
});

Deno.test("Create WasteScan - Fail (Missing Fields)", async (t) => {
  const userId = UserId.create();
  const scanId = WasteScanId.create();
  const timestamp = new Date();
  const image = "aGVsbG93b3JsZA==";

  const cases = [
    { userId: null as unknown as UserId, timestamp, image, msg: "missing userId" },
    { userId, timestamp: null as unknown as Date, image, msg: "missing timestamp" },
    { userId, timestamp, image: "   ", msg: "empty image" },
  ];

  for (const c of cases) {
    await t.step(`Fails with ${c.msg}`, () => {
      assertThrows(() => {
        WasteScan.create(scanId, c.userId, c.timestamp, c.image);
      });
    });
  }
});

Deno.test("Create WasteScan - Fail (Future Timestamp)", () => {
  const userId = UserId.create();
  const scanId = WasteScanId.create();
  const timestamp = new Date(Date.now() + 60_000);
  const image = "aGVsbG93b3JsZA==";

  assertThrows(() => {
    WasteScan.create(scanId, userId, timestamp, image);
  });
});

Deno.test("Create WasteScan - Fail (Invalid Base64)", () => {
  const userId = UserId.create();
  const scanId = WasteScanId.create();
  const timestamp = new Date();
  const invalidBase64 = "not@@@base64$$";

  assertThrows(() => {
    WasteScan.create(scanId, userId, timestamp, invalidBase64);
  });
});
