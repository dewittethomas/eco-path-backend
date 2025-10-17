import type { UseCase } from '@domaincrafters/application';
import type { WasteScanRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { WasteScan, WasteScanId, UserId } from "EcoPath/Domain/mod.ts";

export interface SaveWasteScanInput {
    id: string;
    userId: string;
    timestamp: Date;
    image: string;
}

export class SaveWasteScan implements UseCase<SaveWasteScanInput> {
    private readonly _wasteScanRepository: WasteScanRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        wasteScanRepository: WasteScanRepository,
        unitOfWork: UnitOfWork,
    ) {
        this._wasteScanRepository = wasteScanRepository;
        this._unitOfWork = unitOfWork;
    }

    execute(input: SaveWasteScanInput): Promise<void> {
        return this._unitOfWork.do<void>(() => {
            const wasteScan = WasteScan.create(
                WasteScanId.create(input.id),
                UserId.create(input.userId),
                input.timestamp,
                input.image,
            );

            return this._wasteScanRepository.save(wasteScan);
        });
    }
}
