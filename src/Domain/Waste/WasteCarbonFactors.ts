import { WasteType } from "EcoPath/Domain/mod.ts"

export const WasteCarbonFactors: Record<WasteType, number> = {
    [WasteType.Glass]: 0.35,
    [WasteType.Plastic]: 0.10,
    [WasteType.Metal]: 0.20,
    [WasteType.PaperAndCardboard]: 0.06,
    [WasteType.GeneralWaste]: 0.70,
    [WasteType.BioWaste]: 0.07
}