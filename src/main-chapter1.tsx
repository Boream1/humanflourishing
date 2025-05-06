
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';

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
