import type { UseCase } from'@domaincrafters/application';
import type { UserRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { User, UserId, Location } from "EcoPath/Domain/mod.ts";

export interface SaveUserInput {
    id: string;
    name: string;
    email: string;
    location: {
        houseNumber: string;
        street: string;
        city: string;
        postalCode: string;
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
            const location = Location.create(
                input.location.houseNumber,
                input.location.street,
                input.location.city,
                input.location.postalCode,
            );

            const user = User.create(
                UserId.create(input.id),
                input.name,
                input.email,
                location
            );

            return this._userRepository.save(user);
        })
    }
}

        
