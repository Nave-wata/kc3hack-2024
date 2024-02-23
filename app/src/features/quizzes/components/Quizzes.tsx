import React from "react"
import { useQuizzes } from "../api/getQuizzes";
import { is_set } from "../../../utils/isType";
import { Quiz } from "../types";

type Prefecture = "大阪" | "京都" | "兵庫" | "奈良" | "三重" | "滋賀" | "和歌山";

export function Quizzes({ prefecture }: { prefecture: Prefecture }) {
  const quizzesQuery = useQuizzes();

  if (quizzesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!is_set<Quiz[]>(quizzesQuery.data)) {
    return <div>No quizzes found</div>;
  }

  const quizzes = quizzesQuery.data.filter((quiz) => quiz.prefecture === prefecture);
  const rand = Math.floor(Math.random() * quizzes.length);

  return <QuizComponent {...quizzes[rand]} />;
}

function QuizComponent(quiz: Quiz) {
  const [selected, setSelected] = React.useState<string>(quiz.choices[0]);

  return (
    <div key={quiz.id}>
      <span>{quiz.quiz}</span>
      <select onChange={(e) => setSelected(e.target.value)}>
        {quiz.choices.map((choice) => (
          <option key={choice}>{choice}</option>
        ))}
      </select>
      <button onClick={() => alert(selected === quiz.answer ? "正解！" : "不正解...")}>
        回答
      </button>
    </div>
  );
}
