export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export const questionBank: QuizQuestion[] = [
  { question: "Jika Vektor A = (3, 4), berapakah magnitudo dari Vektor A?", options: ["5", "7", "1", "12"], answer: "5" },
  { question: "Besaran yang hanya memiliki nilai saja disebut...", options: ["Vektor", "Skalar", "Resultan", "Komponen"], answer: "Skalar" },
  { question: "Jika Vektor A = (2, 1) dan Vektor B = (1, 3), maka Vektor Resultan A + B adalah...", options: ["(3, 3)", "(3, 4)", "(4, 3)", "(1, -2)"], answer: "(3, 4)" },
  { question: "Vektor yang memiliki panjang satu satuan disebut...", options: ["Vektor Nol", "Vektor Satuan", "Vektor Posisi", "Vektor Basis"], answer: "Vektor Satuan" },
  { question: "Hasil dari perkalian titik (dot product) antara vektor A = (2, 3) dan B = (4, -1) adalah...", options: ["5", "8", "11", "10"], answer: "5" },
  { question: "Dua vektor dikatakan ortogonal (tegak lurus) jika hasil dot product-nya adalah...", options: ["1", "0", "-1", "Sama dengan magnitudonya"], answer: "0" },
  { question: "Jika vektor P = (6, -8), maka vektor satuan dari P adalah...", options: ["(0.6, -0.8)", "(6/10, 8/10)", "(3, -4)", "Tidak bisa ditentukan"], answer: "(0.6, -0.8)" }
];

export const getShuffledQuestions = (arr: QuizQuestion[], num = 5) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
