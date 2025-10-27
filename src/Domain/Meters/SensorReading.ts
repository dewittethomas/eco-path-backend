import { Guard } from '@domaincrafters/std';
import { SmartMeter } from 'EcoPath/Domain/mod.ts';

export enum Unit {
  KilowattHour = 'kWh',
  CubicMeter = 'm3',
  Liter = 'l',
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
        this.ensureSmartMeterIsNotEmpty();
        Guard.check(this._timestamp, 'Timestamp is required').againstNullOrUndefined();
        Guard.check(this._value, 'Value is required').againstZero();
        Guard.check(this._value, 'Value must be non-negative').againstNegative();
        this.ensureUnitIsNotEmptyandExists();
    }

    private ensureSmartMeterIsNotEmpty() {
        if (!this._smartMeter) {
            throw new Error("Smart meter is required");
        }
    }

    private ensureTimestampIsNotInFuture() {
        
    }

    private ensureUnitIsNotEmptyandExists() {
        if (!this._unit || !Object.values(Unit).includes(this._unit)) {
            throw new Error(`Invalid unit: ${this._unit}`);
        }
    }

    equals(other: SensorReading): boolean {
        return this.smartMeter === other.smartMeter && this.timestamp === other.timestamp &&
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