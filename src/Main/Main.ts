import { PersistenceModule, WebApiModule } from 'EcoPath/Main/mod.ts';
import {
    DIServiceCollection,
    DIServiceProvider,
    type ServiceCollection,
    type ServiceProvider,
} from '@domaincrafters/di';
import { Config } from 'EcoPath/Infrastructure/Shared/mod.ts';

class Main {
    static async init() {
        const config: Config = Config.create();
        const serviceCollection: ServiceCollection = DIServiceCollection.create();
        const serviceProvider: ServiceProvider = DIServiceProvider.create(serviceCollection);

        PersistenceModule.add(serviceCollection, config);
        WebApiModule.add(serviceCollection, config);

        await WebApiModule.use(serviceProvider);
    }
}

Main.init();