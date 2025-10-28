import { User, UserId, UserProfile, Gender, HousingType, Location } from 'EcoPath/Domain/mod.ts';
import type { PgRecord, RecordMapper } from 'EcoPath/Infrastructure/Persistence/PostgreSql/Shared/RecordMapper.ts';

export class UserRecordMapper implements RecordMapper<User> {
    toRecord(entity: User): PgRecord {
        return {
            id: entity.id.toString(),
            name: entity.name,
            email: entity.email,
            avatarImage: entity.avatarImage,

            birthDate: entity.userProfile.birthDate.toISOString(),
            gender: entity.userProfile.gender,
            housingType: entity.userProfile.housingType,
            householdSize: entity.userProfile.householdSize,
            ecoGoals: JSON.stringify(entity.userProfile.ecoGoals),

            houseNumber: entity.userProfile.location.houseNumber,
            street: entity.userProfile.location.street,
            city: entity.userProfile.location.city,
            postalCode: entity.userProfile.location.postalCode
        };
    }

    reconstitute(record: PgRecord): User {
        const location = Location.create(
            record.houseNumber as string,
            record.street as string,
            record.city as string,
            record.postalCode as string
        );

        const profile = UserProfile.create(
            new Date(record.birthDate as string),
            record.gender as Gender,
            location,
            record.housingType as HousingType,
            Number(record.householdSize),
            typeof record.ecoGoals === 'string'
                ? JSON.parse(record.ecoGoals)
                : (record.ecoGoals as string[])
        );

        const user = User.create(
            UserId.create(record.id as string),
            record.name as string,
            record.email as string,
            record.avatarImage as string,
            profile
        );

        return user;
    }
}