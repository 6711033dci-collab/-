// src/loginOverlay.ts

// 🟢 รหัสผ่านสำหรับเข้าเล่นเกม
const CORRECT_PASSWORD = "yourPassword123";

// 🟢 https://script.google.com/macros/s/AKfycbxcXKU-4Jx5FvAoBiuvCras-j6FPdbJD0TtN7dmmQJF7EN281567PE2XRkqAJsPYWisbA/exec
const SHEET_SCRIPT_URL = "";

// ───────────────────────────────────────────────────────
// ฟังก์ชัน: ส่ง POST บันทึกการล็อกอินไปยัง Google Sheets
// ───────────────────────────────────────────────────────
async function recordLogin(username: string): Promise<void> {
  if (!SHEET_SCRIPT_URL) {
    console.warn('[Login] SHEET_SCRIPT_URL ยังไม่ได้ตั้งค่า – ข้ามการบันทึก');
    return;
  }
  try {
    await fetch(SHEET_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'login', username }),
    });
    console.log('[Login] บันทึกการเข้าสู่ระบบเรียบร้อย:', username);
  } catch (err) {
    console.error('[Login] บันทึกล้มเหลว:', err);
  }
}

// ───────────────────────────────────────────────────────
// ฟังก์ชัน: ดึงประวัติการเข้าใช้งานล่าสุดจาก Google Sheets
// ───────────────────────────────────────────────────────
interface LoginRecord {
  username: string;
  timestamp: string;
}

async function fetchLoginHistory(): Promise<LoginRecord[]> {
  if (!SHEET_SCRIPT_URL) {
    console.warn('[Login] SHEET_SCRIPT_URL ยังไม่ได้ตั้งค่า – ข้ามการดึงประวัติ');
    return [];
  }
  try {
    const res = await fetch(`${SHEET_SCRIPT_URL}?action=loginHistory&t=${Date.now()}`);
    const data: LoginRecord[] = await res.json();
    return Array.isArray(data) ? data.slice(0, 10) : [];
  } catch (err) {
    console.error('[Login] ดึงประวัติล้มเหลว:', err);
    return [];
  }
}

// ───────────────────────────────────────────────────────
// ฟังก์ชัน: Render ส่วนแสดงประวัติการเข้าใช้งาน
// ───────────────────────────────────────────────────────
function renderLoginHistory(records: LoginRecord[]): string {
  if (records.length === 0) {
    return `
      <div class="login-history-empty">
        <span style="font-size:1.5rem;">📭</span>
        <span>ยังไม่มีประวัติการเข้าใช้งาน</span>
      </div>
    `;
  }

  const items = records
    .map(
      (r, i) => `
      <div class="login-history-item" style="animation-delay: ${i * 60}ms">
        <div class="login-history-avatar">${r.username.charAt(0).toUpperCase()}</div>
        <div class="login-history-info">
          <span class="login-history-name">${escapeHtml(r.username)}</span>
          <span class="login-history-time">${escapeHtml(r.timestamp)}</span>
        </div>
      </div>
    `
    )
    .join('');

  return items;
}

function escapeHtml(text: string): string {
  const el = document.createElement('span');
  el.textContent = text;
  return el.innerHTML;
}

