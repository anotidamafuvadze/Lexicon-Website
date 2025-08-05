import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import WordPack from './WordPack';
import Difficulty from './Difficulty';
import Instructions from './Instructions';
import { AnimatePresence, motion } from 'framer-motion';
import { SoundProvider } from '../context/SoundContext';
import { WordProvider } from '../context/WordContext';
import { GameProvider } from '../context/GameContext';
function App() {
  const location = useLocation();

  return (

       <WordProvider>
        <GameProvider>
         <SoundProvider>
           <AnimatePresence mode="wait">
             <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />}  />
              <Route path="/menu" element={
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                  <Menu />
                </motion.div>
                }
              />
              <Route path="/wordpack" element={
                 <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WordPack />
                  </motion.div>
         
                }
              />
              <Route path="/difficulty" element={
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                  <Difficulty />
                </motion.div>
                }
              />
              <Route path="/howtoplay" element={
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Instructions />
                  </motion.div>
                }
              />
            </Routes>
            </AnimatePresence>
         </SoundProvider>
         </GameProvider>
       </WordProvider>
  
  );
}

export default App;
