import type { ServiceProvider } from '@domaincrafters/di';
import { Config } from 'EcoPath/Infrastructure/Shared/Config.ts';
import { type UnitOfWork, type UserRepository, type SmartMeterRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { UserSeeder, SmartMeterSeeder } from 'EcoPath/Infrastructure/Persistence/PostgreSql/mod.ts';

export class SeederRunner {
    static async run(provider: ServiceProvider, config: Config): Promise<void> {
        if (config.get('SEED_DB', 'false') !== 'true') return;

        const scope = provider.createScope();

        const userRepository = (await scope.getService<UserRepository>('postgreSqlUserRepository')).getOrThrow();
        const smartMeterRepository = (await scope.getService<SmartMeterRepository>('postgreSqlSmartMeterRepository')).getOrThrow();
        const unitOfWork = (await scope.getService<UnitOfWork>('postgreSqlUnitOfWork')).getOrThrow();

        await unitOfWork.do(async () => {
            await new UserSeeder(userRepository).seed();
            await new SmartMeterSeeder(smartMeterRepository).seed();
        });

        await scope.dispose();
        console.log('Database seeded')
    }
}
