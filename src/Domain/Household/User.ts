import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard } from '@domaincrafters/std';

export class UserId extends UUIDEntityId {
    private constructor(id?: string) {
        super(id);
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
        Guard.check(this._name, 'Name is required');
        Guard.check(this._email, 'Email is required');
        Guard.check(this._location, 'Location is required');
    }
    
}