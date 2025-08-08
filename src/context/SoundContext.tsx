import React, {
  createContext,
  useState,
  useRef,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import backgroundMusic from "../assets/sounds/background-music.mp3";

type SoundContextType = {
  soundOn: boolean;
  setSoundOn: (val: boolean) => void;
  isPlaying: boolean;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundContextProviderProps {
  children: ReactNode;
}

/**
 * SoundProvider
 * - Provides global sound state and controls
 * - Handles background music play/pause
 */
export const SoundProvider: React.FC<SoundContextProviderProps> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState(true);

  // Handle sound toggle changes
  useEffect(() => {
    if (soundOn) {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [soundOn]);

  const playBackgroundMusic = () => {
    if (!soundOn) return;
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const stopBackgroundMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isPlaying,
        playBackgroundMusic,
        stopBackgroundMusic,
        soundOn,
        setSoundOn,
      }}
    >
      <audio ref={audioRef} src={backgroundMusic} />
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error(
      "useSoundContext must be used within a SoundContextProvider"
    );
  }
  return context;
};
