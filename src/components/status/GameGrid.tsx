import { useCallback, useContext, useEffect, useRef } from "react";
import { Tile as TileModel } from "../../models/tile";
import styles from "../../styles/GameGrid.module.css";
import Tile from "../status/Tile";
import { useGame } from '../../context/GameContext'
import MobileSwiper, { SwipeInput } from '../status/MobileSwiper'
import LosingSplash from "../status/LosingSplash";
import WinningSplash from "../status//WinningSplash";
import { useWord } from "../../context/WordContext";
import whooshSound from '../../assets/sounds/screen-whoosh-sound.mp3'
import useSound from "use-sound";

export default function GameGrid() {
  const { getTiles, moveTiles, startNewGame, status } = useGame();
  const { targetWord } = useWord()
  const initialized = useRef(false);
  const [playWhooshSound] = useSound(whooshSound);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      playWhooshSound();
      // disables page scrolling with keyboard arrows
      e.preventDefault();

      switch (e.code) {
        case "ArrowUp":
          moveTiles("MOVE_UP");
          break;
        case "ArrowDown":
          moveTiles("MOVE_DOWN");
          break;
        case "ArrowLeft":
          moveTiles("MOVE_LEFT");
          break;
        case "ArrowRight":
          moveTiles("MOVE_RIGHT");
          break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      playWhooshSound();
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles("MOVE_RIGHT");
        } else {
          moveTiles("MOVE_LEFT");
        }
      } else {
        if (deltaY > 0) {
          moveTiles("MOVE_DOWN");
        } else {
          moveTiles("MOVE_UP");
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = () => {
    const cells: React.JSX.Element[] = [];
    const totalCellsCount = 16;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return getTiles().map((tile: TileModel) => (
      <Tile tileID={tile.id} isInTarget={false} key={`${tile.id}`} {...tile} />
    ));
  };

  useEffect(() => {
    if (initialized.current === false) {
      startNewGame();
      initialized.current = true;
    }
  }, [startNewGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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