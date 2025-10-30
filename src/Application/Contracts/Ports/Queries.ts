import { SensorReadingRecord } from 'EcoPath/Application/Contracts/mod.ts';

export interface GetSensorReadingsData {
    smartMeterId: string;
    type: string;
    from: Date;
    to: Date;
    unit: string;
    values: SensorReadingRecord[]
}

export interface GetAverageSensorReadingsData {
    smartMeterId: string;
    type: string;
    from: Date;
    to: Date;
    unit: string;
    average: number;
}

export interface GroupedAverageRecord {
    date: Date;
    average: number;
}

export interface GetGroupedAverageSensorReadingsData {
    smartMeterId: string;
    type: string;
    from: Date;
    to: Date;
    unit: string;
    interval: 'day' | 'week' | 'month';
    values: GroupedAverageRecord[];
}

export interface AllSensorReadingsBySmartMeterIdAndDateQuery {
    fetchAll(
        smartMeterId: string,
        from: Date,
        to: Date
    ): Promise<GetSensorReadingsData>;

    fetchAverage(
        smartMeterId: string,
        from: Date,
        to: Date
    ): Promise<GetAverageSensorReadingsData>;

    fetchGroupedAverage(
        smartMeterId: string,
        from: Date,
        to: Date,
        interval: 'day' | 'week' | 'month'
    ): Promise<GetGroupedAverageSensorReadingsData>;
}