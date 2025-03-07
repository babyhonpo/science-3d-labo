import type { ElementCategory, ReactionType } from "../types"
interface Elements { 
    nonmetal: string,
    nobleGas: string,
    alkaliMetal: string,
    alkalineEarth: string,
    metalloid: string,
    postTransitionMetal: string,
    transitionMetal: string,
    halogen: string,
    lanthanide: string,
    actinide: string,
    unknown: string,
    placeholder: string,
}

export function getCategoryName(category: ElementCategory): string {
  const categories: Elements = {
    nonmetal: "非金属",
    nobleGas: "希ガス",
    alkaliMetal: "アルカリ金属",
    alkalineEarth: "アルカリ土類金属",
    metalloid: "半金属",
    postTransitionMetal: "後遷移金属",
    transitionMetal: "遷移金属",
    halogen: "ハロゲン",
    lanthanide: "ランタノイド",
    actinide: "アクチノイド",
    unknown: "未確定",
    placeholder: "空欄",
  }
  return categories[category]
}

interface ChemicalReaction {
  electrolysis: string,
  combustion: string,
  heating: string,
  photosynthesis: string,
  oxidation: string,
  spark: string,
}

export function getReactionTypeName(type: ReactionType): string {
  const types: ChemicalReaction = {
    electrolysis: "電気分解反応",
    combustion: "燃焼反応",
    heating: "熱分解反応",
    photosynthesis: "光合成反応",
    oxidation: "酸化反応",
    spark: "爆発的反応",
  }
  return types[type]
}
