import React, {useEffect} from "react";
import { useBokes } from "../api/getBokes";
import { is_set } from "../../../utils/isType";
import { Boke } from "../types";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { GameComponent } from "../../../components/Game";
import nandeyanen from "../../../assets/images/nandeyanen.png";
import nanmosen from "../../../assets/images/nanmosen.png";
import bokebotlogo from "../../../assets/images/Logo/bokebotlogo.png";

export function Bokes() {
  const bokesQuery = useBokes();

  if (bokesQuery.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (!is_set<Boke[]>(bokesQuery.data)) {
    return (
      <div>No bokes found</div>
    )
  }

  const rand = Math.floor(Math.random() * bokesQuery.data.length);

  return <BokeComponent {...bokesQuery.data[rand]} />;
}

function BokeComponent(boke: Boke) {
  const [open, setOpen] = React.useState(false);
  const [isGameFinished, setGameFinished] = React.useState(false);
  const [isGameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [timeLeft, setTimeLeft] = React.useState(1);
  const [BokeQuestion, setBokeQuestion] = React.useState(false);

  useEffect(() => {
    if (isGameStarted) {
      setTimeLeft(10); // 初期化
    }
  }, [isGameStarted]); // ゲーム開始時にtimeLeftを10に初期化

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) { // ゲームが開始され、timeLeftが0より大きい場合にのみカウントダウン処理を実行
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // timeLeftを1秒減らす
      }, 1000);

      return () => clearInterval(interval); // アンマウント時にintervalをクリア

    } else if (timeLeft === 0) {
      setGameFinished(true); // 時間切れでゲームを終了
    }
  }, [isGameStarted, timeLeft]);

  useEffect(() => {
    if (isGameFinished) {
      // ゲームが終了したら3秒後にゲームを終了する
      const timeout = setTimeout(() => {
        setGameFinished(true);
      }, 3000);

      return () => clearTimeout(timeout); // アンマウント時にtimeoutをクリア
    }
  }, [isGameFinished]);

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

  const BokeScore = () => {
    if (boke.boke) {
      setScore(score + 1);
    }
  }

  const BokeButtonClick = () => {
    alert(boke.boke ? "正解！" : "不正解...")
    BokeScore();
    
  }

  const returnGame = () => {
    return <div><GameComponent /></div>
  }
  
  return (
    <Box style={{ backgroundColor: "purple", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {isGameFinished && returnGame()}
      <Grid container >
        <Grid item xs={8}>
          <Box style={{ display: "flex", flexWrap: "wrap", width: "800px", height: "400px", marginBottom: "20rem" }}>
            <div key={boke.id}>
              <span style={{backgroundColor: "purple", color: "white", position: "relative",
               top: "10%", left: "10%", width: "360px", height: "180px", fontSize: "28px"}}>
                {boke.text}
              </span><br />
              <button 
                style={{ backgroundColor: "purple", position: "relative",
                top: "50%", left: "20%", width: "360px", height: "180px"}}
                className="Tsukkomi-button" onClick={() => BokeButtonClick()}>
                <img src={nandeyanen} style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "110%",
                  height: "110%"
                }} alt="Tsukkomi"/>
              </button>
              <button style={{ backgroundColor: "purple", position: "relative",
                top: "50%", left: "23%", width: "360px", height: "180px"}}
                className="Tsukkomi-button" onClick={() => BokeButtonClick()}>
                <img src={nanmosen} style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120%",
                  height: "120%"
                }} alt="Tsukkomi"/>
              </button>
            </div>
          </Box>
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
              <Button variant="contained" onClick={() => setGameStarted(true)}>ボケbotスタート</Button>
            </Grid>
          )}{isGameStarted && (
            <Grid item marginLeft="-2.5rem" xs={12}>
              <Typography variant="h5" align="center">
                制限時間: {timeLeft}
              </Typography>
            </Grid>)}
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
          </Grid>
          <Grid marginLeft="3.0rem" item xs={12}>
            <Button variant="contained" onClick={() => setGameFinished(true)}>すごろくに戻る</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box >

  );
}

function BokeGame() {
  return (
    <div>
      <GameComponent />
    </div>
  )
}