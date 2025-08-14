import React, { useState, useEffect, useRef } from "react";
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
 * Device detection helpers
 * - macOS desktop/laptop (do NOT show gate)
 * - iOS/iPadOS/Android (show gate)
 * - iPadOS 13+ reports "MacIntel" + touchpoints > 1 (should show gate)
 */
function isMacDesktop(): boolean {
  const ua = navigator.userAgent || "";
  const platform = (navigator.platform || "").toLowerCase();

  const isMacUA = /Macintosh|Mac OS X/i.test(ua);
  const isMacPlatform = /macintel|macppc|mac68k/i.test(platform);

  // True macOS: has 0 (or undefined) touch points.
  const maxTP = (navigator as any).maxTouchPoints ?? 0;
  const looksLikeRealMac = (isMacUA || isMacPlatform) && maxTP < 2; // iPadOS has >=2

  return looksLikeRealMac;
}

function isMobileOrTablet(): boolean {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOSUA = /iPhone|iPad|iPod/i.test(ua);
  const isIPadOS13Plus =
    navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1;

  return isAndroid || isIOSUA || isIPadOS13Plus;
}

/**
 * Home
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
  const [backgroundImage, setBackgroundImage] = useState(defaultBackgroundImage);
  const [gameBoardStyle, setGameBoardStyle] = useState("game-board");
  const [targetWordStyle, setTargetWordStyle] = useState("");
  const [title, setTitle] = useState("LEXICON");
  const [subtitle, setSubtitle] = useState<React.JSX.Element | string>("");

  // Gate state: show only on non-laptop (mobile/tablet), never on macOS desktop/laptop
  const [showMobileGate, setShowMobileGate] = useState(false);

  // Win state
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

  // Theme visuals
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

  // Start music after first click (autoplay)
  useEffect(() => {
    if (showMobileGate) return;
    const startMusicOnClick = () => {
      playBackgroundMusic();
      window.removeEventListener("click", startMusicOnClick);
    };
    window.addEventListener("click", startMusicOnClick);
    return () => window.removeEventListener("click", startMusicOnClick);
  }, [playBackgroundMusic]);

  // Decide if we should show the mobile gate.
  // Logic: show if it's a mobile/tablet AND not a real macOS desktop/laptop.
  useEffect(() => {
    try {
      if (!isMacDesktop() && isMobileOrTablet()) {
        setShowMobileGate(true);
      }
    } catch {
      // Fail-safe: do nothing (no gate)
    }
  }, []);

  const openAppStore = () => {
    window.location.href = "https://apps.apple.com/us/app/lexicon/id6749748377";
  };

  const handleNewGame = () => {
    playButtonClick();
    generateNewWord();
    startNewGame();
  };

  const handleMenu = () => {
    playButtonClick();
    navigate("/menu");
  };

  // If gate is shown, render ONLY the white gate screen (no background content)
  if (showMobileGate) {
    return (
      <div
        className="mobile-gate"
        style={{
          background: "#ffffff",
          color: "#111",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            '"Montserrat", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ margin: 0, fontWeight: 900, fontSize: "1.75rem" }}>
            Play Lexicon on Mobile
          </h1>
          <p style={{ margin: "0.75rem 0 1.25rem", fontSize: "1rem" }}>
            Get the best experience on your device with the Lexicon app.
          </p>
          <button
            onClick={openAppStore}
            style={{
              cursor: "pointer",
              borderRadius: 999,
              padding: "0.9rem 1.25rem",
              fontWeight: 800,
              border: "none",
              boxShadow: "0 0.3rem 0 rgba(0,0,0,0.2)",
              background: "#007aff",
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            Open in App Store
          </button>
        </div>
      </div>
    );
  }

  // Otherwise render the normal game UI
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700;900&display=swap"
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
            <h2 className={`target-word-title ${targetWordStyle}`}>YOUR WORD:</h2>
            <span className={`target-word ${targetWordStyle}`}>{targetWord}</span>
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
