import {
    AllSensorReadingsBySmartMeterIdAndDateData,
    AllSensorReadingsBySmartMeterIdAndDateQuery,
    SensorReadingRecord
} from 'EcoPath/Application/Contracts/mod.ts';
import { PostgreSqlClient } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';

export class PostgreSqlAllSensorReadingsBySmartMeterIdAndDateQuery
    implements AllSensorReadingsBySmartMeterIdAndDateQuery {

    constructor(private readonly db: PostgreSqlClient) {}

    async fetch(
        smartMeterId: string,
        from: Date,
        to: Date
    ): Promise<AllSensorReadingsBySmartMeterIdAndDateData> {

        const meterRow = await this.db.findOne<{
            type: string;
            unit: string;
        }>(
            `SELECT type, unit FROM smart_meters WHERE id = $1 LIMIT 1`,
            [smartMeterId]
        );

        const { type, unit } = meterRow.getOrThrow();

        const rows = await this.db.findMany<{
            timestamp: string;
            value: number;
        }>(
            `SELECT timestamp, value
             FROM sensor_readings
             WHERE smart_meter_id = $1 AND timestamp >= $2 AND timestamp <= $3
             ORDER BY timestamp ASC`,
            [smartMeterId, from, to]
        );

        const readings: SensorReadingRecord[] = rows.map(row => ({
            timestamp: new Date(row.timestamp),
            value: row.value
        }));

        return {
            smartMeterId,
            type,       
            from,
            to,
            unit,       
            sensorReadings: readings
        };
    }
}
