import { Guard } from '@domaincrafters/std';
import { ExtraGuard, SmartMeter } from 'EcoPath/Domain/mod.ts';

export enum Unit {
  KilowattHour = 'kilowatt_hour',
  CubicMeter = 'cubic_meter',
  Liter = 'liter',
}

export class SensorReading {
    private readonly _smartMeter: SmartMeter;
    private readonly _timestamp: Date;
    private readonly _value: number;
    private readonly _unit: Unit;

    private constructor(
        smartMeterId: SmartMeter,
        timestamp: Date,
        value: number,
        unit: Unit,
    ) {
        this._smartMeter = smartMeterId;
        this._timestamp = timestamp;
        this._value = value;
        this._unit = unit;
    }

    public static create(
        smartMeter: SmartMeter,
        timestamp: Date,
        value: number,
        unit: Unit,
    ): SensorReading {
        const sensorReading: SensorReading = new SensorReading(smartMeter, timestamp, value, unit);
        sensorReading.validateState();
        return sensorReading;
    }

    public validateState(): void {
        ExtraGuard.check(this._smartMeter, 'smartMeter').againstNullOrUndefined();
        ExtraGuard.check(this._timestamp, 'timestamp').againstNullOrUndefined().ensureIsValidDate().ensureDateIsInThePast();
        Guard.check(this._value, 'value').againstZero().againstNegative();
        ExtraGuard.check(this._unit, 'unit').againstNullOrUndefined().ensureValueExistsInEnum(Unit);
    }

    equals(other: SensorReading): boolean {
        return this.smartMeter.id === other.smartMeter.id && this.timestamp.getTime() === other.timestamp.getTime() &&
            this.value === other.value && this.unit === other.unit; 
    }

    get smartMeter(): SmartMeter {
        return this._smartMeter;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    get value(): number {
        return this._value;
    }

    get unit(): Unit {
        return this._unit;
    }
}