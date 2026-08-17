import { VocabularyNoun, WordData } from '../types';

export const verifiedVocabulary: VocabularyNoun[] = [
  // =========================================================
  // 1. หมวดปุงลิงค์ (Masculine) - 5 การันต์
  // =========================================================

  // 1.1 อ-การันต์ ในปุงลิงค์ (ปุริส)
  {
    id: 'purisa',
    word: 'ปุริส',
    translation: 'ผู้ชาย, บุรุษ',
    declensionType: 'อการันต์ ปุงลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['ปุริโส'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['ปุริสา'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['ปุริสํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['ปุริเส'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['ปุริเสน'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['ปุริเสหิ', 'ปุริเสภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['ปุริสสฺส', 'ปุริสาย', 'ปุริสตฺถํ'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['ปุริสานํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['ปุริสสฺมา', 'ปุริสมฺหา', 'ปุริสา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['ปุริเสหิ', 'ปุริเสภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['ปุริสสฺส'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['ปุริสานํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['ปุริสสฺมึ', 'ปุริสมฺหิ', 'ปุริเส'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['ปุริเสสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['ปุริส'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['ปุริสา'] }
    ]
  },

  // 1.2 อิ-การันต์ ในปุงลิงค์ (มุนิ)
  {
    id: 'muni',
    word: 'มุนิ',
    translation: 'ผู้รู้, พระมุนี',
    declensionType: 'อิการันต์ ปุงลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['มุนิ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['มุนโย', 'มุนี'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['มุนึ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['มุนโย', 'มุนี'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['มุนินา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['มุนีหิ', 'มุนีภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['มุนิสฺส', 'มุนิโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['มุนีนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['มุนิสฺมา', 'มุนิมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['มุนีหิ', 'มุนีภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['มุนิสฺส', 'มุนิโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['มุนีนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['มุนิสฺมึ', 'มุนิมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['มุนีสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['มุนิ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['มุนโย', 'มุนี'] }
    ]
  },

  // 1.3 อี-การันต์ ในปุงลิงค์ (เสฏฐี)
  {
    id: 'setthi',
    word: 'เสฏฐี',
    translation: 'เศรษฐี',
    declensionType: 'อีการันต์ ปุงลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['เสฏฐี'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['เสฏฐิโน', 'เสฏฐี'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['เสฏฐึ', 'เสฏฐินํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['เสฏฐิโน', 'เสฏฐี'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['เสฏฐินา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['เสฏฐีหิ', 'เสฏฐีภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['เสฏฐิสฺส', 'เสฏฐิโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['เสฏฐีนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['เสฏฐิสฺมา', 'เสฏฐิมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['เสฏฐีหิ', 'เสฏฐีภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['เสฏฐิสฺส', 'เสฏฐิโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['เสฏฐีนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['เสฏฐิสฺมึ', 'เสฏฐิมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['เสฏฐีสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['เสฏฐิ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['เสฏฐิโน', 'เสฏฐี'] }
    ]
  },

  // 1.4 อุ-การันต์ ในปุงลิงค์ (ครุ)
  {
    id: 'garu',
    word: 'ครุ',
    translation: 'ครู',
    declensionType: 'อุการันต์ ปุงลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['ครุ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['ครโว', 'ครู'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['ครุํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['ครโว', 'ครู'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['ครุนา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['ครูหิ', 'ครูภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['ครุสฺส', 'ครุโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['ครูนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['ครุสฺมา', 'ครุมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['ครูหิ', 'ครูภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['ครุสฺส', 'ครุโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['ครูนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['ครุสฺมึ', 'ครุมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['ครูสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['ครุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['ครเว', 'ครโว'] }
    ]
  },

  // 1.5 อู-การันต์ ในปุงลิงค์ (วิญฺญู)
  {
    id: 'vinnyu',
    word: 'วิญฺญู',
    translation: 'ผู้รู้แจ้ง',
    declensionType: 'อูการันต์ ปุงลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['วิญฺญู'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['วิญฺญุโน', 'วิญฺญู'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['วิญฺญุํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['วิญฺญุโน', 'วิญฺญู'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['วิญฺญุนา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['วิญฺญูหิ', 'วิญฺญูภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['วิญฺญุสฺส', 'วิญฺญุโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['วิญฺญูนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['วิญฺญุสฺมา', 'วิญฺญุมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['วิญฺญูหิ', 'วิญฺญูภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['วิญฺญุสฺส', 'วิญฺญุโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['วิญฺญูนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['วิญฺญุสฺมึ', 'วิญฺญุมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['วิญฺญูสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['วิญฺญุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['วิญฺญุโน', 'วิญฺญู'] }
    ]
  },

  // =========================================================
  // 2. หมวดอิตถีลิงค์ (Feminine) - 5 การันต์
  // =========================================================

  // 2.1 อา-การันต์ ในอิตถีลิงค์ (กญฺญา)
  {
    id: 'kanna',
    word: 'กญฺญา',
    translation: 'นางสาวน้อย, เด็กหญิง',
    declensionType: 'อาการันต์ อิตถีลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['กญฺญา'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['กญฺญาโย', 'กญฺญา'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['กญฺญํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['กญฺญาโย', 'กญฺญา'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['กญฺญาย'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['กญฺญาหิ', 'กญฺญาภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['กญฺญาย'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['กญฺญานํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['กญฺญาย'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['กญฺญาหิ', 'กญฺญาภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['กญฺญาย'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['กญฺญานํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['กญฺญาย', 'กญฺญายํ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['กญฺญาสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['กญฺเญ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['กญฺญาโย', 'กญฺญา'] }
    ]
  },

  // 2.2 อิ-การันต์ ในอิตถีลิงค์ (รตฺติ)
  {
    id: 'ratti',
    word: 'รตฺติ',
    translation: 'ราตรี, กลางคืน',
    declensionType: 'อิการันต์ อิตถีลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['รตฺติ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['รตฺติโย', 'รตฺตี'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['รตฺตึ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['รตฺติโย', 'รตฺตี'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['รตฺติยา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['รตฺตีหิ', 'รตฺตีภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['รตฺติยา'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['รตฺตีนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['รตฺติยา', 'รตฺยา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['รตฺตีหิ', 'รตฺตีภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['รตฺติยา'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['รตฺตีนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['รตฺติยา', 'รตฺติยํ', 'รตฺยํ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['รตฺตีสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['รตฺติ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['รตฺติโย', 'รตฺตี'] }
    ]
  },

  // 2.3 อี-การันต์ ในอิตถีลิงค์ (นารี)
  {
    id: 'nari',
    word: 'นารี',
    translation: 'นาง, หญิง',
    declensionType: 'อีการันต์ อิตถีลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['นารี'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['นาริโย', 'นารี'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['นารึ', 'นาริยํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['นาริโย', 'นารี'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['นาริยา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['นารีหิ', 'นารีภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['นาริยา'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['นารีนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['นาริยา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['นารีหิ', 'นารีภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['นาริยา'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['นารีนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['นาริยา', 'นาริยํ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['นารีสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['นาริ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['นาริโย', 'นารี'] }
    ]
  },

  // 2.4 อุ-การันต์ ในอิตถีลิงค์ (ยาคุ)
  {
    id: 'yagu',
    word: 'ยาคุ',
    translation: 'ข้าวต้ม',
    declensionType: 'อุการันต์ อิตถีลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['ยาคุ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['ยาคุโย', 'ยาคู'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['ยาคุํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['ยาคุโย', 'ยาคู'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['ยาคุยา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['ยาคูหิ', 'ยาคูภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['ยาคุยา'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['ยาคูนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['ยาคุยา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['ยาคูหิ', 'ยาคูภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['ยาคุยา'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['ยาคูนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['ยาคุยา', 'ยาคุยํ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['ยาคูสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['ยาคุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['ยาคุโย', 'ยาคู'] }
    ]
  },

  // 2.5 อู-การันต์ ในอิตถีลิงค์ (วธู)
  {
    id: 'vadhu',
    word: 'วธู',
    translation: 'หญิงสาว, เจ้าสาว',
    declensionType: 'อูการันต์ อิตถีลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['วธู'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['วธุโย', 'วธู'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['วธุํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['วธุโย', 'วธู'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['วธุยา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['วธูหิ', 'วธูภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['วธุยา'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['วธูนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['วธุยา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['วธูหิ', 'วธูภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['วธุยา'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['วธูนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['วธุยา', 'วธุยํ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['วธูสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['วธุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['วธุโย', 'วธู'] }
    ]
  },

  // =========================================================
  // 3. หมวดนปุงสกลิงค์ (Neuter) - 3 การันต์
  // =========================================================

  // 3.1 อ-การันต์ ในนปุงสกลิงค์ (กุล / จิตฺต)
  {
    id: 'citta',
    word: 'จิตฺต',
    translation: 'ใจ, จิต',
    declensionType: 'อการันต์ นปุงสกลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['จิตฺตํ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['จิตฺตานิ'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['จิตฺตํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['จิตฺตานิ'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['จิตฺเตน'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['จิตฺเตหิ', 'จิตฺเตภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['จิตฺตสฺส', 'จิตฺสาย', 'จิตฺตตฺถํ'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['จิตฺตานํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['จิตฺตสฺมา', 'จิตฺตมฺหา', 'จิตฺตา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['จิตฺเตหิ', 'จิตฺเตภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['จิตฺตสฺส'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['จิตฺตานํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['จิตฺตสฺมึ', 'จิตฺตมฺหิ', 'จิตฺเต'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['จิตฺเตสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['จิตฺต'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['จิตฺตานิ'] }
    ]
  },

  // 3.2 อิ-การันต์ ในนปุงสกลิงค์ (อกฺขิ)
  {
    id: 'akkhi',
    word: 'อกฺขิ',
    translation: 'ดวงตา',
    declensionType: 'อิการันต์ นปุงสกลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['อกฺขิ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['อกฺขีนิ', 'อกฺขี'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['อกฺขึ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['อกฺขีนิ', 'อกฺขี'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['อกฺขินา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['อกฺขีหิ', 'อกฺขีภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['อกฺขิสฺส', 'อกฺขิโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['อกฺขีนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['อกฺขิสฺมา', 'อกฺขิมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['อกฺขีหิ', 'อกฺขีภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['อกฺขิสฺส', 'อกฺขิโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['อกฺขีนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['อกฺขิสฺมึ', 'อกฺขิมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['อกฺขีสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['อกฺขิ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['อกฺขีนิ', 'อกฺขี'] }
    ]
  },

  // 3.3 อุ-การันต์ ในนปุงสกลิงค์ (วตฺถุ)
  {
    id: 'vatthu',
    word: 'วตฺถุ',
    translation: 'วัตถุ, พัสดุ, เรื่อง',
    declensionType: 'อุการันต์ นปุงสกลิงค์',
    declension: [
      { vibhatti: 'ปฐมา', vacana: 'เอกวจนะ', answers: ['วตฺถุ'] },
      { vibhatti: 'ปฐมา', vacana: 'พหุวจนะ', answers: ['วตฺถูนิ', 'วตฺถู'] },
      { vibhatti: 'ทุติยา', vacana: 'เอกวจนะ', answers: ['วตฺถุํ'] },
      { vibhatti: 'ทุติยา', vacana: 'พหุวจนะ', answers: ['วตฺถูนิ', 'วตฺถู'] },
      { vibhatti: 'ตติยา', vacana: 'เอกวจนะ', answers: ['วตฺถุนา'] },
      { vibhatti: 'ตติยา', vacana: 'พหุวจนะ', answers: ['วตฺถูหิ', 'วตฺถูภิ'] },
      { vibhatti: 'จตุตถี', vacana: 'เอกวจนะ', answers: ['วตฺถุสฺส', 'วตฺถุโน'] },
      { vibhatti: 'จตุตถี', vacana: 'พหุวจนะ', answers: ['วตฺถูนํ'] },
      { vibhatti: 'ปัญจมี', vacana: 'เอกวจนะ', answers: ['วตฺถุสฺมา', 'วตฺถุมฺหา'] },
      { vibhatti: 'ปัญจมี', vacana: 'พหุวจนะ', answers: ['วตฺถูหิ', 'วตฺถูภิ'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'เอกวจนะ', answers: ['วตฺถุสฺส', 'วตฺถุโน'] },
      { vibhatti: 'ฉัฏฐี', vacana: 'พหุวจนะ', answers: ['วตฺถูนํ'] },
      { vibhatti: 'สัตตมี', vacana: 'เอกวจนะ', answers: ['วตฺถุสฺมึ', 'วตฺถุมฺหิ'] },
      { vibhatti: 'สัตตมี', vacana: 'พหุวจนะ', answers: ['วตฺถูสุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'เอกวจนะ', answers: ['วตฺถุ'] },
      { vibhatti: 'อาลปนะ', vacana: 'พหุวจนะ', answers: ['วตฺถูนิ', 'วตฺถู'] }
    ]
  }
];

// แปลง verifiedVocabulary ให้อยู่ในรูป WordData[] สำหรับ GameEngine
export const STAGES_VOCABULARY: WordData[] = verifiedVocabulary.map((item, index) => {
  const forms: Record<string, string[]> = {};
  item.declension.forEach((d) => {
    const key = `${d.vibhatti}_${d.vacana}`;
    forms[key] = d.answers;
  });

  let gender: 'ปุงลิงค์' | 'อิตถีลิงค์' | 'นปุงสกลิงค์' = 'ปุงลิงค์';
  if (item.declensionType.includes('อิตถีลิงค์')) gender = 'อิตถีลิงค์';
  if (item.declensionType.includes('นปุงสกลิงค์')) gender = 'นปุงสกลิงค์';

  return {
    id: item.id || `word_${index + 1}`,
    stageId: index + 1,
    stageName: `ด่านที่ ${index + 1}: ${item.word}`,
    gender,
    declensionType: item.declensionType,
    word: item.word,
    translation: item.translation,
    forms
  };
});