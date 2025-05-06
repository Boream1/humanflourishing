
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ReflectionActivity from './components/ReflectionActivity';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';
import '../styles/media.css';

function App() {
  useEffect(() => {
    // Check if we're not in Chapter1 where the reflection activity is already handled
    if (!document.getElementById('chapter1-content')) {
      // Check if the reflection activity root element exists and mount the component
      const reflectionRoot = document.getElementById('reflection-activity-root');
      if (reflectionRoot) {
        console.log('Mounting ReflectionActivity component from App.tsx');
        try {
          const root = createRoot(reflectionRoot);
          root.render(<ReflectionActivity />);
        } catch (error) {
          console.error('Error rendering ReflectionActivity from App:', error);
        }
      }
    }
    
    // Set the copyright year dynamically
    const copyrightElements = document.querySelectorAll('#copyright-year');
    copyrightElements.forEach(el => {
      el.textContent = new Date().getFullYear().toString();
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
