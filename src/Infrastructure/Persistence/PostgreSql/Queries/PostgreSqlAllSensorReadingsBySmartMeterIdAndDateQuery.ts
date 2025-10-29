import {
    AllSensorReadingsBySmartMeterIdAndDateData,
    AllSensorReadingsBySmartMeterIdAndDateQuery
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
        const meterRow = await this.db.findOne<{
            meter_type: string;
        }>(`
            SELECT meter_type
            FROM smart_meters
            WHERE id = $1
            LIMIT 1
        `, [smartMeterId]);

        const { meter_type } = meterRow.getOrThrow();
        const unit = meter_type === 'electricity'
            ? Unit.KilowattHour
            : Unit.CubicMeter;


        const toExclusive = new Date(to);
        toExclusive.setDate(toExclusive.getDate() + 1);

        const avgRow = await this.db.findOne<{ average: number | null }>(
            `SELECT AVG(value)::float AS average
            FROM sensor_readings
            WHERE smart_meter_id = $1
            AND timestamp >= $2
            AND timestamp < $3`,
            [smartMeterId, from.toISOString(), toExclusive.toISOString()]
        );

        const { average } = avgRow.getOrThrow();
        const avg = average ?? 0;
        const roundedAverage = Math.round(avg * 100) / 100;

        return {
            smartMeterId,
            type: meter_type,
            from,
            to,
            unit,
            average: roundedAverage
        };
    }
}