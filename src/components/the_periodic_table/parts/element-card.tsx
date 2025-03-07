"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import type { Element } from "../types"
import { Beaker, Zap, Droplet, Wind } from "lucide-react"

// MUI Imports
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

interface ElementCardProps {
  element: Element
  onClick: (element: Element) => void
  backgroundColor: string
}

export function ElementCard({ element, onClick, backgroundColor }: ElementCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStateIcon = () => {
    const boilingPoint = element.boilingPoint || 0
    const meltingPoint = element.meltingPoint || 0
    const roomTemperature = 20

    if (roomTemperature > boilingPoint) {
      return <Wind className="absolute top-1 right-1 w-4 h-4 text-blue-400" />
    } else if (roomTemperature > meltingPoint) {
      return <Droplet className="absolute top-1 right-1 w-4 h-4 text-blue-400" />
    } else {
      return <Zap className="absolute top-1 right-1 w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <StyledCard
      whileHover={{ scale: 1.05, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx = {{backgroundColor: backgroundColor}}
    >
      <CardContent
        sx={{
          p: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        {/* 原子番号 */}
        <Typography
          variant="caption"
          sx={{ position: "absolute",color: "#fff", top: 4, left: 4, fontWeight: "bold", fontSize: "0.75rem" }}
        >
          {element.atomicNumber}
        </Typography>

        {/* 状態アイコン */}
        {getStateIcon()}

        {/* 元素記号 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to bottom right, white, lightgray)"
          }}
        >
          {element.symbol}
        </Typography>

        {/* 名前 */}
        <Typography
          variant="caption"
          sx={{whiteSpace: "nowrap", mt: 0.5, color: "rgba(255, 255, 255, 0.8)" }}
        >
          {element.name}
        </Typography>
      </CardContent>

      {/* ホバーエフェクト */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Beaker className="w-8 h-8 text-white animate-pulse" />
        </motion.div>
      )}
    </StyledCard>
  )
}

// MUIスタイルカスタマイズ
const StyledCard = styled(motion(Card))(({ theme }) => ({
  aspectRatio: "1 / 1",
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius * 2,
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    boxShadow: "0 0 15px rgba(255,255,255,0.3)"
  }
}))
