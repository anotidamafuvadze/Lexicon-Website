import React from 'react';
import '../styles/Menu.css'
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/images/backgrounds/default-screen-background.png';
import useSound from 'use-sound';
import buttonClick from '../assets/sounds/button-click-sound.mp3'
import instagramIcon from '../assets/images/icons/instagram-icon.png'
import tiktokIcon from '../assets/images/icons/tiktok-icon.png'
import xIcon from '../assets/images/icons/x-icon.png'


import { useSoundContext } from '../context/SoundContext';

function Menu() {
  const { isPlaying, playBackgroundMusic, stopBackgroundMusic } = useSoundContext();
  const [playButtonClick] = useSound(buttonClick);
  const navigate = useNavigate();
  const { soundOn, setSoundOn } = useSoundContext();
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
    playButtonClick()
    switch (button) {
      case "resume":
        navigate('/');
        break;
      case "wordpack":
        console.log("TEST")
        navigate('/wordpack');
        break;
      case "difficulty":
        navigate('/difficulty');
        break;
      case "instructions":
        navigate('/howtoplay');
        break;

    }
  }
  return (
      <div className="menu-button-group" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="menu-text-column">
            <button className="sound-button" onClick={handleSoundPress} >  {soundOn ? '🔉 Sound On' : '🔇 Sound Off'} </button>
            <button className="menu-screen-button resume-button" title='Resume Button'  onClick={() => handlePress("resume")}> ► Resume</button>
            <button className="menu-screen-button" title='Word Packs Button'  onClick={() => handlePress("wordpack")}>Word Packs</button>
            <button className="menu-screen-button" title='Difficulty Button'  onClick={() => handlePress("difficulty")}>Difficulty</button>
            <button className="menu-screen-button" title='Instructions Button'  onClick={() => handlePress("instructions")}>How to Play</button>
            {/* <a
              href="https://linktr.ee/lexiconthegame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="menu-screen-button" title="Follow Us Button">Follow Us!</button>
            </a> */}              
    
          </div>
          <div className="social-media-button-group" style={{flexDirection: 'row'}}>
                <a
              href="https://www.tiktok.com/@lexiconthegame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="social-media-button bounce-up" title="Tik Tok Link">
                 <img src={tiktokIcon} alt="Tik Tok Icon" className="social-media-button-icon" />
              </button>
            </a>
              <a
              href="https://www.instagram.com/lexiconthegame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="social-media-button bounce-up" title="Instagram Link">
                 <img src={instagramIcon} alt="Instagram Icon" className="social-media-button-icon" />
              </button>
            </a>
              <a
              href="https://x.com/lexiconthegame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="social-media-button bounce-up"title="Twitter/X Link">
                 <img src={xIcon} alt="Twitter Icon" className="social-media-button-icon" />
              </button>
            </a>
            </div>
      </div>
  );
}


export default Menu;