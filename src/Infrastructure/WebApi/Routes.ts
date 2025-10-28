import type { Router } from '@oak/oak';
import type { RouterBuilder } from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';


export class Routes {
    static map(routerBuilder: RouterBuilder): Router {
        return routerBuilder
            .build();
    }
}
