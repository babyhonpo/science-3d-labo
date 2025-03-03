import type { Element, Compound, Reaction } from "./types"

export const compounds: Compound[] = [
  {
    formula: "H2",
    name: "水素ガス",
    elements: ["H", "H"],
    description: "単体の水素分子",
  },
  {
    formula: "H2O",
    name: "水",
    elements: ["H", "O"],
    description: "水の生成",
  },
  {
    formula: "CO2",
    name: "二酸化炭素",
    elements: ["C", "O"],
    description: "燃焼反応で生成",
  },
  // 他の化合物も同様に定義...
]

export const reactions: Reaction[] = [
  {
    reactants: ["H2O"],
    products: ["H2", "O2"],
    type: "電気分解",
    description: "水の電気分解",
    note: "水の分解",
  },
  {
    reactants: ["CH4"],
    products: ["CO2", "H2O"],
    type: "燃焼",
    description: "メタンの燃焼",
    note: "燃焼反応",
  },
  // 他の反応も同様に定義...
]

export const elements: Element[] = [
  {
    symbol: "H",
    name: "水素",
    number: 1,
    group: "nonmetal",
    description: "最も軽い元素",
    emoji: "💧",
    funFact: "宇宙で最も豊富な元素です！",
    commonUse: "クリーンエネルギーとして注目されています",
    compounds: compounds.filter((c) => c.elements.includes("H")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => compounds.find((c) => c.formula === reactant)?.elements.includes("H")) ||
        r.products.some((product) => compounds.find((c) => c.formula === product)?.elements.includes("H")),
    ),
  },
  // 他の元素も同様に定義...
]

