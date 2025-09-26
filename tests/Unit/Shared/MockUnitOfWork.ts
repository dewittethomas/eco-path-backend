import { UnitOfWork } from 'EcoPath/Application/Contracts/mod.ts';
import { assertEquals } from '@std/assert';

export class MockUnitOfWork implements UnitOfWork {
    private _visitedDo: number = 0;

    do<T>(work: () => Promise<T>): Promise<T> {
        this._visitedDo++;
        return work();
    }

    assertDoIsCalled(times: number): void {
        assertEquals(this._visitedDo, times);
    }
}
