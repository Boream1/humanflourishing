
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReflectionActivity from './components/ReflectionActivity';
import './App.css';

function App() {
  useEffect(() => {
    // Check if the reflection activity root element exists and mount the component
    const reflectionRoot = document.getElementById('reflection-activity-root');
    if (reflectionRoot) {
      console.log('Mounting ReflectionActivity component');
      const root = createRoot(reflectionRoot);
      root.render(<ReflectionActivity />);
    } else {
      console.error('Reflection activity root element not found');
    }
  }, []);

  return null;
}

export default App;
