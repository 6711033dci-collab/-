import './loginOverlay';
import './style.css';
import { GameEngine } from './components/gameEngine';
import { UIManager } from './components/uiManager';

document.addEventListener('DOMContentLoaded', () => {
  // 🟢 เคลียร์ชื่อผู้เล่นเดิมทิ้งทันทีที่โหลดหน้าเว็บใหม่
  localStorage.removeItem('playerName');
  sessionStorage.removeItem('playerName');
  localStorage.removeItem('username');
  sessionStorage.removeItem('username');

  const engine = new GameEngine();
  new UIManager(engine);
  console.log('Vibhatti Game initialized successfully!');
});