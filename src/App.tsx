
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReflectionActivity from './components/ReflectionActivity';
import './App.css';

function App() {
  useEffect(() => {
    // Only mount the ReflectionActivity if we're not on the Chapter1 page
    const isChapter1 = document.getElementById('chapter1-content');
    if (!isChapter1) {
      // Check if the reflection activity root exists and mount the component
      const reflectionRoot = document.getElementById('reflection-activity-root');
      if (reflectionRoot && !reflectionRoot.hasChildNodes()) {
        console.log('Mounting ReflectionActivity component from App.tsx');
        try {
          const root = createRoot(reflectionRoot);
          root.render(<ReflectionActivity />);
        } catch (error) {
          console.error('Error rendering ReflectionActivity:', error);
        }
      }
    }
    
    // Set copyright year on all pages
    const setCopyrightYear = () => {
      const copyrightElements = document.querySelectorAll('#copyright-year');
      copyrightElements.forEach(el => {
        if (el && !el.textContent) {
          el.textContent = new Date().getFullYear().toString();
        }
      });
    };
    
    // Run copyright update
    setCopyrightYear();
    
    // Set up survey app event listener for feedback
    const setupSurveyFeedback = () => {
      // Add event listener for page unload to trigger feedback widget
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
        // Allow normal navigation
        delete event.returnValue;
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };
    
    return setupSurveyFeedback();
  }, []);

  return null;
}

export default App;
