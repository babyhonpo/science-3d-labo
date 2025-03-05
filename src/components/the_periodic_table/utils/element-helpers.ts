import type { ElementCategory, ReactionType } from "../types"

export function getCategoryName(category: ElementCategory): string {
  const categories: Record<ElementCategory, string> = {
    nonmetal: "非金属",
    "noble-gas": "希ガス",
    "alkali-metal": "アルカリ金属",
    "alkaline-earth": "アルカリ土類金属",
    metalloid: "半金属",
    "post-transition-metal": "後遷移金属",
    "transition-metal": "遷移金属",
    halogen: "ハロゲン",
    lanthanide: "ランタノイド",
    actinide: "アクチノイド",
    unknown: "未確定",
    placeholder: "空欄",
  }
  return categories[category]
}

export function getReactionTypeName(type: ReactionType): string {
  const types: Record<ReactionType, string> = {
    電気分解: "電気分解反応",
    燃焼: "燃焼反応",
    加熱: "熱分解反応",
    光合成: "光合成反応",
    酸化: "酸化反応",
    火花: "爆発的反応",
  }
  return types[type]
}

export function getCategoryColor(category: ElementCategory): string {
  const colors: Record<ElementCategory, string> = {
    nonmetal: "bg-blue-500/20 hover:bg-blue-500/30",
    "noble-gas": "bg-purple-500/20 hover:bg-purple-500/30",
    "alkali-metal": "bg-red-500/20 hover:bg-red-500/30",
    "alkaline-earth": "bg-orange-500/20 hover:bg-orange-500/30",
    metalloid: "bg-teal-500/20 hover:bg-teal-500/30",
    "post-transition-metal": "bg-green-500/20 hover:bg-green-500/30",
    "transition-metal": "bg-yellow-500/20 hover:bg-yellow-500/30",
    halogen: "bg-indigo-500/20 hover:bg-indigo-500/30",
    lanthanide: "bg-pink-500/20 hover:bg-pink-500/30",
    actinide: "bg-rose-500/20 hover:bg-rose-500/30",
    unknown: "bg-slate-500/20 hover:bg-slate-500/30",
    placeholder: "bg-transparent",
  }
  return colors[category]
}

