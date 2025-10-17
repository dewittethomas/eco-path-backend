import { Optional } from '@domaincrafters/std';
import { ClassificationResultRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { ClassificationResult, ClassificationResultId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockClassificationResultRepository implements ClassificationResultRepository {
    private _visitedSave: number = 0;
    private readonly _results: ClassificationResult[] = [];

    constructor(results: ClassificationResult[] = []) {
        this._results = results;
    }

    byId(_id: ClassificationResultId): Promise<Optional<ClassificationResult>> {
        throw new Error('Method not implemented.');
    }

    save(entity: ClassificationResult): Promise<void> {
        this._visitedSave++;
        this._results.push(entity);
        return Promise.resolve();
    }

    remove(_entity: ClassificationResult): Promise<void> {
        throw new Error('Method not implemented.');
    }

    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getClassificationResultFromCall(call: number): ClassificationResult {
        if (!this._results[call - 1]) {
            throw new Error(`No ClassificationResult for call ${call}`);
        }
        return this._results[call - 1]!;
    }
}
