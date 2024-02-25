export type Quiz = {
  id: number;
  prefecture: string;
  place: string;
  quiz: string;
  answer: string;
  choices: string[];
}

export type Prefecture = "大阪" | "京都" | "兵庫" | "奈良" | "三重" | "滋賀" | "和歌山";
