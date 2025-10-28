import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { ExtraGuard, WasteScanId, WasteType } from 'EcoPath/Domain/mod.ts';

export class ClassificationResultId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): ClassificationResultId {
        return new ClassificationResultId(id);
    }
}

export class ClassificationResult extends Entity {
    private readonly _scanId: WasteScanId;
    private readonly _wasteType: WasteType;
    private readonly _timestamp: Date;

    private constructor(
        id: ClassificationResultId,
        scanId: WasteScanId,
        wasteType: WasteType,
        timestamp: Date,
    ) {
        super(id);
        this._scanId = scanId;
        this._wasteType = wasteType;
        this._timestamp = timestamp;
    }

    static create(
        id: ClassificationResultId,
        scanId: WasteScanId,
        wasteType: WasteType,
        timestamp: Date,
    ): ClassificationResult {
        const result = new ClassificationResult(id, scanId, wasteType, timestamp);
        result.validateState();
        return result;
    }

    override validateState(): void {
        ExtraGuard.check(this._scanId, 'scanId').againstNullOrUndefined();
        ExtraGuard.check(this._wasteType, 'wasteType').againstNullOrUndefined().ensureValueExistsInEnum(WasteType);
        ExtraGuard.check(this._timestamp, 'timestamp').againstNullOrUndefined().ensureIsValidDate().ensureDateIsInThePast();
    }

    override get id(): ClassificationResultId {
        return this._id as ClassificationResultId;
    }

    get scanId(): WasteScanId {
        return this._scanId;
    }

    get wasteType(): WasteType {
        return this._wasteType;
    }

    get timestamp(): Date {
        return this._timestamp;
    }
}