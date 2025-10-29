import { Optional } from '@domaincrafters/std';
import { CarbonFootprintRecordRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { CarbonFootprintRecord, CarbonFootprintRecordId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockCarbonFootprintRecordRepository implements CarbonFootprintRecordRepository {
    private _visitedSave: number = 0;
    private readonly _records: CarbonFootprintRecord[];

    constructor(records: CarbonFootprintRecord[] = []) {
        this._records = records;
    }

    byId(_id: CarbonFootprintRecordId): Promise<Optional<CarbonFootprintRecord>> {
        throw new Error('Method not implemented.');
    }

    save(entity: CarbonFootprintRecord): Promise<void> {
        this._visitedSave++;
        this._records.push(entity);
        
        return Promise.resolve();
    }

    remove(_entity: CarbonFootprintRecord): Promise<void> {
        throw new Error('Method not implemented.');
    }

    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getRecordFromCall(call: number): CarbonFootprintRecord {
        const record = this._records[call - 1];
        if (!record) {
            throw new Error(`No record with call ${call} found`);
        }
        return record;
    }
}