import { submitScoreToSheet, getLeaderboardData } from '../leaderboardService';
import { GameEngine } from './gameEngine';
import { VibhattiType, VacanaType } from '../types';

export class UIManager {
  private engine: GameEngine;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private startTime: number = 0;

  // DOM Elements
  private currentTimer!: HTMLElement;
  private startScreen!: HTMLElement;
  private playScreen!: HTMLElement;
  private resultsScreen!: HTMLElement;

  private btnStart!: HTMLButtonElement;
  private btnReset!: HTMLButtonElement;
  private btnSubmit!: HTMLButtonElement;
  private btnRestart!: HTMLButtonElement;
  private btnHome!: HTMLButtonElement;

  private currentWordTitle!: HTMLElement;
  private currentWordDesc!: HTMLElement;
  private currentScore!: HTMLElement;
  private finalScore!: HTMLElement;
  private feedbackMessage!: HTMLElement;

  private boardGrid!: HTMLElement;
  private sourceCardsContainer!: HTMLElement;
  private reviewList!: HTMLElement;

  // Selection state for click-to-move fallback (mobile support)
  private selectedSourceCard: HTMLElement | null = null;

  constructor(engine: GameEngine) {
    this.engine = engine;
    this.initializeDOMElements();
    this.setupGlobalEvents();
  }

  private initializeDOMElements(): void {
    this.currentTimer = document.getElementById('current-timer')!;
    this.startScreen = document.getElementById('start-screen')!;
    this.playScreen = document.getElementById('play-screen')!;
    this.resultsScreen = document.getElementById('results-screen')!;

    this.btnStart = document.getElementById('btn-start') as HTMLButtonElement;
    this.btnReset = document.getElementById('btn-reset') as HTMLButtonElement;
    this.btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;
    this.btnRestart = document.getElementById('btn-restart') as HTMLButtonElement;
    this.btnHome = document.getElementById('btn-home') as HTMLButtonElement;

    this.currentWordTitle = document.getElementById('current-word-title')!;
    this.currentWordDesc = document.getElementById('current-word-desc')!;
    this.currentScore = document.getElementById('current-score')!;
    this.finalScore = document.getElementById('final-score')!;
    this.feedbackMessage = document.getElementById('feedback-message')!;

    this.boardGrid = document.getElementById('board-grid')!;
    this.sourceCardsContainer = document.getElementById('source-cards-container')!;
    this.reviewList = document.getElementById('review-list')!;
  }

  private setupGlobalEvents(): void {
    // Start game
    this.btnStart.addEventListener('click', () => this.handleStartGame());

    // Submit answers
    this.btnSubmit.addEventListener('click', () => this.handleSubmitAnswers());

    // Reset board
    this.btnReset.addEventListener('click', () => this.handleResetBoard());

    // Play Next / Restart game
    this.btnRestart.addEventListener('click', () => this.handleStartGame());

    // กลับหน้าแรก
    if (this.btnHome) {
      this.btnHome.addEventListener('click', () => {
        this.stopLiveTimer();
        this.switchScreen(this.startScreen);
      });
    }
  }

