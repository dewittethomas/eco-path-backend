import type { ServiceCollection, ServiceDisposer, ServiceProvider } from '@domaincrafters/di';
import { Application, type Middleware, type Router } from '@oak/oak';
import type { Config } from 'EcoPath/Infrastructure/Shared/Config.ts';
import {
    OakWebServer,
    type RouteHandler,
    RouteHandlerWithDI,
    RouterBuilder,
} from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import { Routes } from 'EcoPath/Infrastructure/WebApi/Routes.ts';

export class OakServices {
    private static readonly _fallbackPort: string = '8000';
    private static readonly _fallbackHost: string = '0.0.0.0';

    static add(
        serviceCollection: ServiceCollection,
        config: Config,
    ): typeof OakServices {
        return OakServices
            .addRouter(serviceCollection)
            .addWebserver(config, serviceCollection);
    }

    private static addWebserver(
        config: Config,
        serviceCollection: ServiceCollection,
    ): typeof OakServices {
        const oakDisposer: ServiceDisposer<OakWebServer> = (oakWebServer: OakWebServer) => {
            console.log('Disposing OakWebServer');
            return Promise.resolve(oakWebServer.stop());
        };

        serviceCollection.addSingleton(
            'webserver',
            async (serviceProvider: ServiceProvider) => {
                const router: Router = (await serviceProvider.getService<Router>('router')).value;
                const application: Application = new Application();
                const host: string = config.get('WEBAPI_HOST', this._fallbackHost);
                const port: number = parseInt(config.get('WEBAPI_PORT', this._fallbackPort));
                const middlewares: Middleware[] =
                    (await serviceProvider.getService<Middleware[]>('webApiMiddlewares')).value;
                const webserver: OakWebServer = new OakWebServer(host, port, router, application);

                middlewares.forEach((middleware) => webserver.addMiddleware(middleware));

                return webserver;
            },
            oakDisposer,
        );

        return this;
    }

    static addMiddleware(
        serviceCollection: ServiceCollection,
        middlewares: Middleware[],
    ): typeof OakServices {
        if (!middlewares) {
            return this;
        }

        serviceCollection.addSingleton(
            'webApiMiddlewares',
            (_serviceProvider: ServiceProvider) => {
                return Promise.resolve(middlewares);
            },
        );

        return this;
    }

    private static addRouter(serviceCollection: ServiceCollection): typeof OakServices {
        serviceCollection.addSingleton('router', (serviceProvider: ServiceProvider) => {
            const routeHandler: RouteHandler = new RouteHandlerWithDI(serviceProvider);
            const routerBuilder: RouterBuilder = new RouterBuilder();
            routerBuilder.addRouteHandler(routeHandler);
            const router: Router = Routes.map(routerBuilder);
            return Promise.resolve(router);
        });

        return this;
    }
}