import { UseCase } from '@domaincrafters/application';
import { AllSensorReadingsBySmartMeterIdAndDateData, AllSensorReadingsBySmartMeterIdAndDateQuery } from "EcoPath/Application/Contracts/mod.ts";

export interface AllSensorReadingsBySmartMeterIdAndDateInput {
    smartMeterId: string;
    from: Date;
    to: Date;
}

export class AllSensorReadingsBySmartMeterIdAndDate
    implements UseCase<AllSensorReadingsBySmartMeterIdAndDateInput, AllSensorReadingsBySmartMeterIdAndDateData>
{
    private readonly _query: AllSensorReadingsBySmartMeterIdAndDateQuery;

    constructor(query: AllSensorReadingsBySmartMeterIdAndDateQuery) {
        this._query = query;
    }

    async execute(
        input: AllSensorReadingsBySmartMeterIdAndDateInput
    ): Promise<AllSensorReadingsBySmartMeterIdAndDateData> {

        return await this._query.fetch(
            input.smartMeterId,
            input.from,
            input.to
        );
    }
}