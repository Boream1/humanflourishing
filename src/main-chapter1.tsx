
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';

// Add a delay to ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Starting to load Chapter 1 content');

  try {
    const chapter1Root = document.getElementById('chapter1-content');
    if (chapter1Root) {
      console.log('Found chapter1-content element, rendering Chapter1Content component');
      createRoot(chapter1Root).render(<Chapter1Content />);
      console.log('Chapter1Content component rendered successfully');
    } else {
      console.error('Chapter 1 content root element not found');
    }
  } catch (error) {
    console.error('Error rendering Chapter 1 content:', error);
  }
});

// Fallback to ensure the app loads even if DOMContentLoaded has already fired
setTimeout(() => {
  const chapter1Root = document.getElementById('chapter1-content');
  if (chapter1Root && !chapter1Root.hasChildNodes()) {
    console.log('Using fallback to render Chapter1Content');
    try {
      createRoot(chapter1Root).render(<Chapter1Content />);
    } catch (error) {
      console.error('Error in fallback rendering:', error);
    }
  }
}, 1000);
