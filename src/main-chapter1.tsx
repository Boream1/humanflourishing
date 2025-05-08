
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';
import '../styles/media.css';

// Global error handler
const handleError = (error: Error) => {
  console.error('Error in chapter 1 rendering:', error);
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Failed to load content. Please refresh the page.';
    loadingIndicator.replaceWith(errorMessage);
  }
};

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
      throw new Error('Chapter 1 content root element not found');
    }

    console.log('Found chapter1-content element, rendering Chapter1Content component');
    createRoot(chapter1Root).render(<Chapter1Content />);
    console.log('Chapter1Content component rendered successfully');
  } catch (error) {
    handleError(error as Error);
  }
};

// Function to load application with robust retry mechanism
const initializeApp = (retries = 0, maxRetries = 20) => {
  if (retries >= maxRetries) {
    console.error(`Max retries (${maxRetries}) reached. Could not initialize Chapter 1 content.`);
    handleError(new Error('Failed to initialize after maximum retries'));
    return;
  }

  // Check if document is ready and VideoJS is loaded
  if (document.readyState === 'complete' && isVideoJSLoaded()) {
    console.log('Document ready and VideoJS loaded, rendering content');
    // Add a small delay to ensure the DOM is fully processed
    setTimeout(renderContent, 300);
  } else {
    const waiting = document.readyState !== 'complete' ? 'document loading' : 'VideoJS';
    console.log(`Waiting for ${waiting} to be ready (attempt ${retries + 1}/${maxRetries})`);
    setTimeout(() => initializeApp(retries + 1, maxRetries), 300);
  }
};

// Try to load as soon as possible but also set up multiple fallbacks
try {
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
    const hasContent = chapter1Root && chapter1Root.children.length > 0 && 
                      !chapter1Root.querySelector('.loading-indicator');
    
    if (!hasContent) {
      console.log('Forced initialization after timeout');
      initializeApp();
    }
  }, 3000);

} catch (error) {
  // Last-resort error handler
  handleError(error as Error);
}
