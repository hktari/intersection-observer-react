import logo from './logo.svg';
import './App.css';
import Box from './components/Box';
import ObserverProvider from './context/ObserverContext';

function App() {
  return (
    <>
      <ObserverProvider>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
      </ObserverProvider>
    </>
  );
}

export default App;
