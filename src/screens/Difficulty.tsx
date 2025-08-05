import React from 'react';
import backgroundImage from '../assets/images/backgrounds/default-screen-background.png';
import '../styles/Difficulty.css'
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';
import easyLabel from '../assets/images/labels/easy-label.png';
import normalLabel from '../assets/images/labels/normal-label.png';
import hardLabel from '../assets/images/labels/hard-label.png';
import '../constants/animations.css';
import useSound from 'use-sound';
import popSound from '../assets/sounds/button-pop-sound.mp3'
import { useWord } from '../context/WordContext';
import { useGame } from "../context/GameContext";


function Difficulty() {
  const [playButtonPop] = useSound(popSound);
  const {setTheme, generateNewWord} = useWord()
  const { startNewGame } = useGame();
  const navigate = useNavigate();
  const handlePress = (mode: string) => {
    playButtonPop()
    setTheme(mode);
    generateNewWord(mode);
    startNewGame();
    navigate('/');
  }
  return (
    <div> 
      <BackButton fromScreen={'/difficulty'} toScreen={'/menu'}/>
      <div className="difficulty-button-group" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="difficulty-text-column">
            <button className="difficulty-button easy-button bounce-in" title='Easy Button'  onClick={() => handlePress("easy")}>
              <img src={easyLabel} alt="Easy Label" className="difficulty-label" />
            </button>
            <button className="difficulty-button normal-button bounce-in" title='Normal Button'  onClick={() => handlePress("normal")}>
              <img src={normalLabel} alt="Normal Label" className="difficulty-label" />
            </button>
            <button className="difficulty-button hard-button bounce-in" title='Hard Button'  onClick={() => handlePress("hard")}> 
              <img src={hardLabel} alt="Hard Label" className="difficulty-label" />
            </button>
    
          </div>
      </div>
    </div>
  );
}

export default Difficulty;