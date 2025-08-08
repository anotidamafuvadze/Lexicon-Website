import React from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import backIcon from "../../assets/images/icons/back-button-icon.png";
import buttonClick from "../../assets/sounds/button-click-sound.mp3";
import "../../styles/Home.css";

/**
 * BackButton
 * - Navigates from one screen to another
 * - Plays a click sound when pressed
 */
function BackButton({
  fromScreen,
  toScreen,
}: {
  fromScreen: string;
  toScreen: string;
}): React.JSX.Element {
  const navigate = useNavigate();
  const [playButtonClick] = useSound(buttonClick);

  const handlePress = () => {
    playButtonClick();
    navigate(toScreen);
  };

  return (
    <div>
      <button onClick={handlePress} className="back-button">
        <img src={backIcon} alt="Back Icon" className="back-button-icon" />
      </button>
    </div>
  );
}

export default BackButton;
