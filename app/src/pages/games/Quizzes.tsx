import React, { useState, useEffect } from "react";
import { MainLayout } from "../../components/Layout/MainLayout";
import { Prefecture, Quizzes as QuizzesComponent } from "../../features/quizzes";

export function Quizzes() {
  const [prefecture, setPrefecture] = useState("");

  useEffect(() => {
    const prefectures = ["大阪", "京都", "兵庫", "奈良", "三重", "滋賀", "和歌山"];
    const randomPrefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
    setPrefecture(randomPrefecture);
  }, []);

  return (
    <MainLayout title={"関西双六 - 神経衰弱ゲーム！"}>
      <QuizzesComponent prefecture={prefecture as Prefecture}/>
    </MainLayout>
  );
}
