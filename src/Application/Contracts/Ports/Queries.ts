import { SensorReadingRecord } from 'EcoPath/Application/Contracts/mod.ts';

export interface AllSensorReadingsBySmartMeterIdAndDateData {
    smartMeterId: string,
    type: string,
    from: Date,
    to: Date,
    unit: string,
    sensorReadings: SensorReadingRecord[]
}

export interface AllSensorReadingsBySmartMeterIdAndDateQuery {
    fetch(smartMeterId: string, from: Date, to: Date): Promise<AllSensorReadingsBySmartMeterIdAndDateData>;
}