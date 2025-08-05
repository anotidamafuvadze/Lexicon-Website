import React from 'react';
import backgroundImage from '../assets/images/backgrounds/default-screen-background.png';
import '../styles/Instructions.css'
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';

function Instructions() {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate('/');
  }
  return (
    
    <div className="instructions-container" style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
    }}>
      <BackButton fromScreen={'/howtoplay'} toScreen={'/menu'}/>
      <div className="instructions-content">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>

        <div className="game-description">
          <p>
            <strong>Lexicon</strong> is a letter-merging puzzle game on a 4x4 grid. Use arrow keys (or W, A, S, D) to slide tiles. Matching letters combine into the next letter (A + A = B, B + B = C, etc.). With each move, new tiles appear and the puzzle evolves.
          </p>
          <p>
            <strong>Click and hold</strong> a tile to <strong>pop</strong> it—limited to <strong>three pops per round</strong>. <strong>Double-click</strong> to <strong>lock</strong> a tile in place (only <strong>one lock</strong> allowed), adding strategic depth.
          </p>
          <p>
            Pick from <strong>themed word packs</strong> like nature, food, or animals. Whether on phone, tablet, or desktop, Lexicon is easy to learn, endlessly replayable, and always satisfying.
          </p>
        </div>
        <button className="instructions-button" title='Resume Button'  onClick={() => handlePress()}> Resume</button>
      </div>
    </div>
  );
}

export default Instructions;