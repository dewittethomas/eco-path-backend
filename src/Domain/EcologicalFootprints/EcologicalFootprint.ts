import { Guard } from "@domaincrafters/std";
import { WasteType } from "EcoPath/Domain/mod.ts";

export class EcologicalFootprint {
    private readonly _totalGasUsage: number; // in m³
    private readonly _totalElectricityUsage: number; // in kWh
    private readonly _totalWaste: Map<WasteType, number>; // in <WasteType, kg>

    private constructor(
        totalGasUsage: number,
        totalElectricityUsage: number,
        totalWaste: Map<WasteType, number>
    ) {
        this._totalGasUsage = totalGasUsage;
        this._totalElectricityUsage = totalElectricityUsage;
        this._totalWaste = totalWaste;
    }

    public static create(
        totalGasUsage: number,
        totalElectricityUsage: number,
        totalWasteWeight: number
    ): EcologicalFootprint {
        //const ecologicalFootprint = new EcologicalFootprint(totalGasUsage, totalElectricityUsage, totalWasteWeight);
        //ecologicalFootprint.validateState();
        return null as unknown as EcologicalFootprint;
    }

    public validateState() {
        Guard.check(this._totalGasUsage, 'Gas usage should be a positive number').againstEmpty().againstNegative();
        Guard.check(this._totalElectricityUsage, 'Electricity usage should be a positive number').againstEmpty().againstNegative();
        this.ensureWasteIsPositive();
    }

    public calculateCarbonEquivalent(): number {
        const gasFactor = 2.2;
        const electricityFactor = 0.55;
        
        return 0;
    }

    private ensureWasteIsPositive() {
        for (const [type, weight] of this._totalWaste.entries()) {
            Guard.check(weight, `Waste weight must be a positive number for ${type}`).againstEmpty().againstNegative();
        }
    }

    get totalGasUsage(): number {
        return this._totalGasUsage;
    }

    get totalElectricityUsage(): number {
        return this._totalElectricityUsage;
    }

    get totalWaste(): Map<WasteType, number> {
        return this._totalWaste;
    }
}