"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Atom, Beaker, Zap, Heart, Sun, Moon } from "lucide-react"
import { elements } from "./data/elements"
import type { Element, ReactionType } from "./types"
import { ElementCard } from "./parts/element-card"
import { getCategoryName, getReactionTypeName } from "./utils/element-helpers"
import { Switch } from "@/components/ui/switch"
import React from "react"

export default function PeriodicTable() {
  const { toast } = useToast()
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [reactionFilter, setReactionFilter] = useState<ReactionType | "all">("all")
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleElementClick = (element: Element) => {
    setSelectedElement(element)
    toast({
      title: `${element.name}を選択しました！`,
      description: `原子番号: ${element.atomicNumber}、分類: ${getCategoryName(element.category)}`,
    })
  }

  const filteredElements = elements.filter(
    (element) => reactionFilter === "all" || element.reactions?.some((reaction) => reaction.type === reactionFilter),
  )

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-100 to-purple-100"}`}
    >
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Sun className="h-4 w-4 text-yellow-500" />
        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
        <Moon className="h-4 w-4 text-blue-500" />
      </div>
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        <div className="mb-6 md:mb-8 text-center">
          <h1
            className={`text-3xl md:text-5xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"} transition-colors duration-300`}
          >
            <Atom className="inline-block mr-2 animate-spin-slow" />
            元素の魔法世界
          </h1>
          <p
            className={`text-base md:text-xl mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}
          >
            クリックして元素の秘密を解き明かそう！
          </p>

          <Select value={reactionFilter} onValueChange={(value: ReactionType | "all") => setReactionFilter(value)}>
            <SelectTrigger className="w-full md:w-[250px] mx-auto">
              <SelectValue placeholder="反応タイプで絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての反応</SelectItem>
              <SelectItem value="電気分解">電気分解</SelectItem>
              <SelectItem value="燃焼">燃焼</SelectItem>
              <SelectItem value="加熱">加熱</SelectItem>
              <SelectItem value="光合成">光合成</SelectItem>
              <SelectItem value="酸化">酸化</SelectItem>
              <SelectItem value="火花">火花</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-9 md:grid-cols-18 gap-1 md:gap-2">
          {filteredElements.map((element) =>
            element.category !== "placeholder" ? (
              <ElementCard key={element.symbol} element={element} onClick={handleElementClick} />
            ) : (
              <div key={`placeholder-${element.atomicNumber}`} className="w-full h-full aspect-square" />
            ),
          )}
        </div>
      </div>

      <Dialog open={!!selectedElement} onOpenChange={() => setSelectedElement(null)}>
        {selectedElement && (
          <DialogContent
            className={`${isDarkMode ? "bg-gray-900" : "bg-white"} border-none text-white max-w-full md:max-w-2xl rounded-xl backdrop-blur-lg bg-opacity-90`}
          >
            <DialogHeader>
              <DialogTitle
                className={`text-2xl md:text-3xl flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
              >
                {selectedElement.name}
                <Badge variant="outline" className="ml-2 text-base md:text-lg">
                  {selectedElement.symbol}
                </Badge>
              </DialogTitle>
              <DialogDescription className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}>
                原子番号: {selectedElement.atomicNumber} | 分類: {getCategoryName(selectedElement.category)}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">基本情報</TabsTrigger>
                <TabsTrigger value="compounds">化合物</TabsTrigger>
                <TabsTrigger value="reactions">反応</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="flex items-start gap-2">
                  <Beaker className={`w-5 h-5 md:w-6 md:h-6 mt-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <div>
                    <div
                      className={`font-semibold text-lg md:text-xl mb-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      特徴
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}>
                      {selectedElement.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Zap className={`w-5 h-5 md:w-6 md:h-6 mt-1 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                  <div>
                    <div
                      className={`font-semibold text-lg md:text-xl mb-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      おもしろ情報
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}>
                      {selectedElement.funFact}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className={`w-5 h-5 md:w-6 md:h-6 mt-1 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`} />
                  <div>
                    <div
                      className={`font-semibold text-lg md:text-xl mb-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      主な用途
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}>
                      {selectedElement.commonUse}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compounds" className="space-y-4">
                {selectedElement.compounds?.map((compound) => (
                  <div
                    key={compound.formula}
                    className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-3 md:p-4`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                      <h3 className={`font-bold text-lg md:text-xl ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {compound.name}
                      </h3>
                      <Badge variant="outline">{compound.formula}</Badge>
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}>
                      {compound.description}
                    </p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="reactions" className="space-y-4">
                {selectedElement.reactions?.map((reaction, index) => (
                  <div key={index} className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-3 md:p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                      <h3 className={`font-bold text-lg md:text-xl ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {getReactionTypeName(reaction.type)}
                      </h3>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg`}
                    >
                      <span>{reaction.reactants.join(" + ")}</span>
                      <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{reaction.products.join(" + ")}</span>
                    </div>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-base md:text-lg mt-2`}>
                      {reaction.note}
                    </p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>

      <Toaster />
    </div>
  )
}

