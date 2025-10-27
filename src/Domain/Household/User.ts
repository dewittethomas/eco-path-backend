import { Entity, UUIDEntityId } from '@domaincrafters/domain';
import { Guard } from '@domaincrafters/std';
import { Location } from 'EcoPath/Domain/mod.ts';

export enum Gender {
    Female = 'female',
    Male = 'male',
    NonBinary = 'non_binary',
    PreferNotToSay = 'prefer_not_to_say'
}

export enum HousingType {
    Apartment = 'apartment',
    Studio = 'studio',
    House = 'house',
    SharedHouse = 'shared_house',
    OneRoomStudio = 'one_room_studio',
    Other = 'other'
}

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
    private readonly _birthDate: Date;
    private readonly _gender: Gender;
    private readonly _housingType: HousingType;
    private readonly _location: Location;

    private constructor(
        id: UserId,
        name: string,
        email: string,
        birthDate: Date,
        gender: Gender,
        housingType: HousingType,
        location: Location,
    ) {
        super(id);
        this._name = name;
        this._email = email;
        this._birthDate = birthDate;
        this._gender = gender;
        this._housingType = housingType;
        this._location = location;
    }

    public static create(
        id: UserId,
        name: string,
        email: string,
        birthDate: Date,
        gender: Gender,
        housingType: HousingType,
        location: Location,
    ): User {
        const user: User = new User(id, name, email, birthDate, gender, housingType, location);
        user.validateState();
        return user;
    }

    public override validateState(): void {
        Guard.check(this._name, 'Name is required').againstEmpty().againstWhitespace();
        Guard.check(this._email, 'Email is required').againstEmpty().againstWhitespace();
        Guard.check(this._birthDate, 'Birth date is required').againstNullOrUndefined();
        this.ensureBirthDateInThePast();
        this.ensureGenderIsNotEmptyAndExists();
        this.ensureHousingTypeIsNotEmptyAndExists();
        this.ensureLocationIsNotEmpty();
    }

    private ensureBirthDateInThePast() {
        if (this._birthDate > new Date()) {
            throw new Error('Birth date cannot be in the future');
        }
    }

    private ensureLocationIsNotEmpty() {
        if (!this._location) {
            throw new Error('Location is required');
        }
    }

    private ensureGenderIsNotEmptyAndExists() {
        if (!this._gender || !Object.values(Gender).includes(this._gender)) {
            throw new Error(`Invalid gender: ${this._gender}`);
        }
    }

    private ensureHousingTypeIsNotEmptyAndExists() {
        if (!this._housingType || !Object.values(HousingType).includes(this._housingType)) {
            throw new Error(`Invalid housingType: ${this._housingType}`);
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

    get birthDate(): Date {
        return this._birthDate;
    }

    get gender(): Gender {
        return this._gender;
    }

    get housingType(): HousingType {
        return this._housingType;
    }

    get location(): Location {
        return this._location;
    }
}