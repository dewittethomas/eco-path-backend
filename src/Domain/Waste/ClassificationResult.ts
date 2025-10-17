import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard } from '@domaincrafters/std';
import { WasteScanId, WasteType } from 'EcoPath/Domain/mod.ts';

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
    private readonly _confidence: number;
    private readonly _timestamp: Date;

    private constructor(
        id: ClassificationResultId,
        scanId: WasteScanId,
        wasteType: WasteType,
        confidence: number,
        timestamp: Date,
    ) {
        super(id);
        this._scanId = scanId;
        this._wasteType = wasteType;
        this._confidence = confidence;
        this._timestamp = timestamp;
    }

    static create(
        id: ClassificationResultId,
        scanId: WasteScanId,
        wasteType: WasteType,
        confidence: number,
        timestamp: Date,
    ): ClassificationResult {
        const result = new ClassificationResult(id, scanId, wasteType, confidence, timestamp);
        result.validateState();
        return result;
    }

    override validateState(): void {
        Guard.check(this._scanId, 'Scan ID is required').againstNullOrUndefined();
        Guard.check(this._wasteType, 'Waste type is required').againstNullOrUndefined();
        Guard.check(this._timestamp, 'Timestamp is required').againstNullOrUndefined();
        Guard.check(this._confidence, 'Confidence is required').againstNullOrUndefined();

        if (this._confidence < 0 || this._confidence > 1) {
            throw new Error('Confidence must be between 0 and 1');
        }

        const now = new Date();
        if (this._timestamp.getTime() > now.getTime()) {
            throw new Error('Timestamp cannot be in the future');
        }
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

    get confidence(): number {
        return this._confidence;
    }

    get timestamp(): Date {
        return this._timestamp;
    }
}