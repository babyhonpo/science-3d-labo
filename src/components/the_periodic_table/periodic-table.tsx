// filepath: /c:/sagyo/honpo/src/components/the_periodic_table/periodic-table.tsx

import React, { useState } from "react";
import { elements } from "./data/elements";
import type { Element, ReactionType } from "./types";
import { ElementCard } from "./parts/element-card";
import { getCategoryName } from "./utils/element-helpers";

// === MUI Components ===
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Select,
  MenuItem,
  Switch,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

import { Brightness4, Brightness7, Science, ElectricBolt, Favorite, BubbleChart } from "@mui/icons-material";

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [reactionFilter, setReactionFilter] = useState<ReactionType | "all">("all");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const filteredElements = elements.filter(
    (element) => reactionFilter === "all" || element.reactions?.some((reaction) => reaction.type === reactionFilter)
  );

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Box
      minHeight="100vh"
      sx={{
        transition: "background-color 0.3s ease-in-out",
        background: isDarkMode
          ? "linear-gradient(to bottom right, #1f2937, #374151)"
          : "linear-gradient(to bottom right, #e0f7fa, #ede7f6)",
      }}
    >
      {/* ダークモード切り替え */}
      <Box position="absolute" top={16} right={16} display="flex" alignItems="center" gap={1}>
        <Brightness7 color="warning" />
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
        <Brightness4 color="primary" />
      </Box>

      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold" color={isDarkMode ? "white" : "text.primary"}>
          <Science sx={{ mr: 1, animation: "spin 4s linear infinite" }} />
          元素の魔法世界
        </Typography>
        <Typography variant="subtitle1" color={isDarkMode ? "grey.400" : "text.secondary"}>
          クリックして元素の秘密を解き明かそう！
        </Typography>

        {/* フィルターセレクト */}
        <FormControl sx={{ mt: 2, width: "250px" }}>
          <InputLabel>反応タイプで絞り込み</InputLabel>
          <Select value={reactionFilter} onChange={(e) => setReactionFilter(e.target.value as ReactionType | "all")}>
            <MenuItem value="all">すべての反応</MenuItem>
            <MenuItem value="電気分解">電気分解</MenuItem>
            <MenuItem value="燃焼">燃焼</MenuItem>
            <MenuItem value="加熱">加熱</MenuItem>
            <MenuItem value="光合成">光合成</MenuItem>
            <MenuItem value="酸化">酸化</MenuItem>
            <MenuItem value="火花">火花</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 元素一覧 */}
      <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gap={1} px={2}>
        {filteredElements.map((element) =>
          element.category !== "placeholder" ? (
            <ElementCard key={element.symbol} element={element} onClick={handleElementClick} />
          ) : (
            <Box key={`placeholder-${element.atomicNumber}`} />
          )
        )}
      </Box>

      {/* 元素詳細ダイアログ */}
      {selectedElement && (
        <Dialog open={!!selectedElement} onClose={() => setSelectedElement(null)}>
          <DialogTitle>
            {selectedElement.name} ({selectedElement.symbol})
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              原子番号: {selectedElement.atomicNumber} | 分類: {getCategoryName(selectedElement.category)}
            </Typography>

            <Box mt={2}>
              <Typography display="flex" alignItems="center" gap={1} variant="h6">
                <BubbleChart color="primary" /> 特徴
              </Typography>
              <Typography>{selectedElement.description}</Typography>
            </Box>

            <Box mt={2}>
              <Typography display="flex" alignItems="center" gap={1} variant="h6">
                <ElectricBolt color="warning" /> おもしろ情報
              </Typography>
              <Typography>{selectedElement.funFact}</Typography>
            </Box>

            <Box mt={2}>
              <Typography display="flex" alignItems="center" gap={1} variant="h6">
                <Favorite color="error" /> 主な用途
              </Typography>
              <Typography>{selectedElement.commonUse}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedElement(null)}>閉じる</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
