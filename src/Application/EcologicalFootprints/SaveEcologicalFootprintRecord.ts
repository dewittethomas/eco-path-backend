import type { UseCase } from '@domaincrafters/application';
import type { EcologicalFootprintRecordRepository, UnitOfWork } from 'EcoPath/Application/Contracts/mod.ts';
import {
    EcologicalFootprintRecord,
    EcologicalFootprintRecordId,
    EcologicalFootprint,
    WasteType,
    UserId
} from 'EcoPath/Domain/mod.ts';

export interface SaveEcologicalFootprintRecordInput {
    id: string;
    userId: string;
    fromDate: Date;
    toDate: Date;
    ecologicalFootprint: {
        totalGasUsage: number;
        totalElectricityUsage: number;
        totalWaste: Record<WasteType, number>;
    };
}

export class SaveEcologicalFootprintRecord implements UseCase<SaveEcologicalFootprintRecordInput> {
    private readonly _recordRepository: EcologicalFootprintRecordRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        recordRepository: EcologicalFootprintRecordRepository,
        unitOfWork: UnitOfWork
    ) {
        this._recordRepository = recordRepository;
        this._unitOfWork = unitOfWork;
    }

    execute(input: SaveEcologicalFootprintRecordInput): Promise<void> {
        return this._unitOfWork.do<void>(() => {
            const totalWasteMap = new Map<WasteType, number>(
                Object.entries(input.ecologicalFootprint.totalWaste) as [WasteType, number][]
            );

            const ecologicalFootprint = EcologicalFootprint.create(
                input.ecologicalFootprint.totalGasUsage,
                input.ecologicalFootprint.totalElectricityUsage,
                totalWasteMap
            );

            const record = EcologicalFootprintRecord.create(
                EcologicalFootprintRecordId.create(input.id),
                UserId.create(input.userId),
                new Date(input.fromDate),
                new Date(input.toDate),
                ecologicalFootprint
            );

            return this._recordRepository.save(record);
        });
    }
}