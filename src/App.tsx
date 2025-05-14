
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Chapter1Content from './components/Chapter1Content';
import Chapter2Content from './components/Chapter2Content';
import NotFound from './pages/NotFound';
import './App.css';
import { LanguageProvider } from "./context/LanguageContext";

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
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter1" element={
          <MainLayout>
            <Chapter1Content />
          </MainLayout>
        } />
        <Route path="/chapter2" element={
          <MainLayout>
            <Chapter2Content />
          </MainLayout>
        } />
        <Route path="/chapter3" element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } />
        <Route path="*" element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        } />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
