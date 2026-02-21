import { GameProvider, useGame } from './context/GameContext';
import { HomeScreen } from './screens/HomeScreen';
import { SongSelectScreen } from './screens/SongSelectScreen';
import { PlayScreen } from './screens/PlayScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { useAudioEngine } from './hooks/useAudioEngine';

function AppContent() {
  const { screen, gameKey, goTo } = useGame();
  const { initAudio } = useAudioEngine();

  const handleStart = async () => {
    await initAudio();
    const seen = localStorage.getItem('pianoai-tutorial-seen');
    goTo(seen ? 'select' : 'tutorial');
  };

  return (
    <>
      {screen === 'home' && <HomeScreen onStart={handleStart} />}
      {screen === 'tutorial' && <TutorialScreen />}
      {screen === 'select' && <SongSelectScreen />}
      {screen === 'play' && <PlayScreen key={gameKey} />}
      {screen === 'results' && <ResultsScreen />}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
