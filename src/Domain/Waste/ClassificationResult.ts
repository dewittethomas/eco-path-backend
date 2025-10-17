import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard, UUID } from '@domaincrafters/std';

export class ClassificationResultId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): ClassificationResultId {
        return new ClassificationResultId(id);
    }
}

