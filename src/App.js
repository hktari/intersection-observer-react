import logo from './logo.svg';
import './App.css';
import Box from './components/Box';
import IntersectionObserverProvider from './context/IntersectionObserverContext';

function App() {
  return (
    <>
      <IntersectionObserverProvider>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
      </IntersectionObserverProvider>
    </>
  );
}

export default App;
