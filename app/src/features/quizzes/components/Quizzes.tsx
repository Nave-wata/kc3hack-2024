import React, { useEffect } from "react";
import { useQuizzes } from "../api/getQuizzes";
import { is_set } from "../../../utils/isType";
import { Quiz } from "../types";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { GameComponent } from "../../../components/Game";
import { shuffleArray } from "../../../utils/array";


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
  const shuffledQuizzes = shuffleArray<Quiz>(quizzes);

  const handleAnswer = () => {
    // Check if there are more quizzes available
    if (currentQuizIndex + 1 < shuffledQuizzes.length) {
      // If more quizzes available, move to the next quiz
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // If no more quizzes available, reset to the first quiz
      setCurrentQuizIndex(0);
    }
  };

  return <QuizComponent quiz={shuffledQuizzes[currentQuizIndex]} onAnswer={handleAnswer} />;
}



function QuizComponent({ quiz, onAnswer }: { quiz: Quiz; onAnswer: () => void }) {
  const [selected, setSelected] = React.useState<string>(quiz.choices[0]);
  const [open, setOpen] = React.useState(false);
  const [isGameFinished, setGameFinished] = React.useState(false);
  const [isGameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isClickedBackoButton, setisClickedBackoButton] = React.useState(false);
  const [quizAns, setQuizAns] = React.useState("")
  const [quizNum, setQuizNum] = React.useState(5)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px',
  };

  const handleAnswerClick = () => {

    if (isGameStarted) {
      if (selected === quiz.answer) {
        setQuizAns("正解です")
        setScore(score + 1)
      } else {
        setQuizAns("不正解です")
      }
      setQuizNum(quizNum - 1)
      // Call the onAnswer callback to move to the next quiz
      onAnswer();
      if (quizNum !== 0) {
        setTimeout(() => {
          setQuizAns("");
        }, 1000);
      } else {
        setQuizAns("クイズ終了です" + <br /> + "あなたのスコアは" + { score } + "点です" + <br /> + "すごろくに戻ってください");
      }
    }
  };
  useEffect(() => {
    if (isGameFinished) {
      setisClickedBackoButton(true)
    }
    return
  }, [quizAns]);

  useEffect(() => {
    if (isGameFinished) {
      setisClickedBackoButton(true)
    }
    return
  }, [isGameFinished]);

  if (!isClickedBackoButton) {
    return (
      <Box style={{ backgroundColor: "purple", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Grid container >
          <Grid container item xs={8}>
            <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap", width: "700px", height: "200px", marginBottom: "20rem", marginTop: "20px" }}>
              {quizNum > 0 && (
                <Box key={quiz.id}>
                  <span style={{ fontSize: "30px" }}>{quiz.quiz}</span>
                  <select onChange={(e) => setSelected(e.target.value)} style={{ fontSize: "20px" }}>
                    {shuffleArray<string>(quiz.choices).map((choice) => (
                      <option key={choice} style={{ fontSize: "20px" }}>{choice}</option>
                    ))}
                  </select>
                  <button onClick={handleAnswerClick}>回答</button>
                  <Typography>残り{quizNum}問</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
              <div style={{ width: "2px", backgroundColor: "black", height: "100%", margin: "auto" }} />
            </div>        </Grid>
          <Grid container item xs={3}>
            <Grid item xs={12}>
              <Grid container direction="column" alignItems="center" marginLeft="-2.5rem">
                <Grid item xs={12} sx={{ display: "flex", textAlign: "center", height: "100%" }}><br /><br /></Grid>
                <Grid item xs={12} sx={{ display: "flex", textAlign: "center", height: "100%" }}>スコア</Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", textAlign: "center", height: "100%" }}>{score}</Box>
                </Grid>
              </Grid>
            </Grid>
            {!isGameStarted && (
              <Grid item marginLeft="3rem" xs={12}>
                <Button variant="contained" onClick={() => setGameStarted(true)}>クイズスタート</Button>
              </Grid>
            )}{isGameStarted && (
              <Grid item marginLeft="3rem" xs={12}>
                {quizNum > 0 && (<Typography variant="h4">{quizAns}</Typography>)}
                {quizNum <= 0 && (<Typography variant="h4" fontSize={15} textAlign="center" marginLeft="-6rem">
                  クイズ終了です<br />あなたのスコアは{score}点です<br />すごろくに戻ってください</Typography>)}
              </Grid>
            )}
            <Grid item marginLeft="4rem" xs={12}>
              <Button variant="contained" onClick={handleOpen}>ルール説明</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" align="center" variant="h4" component="h2">
                    ⚁ルール⚂
                  </Typography>
                  <Typography id="modal-modal-description" align="center" sx={{ mt: 2 }}>
                    <b>関西の観光地をすごろくでまわろう‼‼</b><br />
                  </Typography>
                  <Typography id="modal-modal-description" >
                    <br />
                    ・対戦人数は1～4人<br />
                    ・先頭のプレイヤーがゴールに到達するとゲーム終了<br />
                    ・イベントマスに止まるとミニゲームスタート！<br />
                    ・ミニゲームで勝利するとポイントゲット！<br />
                    ・勝敗はポイントが一番多い人が勝利<br />
                    <br />

                    <strong>ミニゲームでたくさん勝利してポイントを稼ごう‼‼‼<br /></strong>
                  </Typography>
                  <Box sx={{ textAlign: "right", }}>
                    <Button variant="contained" onClick={handleClose}>閉じる</Button>
                  </Box>
                </Box>
              </Modal>
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => setGameFinished(true)}>すごろくに戻る</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box >
    );
  } else {
    return <GameComponent score={score} />
  }
}
