export type { UnitOfWork } from 'EcoPath/Application/Contracts/Ports/UnitOfWork.ts';

// -- REPOSITORIES --
export type { UserRepository } from 'EcoPath/Domain/Households/UserRepository.ts';
export type { SmartMeterRepository } from 'EcoPath/Domain/Meters/SmartMeterRepository.ts';
export type { WasteScanRepository } from 'EcoPath/Domain/Waste/WasteScanRepository.ts';
export type { ClassificationResultRepository } from 'EcoPath/Domain/Waste/ClassificationResultRepository.ts';
export type { CarbonFootprintRecordRepository } from 'EcoPath/Domain/CarbonFootprints/CarbonFootprintRecordRepository.ts';
export type { SensorReadingRepository } from 'EcoPath/Domain/Meters/SensorReadingRepository.ts';

// -- USECASE INPUT/OUTPUT --
export type { SaveUserInput } from 'EcoPath/Application/Households/SaveUser.ts';
export type { SaveSmartMeterInput } from 'EcoPath/Application/Meters/SaveSmartMeter.ts';
export type { SaveWasteScanInput } from 'EcoPath/Application/Waste/SaveWasteScan.ts';
export type { SaveClassificationResultInput } from 'EcoPath/Application/Waste/SaveClassificationResult.ts';

// -- QUERY INTERFACES -- 
export type { SensorReadingRecord } from 'EcoPath/Application/Contracts/Data/SensorReadingRecord.ts';
export type { GetSensorReadingsData, GetAverageSensorReadingsData, GetGroupedAverageSensorReadingsData, AllSensorReadingsBySmartMeterIdAndDateQuery, GroupedAverageRecord } from 'EcoPath/Application/Contracts/Ports/Queries.ts';