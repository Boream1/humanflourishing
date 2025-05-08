
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';
import '../styles/media.css';

// Function to check if VideoJS is loaded
const isVideoJSLoaded = () => {
  return typeof window.videojs !== 'undefined';
};

// Function to render the content
const renderContent = () => {
  try {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
    
    const chapter1Root = document.getElementById('chapter1-content');
    if (!chapter1Root) {
      console.error('Chapter 1 content root element not found');
      return;
    }

    console.log('Found chapter1-content element, rendering Chapter1Content component');
    createRoot(chapter1Root).render(<Chapter1Content />);
    console.log('Chapter1Content component rendered successfully');
  } catch (error) {
    console.error('Error rendering Chapter 1 content:', error);
  }
};

// Function to initialize the application with retries
const initializeApp = (retries = 0, maxRetries = 20) => {
  if (retries >= maxRetries) {
    console.error('Max retries reached. Could not initialize Chapter 1 content.');
    return;
  }

  if (document.readyState === 'complete' && isVideoJSLoaded()) {
    console.log('Document ready and VideoJS loaded, rendering content');
    renderContent();
  } else {
    console.log(`Waiting for document and VideoJS to be ready (attempt ${retries + 1}/${maxRetries})`);
    setTimeout(() => initializeApp(retries + 1, maxRetries), 500);
  }
};

// Start initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing chapter 1 app');
  initializeApp();
});

// Fallback for when DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, initializing chapter 1 app');
  initializeApp();
}
