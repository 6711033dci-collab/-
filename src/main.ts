import './style.css';
import { GameEngine } from './components/gameEngine';
import { UIManager } from './components/uiManager';

document.addEventListener('DOMContentLoaded', () => {
  const engine = new GameEngine();
  new UIManager(engine);
  console.log('Vibhatti Game initialized successfully!');
});
