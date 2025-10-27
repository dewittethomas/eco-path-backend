import { Entity, UUIDEntityId } from "@domaincrafters/domain";
import { UserId, EcologicalFootprint } from "EcoPath/Domain/mod.ts";

export class EcologicalFootprintRecordId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): EcologicalFootprintRecordId {
        return new EcologicalFootprintRecordId(id);
    }
}

export class EcologicalFootprintRecord extends Entity {
    private readonly _userId: UserId;
    private readonly _fromDate: Date;
    private readonly _toDate: Date;
    private readonly _ecologicalFootprint: EcologicalFootprint;

    private constructor(
        id: EcologicalFootprintRecordId,
        userId: UserId,
        fromDate: Date,
        toDate: Date,
        ecologicalFootprint: EcologicalFootprint
    ) {
        super(id);
        this._userId = id;
        this._fromDate = fromDate;
        this._toDate = toDate;
        this._ecologicalFootprint = ecologicalFootprint;
    }

    public static create(
        id: EcologicalFootprintRecordId,
        userId: UserId,
        fromDate: Date,
        toDate: Date,
        ecologicalFootprint: EcologicalFootprint
    ) {
        const ecologicalFootprintRecord = new EcologicalFootprintRecord(id, userId, fromDate, toDate, ecologicalFootprint);
        ecologicalFootprintRecord.validateState();
        return ecologicalFootprintRecord;
    }

    public override validateState(): void {
        this.ensureUserIdIsNotEmpty();
    }

    private ensureUserIdIsNotEmpty() {
        if (!this._userId) {
            throw new Error('User id is required')
        }
    }

    private ensureToDateIsNotInTheFuture() {
        if (this._toDate > new Date()) {
            throw new Error('To ')
        }
    }
}