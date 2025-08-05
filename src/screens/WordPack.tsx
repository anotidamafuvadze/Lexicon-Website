import React from 'react';
import backgroundImage from '../assets/images/backgrounds/default-screen-background.png';
import '../styles/WordPack.css'
import natureIcon from '../assets/images/icons/nature-icon.png';
import foodIcon from '../assets/images/icons/food-icon.png';
import animalsIcon from '../assets/images/icons/animals-icon.png';
import storyIcon from '../assets/images/icons/story-icon.png';
import classicIcon from '../assets/images/icons/classic-icon.png';
import BackButton from '../components/buttons/BackButton'
import '../constants/animations.css'
import { useWord } from '../context/WordContext';
import { useNavigate, Link } from 'react-router-dom';
import whooshSound from '../assets/sounds/screen-whoosh-sound.mp3'
import useSound from 'use-sound';


function WordPack() {
  const { setTheme, generateNewWord} = useWord();
  const [playWhooshSound] = useSound(whooshSound);
  const navigate = useNavigate();
   const handleButtonPress = (pack: string) => {
    setTheme(pack);
    generateNewWord(pack);
    //startNewGame();
    playWhooshSound();
    navigate('/');
  };
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <BackButton fromScreen={'/wordpack'} toScreen={'/menu'} />
      <header className="word-pack-header">
          <h1 className="word-pack-title"> Pick Your<br />Pack</h1>
          <p className="word-pack-subtitle">
            Each theme unlocks new words and a different style of play
          </p>
        </header>
        <div className="word-pack-button-group" >
            <button className="word-pack-button lightspeed-in-right" onClick={() => handleButtonPress('nature')}>
              <img src={natureIcon} alt="Nature Icon" className="word-pack-icon" />
              <div className="word-pack-text">
                <div className="word-pack-name">NATURE</div>
                <div className="word-pack-description">TREE, LAKE, RAIN</div>
              </div>
            </button>
            <button className="word-pack-button lightspeed-in-right" onClick={() => handleButtonPress('food')}>
              <img src={foodIcon} alt="Food Icon" className="word-pack-icon" />
              <div className="word-pack-text">
                <div className="word-pack-name">FOOD</div>
                <div className="word-pack-description">CAKE, MILK, EGGS</div>
              </div>
            </button>
            <button className="word-pack-button lightspeed-in-right" onClick={() => handleButtonPress('animals')}>
              <img src={animalsIcon} alt="Animals Icon" className="word-pack-icon" />
              <div className="word-pack-text">
                <div className="word-pack-name">ANIMALS</div>
                <div className="word-pack-description">DEER, BIRD, FROG</div>
              </div>
            </button>
            <button className="word-pack-button lightspeed-in-right" onClick={() => handleButtonPress('story')}>
              <img src={storyIcon} alt="Story Icon" className="word-pack-icon" />
              <div className="word-pack-text">
                <div className="word-pack-name">STORY</div>
                <div className="word-pack-description">BOOK, PAGE, TALE</div>
              </div>
            </button>
            <button className="word-pack-button lightspeed-in-right" onClick={() => handleButtonPress('default')}>
              <img src={classicIcon} alt="Classic Icon" className="word-pack-icon" />
              <div className="word-pack-text">
                <div className="word-pack-name">CLASSIC</div>
                <div className="word-pack-description">CHAT, DEEP, BOLD</div>
              </div>
            </button>
            
      
        </div>
        </div>
    );
}

export default WordPack;