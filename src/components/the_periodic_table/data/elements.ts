import type { Element } from "../types"
import { periodicTableData } from "./periodic-table-data"
import { compounds } from "./compounds"
import { reactions } from "./reactions"

// 元素ごとの追加情報
const elementDetails: Partial<Record<string, Pick<Element, "description" | "compounds" | "reactions">>> = {
  H: {
    description: "最も軽い元素で、宇宙で最も豊富に存在する",
    compounds: compounds.filter((c) => c.elements.includes("H")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("H")) || r.products.some((product) => product.includes("H")),
    ),
  },
  O: {
    description: "生命に不可欠な元素で、地球の大気の主成分",
    compounds: compounds.filter((c) => c.elements.includes("O")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("O")) || r.products.some((product) => product.includes("O")),
    ),
  },
  Fe: {
    description: "最も一般的な金属元素の一つ",
    compounds: compounds.filter((c) => c.elements.includes("Fe")),
    reactions: reactions.filter(
      (r) =>
        r.reactants.some((reactant) => reactant.includes("Fe")) || r.products.some((product) => product.includes("Fe")),
    ),
  },
  // 他の元素の詳細情報も同様に追加...
}

// 基本データと詳細情報を結合
export const elements: Element[] = periodicTableData.map((element) => ({
  ...element,
  ...elementDetails[element.symbol],
}))

