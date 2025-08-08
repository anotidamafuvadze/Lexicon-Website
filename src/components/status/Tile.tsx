import React, { useEffect, useRef, useState } from "react";
import "../../styles/Tile.css";
import game, { getTilePixelPosition } from "../../constants/game";
import { useGame } from "../../context/GameContext";
import { useWord } from "../../context/WordContext";
import usePreviousProps from "../../hooks/usePreviousProps";
import useSound from "use-sound";
import popSound from "../../assets/sounds/button-pop-sound.mp3";
import lockSound from "../../assets/sounds/tile-lock-sound.mp3";
import unlockSound from "../../assets/sounds/tile-unlock-sound.mp3";
import tileGrowSound from "../../assets/sounds/tile-grow-sound.mp3";

type TileProps = {
  position: [number, number];
  value: string;
  tileID: string;
  justCreated?: boolean;
  isInTarget: boolean;
};

/**
 * Tile
 * - Handles tile rendering, interactions (hold-to-pop, double-click lock), and small animations
 */
export default function Tile({
  tileID,
  position,
  value,
  justCreated = false,
}: TileProps) {
  const { targetWord } = useWord();
  const {
    status,
    gameWinningTiles,
    popTile,
    pops,
    lockTile,
    unlockTile,
    isAbleToLock,
  } = useGame();
  const [playPopSound] = useSound(popSound);
  const [playLockSound] = useSound(lockSound);
  const [playUnlockSound] = useSound(unlockSound);
  const [playTileGrowSound, { stop }] = useSound(tileGrowSound);

  const [scale, setScale] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const holdStartRef = useRef<number | null>(null);
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue !== value && previousValue != null;
  const targetCharArray = Array.from(targetWord);
  const tileInTarget = targetCharArray.includes(value);
  const [isWinningTile, setIsWinningTile] = useState(false);
  const animationRef = useRef<number | null>(null);

  // === Interactions ===
  const handleLongPressStart = () => {
    if (pops <= 0) return;
    playTileGrowSound();
    holdStartRef.current = performance.now();
    growScale();
  };

  const growScale = () => {
    animationRef.current = requestAnimationFrame((timestamp) => {
      if (holdStartRef.current != null) {
        const elapsed = timestamp - holdStartRef.current;
        const duration = game.POP_ANIMATION_DURATION;
        const maxScale = 1.25;
        const newScale = Math.min(
          1 + (elapsed / duration) * (maxScale - 1),
          maxScale
        );
        setScale(newScale);

        // Only continue animation if we're still in a long press
        if (holdStartRef.current !== null) {
          growScale();
        }
      }
    });
  };

  const handleLongPressEnd = () => {
    stop();

    // Save the start time before clearing it
    const pressStartTime = holdStartRef.current;
    holdStartRef.current = null;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    setScale(1);

    if (pressStartTime) {
      const holdDuration = performance.now() - pressStartTime;

      if (holdDuration >= game.POP_ANIMATION_DURATION) {
        if (isLocked) {
          unlockTile();
          setIsLocked(false);
        }
        playPopSound();
        popTile(tileID);
      }
    }
  };

  const handleDoubleClick = () => {
    if (isLocked) {
      unlockTile();
      playUnlockSound();
      setIsLocked(false);
    } else if (isAbleToLock.current) {
      lockTile(tileID);
      setIsLocked(true);
      playLockSound();
    }
  };

  // === Animations ===
  useEffect(() => {
    if (status === "WON" && gameWinningTiles?.includes(tileID)) {
      setIsWinningTile(true);
    }
  }, [status, gameWinningTiles, tileID]);

  useEffect(() => {
    if (justCreated || hasChanged) {
      setScale(1.2);
      setTimeout(() => setScale(1), game.MERGE_ANIMATION_DURATION);
      if (hasChanged) {
        playPopSound();
      }
    }
  }, [hasChanged, justCreated]);

  let borderColor = "black";
  if (isLocked) {
    borderColor = "white";
  }

  const style = {
    left: getTilePixelPosition(position[0], true),
    top: getTilePixelPosition(position[1], false),
    transform: `scale(${scale})`,
    backgroundColor: tileInTarget ? "rgb(115, 121, 105)" : "rgb(89, 83, 74)",
    boxShadow: `inset 0 0 0 ${isLocked ? `8px` : `4px`} ${borderColor}`,
  } as React.CSSProperties;

  return (
    <div
      className={`tile ${isWinningTile ? "win-animation" : ""}`}
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
