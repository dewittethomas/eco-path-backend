import type { Context, Middleware, Next } from '@oak/oak';
import { WebApiResult } from 'EcoPath/Infrastructure/WebApi/Shared/mod.ts';

export class CorsRulesMiddleware {
    static Add(): Middleware {
        return async (ctx: Context<Record<string, unknown>>, next: Next) => {
            ctx.response.headers.set('Access-Control-Allow-Origin', '*');
            ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
            ctx.response.headers.set('Access-Control-Allow-Credentials', 'true');
            ctx.response.headers.set('origin', '*');
            ctx.response.headers.set('Access-Control-Expose-Headers', '*');
            await next();
        };
    }
}

export class GlobalExceptionHandlerMiddleware {
    static Add(): Middleware {
        return async (context: Context<Record<string, unknown>>, next: Next) => {
            try {
                return await next();
            } catch (error: unknown) {
                console.error(error);
                WebApiResult.problemDetails(context, error as Error);
                return context;
            }
        };
    }
}