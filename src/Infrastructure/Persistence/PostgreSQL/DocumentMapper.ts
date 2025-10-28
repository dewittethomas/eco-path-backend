import type { EntityId } from '@domaincrafters/domain';

export type PgRecord = Record<string, unknown>;

export interface DocumentMapper<Entity> {
    reconstitute(record: PgRecord): Entity;
    toRecord(entity: Entity): PgRecord;
}

function isEntityId(value: unknown): value is EntityId {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as EntityId).value === 'string' &&
        typeof (value as EntityId).toString === 'function'
    );
}

export function mapEntityToRecord(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(mapEntityToRecord);
    }

    if (isEntityId(value)) {
        return value.toString();
    }

    if (value instanceof Map) {
        return Object.fromEntries(value);
    }

    if (value !== null && typeof value === 'object') {
        const output: PgRecord = {};

        for (const key in value) {
            if (Object.hasOwn(value, key)) {
                const newKey = key.startsWith('_') ? key.slice(1) : key;
                output[newKey] = mapEntityToRecord((value as PgRecord)[key]);
            }
        }

        return output;
    }

    return value;
}
