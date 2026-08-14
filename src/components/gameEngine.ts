import { VocabularyNoun, GameCard, UserPlacement, VibhattiType, VacanaType } from '../types';
import { verifiedVocabulary } from '../data/vocabulary';

export class GameEngine {
  private currentWordIndex: number = 0;
  private score: number = 0;
  private currentWord: VocabularyNoun | null = null;
  private placements: Map<string, UserPlacement> = new Map();
  private deck: GameCard[] = [];

  // ⏱️ เพิ่ม State สำหรับจับเวลา และสถิติ
  private startTime: number = 0;
  private endTime: number = 0;
  private isPlaying: boolean = false;

  constructor() {
    this.resetPlacements();
  }

  private resetPlacements(): void {
    this.placements.clear();
    const vibhattis: VibhattiType[] = ['ปฐมา', 'ทุติยา', 'ตติยา', 'จตุตถี', 'ปัญจมี', 'ฉัฏฐี', 'สัตตมี', 'อาลปนะ'];
    const vacanas: VacanaType[] = ['เอกวจนะ', 'พหุวจนะ'];

    for (const vibhatti of vibhattis) {
      for (const vacana of vacanas) {
        const key = `${vibhatti}-${vacana}`;
        this.placements.set(key, {
          vibhatti,
          vacana,
          cards: []
        });
      }
    }
  }

  public startNewGame(): VocabularyNoun {
    this.score = 0;
    this.resetPlacements();
    
    this.currentWordIndex = Math.floor(Math.random() * verifiedVocabulary.length);
    this.currentWord = verifiedVocabulary[this.currentWordIndex];

    this.deck = [];
    
    // สร้างการ์ดออกมาครบทุกคำตอบ
    this.currentWord.declension.forEach((decl, idx) => {
      decl.answers.forEach((ans, ansIdx) => {
        this.deck.push({
          id: `card-${idx}-${ansIdx}-${Math.random().toString(36).substring(2, 6)}`,
          text: ans,
          correctVibhatti: decl.vibhatti,
          correctVacana: decl.vacana
        });
      });
    });

    // สลับตำแหน่งการ์ดในกอง
    this.deck.sort(() => Math.random() - 0.5);

    // ⏱️ เริ่มจับเวลาเมื่อเริ่มเกม
    this.startTimer();

    return this.currentWord;
  }

  // ⏱️ ระบบจับเวลา (Timer Functions)
  public startTimer(): void {
    this.startTime = performance.now();
    this.endTime = 0;
    this.isPlaying = true;
  }

  public stopTimer(): number {
    if (!this.isPlaying) return this.getTimeElapsed();
    this.endTime = performance.now();
    this.isPlaying = false;
    return this.getTimeElapsed();
  }

  // ดึงเวลาปัจจุบันที่ใช้ไป (วินาที ทศนิยม 2 ตำแหน่ง)
  public getTimeElapsed(): number {
    if (this.startTime === 0) return 0;
    const now = this.isPlaying ? performance.now() : this.endTime;
    const seconds = (now - this.startTime) / 1000;
    return Number(seconds.toFixed(2));
  }

  public getCurrentWord(): VocabularyNoun | null { return this.currentWord; }
  public getDeck(): GameCard[] { return this.deck; }
  public getPlacements(): Map<string, UserPlacement> { return this.placements; }

  public placeCard(vibhatti: VibhattiType, vacana: VacanaType, cardId: string, text: string): void {
    const key = `${vibhatti}-${vacana}`;
    this.removeCardById(cardId);

    const slot = this.placements.get(key);
    if (slot) {
      slot.cards.push({ cardId, text });
    }
  }

  public removeCardById(cardId: string): void {
    for (const [_, p] of this.placements.entries()) {
      p.cards = p.cards.filter(c => c.cardId !== cardId);
    }
  }

  public removeCard(vibhatti: VibhattiType, vacana: VacanaType): void {
    const key = `${vibhatti}-${vacana}`;
    const slot = this.placements.get(key);
    if (slot && slot.cards.length > 0) {
      slot.cards.pop();
    }
  }

  // ✅ ตรวจคำตอบ: หยุดจับเวลา และคำนวณคะแนน + เวลา
  public checkAnswers() {
    if (!this.currentWord) throw new Error('No active word.');

    // ⏱️ หยุดจับเวลาทันทีที่กดตรวจคำตอบ
    const timeTaken = this.stopTimer();

    let correctCount = 0;
    let totalCards = this.deck.length;

    const results: Array<{
      vibhatti: VibhattiType;
      vacana: VacanaType;
      userAnswers: string[];
      isCorrect: boolean;
      correctAnswers: string[];
    }> = [];

    this.currentWord.declension.forEach(decl => {
      const key = `${decl.vibhatti}-${decl.vacana}`;
      const userPlacement = this.placements.get(key);
      const userAnswers = userPlacement ? userPlacement.cards.map(c => c.text) : [];

      const uniqueUserAnswers = Array.from(new Set(userAnswers));
      const validPlacedCards = uniqueUserAnswers.filter(ans => decl.answers.includes(ans));
      correctCount += validPlacedCards.length;

      const isCorrect = decl.answers.length === userAnswers.length &&
                        decl.answers.every(ans => userAnswers.includes(ans));

      results.push({
        vibhatti: decl.vibhatti,
        vacana: decl.vacana,
        userAnswers,
        isCorrect,
        correctAnswers: decl.answers
      });
    });

    this.score = correctCount;

    // 💾 บันทึกสถิติลง localStorage อัตโนมัติ (สถิติเวลาที่เร็วที่สุด)
    this.saveBestTime(timeTaken, correctCount, totalCards);

    return {
      score: this.score,
      total: totalCards,
      timeTaken, // ⏱️ ส่งเวลาที่ใช้คืนกลับไปด้วย
      results
    };
  }

  // 💾 บันทึกสถิติสถิติลง LocalStorage
  private saveBestTime(timeTaken: number, score: number, total: number): void {
    if (score !== total) return; // บันทึกเฉพาะรอบที่ตอบถูกหมด 100% เท่านั้น

    const bestTime = localStorage.getItem('pali_best_time');
    if (!bestTime || timeTaken < parseFloat(bestTime)) {
      localStorage.setItem('pali_best_time', timeTaken.toString());
    }
  }

  // 🏆 ดึงสถิติเวลาที่ทำไว้เร็วที่สุด
  public getBestTime(): string {
    const best = localStorage.getItem('pali_best_time');
    return best ? `${best} วินาที` : 'ยังไม่มีสถิติ';
  }

  public getScore(): number { return this.score; }
}