import type { ServiceCollection, ServiceProvider } from '@domaincrafters/di';
import type { Config } from 'EcoPath/Infrastructure/Shared/mod.ts';
import { OakServices, type OakWebServer } from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import {
    CorsRulesMiddleware,
    GlobalExceptionHandlerMiddleware,
} from 'EcoPath/Infrastructure/WebApi/Middleware/Middleware.ts';
import { OakControllerFactory } from 'EcoPath/Main/mod.ts';

export class WebApiModule {
    static add(serviceCollection: ServiceCollection, config: Config): void {
        OakServices
            .add(serviceCollection, config)
            .addMiddleware(serviceCollection, [
                CorsRulesMiddleware.Add(),
                GlobalExceptionHandlerMiddleware.Add(),
            ]);

        // this should be scoped, because we want to create controller per web request
        serviceCollection.addScoped(
            'webApiControllerFactory',
            (serviceProvider: ServiceProvider) => {
                return Promise.resolve(new OakControllerFactory(serviceProvider));
            },
        );
    }

    static async use(serviceProvider: ServiceProvider): Promise<void> {
        const webApi: OakWebServer =
            (await serviceProvider.getService<OakWebServer>('webserver')).value;

        webApi.run();
    }
}