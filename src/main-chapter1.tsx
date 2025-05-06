
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';
import '../styles/media.css'; // Make sure media styles are loaded

console.log('Starting to load Chapter 1 main script');

// Function to ensure videojs is available
const ensureVideojsLoaded = (callback: () => void) => {
  // Check if videojs is already available
  if (window.videojs) {
    console.log('VideoJS already loaded, proceeding with rendering');
    callback();
    return;
  }

  console.log('Waiting for VideoJS to load...');
  
  // Check periodically if videojs has loaded
  const checkInterval = setInterval(() => {
    if (window.videojs) {
      clearInterval(checkInterval);
      console.log('VideoJS loaded, proceeding with rendering');
      callback();
    }
  }, 500);

  // Set a timeout to prevent infinite waiting
  setTimeout(() => {
    clearInterval(checkInterval);
    console.warn('VideoJS not loaded after timeout, attempting to render anyway');
    callback();
  }, 10000);
};

// Function to render the content
const renderContent = () => {
  const rootElement = document.getElementById('chapter1-content');
  
  if (rootElement) {
    console.log('Found chapter1-content element, rendering Chapter1Content component');
    try {
      createRoot(rootElement).render(<Chapter1Content />);
      console.log('Chapter1Content component rendered successfully');
    } catch (error) {
      console.error('Error rendering Chapter1Content:', error);
    }
  } else {
    console.error('Chapter 1 content root element not found');
  }
};

// Wait for the DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, ensuring VideoJS is available');
    ensureVideojsLoaded(renderContent);
  });
} else {
  // DOM is already loaded
  console.log('DOM already loaded, ensuring VideoJS is available');
  ensureVideojsLoaded(renderContent);
}
