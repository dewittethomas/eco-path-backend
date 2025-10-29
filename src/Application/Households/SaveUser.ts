import type { UseCase } from'@domaincrafters/application';
import type { UserRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { User, UserId, Gender, HousingType, Location, UserProfile } from "EcoPath/Domain/mod.ts";

export interface SaveUserInput {
    name: string;
    email: string;
    avatarImage: string;
    userProfile: {
        birthDate: Date;
        gender: Gender;
        location: {
            houseNumber: string,
            street: string,
            city: string,
            postalCode: string
        }
        housingType: HousingType;
        householdSize: number;
        ecoGoals: string[];
    }
}

export class SaveUser implements UseCase<SaveUserInput, string> {
    private readonly _userRepository: UserRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        userRepository: UserRepository,
        unitOfWork: UnitOfWork,
    ) {
        this._userRepository = userRepository;
        this._unitOfWork = unitOfWork;
    }

    async execute(input: SaveUserInput): Promise<string> {
        return await this._unitOfWork.do<string>(async () => {
            const location: Location = Location.create(
                input.userProfile.location.houseNumber,
                input.userProfile.location.street,
                input.userProfile.location.city,
                input.userProfile.location.postalCode
            )

            const userProfile: UserProfile = UserProfile.create(
                input.userProfile.birthDate,
                input.userProfile.gender,
                location,
                input.userProfile.housingType,
                input.userProfile.householdSize,
                input.userProfile.ecoGoals
            )

            const userId = UserId.create();

            const user = User.create(
                userId,
                input.name,
                input.email,
                input.avatarImage,
                userProfile
            );

            await this._userRepository.save(user);

            return user.id.toString();
        })
    }
}