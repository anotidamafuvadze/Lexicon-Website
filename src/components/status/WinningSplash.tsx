import React, { useEffect, useState } from "react";
import game from "../../constants/game";
import "../../styles/Splash.css";

/**
 * WinningSplash
 * - Displays a "You Won" overlay with fade-in effect
 */
function WinningSplash({
  heading = "You Won!",
}: {
  heading?: string;
}): React.JSX.Element | null {
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
      <span className="splash-text">{heading}</span>
    </div>
  );
}

export default WinningSplash;
