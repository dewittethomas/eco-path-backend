import type { UseCase } from'@domaincrafters/application';
import type { SmartMeterRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { SmartMeter, SmartMeterId, type MeterType, Location } from "EcoPath/Domain/mod.ts";

export interface SaveSmartMeterInput {
    id: string;
    meterType: MeterType;
    location: {
        houseNumber: string;
        street: string;
        city: string;
        postalCode: string;
    }
}

export class SaveSmartMeter implements UseCase<SaveSmartMeterInput> {
    private readonly _smartMeterRepository: SmartMeterRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        smartMeterRepository: SmartMeterRepository,
        unitOfWork: UnitOfWork
    ) {
        this._smartMeterRepository = smartMeterRepository;
        this._unitOfWork = unitOfWork;
    }

    execute(input: SaveSmartMeterInput): Promise<void> {
        return this._unitOfWork.do<void>(() => {
            const location = Location.create(
                input.location.houseNumber,
                input.location.street,
                input.location.city,
                input.location.postalCode,
            );

            const smartMeter = SmartMeter.create(
                SmartMeterId.create(input.id),
                input.meterType,
                location
            );

            return this._smartMeterRepository.save(smartMeter);
        });
    }
}