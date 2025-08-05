import React from 'react';
import backIcon from '../../assets/images/icons/back-button-icon.png';
import '../../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import buttonClick from '../../assets/sounds/button-click-sound.mp3'

function BackButton({ fromScreen, toScreen }: { fromScreen: string; toScreen: string }) {
  const navigate = useNavigate();
  const [playButtonClick] = useSound(buttonClick);
  const handPress = () => {
    playButtonClick()
    navigate(toScreen);
  }
  return (
    <div>
      <button onClick={handPress} className='back-button'>
        <img src={backIcon} alt="Back Icon" className="back-button-icon" />
      </button>
    </div>
  );
}

export default BackButton;