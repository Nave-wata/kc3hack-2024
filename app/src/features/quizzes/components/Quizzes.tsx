import React from "react";
import { useQuizzes } from "../api/getQuizzes";
import { is_set } from "../../../utils/isType";
import { Quiz } from "../types";

type Prefecture = "大阪" | "京都" | "兵庫" | "奈良" | "三重" | "滋賀" | "和歌山";

export function Quizzes({ prefecture }: { prefecture: Prefecture }) {
  const quizzesQuery = useQuizzes();
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState<number>(0);

  if (quizzesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!is_set<Quiz[]>(quizzesQuery.data)) {
    return <div>No quizzes found</div>;
  }

  const quizzes = quizzesQuery.data.filter((quiz) => quiz.prefecture === prefecture);

  const handleAnswer = () => {
    // Check if there are more quizzes available
    if (currentQuizIndex + 1 < quizzes.length) {
      // If more quizzes available, move to the next quiz
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // If no more quizzes available, reset to the first quiz
      setCurrentQuizIndex(0);
    }
  };

  return <QuizComponent quiz={quizzes[currentQuizIndex]} onAnswer={handleAnswer} />;
}

function QuizComponent({ quiz, onAnswer }: { quiz: Quiz; onAnswer: () => void }) {
  const [selected, setSelected] = React.useState<string>(quiz.choices[0]);

  const handleAnswerClick = () => {
    alert(selected === quiz.answer ? "正解！" : "不正解...");
    // Call the onAnswer callback to move to the next quiz
    onAnswer();
  };

  return (
    <div key={quiz.id}>
      <span>{quiz.quiz}</span>
      <select onChange={(e) => setSelected(e.target.value)}>
        {quiz.choices.map((choice) => (
          <option key={choice}>{choice}</option>
        ))}
      </select>
      <button onClick={handleAnswerClick}>回答</button>
    </div>
  );
}
