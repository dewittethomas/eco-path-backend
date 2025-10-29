import type { RouterContext } from '@oak/oak';
import { Guard } from '@domaincrafters/std';
import {
    WebApiRequest,
    WebApiResult,
    RequestValidator
} from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import type { UseCase } from '@domaincrafters/application';
import type { AllSensorReadingsBySmartMeterIdAndDateData } from 'EcoPath/Application/Contracts/mod.ts';

export class AllSensorReadingsBySmartMeterIdAndDateController {
    constructor(
        private readonly useCase: UseCase<
            { smartMeterId: string; from: Date; to: Date },
            AllSensorReadingsBySmartMeterIdAndDateData
        >
    ) {}

    async handle(ctx: RouterContext<string>): Promise<void> {
        const request = await WebApiRequest.create(ctx, this.validateRequest);

        const smartMeterId = request.parameter('smartMeterId');
        const fromStr = ctx.request.url.searchParams.get('from');
        const toStr = ctx.request.url.searchParams.get('to');

        const from = new Date(fromStr!);
        const to = new Date(toStr!);

        const data = await this.useCase.execute({ smartMeterId, from, to });
        WebApiResult.ok(ctx, data);
    }

    private validateRequest(ctx: RouterContext<string>): Promise<void> {
        RequestValidator
            .create([
                () => Guard.check(ctx.params.smartMeterId).againstEmpty('smartMeterId is required'),
                () => Guard.check(ctx.request.url.searchParams.get('from')).againstEmpty('"from" query is required'),
                () => Guard.check(ctx.request.url.searchParams.get('to')).againstEmpty('"to" query is required'),
            ])
            .onValidationFailure('Invalid request for sensor readings.')
            .validate();

        return Promise.resolve();
    }
}
