import configStore from "../stores/configStore";

// TODO: add more locale or move to separate JSON files
const en = {
  "status.sitting": "Already on this table",
  "status.new_shoe": "Shuffling",
  "status.settling": "Settling",
  "status.card_dealing": "Result",
  "common.state.maintenance": "Under maintenance",
};

const zh = {
  "status.sitting": "已在此檯",
  "status.new_shoe": "換靴中",
  "status.settling": "結算中",
  "status.card_dealing": "開牌中",
  "common.state.maintenance": "維護中",
};

const cn = {
  "status.sitting": "已在此台",
  "status.new_shoe": "换靴中",
  "status.settling": "结算中",
  "status.card_dealing": "开牌中",
  "common.state.maintenance": "维护中",
};

const es = {
  "status.sitting": "Ya en esta mesa",
  "status.new_shoe": "Barajando",
  "status.settling": "Resolviendo",
  "status.card_dealing": "Resultado",
  "common.state.maintenance": "En mantenimiento",
};

const id = {
  "status.sitting": "Kamu di sini",
  "status.new_shoe": "Mengocok",
  "status.settling": "Pembayaran",
  "status.card_dealing": "Membuka",
  "common.state.maintenance": "Dalam perbaikan",
};

const inLocale = {
  "status.sitting": "इस टेबल पर पहले से ही",
  "status.new_shoe": "शफल कर रहा है",
  "status.settling": "सेटिलिंग",
  "status.card_dealing": "परिणाम",
  "common.state.maintenance": "अंतर्वार्ता में",
};

const ja = {
  "status.sitting": "既にこのテーブルで",
  "status.new_shoe": "シャッフル中",
  "status.settling": "決済中",
  "status.card_dealing": "結果",
  "common.state.maintenance": "メンテナンス中",
};

const ko = {
  "status.sitting": "이미 책상에 올려져 있음",
  "status.new_shoe": "셔플중",
  "status.settling": "정산중",
  "status.card_dealing": "결과",
  "common.state.maintenance": "점검중",
};

const my = {
  "status.sitting": "ဒီစားပွဲပေါ် ရောက်နေပြီ",
  "status.new_shoe": "ရှပ်ရှပ်",
  "status.settling": "ဖြေရှင်းပါ",
  "status.card_dealing": "ရလဒ်",
  "common.state.maintenance": "မိန်တိန်နက်",
};

const pt = {
  "status.sitting": "Já nesta mesa",
  "status.new_shoe": "Embaralhando",
  "status.settling": "Liquidação",
  "status.card_dealing": "Resultado",
  "common.state.maintenance": "Manutenção",
};

const th = {
  "status.sitting": "คุณอยู่โต๊ะนี้",
  "status.new_shoe": "กำลังสับไพ่",
  "status.settling": "กำลังชำระ",
  "status.card_dealing": "กำลังเปิดไพ่",
  "common.state.maintenance": "คุณอยู่โต๊ะนี้",
};

const tl = {
  "status.sitting": "Nasa mesa na ito",
  "status.new_shoe": "Binabalasa",
  "status.settling": "Inaayos",
  "status.card_dealing": "Resulta",
  "common.state.maintenance": "Isinasaayos pa",
};

const tr = {
  "status.sitting": "Bu Masada Zaten Var",
  "status.new_shoe": "Karıştırma",
  "status.settling": "Yerleştirme",
  "status.card_dealing": "Sonuç",
  "common.state.maintenance": "Bakımda",
};

const vi = {
  "status.sitting": "đã ở bàn này",
  "status.new_shoe": "Thay bài",
  "status.settling": "Đang thanh toán",
  "status.card_dealing": "Đang mở bài",
  "common.state.maintenance": "đã ở bàn này",
};

const locales: { [key: string]: { [key: string]: string } } = {
  en,
  zh,
  cn,
  es,
  id,
  in: inLocale,
  ja,
  ko,
  my,
  pt,
  th,
  tl,
  tr,
  vi,
};

export const t = (key: string) => {
  const lang = configStore.getState().language || "";
  const value = locales[lang]?.[key] || key;
  return value;
};

export default { t };
