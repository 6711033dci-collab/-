// src/leaderboardService.ts

// 🟢 นำ URL เว็บแอปที่คัดลอกมาวางในช่องนี้
const API_URL = "https://script.google.com/macros/s/AKfycbxcXKU-4Jx5FvAoBiuvCras-j6FPdbJD0TtN7dmmQJF7EN281567PE2XRkqAJsPYWisbA/exec";

export interface PlayerRecord {
  username: string;
  score: number;
  time: number;
}

// 1. ฟังก์ชันส่งคะแนนเข้า Google Sheets
export async function submitScoreToSheet(username: string, score: number, timeTaken: number) {
  if (!username) return;

  try {
    // ใช้ mode: 'no-cors' และ Content-Type: 'text/plain' เพื่อรองรับ Google Apps Script
    await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        username: username,
        score: score,
        time: timeTaken
      }),
    });
    console.log('บันทึกคะแนนลง Google Sheets เรียบร้อย!');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกคะแนน:', error);
  }
}

// 2. ฟังก์ชันดึง Top 10 และผู้เล่นอันดับ 1
export async function getLeaderboardData(): Promise<{ topPlayers: PlayerRecord[]; rank1: PlayerRecord | null }> {
  try {
    const response = await fetch(`${API_URL}?t=${Date.now()}`);
    const data: PlayerRecord[] = await response.json();

    if (!Array.isArray(data)) {
      return { topPlayers: [], rank1: null };
    }

    // แปลงค่า score และ time ให้เป็นตัวเลขก่อนนำมาเรียงลำดับ
    const sortedData = data
      .map(item => ({
        username: item.username,
        score: Number(item.score) || 0,
        time: Number(item.time) || 0
      }))
      // เรียงตามคะแนนมากไปน้อย ถ้าคะแนนเท่ากันเอาคนที่ใช้น้อยกว่าขึ้นก่อน
      .sort((a, b) => b.score - a.score || a.time - b.time);

    const topPlayers = sortedData.slice(0, 10);
    const rank1 = sortedData.length > 0 ? sortedData[0] : null;

    return { topPlayers, rank1 };
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลอันดับ:', error);
    return { topPlayers: [], rank1: null };
  }
}