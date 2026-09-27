import React from "react";

const typeClass = { prefix: "rune-prefix", root: "rune-root", suffix: "rune-suffix" };
export const typeLabel = { prefix: "Catalyst", root: "Element", suffix: "Seal" };

export const MorphemeTile = ({ reagent, onClick, draggable = true, size = "md" }) => {
  const sizes = { sm: "text-[11px] px-2 py-1", md: "text-sm md:text-base", lg: "text-base md:text-lg px-4 py-2" };
  return (
    <button
      type="button"
      data-testid={`morpheme-tile-${reagent.id}`}
      className={`rune ${typeClass[reagent.type]} ${sizes[size]}`}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/reagent", reagent.id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      onClick={() => onClick && onClick(reagent)}
      title={`${typeLabel[reagent.type]} · ${reagent.meaning}`}
    >
      {reagent.glyph}
    </button>
  );
};
