import { VocabularyNoun, GameCard, UserPlacement, VibhattiType, VacanaType } from '../types';
import { verifiedVocabulary } from '../data/vocabulary';

export class GameEngine {
  private currentWordIndex: number = 0;
  private score: number = 0;
  private currentWord: VocabularyNoun | null = null;
  private placements: Map<string, UserPlacement> = new Map();
  private deck: GameCard[] = [];

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
          cards: [] // ✅ เริ่มต้นด้วย Array ว่างเพื่อรับการ์ดหลายใบ
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
    return this.currentWord;
  }

  public getCurrentWord(): VocabularyNoun | null { return this.currentWord; }
  public getDeck(): GameCard[] { return this.deck; }
  public getPlacements(): Map<string, UserPlacement> { return this.placements; }

  // ✅ วางการ์ดลงช่อง (ย้ายการ์ดเดิมถ้าเคยวางไว้ที่อื่น แล้ว Push เข้า Array ของช่องใหม่)
  public placeCard(vibhatti: VibhattiType, vacana: VacanaType, cardId: string, text: string): void {
    const key = `${vibhatti}-${vacana}`;

    // ถอนการ์ดนี้ออกจากช่องเดิมก่อน (ถ้าวางซ้ำที่อื่น)
    this.removeCardById(cardId);

    const slot = this.placements.get(key);
    if (slot) {
      slot.cards.push({ cardId, text });
    }
  }

  // ✅ ลบการ์ดใบที่ระบุออกจากตารางตาม cardId
  public removeCardById(cardId: string): void {
    for (const [_, p] of this.placements.entries()) {
      p.cards = p.cards.filter(c => c.cardId !== cardId);
    }
  }

  // Fallback เผื่อ uiManager เรียกใช้ removeCard แบบเดิม
  public removeCard(vibhatti: VibhattiType, vacana: VacanaType): void {
    const key = `${vibhatti}-${vacana}`;
    const slot = this.placements.get(key);
    if (slot && slot.cards.length > 0) {
      slot.cards.pop(); // ลบใบสุดท้ายออก
    }
  }

  // ✅ ตรวจคำตอบ: ตรวจสอบความถูกต้องและคิดคะแนน
  public checkAnswers() {
    if (!this.currentWord) throw new Error('No active word.');

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

      // กรองเฉพาะคำตอบที่ไม่ซ้ำ และอยู่ในเฉลยเพื่อคิดคะแนน
      const uniqueUserAnswers = Array.from(new Set(userAnswers));
      const validPlacedCards = uniqueUserAnswers.filter(ans => decl.answers.includes(ans));
      correctCount += validPlacedCards.length;

      // ช่องนี้ถูก 100% ต่อเมื่อ จำนวนคำถูกต้องครบ และ ไม่มีคำตอบผิดเกินมา
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

    return {
      score: this.score,
      total: totalCards,
      results
    };
  }

  public getScore(): number { return this.score; }
}