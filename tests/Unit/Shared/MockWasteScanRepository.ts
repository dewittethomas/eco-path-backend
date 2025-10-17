import { Optional } from '@domaincrafters/std';
import { WasteScanRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { WasteScan, WasteScanId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockWasteScanRepository implements WasteScanRepository {
    private _visitedSave: number = 0;
    private readonly _scans: WasteScan[] = [];

    constructor(scans: WasteScan[] = []) {
        this._scans = scans;
    }

    byId(_id: WasteScanId): Promise<Optional<WasteScan>> {
        throw new Error('Method not implemented.');
    }

    save(entity: WasteScan): Promise<void> {
        this._visitedSave++;
        this._scans.push(entity);
        return Promise.resolve();
    }

    remove(_entity: WasteScan): Promise<void> {
        throw new Error('Method not implemented.');
    }

    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getScanFromCall(call: number): WasteScan {
        if (!this._scans[call - 1]) {
            throw new Error(`No scan with call ${call} found`);
        }
        return this._scans[call - 1]!;
    }
}