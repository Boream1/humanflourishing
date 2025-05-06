
import { createRoot } from 'react-dom/client';
import Chapter1Content from './components/Chapter1Content';
import './index.css';

const chapter1Root = document.getElementById('chapter1-content');
if (chapter1Root) {
  createRoot(chapter1Root).render(<Chapter1Content />);
} else {
  console.error('Chapter 1 content root element not found');
}
