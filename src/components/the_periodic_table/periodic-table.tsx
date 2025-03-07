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
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

import { Science, ElectricBolt, Favorite, BubbleChart } from "@mui/icons-material";

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [reactionFilter, setReactionFilter] = useState<ReactionType | "all">("all");

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const filteredElements = elements.filter(
    (element) => reactionFilter === "all" || element.reactions?.some((reaction) => reaction.type === reactionFilter)
  );

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #1f2937, #374151)",
      }}
    >
      <Box textAlign="center" py={4}>
        <Typography variant="h3" fontWeight="bold" color="#fff">
          <Science sx={{ mr: 1, animation: "spin 4s linear infinite" }} />
          元素の魔法世界
        </Typography>
        <Typography variant="subtitle1" color="#fff">
          クリックして元素の秘密を解き明かそう！
        </Typography>

        {/* フィルターセレクト */}
        <FormControl sx={{ mt: 2, width: "250px", "& .MuiOutlinedInput-root": { "&:hover fieldset": { borderColor: "#fff" } } }}>
          <InputLabel  id="demo-simple-select-label" sx={{ color: "#fff" }}>反応タイプ</InputLabel>
          <Select labelId="demo-simple-select-label" label="反応タイプ" sx={{ color: "#fff" }}  value={reactionFilter} onChange={(e) => setReactionFilter(e.target.value as ReactionType | "all")}>
            {/* <MenuItem value="all">すべての反応</MenuItem> */}
            <MenuItem value="">選択してください</MenuItem>
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
      <Box display="grid" gridTemplateColumns={{
          xs: "repeat(5, 1fr)", // スマホ
          sm: "repeat(7, 1fr)", // タブレット
          md: "repeat(9, 1fr)", // PC
        }} gap={1} px={2}>
        {filteredElements.map((element) =>
          element.category !== "placeholder" ? (
            <ElementCard key={element.symbol} backgroundColor={element.color} element={element} onClick={handleElementClick} />
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