import { ExtraGuard, Location } from "EcoPath/Domain/mod.ts";
import { Guard } from "@domaincrafters/std";

export enum Gender {
    Female = 'female',
    Male = 'male',
    NonBinary = 'non_binary',
    PreferNotToSay = 'prefer_not_to_say'
}

export enum HousingType {
    Apartment = 'apartment',
    House = 'house',
    OneRoomStudio = 'one_room_studio',
    SharedHouse = 'shared_house',
    Other = 'other'
}

export class UserProfile {
    private readonly _birthDate: Date;
    private readonly _gender: Gender;
    private readonly _location: Location;
    private readonly _housingType: HousingType;
    private readonly _householdSize: number;
    private readonly _ecoGoals: string[];

    private constructor(
        birthDate: Date,
        gender: Gender,
        location: Location,
        housingType: HousingType,
        householdSize: number,
        ecoGoals: string[]
    ) {
        this._birthDate = birthDate;
        this._gender = gender;
        this._location = location;
        this._housingType = housingType;
        this._householdSize = householdSize;
        this._ecoGoals = ecoGoals;
    }

    public static create(
        birthDate: Date,
        gender: Gender,
        location: Location,
        housingType: HousingType,
        householdSize: number,
        ecoGoals: string[]
    ) {
        const userProfile = new UserProfile(birthDate, gender, location, housingType, householdSize, ecoGoals);
        userProfile.validateState();
        return userProfile;
    }

    public validateState(): void {
        ExtraGuard.check(this._birthDate, 'birthDate').againstNullOrUndefined().ensureIsValidDate().ensureDateIsInThePast();
        ExtraGuard.check(this._gender, 'gender').againstNullOrUndefined().ensureValueExistsInEnum(Gender);
        ExtraGuard.check(this._location, 'location').againstNullOrUndefined();
        ExtraGuard.check(this._housingType, 'housingType').ensureValueExistsInEnum(HousingType);
        ExtraGuard.check(this._householdSize, 'householdSize').ensureNumberIsAboveZero();
        Guard.check(this._ecoGoals, 'ecoGoals').againstEmpty();
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    get gender(): Gender {
        return this._gender;
    }

    get location(): Location {
        return this._location;
    }

    get housingType(): HousingType {
        return this._housingType;
    }

    get householdSize(): number {
        return this._householdSize;
    }

    get ecoGoals(): string[] {
        return this._ecoGoals;
    }
}