  // --- Live Timer Controls ---
  private startLiveTimer(): void {
    this.stopLiveTimer();

    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      if (this.currentTimer) {
        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
        this.currentTimer.innerText = elapsed;
      }
    }, 100);
  }

  private stopLiveTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private switchScreen(screen: HTMLElement): void {
    const screens = [this.startScreen, this.playScreen, this.resultsScreen];
    screens.forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  private handleStartGame(): void {
    const word = this.engine.startNewGame();

    this.currentWordTitle.innerText = `ศัพท์หลัก: ${word.word}`;
    this.currentWordDesc.innerText = `${word.declensionType} | คำแปล: ${word.translation}`;
    this.currentScore.innerText = this.engine.getScore().toString();

    this.renderBoard();
    this.renderDeck();

    this.switchScreen(this.playScreen);
    this.startLiveTimer();
  }

  private handleResetBoard(): void {
    const placements = this.engine.getPlacements();
    placements.forEach((p) => {
      p.cards = [];
    });

    this.selectedSourceCard = null;
    this.renderBoard();
    this.renderDeck();
  }

  // 🎯 ฟังก์ชันตรวจคำตอบ และบันทึกคะแนนขึ้น Google Sheets / แสดงอันดับ 1
  private async handleSubmitAnswers(): Promise<void> {
    this.stopLiveTimer();

    const checkResult = this.engine.checkAnswers();
    const currentWord = this.engine.getCurrentWord();
    const timeTaken = Number(checkResult.timeTaken) || 0;

    // 1. ดึงชื่อผู้เล่นจาก localStorage แล้วส่งข้อมูลขึ้น Google Sheets
    const playerName = localStorage.getItem('player_name') || 'ผู้เล่นนิรนาม';
    submitScoreToSheet(playerName, checkResult.score, timeTaken);

    // Update score
    this.finalScore.innerText = `${checkResult.score} / ${checkResult.total}`;

    // Generate feedback message
    const pct = checkResult.total > 0 ? checkResult.score / checkResult.total : 0;
    const wordName = currentWord ? currentWord.word : 'ศัพท์หลัก';
    const bestTime = this.engine.getBestTime();

    let feedback = `👤 ผู้เล่น: ${playerName}\n`;
    feedback += `⏱️ คุณใช้เวลาแจกวิภัตติ: ${checkResult.timeTaken} วินาที\n`;
    feedback += `🏆 สถิติเร็วที่สุดในเครื่อง: ${bestTime}\n\n`;

    if (pct === 1) {
      feedback += `สุดยอดมาก! 🎉 คุณตอบถูกวิภัตติของ ${wordName} ครบถ้วน 100%\n`;
    } else if (pct >= 0.7) {
      feedback += `เก่งมากครับ! 😊 คุณจำวิภัตติส่วนใหญ่ของ ${wordName} ได้ถูกต้องแล้ว\n`;
    } else if (pct >= 0.4) {
      feedback += 'พยายามต่อไปครับ! 👍 ลองทบทวนตารางแจกวิภัตติเพิ่มเติมอีกนิดนะครับ\n';
    } else {
      feedback += 'ลองใหม่อีกครั้งนะครับ! 📖 มาทบทวนตารางวิภัตติไปด้วยกัน\n';
    }

    this.feedbackMessage.innerText = feedback;

    // 2. ดึงข้อมูลตารางอันดับ 1 ออนไลน์มาแสดงเพิ่มใน Feedback
    try {
      const { rank1 } = await getLeaderboardData();
      if (rank1) {
        this.feedbackMessage.innerText += `\n👑 ผู้ครองอันดับ 1 ออนไลน์ปัจจุบัน: ${rank1.username} (${rank1.score} คะแนน | ${rank1.time}s)`;
      }
    } catch (e) {
      console.error('Error loading leaderboard rank 1:', e);
    }

    this.btnRestart.innerText = '🔄 เล่นคำถัดไป / เริ่มใหม่';
    this.renderReviewList(checkResult.results);
    this.switchScreen(this.resultsScreen);
  }

  private renderBoard(): void {
    this.boardGrid.innerHTML = '';
    const vibhattis: VibhattiType[] = ['ปฐมา', 'ทุติยา', 'ตติยา', 'จตุตถี', 'ปัญจมี', 'ฉัฏฐี', 'สัตตมี', 'อาลปนะ'];
    const vacanas: VacanaType[] = ['เอกวจนะ', 'พหุวจนะ'];
    const placements = this.engine.getPlacements();

    const table = document.createElement('table');
    table.className = 'vibhatti-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>วิภัตติ</th>
        <th>เอกวจนะ (Singular)</th>
        <th>พหุวจนะ (Plural)</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (const vibhatti of vibhattis) {
      const tr = document.createElement('tr');

      const tdLabel = document.createElement('td');
      tdLabel.className = 'vibhatti-label';
      tdLabel.innerText = vibhatti;
      tr.appendChild(tdLabel);

      for (const vacana of vacanas) {
        const key = `${vibhatti}-${vacana}`;
        const p = placements.get(key)!;

        const tdSlot = document.createElement('td');
        tdSlot.className = 'drop-zone';
        tdSlot.dataset.vibhatti = vibhatti;
        tdSlot.dataset.vacana = vacana;

        const cardsWrapper = document.createElement('div');
        cardsWrapper.className = 'cards-wrapper';

        if (p && p.cards && p.cards.length > 0) {
          p.cards.forEach(cardData => {
            const card = document.createElement('div');
            card.className = 'placed-card';
            card.id = cardData.cardId;
            card.draggable = true;

            const textSpan = document.createElement('span');
            textSpan.innerText = cardData.text;
            card.appendChild(textSpan);

            const btnRemove = document.createElement('button');
            btnRemove.className = 'btn-remove';
            btnRemove.innerHTML = '&times;';
            btnRemove.addEventListener('click', (e) => {
              e.stopPropagation();
              this.engine.removeCardById(cardData.cardId);
              this.renderBoard();
              this.renderDeck();
            });
            card.appendChild(btnRemove);

            card.addEventListener('dragstart', (e) => this.handleDragStart(e, cardData.cardId, cardData.text));
            card.addEventListener('dragend', () => this.handleDragEnd());

            cardsWrapper.appendChild(card);
          });
        } else {
          const placeholder = document.createElement('span');
          placeholder.className = 'placeholder-text';
          placeholder.innerText = 'วางกล่องคำศัพท์';
          cardsWrapper.appendChild(placeholder);
        }

        tdSlot.appendChild(cardsWrapper);

        tdSlot.addEventListener('dragover', (e) => this.handleDragOver(e));
        tdSlot.addEventListener('dragleave', () => tdSlot.classList.remove('drag-over'));
        tdSlot.addEventListener('drop', (e) => this.handleDrop(e, vibhatti, vacana));
        tdSlot.addEventListener('click', () => this.handleSlotClick(vibhatti, vacana));

        tr.appendChild(tdSlot);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    this.boardGrid.appendChild(table);
  }

  private renderDeck(): void {
    this.sourceCardsContainer.innerHTML = '';
    const deck = this.engine.getDeck();
    const placements = this.engine.getPlacements();

    const placedCardIds = new Set<string>();
    placements.forEach(p => {
      if (p && p.cards) {
        p.cards.forEach(c => placedCardIds.add(c.cardId));
      }
    });

    const activeCards = deck.filter(card => !placedCardIds.has(card.id));

    if (activeCards.length === 0) {
      this.sourceCardsContainer.innerHTML = '<p class="text-muted text-center py-3">จัดเรียงกล่องรูปคำลงตารางครบถ้วนแล้ว!</p>';
      return;
    }

    activeCards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card-item';
      cardEl.id = card.id;
      cardEl.innerText = card.text;
      cardEl.draggable = true;

      cardEl.addEventListener('dragstart', (e) => this.handleDragStart(e, card.id, card.text));
      cardEl.addEventListener('dragend', () => this.handleDragEnd());

      cardEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleSourceCardClick(cardEl);
      });

      this.sourceCardsContainer.appendChild(cardEl);
    });
  }

  // --- HTML5 Drag & Drop Logic ---
  private handleDragStart(e: DragEvent, id: string, text: string): void {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', JSON.stringify({ id, text }));
      e.dataTransfer.effectAllowed = 'move';
    }
    const cardEl = document.getElementById(id);
    if (cardEl) {
      cardEl.classList.add('dragging');
    }
  }

  private handleDragEnd(): void {
    const draggingCards = document.querySelectorAll('.card-item.dragging, .placed-card.dragging');
    draggingCards.forEach(c => c.classList.remove('dragging'));
  }

  private handleDragOver(e: DragEvent): void {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    const cell = e.currentTarget as HTMLElement;
    cell.classList.add('drag-over');
  }

  private handleDrop(e: DragEvent, vibhatti: VibhattiType, vacana: VacanaType): void {
    e.preventDefault();
    const cell = e.currentTarget as HTMLElement;
    cell.classList.remove('drag-over');

    if (e.dataTransfer) {
      try {
        const { id, text } = JSON.parse(e.dataTransfer.getData('text/plain'));
        this.engine.placeCard(vibhatti, vacana, id, text);
        this.renderBoard();
        this.renderDeck();
      } catch (err) {
        console.error('Drop error:', err);
      }
    }
  }

  // --- Click-to-Move / Mobile Touch Interaction Logic ---
  private handleSourceCardClick(cardEl: HTMLElement): void {
    if (this.selectedSourceCard === cardEl) {
      this.selectedSourceCard.classList.remove('selected');
      this.selectedSourceCard = null;
    } else {
      if (this.selectedSourceCard) {
        this.selectedSourceCard.classList.remove('selected');
      }
      this.selectedSourceCard = cardEl;
      this.selectedSourceCard.classList.add('selected');
    }
  }

  private handleSlotClick(vibhatti: VibhattiType, vacana: VacanaType): void {
    if (this.selectedSourceCard) {
      const id = this.selectedSourceCard.id;
      const text = this.selectedSourceCard.innerText;

      this.engine.placeCard(vibhatti, vacana, id, text);

      this.selectedSourceCard.classList.remove('selected');
      this.selectedSourceCard = null;

      this.renderBoard();
      this.renderDeck();
    }
  }

  // --- Render review items ---
  private renderReviewList(results: any[]): void {
    this.reviewList.innerHTML = '';

    results.forEach(r => {
      const item = document.createElement('div');
      item.className = `review-item ${r.isCorrect ? 'correct' : 'incorrect'}`;

      const icon = r.isCorrect ? '✔️' : '❌';
      const statusText = r.isCorrect ? 'ถูกต้อง' : 'ผิดพลาด';

      const userAnsText = r.userAnswers && r.userAnswers.length > 0
        ? r.userAnswers.join(', ')
        : '(ยังไม่ได้ระบุ)';

      item.innerHTML = `
        <div class="review-meta">
          <strong>${r.vibhatti} - ${r.vacana}</strong>
          <span class="status-badge">${icon} ${statusText}</span>
        </div>
        <div class="review-details">
          <div>คำตอบของคุณ: <code class="user-val">${userAnsText}</code></div>
          <div>คำเฉลย/รูปแบบที่ถูกต้อง: <code class="correct-val">${r.correctAnswers.join(' หรือ ')}</code></div>
        </div>
      `;

      this.reviewList.appendChild(item);
    });
  }
}