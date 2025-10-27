import { WasteType } from "EcoPath/Domain/mod.ts"

export const WasteCarbonFactors: Record<WasteType, number> = {
    [WasteType.GreenGlass]: 0.35,
    [WasteType.WhiteGlass]: 0.35,
    [WasteType.Plastic]: 0.10,
    [WasteType.Metal]: 0.20,
    [WasteType.Cardboard]: 0.06,
    [WasteType.Paper]: 0.05,
    [WasteType.GeneralWaste]: 0.70,
    [WasteType.BioWaste]: 0.07
}