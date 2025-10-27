import { SaveClassificationResult } from "EcoPath/Application/mod.ts";
import { MockClassificationResultRepository, MockUnitOfWork } from "EcoPath/tests/Unit/Shared/mod.ts";
import { ClassificationResultId, WasteScanId, WasteType } from "EcoPath/Domain/mod.ts";
import { SaveClassificationResultInput } from "EcoPath/Application/Contracts/mod.ts";
import { assert } from "@std/assert/assert";

Deno.test("SaveClassificationResult - Successfully saves a classification result", async () => {
    // Arrange
    const mockClassificationResultRepository = new MockClassificationResultRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveClassificationResult = new SaveClassificationResult(
        mockClassificationResultRepository,
        mockUnitOfWork,
    );

    const id = ClassificationResultId.create();
    const scanId = WasteScanId.create();
    const wasteType = WasteType.Plastic;
    const confidence = 0.92;
    const timestamp = new Date();

    const input: SaveClassificationResultInput = {
        id: id.toString(),
        scanId: scanId.toString(),
        wasteType,
        confidence,
        timestamp,
    };

    // Act
    await saveClassificationResult.execute(input);

    // Assert
    mockUnitOfWork.assertDoIsCalled(1);
    mockClassificationResultRepository.assertSaveIsCalled(1);

    const savedResult = mockClassificationResultRepository.getClassificationResultFromCall(1);

    assert(savedResult.id.equals(id));
    assert(savedResult.scanId.equals(scanId));
    assert(savedResult.wasteType === wasteType);
    assert(savedResult.confidence === confidence);
    assert(savedResult.timestamp.getTime() === timestamp.getTime());
});