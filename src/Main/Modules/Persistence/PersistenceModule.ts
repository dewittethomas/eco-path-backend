import type { ServiceCollection, ServiceProvider } from '@domaincrafters/di';
import {
    PostgreSqlClient,
    PostgreSqlServices,
} from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/mod.ts';
import type { Config } from 'EcoPath/Infrastructure/Shared/mod.ts';
import {
    PostgreSqlAllSensorReadingsBySmartMeterIdAndDateQuery,
    PostgreSqlUserRepository,
    UserRecordMapper,
} from 'EcoPath/Infrastructure/Persistence/PostgreSql/mod.ts';

export class PersistenceModule {
    static add(serviceCollection: ServiceCollection, config: Config): void {
        PostgreSqlServices.add(config, serviceCollection);

        this.addRepositories(serviceCollection);
            //.addQueries(serviceCollection);
    }

    static addRepositories(serviceCollection: ServiceCollection): typeof PersistenceModule {
        serviceCollection
            .addScoped(
                'postgreSqlUserRepository',
                async (serviceProvider: ServiceProvider) => {
                    const client =
                        (await serviceProvider.getService<PostgreSqlClient>('postgreSqlClient'))
                            .getOrThrow();

                    const userDocumentMapper = new UserRecordMapper();

                    return new PostgreSqlUserRepository(
                        client,
                        userDocumentMapper,
                    );
                },
            );

        return this;
    }
    
    static addQueries(serviceCollection: ServiceCollection): typeof PersistenceModule {
        serviceCollection
            .addScoped(
                'allSensorReadingsBySmartMeterIdAndDateQuery',
                async (_serviceProvider: ServiceProvider) => {
                    const postgreSqlClient: PostgreSqlClient =
                        (await _serviceProvider.getService<PostgreSqlClient>('postgreSqlClient')).value;

                    return new PostgreSqlAllSensorReadingsBySmartMeterIdAndDateQuery(postgreSqlClient);
                }
            )

        return this;
    }
}
