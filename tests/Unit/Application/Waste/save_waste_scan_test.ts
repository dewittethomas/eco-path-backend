import { SaveWasteScan } from "EcoPath/Application/mod.ts";
import { MockWasteScanRepository, MockUnitOfWork } from "EcoPath/tests/Unit/Shared/mod.ts";
import { WasteScanId, UserId } from "EcoPath/Domain/mod.ts";
import { SaveWasteScanInput } from "EcoPath/Application/Contracts/mod.ts";
import { assert } from "@std/assert/assert";

Deno.test("SaveWasteScan - Successfully saves a waste scan", async () => {
    // Arrange
    const mockWasteScanRepository = new MockWasteScanRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveWasteScan = new SaveWasteScan(
        mockWasteScanRepository,
        mockUnitOfWork,
    );

    const id = WasteScanId.create();
    const userId = UserId.create();
    const timestamp = new Date();
    const image = "aGVsbG93b3JsZA==";

    const input: SaveWasteScanInput = {
        id: id.toString(),
        userId: userId.toString(),
        timestamp,
        image,
    };

    // Act
    await saveWasteScan.execute(input);

    // Assert
    mockUnitOfWork.assertDoIsCalled(1);
    mockWasteScanRepository.assertSaveIsCalled(1);

    const savedWasteScan = mockWasteScanRepository.getScanFromCall(1);

    assert(savedWasteScan.id.equals(id));
    assert(savedWasteScan.userId.equals(userId));
    assert(savedWasteScan.timestamp.getTime() === timestamp.getTime());
    assert(savedWasteScan.image === image);
});