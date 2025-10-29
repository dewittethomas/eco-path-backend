import type { ServiceProvider } from '@domaincrafters/di';
import { Config } from 'EcoPath/Infrastructure/Shared/Config.ts';
import type { UserRepository, UnitOfWork } from 'EcoPath/Application/Contracts/mod.ts';
import { UserSeeder } from './UserSeeder.ts';

export class SeederRunner {
    static async run(provider: ServiceProvider, config: Config): Promise<void> {
        const seed = config.get('SEED_DB', 'false');

        if (seed.toLowerCase() === 'true') {
            const scope = provider.createScope();

            const repoOpt = await scope.getService<UserRepository>('postgreSqlUserRepository');
            const uowOpt = await scope.getService<UnitOfWork>('postgreSqlUnitOfWork');

            const userRepository = repoOpt.getOrThrow();
            const unitOfWork = uowOpt.getOrThrow();

            await unitOfWork.do(async () => {
                await new UserSeeder(userRepository).seed();
            });

            await scope.dispose();
            console.log('Database seeded')
        }
    }
}
