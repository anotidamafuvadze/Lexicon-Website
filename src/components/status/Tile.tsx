import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import '../../styles/Tile.css';
// import colors from "@/constants/colors";
import game from "../../constants/game";
import { useGame } from "../../context/GameContext";
import { useWord } from "../../context/WordContext";
// import useLayouts from "@/constants/layouts";
import usePreviousProps from "../../hooks/usePreviousProps";
import useSound from "use-sound";
import popSound from '../../assets/sounds/button-pop-sound.mp3'
import lockSound from '../../assets/sounds/tile-lock-sound.mp3'
import unlockSound from '../../assets/sounds/tile-unlock-sound.mp3'
import tileGrowSound from '../../assets/sounds/tile-grow-sound.mp3'

type TileProps = {
  position: [number, number];
  value: string;
  tileID: string;
  justCreated?: boolean;
  isInTarget: boolean; 
};

export default function Tile({ tileID, position, value, justCreated = false }: TileProps) {
  // const layouts = useLayouts();
  const { targetWord } = useWord();
  const { status, gameWinningTiles, popTile, pops, lockTile, unlockTile, isAbleToLock } = useGame();
  const [playPopSound] = useSound(popSound);
  const [playLockSound] = useSound(lockSound);
  const [playUnlockSound] = useSound(unlockSound);
  const [playTileGrowSound, { stop }] = useSound(tileGrowSound); 

  const [scale, setScale] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdStartRef = useRef<number | null>(null);
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue !== value && previousValue != null;
  const targetCharArray = Array.from(targetWord);
  const tileInTarget = targetCharArray.includes(value);

  const isWideScreen = useMediaQuery({ minWidth: 512 });
  const containerWidth = isWideScreen ? game.CONTAINER_WIDTH_DESKTOP  : game.CONTAINER_WIDTH_MOBILE;
  const tileSize = containerWidth / game.TILE_COUNT_PER_DIMENSION;

  const left = position[0] * (tileSize );
  const top = position[1] * (tileSize );

  

  // === Interactions ===
  const handleLongPressStart = () => {
    if (pops <= 0) return;
    holdStartRef.current = Date.now();
    setScale(1.25);
    playTileGrowSound();
  };

  const handleLongPressEnd = () => {
    stop();
    if (pops <= 0) return;
    const holdDuration = holdStartRef.current != null ? Date.now() - holdStartRef.current : 0;
    holdStartRef.current = null;

    setScale(1);

    if (holdDuration >= game.POP_ANIMATION_DURATION) {
      if (isLocked) {
        unlockTile();
        setIsLocked(false);
      }
      playPopSound();
      popTile(tileID);
    }
  };

  const handleDoubleClick = () => {
    if (isLocked) {
      unlockTile();
      playUnlockSound()
      setIsLocked(false);
    } else if (isAbleToLock.current) {
      lockTile(tileID);
      setIsLocked(true);
      playLockSound()
    }
  };

  // === Animations ===
  useEffect(() => {
    if (justCreated || hasChanged) {
      setScale(1.2);
      setTimeout(() => setScale(1), game.MERGE_ANIMATION_DURATION);
      if (hasChanged){
        playPopSound()
      }
    }
  }, [hasChanged, justCreated]);

  useEffect(() => {
    if (status === "WON" && tileID && gameWinningTiles?.includes(tileID)) {
      setPulse(true);
    }
  }, [status, tileID, gameWinningTiles]);

  useEffect(() => {
    if (isLocked) {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 1 ? 0 : p + 0.02));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLocked]);

  // const borderColor = isLocked
  //   ? tileInTarget
  //     ? colors.WHITE
  //     : colors.LOCKED_TILE_BORDER
  //   : colors.BLACK;

  const borderColor = "black";

  const style = {
    left,
    top,
    transform: `scale(${scale})`,
    backgroundColor: tileInTarget ? "rgb(115, 121, 105)" : "rgb(89, 83, 74)",
    boxShadow: `inset 0 0 0 4px ${borderColor}`,
    animation: pulse ? "pulse 1s infinite" : "none",
  } as React.CSSProperties;

  return (
    <div
      className="tile"
      style={style}
      role="button"
      aria-label={`Tile with letter ${value}${isLocked ? ", locked" : ""}`}
      aria-hidden="false"
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onDoubleClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}
