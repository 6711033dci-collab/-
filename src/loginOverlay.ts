export function initLoginOverlay() {
  // 🟢 ล้างค่าการจำรหัสเดิมทิ้งทันที เพื่อบังคับให้ล็อกอินใหม่ทุกรอบ
  localStorage.removeItem('remember_me');

  const overlay = document.createElement('div');
  overlay.id = 'login-overlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);
    display: flex; justify-content: center; align-items: center; z-index: 9999;
  `;

  overlay.innerHTML = `
    <div class="card glass text-center" style="max-width: 360px; width: 90%; padding: 2rem; border-radius: 16px; background: rgba(30, 41, 59, 0.8);">
      <h2 style="color: #fff; margin-bottom: 0.5rem;">เข้าสู่ระบบผู้เล่น 🔑</h2>
      <p style="color: #94a3b8; font-size: 0.9rem;">กรอกชื่อและรหัสผ่านเพื่อเริ่มเล่นเกม</p>
      
      <form id="overlay-login-form" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <input type="text" id="overlay-player-name" placeholder="ชื่อผู้เล่น..." required style="padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); color: #fff; text-align: center; outline: none;">
        
        <input type="password" id="overlay-player-password" placeholder="รหัสผ่าน..." required style="padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); color: #fff; text-align: center; outline: none;">

        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.75rem; font-weight: bold; cursor: pointer;">เริ่มเล่นเกม 🚀</button>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  const form = document.getElementById('overlay-login-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('overlay-player-name') as HTMLInputElement;
    const passInput = document.getElementById('overlay-player-password') as HTMLInputElement;

    const username = nameInput?.value.trim();
    const password = passInput?.value.trim();

    if (username && password) {
      // เซฟชื่อไว้ใช้แค่ใน Session ปัจจุบัน (ปิดเว็บแล้วหายทันที)
      sessionStorage.setItem('player_name', username);
      sessionStorage.setItem('player_password', password);

      // ปิดหน้าล็อกอินเข้าสู่เกม
      overlay.remove();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoginOverlay);
} else {
  initLoginOverlay();
}