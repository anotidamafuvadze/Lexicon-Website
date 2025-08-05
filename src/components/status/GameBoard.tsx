import React from 'react';

function GameBoard({
  title,
  count,
  style,
  styleAdjust,
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