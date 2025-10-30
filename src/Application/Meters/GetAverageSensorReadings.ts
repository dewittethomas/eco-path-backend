import { UseCase } from '@domaincrafters/application';
import { GetAverageSensorReadingsData, AllSensorReadingsBySmartMeterIdAndDateQuery } from "EcoPath/Application/Contracts/mod.ts";

export interface GetAverageSensorReadingsInput {
    smartMeterId: string;
    from: Date;
    to: Date;
}

export class GetAverageSensorReadings
    implements UseCase<GetAverageSensorReadingsInput, GetAverageSensorReadingsData>
{
    private readonly _query: AllSensorReadingsBySmartMeterIdAndDateQuery;

    constructor(query: AllSensorReadingsBySmartMeterIdAndDateQuery) {
        this._query = query;
    }

    async execute(
        input: GetAverageSensorReadingsInput
    ): Promise<GetAverageSensorReadingsData> {

        return await this._query.fetchAverage(
            input.smartMeterId,
            input.from,
            input.to
        );
    }
}