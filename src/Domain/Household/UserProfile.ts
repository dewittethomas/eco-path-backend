import { ExtraGuard, Location } from "EcoPath/Domain/mod.ts";

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

export class UserProfile {
    private readonly _birthDate: Date;
    private readonly _gender: Gender;
    private readonly _housingType: HousingType;
    private readonly _location: Location;

    private constructor(
        birthDate: Date,
        gender: Gender,
        housingType: HousingType,
        location: Location
    ) {
        this._birthDate = birthDate,
        this._gender = gender,
        this._housingType = housingType,
        this._location = location
    }

    public static create(
        birthDate: Date,
        gender: Gender,
        housingType: HousingType,
        location: Location
    ) {
        const userProfile = new UserProfile(birthDate, gender, housingType, location);
        userProfile.validateState();
        return userProfile;
    }

    public validateState(): void {
        ExtraGuard.check(this._birthDate, 'birthDate').againstNullOrUndefined().ensureIsValidDate().ensureDateIsInThePast();
        ExtraGuard.check(this._gender, 'gender').againstNullOrUndefined().ensureValueExistsInEnum(Gender);
        ExtraGuard.check(this._housingType, 'housingType').ensureValueExistsInEnum(HousingType);
        ExtraGuard.check(this._location, 'location').againstNullOrUndefined();
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