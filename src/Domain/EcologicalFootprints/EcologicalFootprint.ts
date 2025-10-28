import { Guard } from "@domaincrafters/std";
import { ExtraGuard, WasteType } from "EcoPath/Domain/mod.ts";
import { WasteCarbonFactors } from "../Waste/WasteCarbonFactors.ts";

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
        totalWaste: Map<WasteType, number>
    ): EcologicalFootprint {
        const ecologicalFootprint = new EcologicalFootprint(totalGasUsage, totalElectricityUsage, totalWaste);
        ecologicalFootprint.validateState();
        return ecologicalFootprint;
    }

    public validateState() {
        Guard.check(this._totalGasUsage, 'totalGasUsage').againstNullOrUndefined().againstNegative();
        Guard.check(this._totalElectricityUsage, 'totalElectricityUsage').againstNullOrUndefined().againstNegative();
        this.ensureWasteIsPositive();
    }

    public calculateCarbonEquivalent(): number {
        const gasFactor = 2.2;
        const electricityFactor = 0.55;
        let wasteEquivalent = 0;
        
        for (const [type, weight] of this._totalWaste.entries()) {
            const factor = WasteCarbonFactors[type];
            if (factor !== undefined) {
                wasteEquivalent += weight * factor;
            }
        }

        const totalEquivalent = (this._totalGasUsage * gasFactor)
            + (this._totalElectricityUsage * electricityFactor)
            + wasteEquivalent;
        
        return totalEquivalent;
    }

    private ensureWasteIsPositive() {
        for (const [_, weight] of this._totalWaste.entries()) {
            Guard.check(weight, `weight`).againstNullOrUndefined().againstNegative();
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