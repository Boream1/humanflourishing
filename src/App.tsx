
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
    
    // Set copyright year on all pages with retries to ensure it's set
    const setCopyrightYear = () => {
      const copyrightElements = document.querySelectorAll('#copyright-year');
      const currentYear = new Date().getFullYear().toString();
      
      copyrightElements.forEach(el => {
        if (el && (!el.textContent || el.textContent.trim() === '')) {
          el.textContent = currentYear;
        }
      });
    };
    
    // Run copyright update on a schedule to ensure it's set
    setCopyrightYear();
    const copyrightInterval = setInterval(setCopyrightYear, 1000);
    setTimeout(() => clearInterval(copyrightInterval), 10000);
    
    // Set up survey app event listener for feedback
    const setupSurveyFeedback = () => {
      // Add event listener for next chapter navigation to trigger feedback widget
      const navNextButtons = document.querySelectorAll('.nav-button.next');
      navNextButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          console.log('Navigation next button clicked, triggering feedback modal');
          document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
        });
      });
      
      // Add event listener for page unload to trigger feedback widget
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        document.dispatchEvent(new CustomEvent('ie-feedback-widget-openModal'));
        // Allow normal navigation
        delete event.returnValue;
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        navNextButtons.forEach(button => {
          button.removeEventListener('click', () => {});
        });
      };
    };
    
    return () => {
      setupSurveyFeedback();
      clearInterval(copyrightInterval);
    };
  }, []);

  return null;
}

export default App;
