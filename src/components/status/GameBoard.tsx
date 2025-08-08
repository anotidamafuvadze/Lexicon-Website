import React from "react";

/**
 * GameBoard
 * - Displays a board section with a title and count
 * - Accepts style classes and inline width adjustments
 */
function GameBoard({
  title,
  count,
  style,
  width,
}: {
  title?: string;
  count?: string;
  style: string;
  styleAdjust?: string;
  width: React.CSSProperties;
}): React.JSX.Element {
  return (
    <div className={style} style={width}>
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  );
}

export default GameBoard;
