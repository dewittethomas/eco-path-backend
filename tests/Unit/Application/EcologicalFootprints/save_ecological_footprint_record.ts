import { SaveEcologicalFootprintRecord } from 'EcoPath/Application/mod.ts';
import { MockEcologicalFootprintRecordRepository, MockUnitOfWork } from 'EcoPath/tests/Unit/Shared/mod.ts';
import { WasteType, UserId, EcologicalFootprintRecordId } from 'EcoPath/Domain/mod.ts';
import { assert, assertThrows } from '@std/assert';

Deno.test('SaveEcologicalFootprintRecord - Successfully saves a record', async () => {
    // Arrange
    const mockRepository = new MockEcologicalFootprintRecordRepository();
    const mockUnitOfWork = new MockUnitOfWork();

    const saveRecord = new SaveEcologicalFootprintRecord(mockRepository, mockUnitOfWork);

    const recordId = EcologicalFootprintRecordId.create();
    const userId = UserId.create();

    const input = {
        id: recordId.toString(),
        userId: userId.toString(),
        fromDate: new Date('2024-01-01T00:00:00Z'),
        toDate: new Date('2024-02-01T00:00:00Z'),
        ecologicalFootprint: {
            totalGasUsage: 120,
            totalElectricityUsage: 400,
            totalWaste: {
                [WasteType.Glass]: 0,
                [WasteType.Plastic]: 10,
                [WasteType.Metal]: 2,
                [WasteType.PaperAndCardboard]: 5,
                [WasteType.GeneralWaste]: 0,
                [WasteType.BioWaste]: 0
            }
        }
    };

    // Act
    await saveRecord.execute(input);

    // Assert
    mockUnitOfWork.assertDoIsCalled(1);
    mockRepository.assertSaveIsCalled(1);

    const savedRecord = mockRepository.getRecordFromCall(1);

    assert(savedRecord.id.equals(recordId));
    assert(savedRecord.userId.equals(userId));
    assert(savedRecord.fromDate.getTime() === input.fromDate.getTime());
    assert(savedRecord.toDate.getTime() === input.toDate.getTime());

    const footprint = savedRecord.ecologicalFootprint;
    assert(footprint.totalGasUsage === input.ecologicalFootprint.totalGasUsage);
    assert(footprint.totalElectricityUsage === input.ecologicalFootprint.totalElectricityUsage);

    const totalWaste = footprint.totalWaste;
    assert(totalWaste.get(WasteType.Plastic) === input.ecologicalFootprint.totalWaste[WasteType.Plastic]);
    assert(totalWaste.get(WasteType.PaperAndCardboard) === input.ecologicalFootprint.totalWaste[WasteType.PaperAndCardboard]);
    assert(totalWaste.get(WasteType.Metal) === input.ecologicalFootprint.totalWaste[WasteType.Metal]);
});