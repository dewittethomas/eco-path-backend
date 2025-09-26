import { Optional } from '@domaincrafters/std';
import { UserRepository } from 'EcoPath/Application/Contracts/mod.ts';
import { User, UserId } from 'EcoPath/Domain/mod.ts';
import { assertEquals } from '@std/assert/equals';

export class MockUserRepository implements UserRepository {
    private _visitedSave: number = 0;
    private readonly _users: User[] = [];

    constructor(users: User[] = []) {
        this._users = users;
    }

    byId(_id: UserId): Promise<Optional<User>> {
        throw new Error('Method not implemented.');
    }

    save(entity: User): Promise<void> {
        this._visitedSave++;
        this._users.push(entity);

        return Promise.resolve();
    }

    remove(_entity: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    assertSaveIsCalled(times: number): void {
        assertEquals(this._visitedSave, times);
    }

    getUserFromCall(call: number): User {
        if (!this._users[call-1]) {
            throw new Error(`No user with call ${call} not found`);
        }
        return this._users[call-1]!;
    }
}