import type { RouterContext } from '@oak/oak';
import { Guard } from '@domaincrafters/std';
import {
    WebApiRequest,
    WebApiResult,
    RequestValidator
} from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';
import type { AllSensorReadingsBySmartMeterIdAndDateQuery } from 'EcoPath/Application/Contracts/mod.ts';

export class AllSensorReadingsBySmartMeterIdAndDateController {
    constructor(
        private readonly query: AllSensorReadingsBySmartMeterIdAndDateQuery
    ) {}

    async handle(ctx: RouterContext<string>): Promise<void> {
        const request = await WebApiRequest.create(ctx, this.validateRequest);

        const smartMeterId = request.parameter('smartMeterId');
        const from = new Date(ctx.request.url.searchParams.get('from')!);
        const to = new Date(ctx.request.url.searchParams.get('to')!);

        const avgFlag = ctx.request.url.searchParams.get('avg');
        const interval = ctx.request.url.searchParams.get('interval') as 'day' | 'week' | 'month' | null;

        let result;

        if (avgFlag === 'true' && interval) {
            // grouped averages (day/week/month)
            result = await this.query.fetchGroupedAverage(smartMeterId, from, to, interval);
        }
        else if (avgFlag === 'true') {
            // single average
            result = await this.query.fetchAverage(smartMeterId, from, to);
        }
        else {
            // raw readings
            result = await this.query.fetchAll(smartMeterId, from, to);
        }

        WebApiResult.ok(ctx, result);
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