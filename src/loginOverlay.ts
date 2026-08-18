export function initLoginOverlay() {
  const savedPlayer = localStorage.getItem('player_name');

  // ถ้ามีชื่อล็อกอินแล้ว ไม่ต้องแสดง Overlay
  if (savedPlayer) return;

  // สร้าง HTML element ของ Login modal ซ้อนทับหน้าจอ
  const overlay = document.createElement('div');
  overlay.id = 'login-overlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);
    display: flex; justify-content: center; align-items: center; z-index: 9999;
  `;

  overlay.innerHTML = `
    <div class="card glass text-center" style="max-width: 360px; width: 90%; padding: 2rem;">
      <h2 style="color: #fff; margin-bottom: 0.5rem;">เข้าสู่ระบบผู้เล่น 🔑</h2>
      <p style="color: #94a3b8; font-size: 0.9rem;">กรอกชื่อผู้เล่นก่อนเริ่มเกม</p>
      <form id="overlay-login-form" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" id="overlay-player-name" placeholder="ใส่ชื่อของคุณ..." required style="padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); color: #fff; text-align: center; outline: none;">
        <button type="submit" class="btn btn-primary">เริ่มเล่นเกม 🚀</button>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  const form = document.getElementById('overlay-login-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('overlay-player-name') as HTMLInputElement;
    if (input && input.value.trim()) {
      localStorage.setItem('player_name', input.value.trim());
      overlay.remove(); // ลบหน้าต่างล็อกอินออกเพื่อเข้าเล่นเกม
    }
  });
}

// รันการทำงานทันทีที่โหลดสคริปต์
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoginOverlay);
} else {
  initLoginOverlay();
}