import { Optional } from '@domaincrafters/std';
import { EcologicalFootprintRecordRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { EcologicalFootprintRecord, EcologicalFootprintRecordId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockEcologicalFootprintRecordRepository implements EcologicalFootprintRecordRepository {
    private _visitedSave = 0;
    private readonly _records: EcologicalFootprintRecord[] = [];

    constructor(records: EcologicalFootprintRecord[] = []) {
        this._records = records;
    }

    byId(_id: EcologicalFootprintRecordId): Promise<Optional<EcologicalFootprintRecord>> {
        throw new Error('Method not implemented.');
    }

    save(entity: EcologicalFootprintRecord): Promise<void> {
        this._visitedSave++;
        this._records.push(entity);

        return Promise.resolve();
    }

    remove(_entity: EcologicalFootprintRecord): Promise<void> {
        throw new Error('Method not implemented.');
    }

    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getRecordFromCall(call: number): EcologicalFootprintRecord {
        if (!this._records[call - 1]) {
            throw new Error(`No record found for call ${call}`);
        }
        return this._records[call - 1]!;
    }
}
