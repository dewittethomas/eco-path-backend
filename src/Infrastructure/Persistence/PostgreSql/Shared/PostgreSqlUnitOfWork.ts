import { IllegalStateException } from '@domaincrafters/std';
import type { UnitOfWork } from 'EcoPath/Application/Contracts/mod.ts';
import type { PostgreSqlClient } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';

export class PostgreSqlUnitOfWork implements UnitOfWork {
    private readonly _dbClient: PostgreSqlClient;

    constructor(dbClient: PostgreSqlClient) {
        this._dbClient = dbClient;
    }

    async do<Output>(action: () => Promise<Output>): Promise<Output> {
        try {
            return await this._dbClient.transaction(action);
        } catch (error: unknown) {
            throw new IllegalStateException(
                error instanceof Error ? error.message : 'Unknown error occurred'
            );
        }
    }
}
