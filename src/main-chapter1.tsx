
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
    // Remove loading indicator if present
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

// Function to load application with more robust retry mechanism
const initializeApp = (retries = 0, maxRetries = 30) => {
  if (retries >= maxRetries) {
    console.error('Max retries reached. Could not initialize Chapter 1 content.');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Failed to load content. Please refresh the page.';
    
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.replaceWith(errorMessage);
    } else {
      const chapter1Root = document.getElementById('chapter1-content');
      if (chapter1Root) {
        chapter1Root.appendChild(errorMessage);
      }
    }
    return;
  }

  // Check if document is ready and VideoJS is loaded
  if (document.readyState === 'complete' && isVideoJSLoaded()) {
    console.log('Document ready and VideoJS loaded, rendering content');
    // Add a small delay to ensure the DOM is fully processed
    setTimeout(renderContent, 300);
  } else {
    console.log(`Waiting for document and VideoJS to be ready (attempt ${retries + 1}/${maxRetries})`);
    setTimeout(() => initializeApp(retries + 1, maxRetries), 500);
  }
};

// Handle direct script execution
if (document.readyState === 'loading') {
  // DOM still loading, wait for it
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, initializing chapter 1 app');
    initializeApp();
  });
} else {
  // DOM already loaded, initialize directly
  console.log('Document already loaded, initializing chapter 1 app immediately');
  initializeApp();
}

// Force a retry after a set timeout as a fallback
setTimeout(() => {
  const chapter1Root = document.getElementById('chapter1-content');
  if (chapter1Root && !chapter1Root.hasChildNodes()) {
    console.log('Forced initialization after timeout');
    initializeApp();
  }
}, 5000);
