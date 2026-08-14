export type VibhattiType = 'ปฐมา' | 'ทุติยา' | 'ตติยา' | 'จตุตถี' | 'ปัญจมี' | 'ฉัฏฐี' | 'สัตตมี' | 'อาลปนะ';
export type VacanaType = 'เอกวจนะ' | 'พหุวจนะ';

// -------------------------------------------------------------
//  เพิ่ม 2 โครงสร้างนี้กลับเข้ามา เพื่อแก้ Error ใน gameEngine.ts
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

export interface GameCard {
  id: string;
  text: string;
  correctVibhatti: VibhattiType;
  correctVacana: VacanaType;
}

export interface PlacedCard {
  cardId: string;
  text: string;
}

// ✅ โครงสร้างช่องวางการ์ดแบบ Array (ใส่หลายใบใน 1 ช่องได้)
export interface UserPlacement {
  vibhatti: VibhattiType;
  vacana: VacanaType;
  cards: PlacedCard[]; 
}