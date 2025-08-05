import game from "../constants/game";
import { Tile } from "../models/tile";
import gameReducer, {
  Action,
  GameStatus,
  initialState,
  State,
} from '../reducers/gameReducer';
import { isNil, throttle } from "lodash";
import React, {
  createContext,
  Dispatch,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useWord } from "./WordContext";

// ======================= TYPES =======================

// Valid move directions
type MoveDirection = "MOVE_UP" | "MOVE_DOWN" | "MOVE_LEFT" | "MOVE_RIGHT";

// Game context shape
type GameContextType = {
  status: GameStatus;
  gameState: State;
  score: number;
  pops: number;
  gameWinningTiles: string[] | null;
  startNewGame: () => void;
  checkGameStatus: () => void;
  getTiles: () => Tile[];
  moveTiles: (type: MoveDirection) => void;
  lockTile: (tileId: string) => void;
  unlockTile: () => void;
  popTile: (tileId: string) => void;
  dispatch: Dispatch<Action>;
  lockedTile: RefObject<string>;
  isAbleToLock: RefObject<boolean>;
};

// Default context
const GameContext = createContext<GameContextType>({
  status: "ONGOING",
  gameState: initialState,
  score: initialState.score,
  pops: initialState.pops,
  gameWinningTiles: [],
  startNewGame: () => {},
  checkGameStatus: () => {},
  getTiles: () => [],
  moveTiles: () => {},
  lockTile: () => {},
  unlockTile: () => {},
  popTile: () => {},
  dispatch: () => {},
  lockedTile: { current: "" },
  isAbleToLock: { current: true },
});

