import { IllegalStateException } from '@domaincrafters/std';
import type { RouterContext } from '@oak/oak';
import type { WebApiController } from 'EcoPath/Infrastructure/WebApi/Shared/WebApiController.ts';
import type { ControllerFactory } from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import {
    SaveUserController
} from 'EcoPath/Infrastructure/WebApi/mod.ts';
import {
    SaveUser
} from 'EcoPath/Application/mod.ts';
import type { ServiceProvider } from '@domaincrafters/di';
import type {
    UserRepository,
    UnitOfWork
} from 'EcoPath/Application/Contracts/mod.ts';

export class OakControllerFactory implements ControllerFactory {
    private readonly _serviceProvider: ServiceProvider;

    constructor(serviceProvider: ServiceProvider) {
        this._serviceProvider = serviceProvider;
    }

    async create(
        ctx: RouterContext<string>,
    ): Promise<WebApiController> {
        if (!ctx.routeName) {
            throw new IllegalStateException('Route name not found');
        }

        switch (ctx.routeName) {
            case SaveUserController.name:
                return await this.createSaveUserController();
            default:
                throw new IllegalStateException(`Route name ${ctx.routeName} not found`);
        }
    }
    private async createSaveUserController(): Promise<SaveUserController> {
        const userRepository = (await this._serviceProvider.getService<UserRepository>(
            'postgreSqlUserRepository',
        ))
            .getOrThrow();

        const unitOfWork = (await this._serviceProvider.getService<UnitOfWork>('postgreSqlUnitOfWork'))
            .getOrThrow();

        const saveUser: SaveUser = new SaveUser(
            userRepository,
            unitOfWork
        );

        return new SaveUserController(
            saveUser
        );
    }
}
