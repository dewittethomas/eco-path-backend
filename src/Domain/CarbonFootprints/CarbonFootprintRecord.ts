import { Entity, UUIDEntityId } from "@domaincrafters/domain";
import { ExtraGuard, UserId, CarbonFootprint } from "EcoPath/Domain/mod.ts";

export class CarbonFootprintRecordId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): CarbonFootprintRecordId {
        return new CarbonFootprintRecordId(id);
    }
}

export class CarbonFootprintRecord extends Entity {
    private readonly _userId: UserId;
    private readonly _fromDate: Date;
    private readonly _toDate: Date;
    private readonly _CarbonFootprint: CarbonFootprint;

    private constructor(
        id: CarbonFootprintRecordId,
        userId: UserId,
        fromDate: Date,
        toDate: Date,
        CarbonFootprint: CarbonFootprint
    ) {
        super(id);
        this._userId = userId;
        this._fromDate = fromDate;
        this._toDate = toDate;
        this._CarbonFootprint = CarbonFootprint;
    }

    public static create(
        id: CarbonFootprintRecordId,
        userId: UserId,
        fromDate: Date,
        toDate: Date,
        CarbonFootprint: CarbonFootprint
    ) {
        const carbonFootprintRecord = new CarbonFootprintRecord(id, userId, fromDate, toDate, CarbonFootprint);
        carbonFootprintRecord.validateState();
        return carbonFootprintRecord;
    }

    public override validateState(): void {
        ExtraGuard.check(this._userId, 'userId').againstNullOrUndefined();
        ExtraGuard.check(this._fromDate, 'fromDate').ensureDateIsInThePast();
        ExtraGuard.check(this._toDate, 'toDate').ensureDateIsInThePast();
        ExtraGuard.check(this._CarbonFootprint, 'CarbonFootprint').againstNullOrUndefined();
    }

    override get id(): CarbonFootprintRecordId {
      return this._id as CarbonFootprintRecordId;
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

    get CarbonFootprint(): CarbonFootprint {
        return this._CarbonFootprint;
    }
}