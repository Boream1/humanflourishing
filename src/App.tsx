
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Chapter1Content from './components/Chapter1Content';
import Chapter2Content from './components/Chapter2Content';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
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
    
    // Set up survey feedback
    setupSurveyFeedback();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path="/chapter1" element={<Chapter1Content />} />
              <Route path="/chapter2" element={<Chapter2Content />} />
              <Route path="/chapter3" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </>
  );
}

export default App;
