export type VibhattiType = 'ปฐมา' | 'ทุติยา' | 'ตติยา' | 'จตุตถี' | 'ปัญจมี' | 'ฉัฏฐี' | 'สัตตมี' | 'อาลปนะ';
export type VacanaType = 'เอกวจนะ' | 'พหุวจนะ';

// -------------------------------------------------------------
// โครงสร้างดั้งเดิมสำหรับ Vocabulary และ Declension
// -------------------------------------------------------------
export interface Declension {
  vibhatti: VibhattiType;
  vacana: VacanaType;
  answers: string[];
}

export interface VocabularyNoun {
  id?: string;
  word: string;
  declensionType: string;
  translation: string;
  declension: Declension[];
}

// -------------------------------------------------------------
// โครงสร้างการ์ดและการวางการ์ดบนกระดาน (Board Placement)
// -------------------------------------------------------------
export interface GameCard {
  id: string;
  text: string;
  correctVibhatti?: VibhattiType;
  correctVacana?: VacanaType;
}

export interface PlacedCard {
  cardId: string;
  text: string;
}

// โครงสร้างช่องวางการ์ดแบบ Array (ใส่ได้หลายใบใน 1 ช่อง)
export interface UserPlacement {
  vibhatti: VibhattiType;
  vacana: VacanaType;
  cards: PlacedCard[];
}

// -------------------------------------------------------------
// โครงสร้างระบบด่าน (Stage System) และการตรวจผลลัพธ์
// -------------------------------------------------------------
export interface CardData {
  id: string;
  text: string;
}

export interface WordData {
  id: string;
  stageId: number;
  stageName: string;
  gender: 'ปุงลิงค์' | 'อิตถีลิงค์' | 'นปุงสกลิงค์';
  declensionType: string;
  word: string;
  translation: string;
  forms: Record<string, string[]>;
}

export interface ReviewResult {
  vibhatti: VibhattiType;
  vacana: VacanaType;
  userAnswers: string[];
  correctAnswers: string[];
  isCorrect: boolean;
}

export interface CheckResult {
  score: number;
  total: number;
  timeTaken: string;
  results: ReviewResult[];
}