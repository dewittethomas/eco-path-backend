import type { UseCase } from '@domaincrafters/application';
import type { ClassificationResultRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { ClassificationResult, ClassificationResultId, WasteScanId, WasteType } from "EcoPath/Domain/mod.ts";

export interface SaveClassificationResultInput {
    id: string;
    scanId: string;
    wasteType: WasteType;
    confidence: number;
    timestamp: Date;
}

export class SaveClassificationResult implements UseCase<SaveClassificationResultInput> {
    private readonly _classificationResultRepository: ClassificationResultRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        classificationResultRepository: ClassificationResultRepository,
        unitOfWork: UnitOfWork,
    ) {
        this._classificationResultRepository = classificationResultRepository;
        this._unitOfWork = unitOfWork;
    }

    execute(input: SaveClassificationResultInput): Promise<void> {
        return this._unitOfWork.do<void>(() => {
            const result = ClassificationResult.create(
                ClassificationResultId.create(input.id),
                WasteScanId.create(input.scanId),
                input.wasteType,
                input.confidence,
                input.timestamp,
            );

            return this._classificationResultRepository.save(result);
        });
    }
}