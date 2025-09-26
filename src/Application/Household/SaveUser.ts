import type { UseCase } from'@domaincrafters/application';
import type { UserRepository, UnitOfWork } from "EcoPath/Application/Contracts/mod.ts";
import { User, UserId } from "EcoPath/Domain/mod.ts";
import { Location } from "EcoPath/Domain/mod.ts";

export interface SaveUserInput {
    id: string;
    name: string;
    email: string;
    location: Location
}

export class SaveUser implements UseCase<SaveUserInput, void> {
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
            const user = User.create(
                UserId.create(input.id),
                input.name,
                input.email,
                input.location
            );
            
            return this._userRepository.save(user);
        })
    }
}

        
