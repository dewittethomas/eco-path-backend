export type { UnitOfWork } from 'EcoPath/Application/Contracts/Ports/UnitOfWork.ts';

// -- REPOSITORIES --
export type { UserRepository } from 'EcoPath/Domain/Household/UserRepository.ts';
export type { SmartMeterRepository } from 'EcoPath/Domain/Meters/SmartMeterRepository.ts';

// -- USECASE INPUT/OUTPUT --
export type { SaveUserInput } from 'EcoPath/Application/Household/SaveUser.ts';
export type { SaveSmartMeterInput } from 'EcoPath/Application/Meters/SaveSmartMeter.ts';