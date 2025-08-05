import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import game from "../../constants/game";
import "../../styles/Splash.css"; // includes .splash-win and .splash-text styles

function WinningSplash({ heading = "You Won!" }: { heading?: string }) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      setShowConfetti(true);
    }, game.SPLASH_TIMEOUT);

    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="splash-win fade-in"
      role="alert"
      aria-live="polite"
      aria-label={heading}
    >
      {showConfetti && (
        <Confetti
          numberOfPieces={game.CONFETTI_COUNT}
          gravity={game.CONFETTI_FALL_SPEED / 100}
          initialVelocityY={game.CONFETTI_EXPLOSION_SPEED}
          recycle={false}
          colors={game.CONFETTI_COLORS}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      <span className="splash-text">{heading}</span>
    </div>
  );
}

export default WinningSplash;
