import type { Optional } from '@domaincrafters/std';
import type { UserRepository } from 'EcoPath/Application/Contracts/mod.ts';
import type { User } from 'EcoPath/Domain/mod.ts';
import { type RecordMapper, type PostgreSqlClient, PostgreSqlRepository } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';

export class PostgreSqlUserRepository
    extends PostgreSqlRepository<User>
    implements UserRepository
{
    constructor(
        client: PostgreSqlClient,
        mapper: RecordMapper<User>,
    ) {
        super(client, 'users', mapper);
    }

    async byEmail(email: string): Promise<Optional<User>> {
        const query = `
            SELECT *
            FROM ${this._tableName}
            WHERE email = $1
            LIMIT 1;
        `;

        const row = await this._dbClient.findOne<ReturnType<RecordMapper<User>['toRecord']>>(query, [email]);

        return row.map(this._mapper.reconstitute);
    }
}
