import type { UseCase } from'@domaincrafters/application';
import type { SmartMeterRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { SmartMeter, SmartMeterId, type MeterType, Location } from "EcoPath/Domain/mod.ts";

export interface SaveSmartMeterInput {
    meterType: MeterType;
    location: {
        houseNumber: string;
        street: string;
        city: string;
        postalCode: string;
    }
}

export class SaveSmartMeter implements UseCase<SaveSmartMeterInput, string> {
    private readonly _smartMeterRepository: SmartMeterRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        smartMeterRepository: SmartMeterRepository,
        unitOfWork: UnitOfWork
    ) {
        this._smartMeterRepository = smartMeterRepository;
        this._unitOfWork = unitOfWork;
    }

    async execute(input: SaveSmartMeterInput): Promise<string> {
        return await this._unitOfWork.do<string>(async () => {
            const location = Location.create(
                input.location.houseNumber,
                input.location.street,
                input.location.city,
                input.location.postalCode,
            );

            const smartMeterId = SmartMeterId.create();

            const smartMeter = SmartMeter.create(
                smartMeterId,
                input.meterType,
                location
            );

            await this._smartMeterRepository.save(smartMeter);

            return smartMeter.id.toString();
        });
    }
}