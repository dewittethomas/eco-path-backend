import { UseCase } from '@domaincrafters/application';
import {
    GetGroupedAverageSensorReadingsData,
    AllSensorReadingsBySmartMeterIdAndDateQuery
} from "EcoPath/Application/Contracts/mod.ts";

export interface GetGroupedAverageSensorReadingsInput {
    smartMeterId: string;
    from: Date;
    to: Date;
    interval: 'day' | 'week' | 'month';
}

export class GetGroupedAverageSensorReadings
    implements UseCase<GetGroupedAverageSensorReadingsInput, GetGroupedAverageSensorReadingsData>
{
    constructor(private readonly _query: AllSensorReadingsBySmartMeterIdAndDateQuery) {}

    async execute(
        input: GetGroupedAverageSensorReadingsInput
    ): Promise<GetGroupedAverageSensorReadingsData> {

        return await this._query.fetchGroupedAverage(
            input.smartMeterId,
            input.from,
            input.to,
            input.interval
        );
    }
}