import {
    AllSensorReadingsBySmartMeterIdAndDateData,
    AllSensorReadingsBySmartMeterIdAndDateQuery,
    SensorReadingRecord
} from 'EcoPath/Application/Contracts/mod.ts';
import { PostgreSqlClient } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';
import { Unit } from 'EcoPath/Domain/mod.ts';

export class PostgreSqlAllSensorReadingsBySmartMeterIdAndDateQuery
    implements AllSensorReadingsBySmartMeterIdAndDateQuery {

    constructor(private readonly db: PostgreSqlClient) {}

    async fetch(
        smartMeterId: string,
        from: Date,
        to: Date
    ): Promise<AllSensorReadingsBySmartMeterIdAndDateData> {

        // ✅ FIX: select meter_type instead of type/unit
        const meterRow = await this.db.findOne<{ meter_type: string }>(
            `SELECT meter_type FROM smart_meters WHERE id = $1 LIMIT 1`,
            [smartMeterId]
        );

        const { meter_type } = meterRow.getOrThrow();

        // ✅ Derive unit from meter_type (domain logic)
        const unit = meter_type === 'electricity'
            ? Unit.KilowattHour
            : Unit.CubicMeter;

        const rows = await this.db.findMany<{ timestamp: string; value: number }>(
            `SELECT timestamp, value
             FROM sensor_readings
             WHERE smart_meter_id = $1 AND timestamp >= $2 AND timestamp <= $3
             ORDER BY timestamp ASC`,
            [smartMeterId, from.toISOString(), to.toISOString()]
        );

        const readings: SensorReadingRecord[] = rows.map(row => ({
            timestamp: new Date(row.timestamp),
            value: row.value
        }));

        return {
            smartMeterId,
            type: meter_type,
            from,
            to,
            unit,
            sensorReadings: readings
        };
    }
}