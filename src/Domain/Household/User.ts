import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard } from '@domaincrafters/std';
import { Location } from 'EcoPath/Domain/mod.ts';

export class UserId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
    }

    static create(id?: string): UserId {
        return new UserId(id);
    }
}

export class User extends Entity {
    private readonly _name: string;
    private readonly _email: string;
    private readonly _location: Location;

    private constructor(
        id: UserId,
        name: string,
        email: string,
        location: Location,
    ) {
        super(id);
        this._name = name;
        this._email = email;
        this._location = location;
    }

    public static create(
        id: UserId,
        name: string,
        email: string,
        location: Location,
    ): User {
        const user: User = new User(id, name, email, location);
        user.validateState();
        return user;
    }

    public override validateState(): void {
        Guard.check(this._name, 'Name is required').againstWhitespace();
        Guard.check(this._email, 'Email is required').againstWhitespace();
        
        if (!this._location) {
            throw new Error("Location is required");
        }
    }

    override get id(): UserId {
      return this._id as UserId;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get location(): Location {
        return this._location;
    }
}