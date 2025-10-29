import type { SensorReadingRepository } from 'EcoPath/Application/Contracts/mod.ts';
import type { SensorReading, SmartMeterId } from 'EcoPath/Domain/mod.ts';
import type { RecordMapper, PostgreSqlClient } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';

export class PostgreSqlSensorReadingRepository implements SensorReadingRepository {
    private readonly _dbClient: PostgreSqlClient;
    private readonly _mapper: RecordMapper<SensorReading>;
    private readonly _tableName = 'sensor_readings';

    constructor(dbClient: PostgreSqlClient, mapper: RecordMapper<SensorReading>) {
        this._dbClient = dbClient;
        this._mapper = mapper;
    }

    async save(reading: SensorReading, smartMeterId: SmartMeterId): Promise<void> {
        const record = this._mapper.toRecord(reading);

        const query = `
            INSERT INTO ${this._tableName} (smart_meter_id, timestamp, value, unit)
            VALUES ($1, $2, $3, $4)
        `;

        await this._dbClient.insert(query, [
            smartMeterId.toString(),
            record.timestamp,
            record.value,
            record.unit
        ]);
    }
}