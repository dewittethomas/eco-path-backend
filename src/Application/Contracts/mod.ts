export type { UnitOfWork } from 'EcoPath/Application/Contracts/Ports/UnitOfWork.ts';

// -- REPOSITORIES --
export type { UserRepository } from 'EcoPath/Domain/Household/UserRepository.ts';
export type { SmartMeterRepository } from 'EcoPath/Domain/Meters/SmartMeterRepository.ts';
export type { WasteScanRepository } from 'EcoPath/Domain/Waste/WasteScanRepository.ts';
export type { ClassificationResultRepository } from 'EcoPath/Domain/Waste/ClassificationResultRepository.ts';
export type { EcologicalFootprintRecordRepository } from 'EcoPath/Domain/EcologicalFootprints/EcologicalFootprintRecordRepository.ts';

// -- USECASE INPUT/OUTPUT --
export type { SaveUserInput } from 'EcoPath/Application/Household/SaveUser.ts';
export type { SaveSmartMeterInput } from 'EcoPath/Application/Meters/SaveSmartMeter.ts';
export type { SaveWasteScanInput } from 'EcoPath/Application/Waste/SaveWasteScan.ts';
export type { SaveClassificationResultInput } from 'EcoPath/Application/Waste/SaveClassificationResult.ts';