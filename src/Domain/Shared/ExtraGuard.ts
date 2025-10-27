export class ExtraGuard {
    private throwException(value: unknown, message: string): never {
        throw new Error(`${message} Actual value: ${JSON.stringify(value)}`)
    }

    public ensureDateIsInThePast(date: Date, message: string): this {
        if (date > new Date()) {
            this.throwException(this, 'Date should be in the past')
        }
        return this;
    }

    public ensureDateIsInTheFuture(date: Date, message: string): this {
        if (date < new Date()) {
            this.throwException(this, 'Date should be in the future')
        }
        return this;
    }
} 