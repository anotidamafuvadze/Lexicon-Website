
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import wordBanks from '../constants/wordBanks'

/**
 * WordProvider
 * - Handles target word and theme
 * - Loads saved word, generates new words, and updates theme
 */

type WordContextType = {
  targetWord: string;
  currentTheme: string;
  generateNewWord: (theme?: string) => void;
  setTheme: (theme: string) => void;
};

const WordContext = createContext<WordContextType>({
  targetWord: "",
  currentTheme: "",
  generateNewWord: () => {},
  setTheme: () => {},
});

export const WordProvider = ({
  children,
  defaultTheme = "default",
}: {
  children: React.ReactNode;
  defaultTheme?: string;
}) => {
  const [targetWord, setTargetWord] = useState("");
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  // ===== Generate a word from the current or given theme =====
  const generateNewWord = useCallback(
    async (theme?: string) => {
      const activeTheme = theme || currentTheme;
      const bank = wordBanks.find((b) => b.name === activeTheme);

      if (!bank || bank.words.length === 0) return;
      let newWord = targetWord;
      let attempts = 0;
      const maxAttempts = 10;

      while (newWord === targetWord && attempts < maxAttempts) {
        newWord = bank.words[Math.floor(Math.random() * bank.words.length)]!;
        attempts++;
      }

      setTargetWord(newWord);
      localStorage.setItem("targetWord", newWord);
    },
    [currentTheme, targetWord]
  );

  // ===== Set the current theme =====
  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("currentTheme", theme);
  };

  // ===== Load saved word or generate one on mount =====
  const loadOrGenerateWord = useCallback(async () => {
    const stored = localStorage.getItem("targetWord");
    if (stored) {
      setTargetWord(stored);
    } else {
      await generateNewWord(defaultTheme);
    }
  }, [defaultTheme, generateNewWord]);

  // ===== Load saved theme or generate one on mount =====
  const loadOrGenerateTheme = useCallback(async () => {
    const stored = localStorage.getItem("currentTheme");
    if (stored) {
      setCurrentTheme(stored);
    } else {
      await setCurrentTheme(defaultTheme);
    }
  }, [defaultTheme, generateNewWord]);

  // ===== Run loadOrGenerate when component mounts =====
  useEffect(() => {
    loadOrGenerateWord();
    loadOrGenerateTheme();
  }, [loadOrGenerateWord]);

  return (
    <WordContext.Provider
      value={{
        currentTheme,
        targetWord,
        generateNewWord,
        setTheme,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

// ===== Custom hook: useWord =====
export const useWord = () => useContext(WordContext);
