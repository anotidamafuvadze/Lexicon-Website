import React, { useEffect, useState } from "react";
import "../../styles/Splash.css"; // assumes .splash-lost and .splash-text are defined
import game from "../../constants/game";

/**
 * LosingSplash
 * - Displays a "You Lost" overlay with fade-in effect
 */
function LosingSplash({ heading = "You Lost" }: { heading?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), game.SPLASH_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="splash-lost fade-in"
      role="alert"
      aria-live="polite"
      aria-label={heading}
    >
      <span className="splash-text">{heading}</span>
    </div>
  );
}

export default LosingSplash;
