import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard } from '@domaincrafters/std';
import { Location } from 'EcoPath/Domain/mod.ts';

export class SmartMeterId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): SmartMeterId {
        return new SmartMeterId(id);
    }
}

export enum MeterType {
    ELECTRICITY = 'electricity',
    WATER = 'water',
    GAS = 'gas',
}

export class SmartMeter extends Entity {
    private readonly _meterType: MeterType;
    private readonly _location: Location;

    private constructor(
        id: SmartMeterId,
        meterType: MeterType,
        location: Location,
    ) {
        super(id);
        this._meterType = meterType;
        this._location = location;  
    }

    public static create(
        id: SmartMeterId,
        meterType: MeterType,
        location: Location,
    ): SmartMeter {
        const smartMeter: SmartMeter = new SmartMeter(id, meterType, location);
        smartMeter.validateState();
        return smartMeter;
    }

    public override validateState(): void {
        Guard.check(this._meterType, 'Meter type is required').againstWhitespace();
        
        if (!this._location) {
            throw new Error("Location is required");
        }
    }

    override get id(): SmartMeterId {
        return this._id as SmartMeterId;
    }

    get meterType(): MeterType {
        return this._meterType;
    }

    get location(): Location {
        return this._location;
    }
}