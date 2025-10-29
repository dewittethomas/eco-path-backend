import type { Repository } from '@domaincrafters/domain';
import { SmartMeter } from 'EcoPath/Domain/mod.ts';

export interface SmartMeterRepository extends Repository<SmartMeter> {
    findAll(): Promise<SmartMeter[]>;
}