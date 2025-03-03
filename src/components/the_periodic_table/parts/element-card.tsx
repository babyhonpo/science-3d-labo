"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Element } from "../types"
import { getCategoryColor } from "../utils/element-helpers"
import { Beaker, Zap, Droplet, Wind } from "lucide-react"
import React from "react"

interface ElementCardProps {
  element: Element
  onClick: (element: Element) => void
}

export function ElementCard({ element, onClick }: ElementCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStateIcon = () => {
    const boilingPoint = element.boilingPoint || 0
    const meltingPoint = element.meltingPoint || 0
    const roomTemperature = 20 // 室温を20℃と仮定

    if (roomTemperature > boilingPoint) {
      return <Wind className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 text-blue-400" />
    } else if (roomTemperature > meltingPoint) {
      return <Droplet className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 text-blue-400" />
    } else {
      return <Zap className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
    }
  }

  return (
    <motion.div
      className={`relative w-full h-full aspect-square rounded-xl shadow-lg cursor-pointer overflow-hidden 
                  backdrop-blur-md bg-opacity-20 ${getCategoryColor(element.category)}
                  border border-white/10 transition-all duration-300 ease-in-out`}
      whileHover={{ scale: 1.05, rotate: 3, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-1 left-1 text-[0.6rem] md:text-xs font-semibold">{element.atomicNumber}</div>
      {getStateIcon()}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-lg md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
          {element.symbol}
        </div>
        <div className="text-[0.6rem] md:text-xs text-center mt-1 text-gray-200">{element.name}</div>
      </div>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Beaker className="w-6 h-6 md:w-8 md:h-8 text-white animate-pulse" />
        </motion.div>
      )}
    </motion.div>
  )
}

