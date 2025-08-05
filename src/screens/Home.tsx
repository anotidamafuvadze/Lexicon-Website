import "../styles/Home.css";
import "../styles/GameBoard.css";
import defaultBackgroundImage from "../assets/images/backgrounds/default-screen-background.png";
import natureBackgroundImage from "../assets/images/backgrounds/nature-screen-background.png";
import foodBackgroundImage from "../assets/images/backgrounds/food-screen-background.png";
import animalsBackgroundImage from "../assets/images/backgrounds/animals-screen-background.png";
import storyBackgroundImage from "../assets/images/backgrounds/story-screen-background.png";
import GameGrid from "../components/status/GameGrid";
import GameBoard from "../components/status/GameBoard";
import { useNavigate } from "react-router-dom";
import "../constants/animations.css";
import useSound from "use-sound";
import buttonClick from "../assets/sounds/button-click-sound.mp3";
import { useSoundContext } from "../context/SoundContext";
import { useWord } from "../context/WordContext";
import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";


function Home() {
  const { targetWord, generateNewWord, currentTheme } = useWord();
  const [playButtonClick] = useSound(buttonClick);
  
  const { playBackgroundMusic } = useSoundContext();
  const { startNewGame, score, pops } = useGame();

  const [backgroundImage, setBackgroundImage] = useState(
    defaultBackgroundImage
  );
  const [gameBoardStyle, setGameBoardStyle] = useState("game-board ");
  const [targetWordStyle, setTargetWordStyle] = useState("");
  const [title, setTitle] = useState("LEXICON");
  const [subtitle, setSubtitle] = useState<React.JSX.Element | string>("");

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
          console.log("Current theme: " + theme);
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

  const navigate = useNavigate();
  const handleNewGame = () => {
    playButtonClick();
    generateNewWord();
    startNewGame()
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
        <div>
          <GameGrid
          />
        </div>
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
            <button className="new-game-button" onClick={handleNewGame}>
              New Game
            </button>
            <button className="menu-button" onClick={handleMenu}>
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
