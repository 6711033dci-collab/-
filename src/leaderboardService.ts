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
        action: 'score', // 👈 เพิ่มบรรทัดนี้เข้ามาครับ!
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