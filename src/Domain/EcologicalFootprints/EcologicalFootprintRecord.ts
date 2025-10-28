import { Entity, UUIDEntityId } from "@domaincrafters/domain";
import { ExtraGuard, UserId, EcologicalFootprint } from "EcoPath/Domain/mod.ts";

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
        this._userId = userId;
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
        ExtraGuard.check(this._userId, 'userId').againstNullOrUndefined();
        ExtraGuard.check(this._fromDate, 'fromDate').ensureDateIsInThePast();
        ExtraGuard.check(this._toDate, 'toDate').ensureDateIsInThePast();
        ExtraGuard.check(this._ecologicalFootprint, 'ecologicalFootprint').againstNullOrUndefined();
    }

    override get id(): EcologicalFootprintRecordId {
      return this._id as EcologicalFootprintRecordId;
    }

    get userId(): UserId {
        return this._userId;
    }

    get fromDate(): Date {
        return this._fromDate;
    }

    get toDate(): Date {
        return this._toDate;
    }

    get ecologicalFootprint(): EcologicalFootprint {
        return this._ecologicalFootprint;
    }
}