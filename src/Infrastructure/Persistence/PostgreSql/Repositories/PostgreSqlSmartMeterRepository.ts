import type { SmartMeter } from 'EcoPath/Domain/mod.ts';
import type { SmartMeterRepository } from 'EcoPath/Application/Contracts/mod.ts';
import type { RecordMapper, PostgreSqlClient } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';
import { PostgreSqlRepository } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';

export class PostgreSqlSmartMeterRepository
    extends PostgreSqlRepository<SmartMeter>
    implements SmartMeterRepository
{
    constructor(
        client: PostgreSqlClient,
        mapper: RecordMapper<SmartMeter>,
    ) {
        super(client, 'smart_meters', mapper);
    }
}