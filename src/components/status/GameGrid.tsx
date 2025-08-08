import { useCallback, useEffect, useRef } from "react";
import useSound from "use-sound";
import { Tile as TileModel } from "../../models/tile";
import styles from "../../styles/GameGrid.module.css";
import Tile from "../status/Tile";
import { useGame } from "../../context/GameContext";
import MobileSwiper, { SwipeInput } from "../status/MobileSwiper";
import LosingSplash from "../status/LosingSplash";
import WinningSplash from "../status/WinningSplash";
import { useWord } from "../../context/WordContext";
import whooshSound from "../../assets/sounds/screen-whoosh-sound.mp3";
import game from "../../constants/game";

/**
 * GameGrid
 * - Main play surface: handles keyboard/swipe input
 * - Renders cells/tiles and triggers move/cleanup/create animations
 */
export default function GameGrid(): React.JSX.Element {
  const { getTiles, moveTiles, status, dispatch } = useGame();
  const [playWhooshSound] = useSound(whooshSound);

  const finalizeMove = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: "CLEAN_UP" });
      setTimeout(() => {
        dispatch({
          type: "CREATE_TILE",
          tile: { value: "A", justCreated: true },
        });
      }, 20);
    }, game.MOVE_ANIMATION_DURATION);
  }, [dispatch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.code) {
        case "ArrowUp":
          moveTiles("MOVE_UP");
          finalizeMove();
          break;
        case "ArrowDown":
          moveTiles("MOVE_DOWN");
          finalizeMove();
          break;
        case "ArrowLeft":
          moveTiles("MOVE_LEFT");
          finalizeMove();
          break;
        case "ArrowRight":
          moveTiles("MOVE_RIGHT");
          finalizeMove();
          break;
      }
    },
    [moveTiles, finalizeMove]
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      playWhooshSound();

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        moveTiles(deltaX > 0 ? "MOVE_RIGHT" : "MOVE_LEFT");
      } else {
        moveTiles(deltaY > 0 ? "MOVE_DOWN" : "MOVE_UP");
      }

      finalizeMove();
    },
    [moveTiles, finalizeMove, playWhooshSound]
  );

  const renderGrid = () => {
    const cells: React.JSX.Element[] = [];
    for (let i = 0; i < 16; i += 1)
      cells.push(<div className={styles.cell} key={i} />);
    return cells;
  };

  const renderTiles = () =>
    getTiles().map((tile: TileModel) => (
      <Tile tileID={tile.id} isInTarget={false} key={tile.id} {...tile} />
    ));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className={styles.board}>
        {status === "LOST" && <LosingSplash />}
        {status === "WON" && <WinningSplash />}
        <div className={styles.tiles}>{renderTiles()}</div>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </MobileSwiper>
  );
}
