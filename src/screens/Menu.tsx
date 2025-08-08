import React from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";

import "../styles/Menu.css";
import backgroundImage from "../assets/images/backgrounds/default-screen-background.png";
import buttonClick from "../assets/sounds/button-click-sound.mp3";
import instagramIcon from "../assets/images/icons/instagram-icon.png";
import tiktokIcon from "../assets/images/icons/tiktok-icon.png";
import xIcon from "../assets/images/icons/x-icon.png";

import { useSoundContext } from "../context/SoundContext";

/**
 * Menu
 * - Displays main menu options and social media links
 * - Allows toggling sound, resuming game, and navigation to other screens
 */
function Menu(): React.JSX.Element {
  const { soundOn, setSoundOn, playBackgroundMusic, stopBackgroundMusic } =
    useSoundContext();
  const [playButtonClick] = useSound(buttonClick);
  const navigate = useNavigate();

  const handleSoundPress = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);

    if (nextState) {
      playButtonClick();
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  };

  const handlePress = (button: string) => {
    playButtonClick();
    switch (button) {
      case "resume":
        navigate("/");
        break;
      case "wordpack":
        navigate("/wordpack");
        break;
      case "difficulty":
        navigate("/difficulty");
        break;
      case "instructions":
        navigate("/howtoplay");
        break;
    }
  };

  return (
    <div
      className="menu-button-group"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="menu-text-column">
        <button className="sound-button" onClick={handleSoundPress}>
          {soundOn ? "🔉 Sound On" : "🔇 Sound Off"}
        </button>
        <button
          className="menu-screen-button resume-button"
          title="Resume Button"
          onClick={() => handlePress("resume")}
        >
          ► Resume
        </button>
        <button
          className="menu-screen-button"
          title="Word Packs Button"
          onClick={() => handlePress("wordpack")}
        >
          Word Packs
        </button>
        <button
          className="menu-screen-button"
          title="Difficulty Button"
          onClick={() => handlePress("difficulty")}
        >
          Difficulty
        </button>
        <button
          className="menu-screen-button"
          title="Instructions Button"
          onClick={() => handlePress("instructions")}
        >
          How to Play
        </button>
      </div>

      <div
        className="social-media-button-group"
        style={{ flexDirection: "row" }}
      >
        <a
          href="https://www.tiktok.com/@lexiconthegame"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="social-media-button bounce-up" title="TikTok Link">
            <img
              src={tiktokIcon}
              alt="TikTok Icon"
              className="social-media-button-icon"
            />
          </button>
        </a>
        <a
          href="https://www.instagram.com/lexiconthegame"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="social-media-button bounce-up"
            title="Instagram Link"
          >
            <img
              src={instagramIcon}
              alt="Instagram Icon"
              className="social-media-button-icon"
            />
          </button>
        </a>
        <a
          href="https://x.com/lexiconthegame"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="social-media-button bounce-up"
            title="Twitter/X Link"
          >
            <img
              src={xIcon}
              alt="Twitter Icon"
              className="social-media-button-icon"
            />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Menu;