// ───────────────────────────────────────────────────────
// ฟังก์ชันหลัก: สร้าง Login Overlay
// ───────────────────────────────────────────────────────
export function initLoginOverlay() {
  // ล้างค่าผู้เล่นเก่าทิ้งทุกครั้งที่เปิดลิงก์/รีเฟรชหน้าเว็บ
  localStorage.clear();
  sessionStorage.clear();

  // ─── Inject CSS animation keyframes & styles ───
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes loginFadeIn {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes loginShake {
      0%, 100% { transform: translateX(0); }
      15%      { transform: translateX(-8px); }
      30%      { transform: translateX(8px); }
      45%      { transform: translateX(-6px); }
      60%      { transform: translateX(6px); }
      75%      { transform: translateX(-3px); }
      90%      { transform: translateX(3px); }
    }
    @keyframes loginPulseGlow {
      0%, 100% { box-shadow: 0 0 30px rgba(99,102,241,0.15), 0 20px 60px rgba(0,0,0,0.4); }
      50%      { box-shadow: 0 0 50px rgba(99,102,241,0.3), 0 20px 60px rgba(0,0,0,0.5); }
    }
    @keyframes historySlideIn {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes spinLoader {
      to { transform: rotate(360deg); }
    }

    /* ─── Login Overlay ─── */
    #login-overlay {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(8, 10, 25, 0.97) !important;
      backdrop-filter: blur(20px) saturate(1.2) !important;
      -webkit-backdrop-filter: blur(20px) saturate(1.2) !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      z-index: 999999 !important;
      overflow-y: auto !important;
      padding: 1.5rem !important;
    }

    /* ─── Card Container ─── */
    .login-card {
      max-width: 420px;
      width: 100%;
      padding: 2.2rem 2rem;
      border-radius: 20px;
      background: linear-gradient(145deg, rgba(30, 34, 60, 0.95), rgba(20, 22, 45, 0.98));
      border: 1px solid rgba(99, 102, 241, 0.2);
      text-align: center;
      animation: loginFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both,
                 loginPulseGlow 4s ease-in-out infinite;
    }

    .login-card.shake {
      animation: loginShake 0.5s ease;
    }

    /* ─── Title ─── */
    .login-title {
      color: #fff;
      margin-bottom: 0.3rem;
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .login-subtitle {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
    }

    /* ─── Error Message ─── */
    .login-error {
      color: #fca5a5;
      font-size: 0.85rem;
      margin-bottom: 0.8rem;
      display: none;
      background: rgba(239, 68, 68, 0.12);
      padding: 0.6rem 0.8rem;
      border-radius: 10px;
      border: 1px solid rgba(239, 68, 68, 0.25);
      line-height: 1.4;
    }

    /* ─── Form ─── */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .login-input {
      padding: 0.8rem 1rem;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.45);
      color: #fff;
      text-align: center;
      outline: none;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .login-input::placeholder {
      color: rgba(255,255,255,0.3);
    }
    .login-input:focus {
      border-color: rgba(99,102,241,0.6);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    }

    /* ─── Submit Button ─── */
    .login-submit {
      margin-top: 0.4rem;
      padding: 0.8rem;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      font-size: 1.05rem;
      font-family: inherit;
      transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
      box-shadow: 0 4px 18px rgba(99,102,241,0.35);
    }
    .login-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(99,102,241,0.5);
      filter: brightness(1.08);
    }
    .login-submit:active {
      transform: translateY(0);
    }

    /* ─── Divider ─── */
    .login-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      margin: 1.4rem 0 1rem;
    }

    /* ─── History Section ─── */
    .login-history-header {
      color: #a5b4fc;
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 0.7rem;
      text-align: left;
    }
    .login-history-list {
      max-height: 280px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-right: 4px;
    }
    .login-history-list::-webkit-scrollbar {
      width: 4px;
    }
    .login-history-list::-webkit-scrollbar-thumb {
      background: rgba(99,102,241,0.3);
      border-radius: 4px;
    }
    .login-history-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.55rem 0.7rem;
      border-radius: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.05);
      transition: background 0.2s;
      animation: historySlideIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
    }
    .login-history-item:hover {
      background: rgba(255,255,255,0.06);
    }
    .login-history-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #6366f1, #a78bfa);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .login-history-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      min-width: 0;
    }
    .login-history-name {
      color: #e2e8f0;
      font-size: 0.88rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .login-history-time {
      color: #64748b;
      font-size: 0.75rem;
    }
    .login-history-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 1rem;
      color: #64748b;
      font-size: 0.85rem;
    }

    /* ─── Loader ─── */
    .login-history-loader {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 1.2rem;
      color: #64748b;
      font-size: 0.85rem;
    }
    .login-history-loader::before {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid rgba(99,102,241,0.3);
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spinLoader 0.7s linear infinite;
    }

    /* ─── Responsive ─── */
    @media (max-width: 480px) {
      .login-card {
        padding: 1.5rem 1.2rem;
        border-radius: 16px;
      }
      .login-title { font-size: 1.35rem; }
      .login-history-list { max-height: 200px; }
    }
  `;
  document.head.appendChild(styleEl);

  // ─── สร้าง Overlay DOM ───
  const overlay = document.createElement('div');
  overlay.id = 'login-overlay';

  overlay.innerHTML = `
    <div class="login-card">
      <h2 class="login-title">เข้าสู่ระบบผู้เล่น 🔑</h2>
      <p class="login-subtitle">กรอกชื่อและรหัสผ่านเพื่อเริ่มเล่นเกม</p>

      <div id="login-error-msg" class="login-error"></div>

      <form id="overlay-login-form" class="login-form">
        <input
          type="text"
          id="overlay-player-name"
          class="login-input"
          placeholder="ชื่อผู้เล่น..."
          required
          autocomplete="off"
        />
        <input
          type="password"
          id="overlay-player-password"
          class="login-input"
          placeholder="รหัสผ่าน..."
          required
          autocomplete="off"
        />
        <button type="submit" class="login-submit">เริ่มเล่นเกม 🚀</button>
      </form>

      <div class="login-divider"></div>

      <div class="login-history-header">📋 ประวัติการเข้าใช้งานล่าสุด</div>
      <div id="login-history-list" class="login-history-list">
        <div class="login-history-loader">กำลังโหลดประวัติ…</div>
      </div>
    </div>
  `;

  // บังคับแปะ Overlay ลงใน body ทันที
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    window.addEventListener('DOMContentLoaded', () => document.body.appendChild(overlay));
  }

  // ─── ดึงประวัติการเข้าใช้งานมาแสดง ───
  const historyContainer = document.getElementById('login-history-list');
  fetchLoginHistory().then((records) => {
    if (historyContainer) {
      historyContainer.innerHTML = renderLoginHistory(records);
    }
  });

  // ─── จัดการ Form Submit ───
  const form = document.getElementById('overlay-login-form');
  const errorMsg = document.getElementById('login-error-msg');
  const loginCard = overlay.querySelector('.login-card') as HTMLElement | null;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('overlay-player-name') as HTMLInputElement;
    const passInput = document.getElementById('overlay-player-password') as HTMLInputElement;

    const username = nameInput?.value.trim();
    const password = passInput?.value.trim();

    // ─── ตรวจสอบรหัสผ่าน ───
    if (password !== CORRECT_PASSWORD) {
      // แสดงข้อความเตือนสีแดง
      if (errorMsg) {
        errorMsg.textContent = '❌ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
        errorMsg.style.display = 'block';
      }
      // ล้างช่องกรอกรหัสผ่าน
      passInput.value = '';
      passInput.focus();

      // เพิ่ม shake animation ให้การ์ด
      if (loginCard) {
        loginCard.classList.remove('shake');
        void loginCard.offsetWidth; // trigger reflow
        loginCard.classList.add('shake');
      }

      return; // ❌ บล็อกไม่ให้ปิด Overlay หรือเข้าเกมเด็ดขาด
    }

    // ─── รหัสผ่านถูกต้อง ───
    if (username) {
      // บันทึกชื่อผู้เล่นลง sessionStorage
      sessionStorage.setItem('player_name', username);

      // ส่ง POST บันทึกการล็อกอินไปยัง Google Sheets (ไม่ block UI)
      recordLogin(username);

      // ปิด Overlay ด้วย fade-out animation
      overlay.style.transition = 'opacity 0.35s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 350);
    }
  });
}

// บังคับเรียกใช้งานทันทีที่สคริปต์ถูกโหลด
initLoginOverlay();