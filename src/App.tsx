
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReflectionActivity from './components/ReflectionActivity';
import './App.css';

function App() {
  useEffect(() => {
    // Only mount the ReflectionActivity if we're not on the Chapter1 page with the new component
    if (!document.getElementById('chapter1-content')) {
      // Check if the reflection activity root element exists and mount the component
      const reflectionRoot = document.getElementById('reflection-activity-root');
      if (reflectionRoot) {
        console.log('Mounting ReflectionActivity component from App.tsx');
        const root = createRoot(reflectionRoot);
        root.render(<ReflectionActivity />);
      } else {
        console.error('Reflection activity root element not found');
      }
    }
  }, []);

  return null;
}

export default App;
