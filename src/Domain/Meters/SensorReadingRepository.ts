import { SensorReading, SmartMeterId } from "EcoPath/Domain/mod.ts";

export interface SensorReadingRepository {
    save(reading: SensorReading, smartMeterId: SmartMeterId): Promise<void>;
}