/**
 * GameProvider
 * - Manages game state
 * - Initializes the board with two starting tiles
 */

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [gameWinningTiles, setGameWinningTiles] = useState<string[] | null>([]);
  const { targetWord, generateNewWord, currentTheme } = useWord();

  const hasStarted = useRef(false);
  const lockedTile = useRef<string>("");
  const isAbleToLock = useRef<boolean>(true);

  // ===== Start new game on first mount =====
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    (async () => {
      const stored = localStorage.getItem("gameState");
     if (stored) {
        dispatch({ type: "UPDATE_STATE", state: JSON.parse(stored) });
      } else {
        localStorage.setItem("gameState", JSON.stringify(initialState));
        generateNewWord(currentTheme);
        startNewGame();
      }
    })();
  }, []);

  // Save game state
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState.board]);

  // Update lock state
  useEffect(() => {
    if (lockedTile.current !== "") {
      isAbleToLock.current = false;
    } else {
      isAbleToLock.current = true;
    }
  }, [lockedTile]);

  // ===== Reset board with two tiles =====
  const startNewGame = () => {
    console.log("Starting a new game!");
    lockedTile.current = "";
    isAbleToLock.current = true;
    dispatch({ type: "RESET_GAME" });

    setTimeout(() => {
      dispatch({ type: "UPDATE_STATUS", status: "ONGOING" });
      dispatch({ type: "CREATE_TILE", tile: { value: "A", justCreated: true } });
      dispatch({ type: "CREATE_TILE", tile: { value: "A", justCreated: true } });
    }, 50);
  };

  // ===== Check and update win/loss status =====
  const checkGameStatus = useCallback(() => {
    if (checkForLoss(gameState)) {
      dispatch({ type: "UPDATE_STATUS", status: "LOST" });
    }

    const [won, winningTiles] = checkForWin(gameState, targetWord);
    if (won) {
      dispatch({ type: "UPDATE_STATUS", status: "WON" });
    }

    setGameWinningTiles(winningTiles);
  }, [gameState.tilesByIds, gameState.tiles, targetWord]);

  // ===== Loss: no moves or pops left =====
  function checkForLoss(state: State): boolean {
    const size = game.TILE_COUNT_PER_DIMENSION;

    // Check for empty cell
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (isNil(state.board[x][y])) return false;
      }
    }

    // Check for possible merge
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const currId = state.board[x][y];
        if (!currId) continue;
        const currTile = state.tiles[currId];

        // right neighbor
        if (x < size - 1) {
          const rightId = state.board[x + 1][y];
          if (!isNil(rightId) && state.tiles[rightId].value === currTile.value) {
            return false;
          }
        }

        // bottom neighbor
        if (y < size - 1) {
          const downId = state.board[x][y + 1];
          if (!isNil(downId) && state.tiles[downId].value === currTile.value) {
            return false;
          }
        }
      }
    }

    return state.pops <= 0;
  }

  // ===== Win: target word found in row or column =====
  function checkForWin(state: State, targetWord: string): [boolean, string[] | null] {
    for (let row = 0; row < game.TILE_COUNT_PER_DIMENSION; row++) {
      const [win, tiles] = checkRow(row, state, targetWord);
      if (win) return [true, tiles];
    }

    for (let col = 0; col < game.TILE_COUNT_PER_DIMENSION; col++) {
      const [win, tiles] = checkCol(col, state, targetWord);
      if (win) return [true, tiles];
    }

    return [false, null];
  }

  // ===== Check single row =====
  function checkRow(
    row: number,
    state: State,
    targetWord: string
  ): [boolean, string[] | null] {
    let word = "";
    const tiles: string[] = [];

    for (let col = 0; col < game.TILE_COUNT_PER_DIMENSION; col++) {
      const id = state.board[row][col];
      if (isNil(id)) return [false, null];
      word += state.tiles[id].value;
      tiles.push(id);
    }

    return word === targetWord ? [true, tiles] : [false, null];
  }

  // ===== Check single column =====
  function checkCol(
    col: number,
    state: State,
    targetWord: string
  ): [boolean, string[] | null] {
    let word = "";
    const tiles: string[] = [];

    for (let row = 0; row < game.TILE_COUNT_PER_DIMENSION; row++) {
      const id = state.board[row][col];
      if (isNil(id)) return [false, null];
      word += state.tiles[id].value;
      tiles.push(id);
    }

    return word === targetWord ? [true, tiles] : [false, null];
  }

  // ===== Re-check status when state or target word changes =====
  useEffect(() => {
    if (gameState.status === "ONGOING" && targetWord) {
      checkGameStatus();
    }
  }, [gameState.status, targetWord, checkGameStatus]);

  // ===== Return all active tiles =====
  const getTiles = () =>
    gameState.tilesByIds
      .map((tileId) => gameState.tiles[tileId])
      .filter((tile): tile is Tile => tile !== undefined);

  // ===== Move tiles =====
  const moveTiles = useCallback(
    throttle(
      (type: MoveDirection) => {
        if (gameState.status === "ONGOING") {
          dispatch({ type, lockedTile: lockedTile.current });
        }
      },
      game.MERGE_ANIMATION_DURATION * 1.05,
      { trailing: false }
    ),
    [dispatch, gameState.status]
  );

  // ===== Lock a tile =====
  const lockTile = (tileId: string) => {
    if (lockedTile.current !== "") {
      return;
    }
    lockedTile.current = tileId;
    isAbleToLock.current = false;
  };

  // ===== Unlock a tile =====
  const unlockTile = () => {
    lockedTile.current = "";
    isAbleToLock.current = true;
  };

  // ===== Remove a tile =====
  const popTile = (tileId: string) => {
    dispatch({ type: "POP_TILE", tileId });
    dispatch({ type: "CLEAN_UP" });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        status: gameState.status,
        startNewGame,
        checkGameStatus,
        popTile,
        lockTile,
        unlockTile,
        lockedTile,
        isAbleToLock,
        gameWinningTiles,
        getTiles,
        moveTiles,
        dispatch,
        score: gameState.score,
        pops: gameState.pops,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// ===== Custom hook: useGame =====
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
