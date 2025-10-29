import { Optional } from '@domaincrafters/std';
import { SmartMeterRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { SmartMeter, SmartMeterId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockSmartMeterRepository implements SmartMeterRepository {
    private _visitedSave: number = 0;
    private readonly _smartMeters: SmartMeter[] = [];

    constructor(smartMeters: SmartMeter[] = []) {
        this._smartMeters = smartMeters;
    }

    byId(_id: SmartMeterId): Promise<Optional<SmartMeter>> {
        throw new Error('Method not implemented.');
    }

    save(entity: SmartMeter): Promise<void> {
        this._visitedSave++;
        this._smartMeters.push(entity);

        return Promise.resolve();
    }

    remove(_entity: SmartMeter): Promise<void> {
        throw new Error('Method not implemented.');
    }

    findAll(): Promise<SmartMeter[]> {
        throw new Error('Method not implemented.');
    }
    
    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getSmartMeterFromCall(call: number): SmartMeter {
        if (!this._smartMeters[call-1]) {
            throw new Error(`No smart meter with call ${call} not found`);
        }
        return this._smartMeters[call-1]!;
    }
}