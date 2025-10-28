import type { Router } from '@oak/oak';
import type { RouterBuilder } from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import { SaveUserController } from "EcoPath/Infrastructure/WebApi/mod.ts";

export class Routes {
    static map(routerBuilder: RouterBuilder): Router {
        return routerBuilder
            .mapPost(
                SaveUserController.name,
                '/api/users'
            )
            .build();
    }
}
