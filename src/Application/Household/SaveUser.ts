import type { UseCase } from'@domaincrafters/application';
import type { UserRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { User, UserId, Gender, HousingType, Location, UserProfile } from "EcoPath/Domain/mod.ts";

export interface SaveUserInput {
    id: string;
    name: string;
    email: string;
    avatarImage: string;
    userProfile: {
        birthDate: Date;
        gender: Gender;
        housingType: HousingType
        location: {
            houseNumber: string,
            street: string,
            city: string,
            postalCode: string
        }
    }
}

export class SaveUser implements UseCase<SaveUserInput> {
    private readonly _userRepository: UserRepository;
    private readonly _unitOfWork: UnitOfWork;

    constructor(
        userRepository: UserRepository,
        unitOfWork: UnitOfWork,
    ) {
        this._userRepository = userRepository;
        this._unitOfWork = unitOfWork;
    }

    execute(input: SaveUserInput): Promise<void> {
        return this._unitOfWork.do<void>(() => {
            const location: Location = Location.create(
                input.userProfile.location.houseNumber,
                input.userProfile.location.street,
                input.userProfile.location.city,
                input.userProfile.location.postalCode
            )

            const userProfile: UserProfile = UserProfile.create(
                input.userProfile.birthDate,
                input.userProfile.gender,
                input.userProfile.housingType,
                location
            )

            const user = User.create(
                UserId.create(input.id),
                input.name,
                input.email,
                input.avatarImage,
                userProfile
            );

            return this._userRepository.save(user);
        })
    }
}