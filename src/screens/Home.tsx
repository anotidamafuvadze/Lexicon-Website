import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";

import "../styles/Home.css";
import "../styles/GameBoard.css";
import "../constants/animations.css";

import defaultBackgroundImage from "../assets/images/backgrounds/default-screen-background.png";
import natureBackgroundImage from "../assets/images/backgrounds/nature-screen-background.png";
import foodBackgroundImage from "../assets/images/backgrounds/food-screen-background.png";
import animalsBackgroundImage from "../assets/images/backgrounds/animals-screen-background.png";
import storyBackgroundImage from "../assets/images/backgrounds/story-screen-background.png";

import buttonClick from "../assets/sounds/button-click-sound.mp3";
import winSound from "../assets/sounds/win-sound.mp3";

import GameGrid from "../components/status/GameGrid";
import GameBoard from "../components/status/GameBoard";

import { useSoundContext } from "../context/SoundContext";
import { useWord } from "../context/WordContext";
import { useGame } from "../context/GameContext";

/**
 * Home
 * - Main game screen
 * - Displays game board, score, pops, and target word
 * - Handles theme changes, win sound sequence, and button navigation
 */
function Home(): React.JSX.Element {
  const { targetWord, generateNewWord, currentTheme } = useWord();
  const { startNewGame, score, pops, status } = useGame();
  const { playBackgroundMusic, stopBackgroundMusic } = useSoundContext();

  const [playButtonClick] = useSound(buttonClick);
  const [playWinSound] = useSound(winSound);

  const navigate = useNavigate();
  const hasShownWin = useRef(false);
  const prevStatus = useRef(status);

  const [canClick, setCanClick] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(
    defaultBackgroundImage
  );
  const [gameBoardStyle, setGameBoardStyle] = useState("game-board");
  const [targetWordStyle, setTargetWordStyle] = useState("");
  const [title, setTitle] = useState("LEXICON");
  const [subtitle, setSubtitle] = useState<React.JSX.Element | string>("");

  // Handle win state: stop music, play win sound, then resume
  useEffect(() => {
    const isNewWin = status === "WON" && prevStatus.current !== "WON";
    if (isNewWin) {
      hasShownWin.current = true;
      setCanClick(false);

      stopBackgroundMusic();
      playWinSound();

      setTimeout(() => {
        setCanClick(true);
        playBackgroundMusic();
      }, 6000);
    }
    prevStatus.current = status;
  }, [status, stopBackgroundMusic, playWinSound, playBackgroundMusic]);

  // Update visuals based on theme
  useEffect(() => {
    const changeTheme = (theme: string) => {
      switch (theme) {
        case "default":
        case "easy":
        case "normal":
        case "hard":
          setBackgroundImage(defaultBackgroundImage);
          setGameBoardStyle("game-board");
          setTargetWordStyle("default-target-word");
          setTitle("LEXICON");
          setSubtitle(
            <>
              Merge the letters and spell the <strong>word!</strong>
            </>
          );
          break;
        case "nature":
          setBackgroundImage(natureBackgroundImage);
          setGameBoardStyle("game-board fall-fast nature");
          setTargetWordStyle("");
          setTitle("");
          setSubtitle("");
          break;
        case "food":
          setBackgroundImage(foodBackgroundImage);
          setGameBoardStyle("game-board food");
          setTargetWordStyle("");
          setTitle("");
          setSubtitle("");
          break;
        case "animals":
          setBackgroundImage(animalsBackgroundImage);
          setGameBoardStyle("game-board animals");
          setTargetWordStyle("");
          setTitle("");
          setSubtitle("");
          break;
        case "story":
          setBackgroundImage(storyBackgroundImage);
          setGameBoardStyle("game-board story");
          setTargetWordStyle("");
          setTitle("");
          setSubtitle("");
          break;
      }
    };
    changeTheme(currentTheme);
  }, [currentTheme]);

  // Start music after first click to bypass autoplay restrictions
  useEffect(() => {
    const startMusicOnClick = () => {
      playBackgroundMusic();
      window.removeEventListener("click", startMusicOnClick);
    };
    window.addEventListener("click", startMusicOnClick);
    return () => {
      window.removeEventListener("click", startMusicOnClick);
    };
  }, []);

  const handleNewGame = () => {
    playButtonClick();
    generateNewWord();
    startNewGame();
  };

  const handleMenu = () => {
    playButtonClick();
    navigate("/menu");
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ marginLeft: "26px" }}>
        <header className="App-header">
          <h1 className="App-title">{title || "\u00A0"}</h1>
          <p className="App-subtitle">{subtitle || "\u00A0"}</p>
        </header>

        <div className="score-pops">
          <GameBoard
            title="SCORE"
            count={String(score)}
            style={`${gameBoardStyle} fall-fast`}
            width={{ width: 160 }}
          />
          <GameBoard
            title="POPS"
            count={String(pops)}
            style={`${gameBoardStyle} fall-slow`}
            width={{ width: 130 }}
          />
        </div>

        <GameGrid />

        <div className="game-area">
          <div className="target-word-container">
            <h2 className={`target-word-title ${targetWordStyle}`}>
              YOUR WORD:
            </h2>
            <span className={`target-word ${targetWordStyle}`}>
              {targetWord}
            </span>
          </div>

          <div className="button-group">
            <button
              className="new-game-button"
              onClick={() => canClick && handleNewGame()}
            >
              New Game
            </button>
            <button
              className="menu-button"
              onClick={() => canClick && handleMenu()}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
