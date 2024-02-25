import React, { useEffect } from "react";
import { useState } from "react";
import { is_set } from "../../utils/isType";
import Kinki from "../../assets/images/Kinki";
import charactor1 from "../../assets/images/Charactor/charactor1.png";
import charactor2 from "../../assets/images/Charactor/charactor2.png";
import charactor3 from "../../assets/images/Charactor/charactor3.png";
import charactor4 from "../../assets/images/Charactor/charactor4.png";
import { Coordinate } from "./Coordinate";
import { Box, Button, Grid } from "@mui/material";
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, default_dice } from "../../assets/images/Dice/index";
import { GameClearComponent } from "./gameClearCompornent";
import { BokeEvaluation } from "../../features/boke_evaluation";
import { Bokes } from "../../features/bokes";
import { Pelmanism } from "../../features/pelmanism";
import { Quizzes } from "../../features/quizzes";


interface CoordinateType {
    x: number;
    y: number;
    eventflag: boolean;
}

let i1 = 0;
let i2 = 0;
let i3 = 0;
let i4 = 0;

let turn = 1;

export const GameComponent = ({ score }: { score?: number }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const screenOrientation = window.screen.orientation;
    const [dicePath, setDicePath] = useState(default_dice); // dicePathとその更新関数をuseStateフックで定義
    const [prevRandomIndex, setPrevRandomIndex] = useState(-1); // 前回のランダムインデックスを保持するステート
    const [isBoxVisible, setIsBoxVisible] = useState(false); // ボックスの表示状態を保持するステート
    const [isdiceroll, setdiceroll] = useState(false);// サイコロがふられたかを保持するステート
    const [anounceDiceroll, setAnounce] = useState("");// 「サイコロをふってください」のテキストを格納するステート
    const [diceMaximum, setdiceMaximum] = useState(0);//出目の最大値を設定
    const [diceMinimum, setdiceMinimum] = useState(0);//出目の最小値を設定
    const [Minigame, setMinigame] = React.useState<number>(-1);//ミニゲームの種類を設定
    const [Playerscore, setScore] = useState(0);
    const [isFinisedMinigame, setFinisedMinigame] = React.useState(false);//ミニゲームの種類を設定


    const containerStyle: React.CSSProperties = {
        margin: 0,
        padding: 0,
        backgroundColor: '#02C5FC',
        flexDirection: 'row',  // column から row に変更
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', // 横方向に中央揃え
        justifyContent: 'center', // 縦方向に中央揃え
        color: '#000000',
        position: 'relative', // 相対位置を設定
    };



    // 画面を横向きに固定
    if (is_set(screenOrientation) && (screenOrientation as any).lock) {
        // @ts-ignore
        (screenOrientation as any).lock('landscape')
            .catch((error: unknown) => {
                //
            });
    }

    const coordinates: CoordinateType[] = Coordinate();
    const [charactor1X, setCharactor1X] = useState<number | undefined>(coordinates[i1].x - 20);
    const [charactor1Y, setCharactor1Y] = useState<number | undefined>(coordinates[i1].y - 20);
    const [charactor2X, setCharactor2X] = useState<number | undefined>(coordinates[i2].x);
    const [charactor2Y, setCharactor2Y] = useState<number | undefined>(coordinates[i2].y - 20);
    const [charactor3X, setCharactor3X] = useState<number | undefined>(coordinates[i3].x - 20);
    const [charactor3Y, setCharactor3Y] = useState<number | undefined>(coordinates[i3].y);
    const [charactor4X, setCharactor4X] = useState<number | undefined>(coordinates[i4].x);
    const [charactor4Y, setCharactor4Y] = useState<number | undefined>(coordinates[i4].y);

    const [goalCharacter, setGoalCharacter] = useState(0)


    const move_1step = () => {              //1マス進む

        setAnounce("")


        if (isdiceroll) {           //サイコロがふられたか
            if (turn === 1) {
                if (i1 < diceMaximum) {     //現在の1pの位置がサイコロの出目の最大値より前に居るか
                    i1 = (i1 + 1) % coordinates.length;
                    setCharactor1X(coordinates[i1].x - 20);
                    setCharactor1Y(coordinates[i1].y - 20);
                } else {
                    setAnounce("それ以上進めません")
                }
            } else if (turn === 2) {
                if (i2 < diceMaximum) {
                    i2 = (i2 + 1) % coordinates.length;
                    setCharactor2X(coordinates[i2].x);
                    setCharactor2Y(coordinates[i2].y - 20);
                } else {
                    setAnounce("それ以上進めません")
                }
            } else if (turn === 3) {
                if (i3 < diceMaximum) {
                    i3 = (i3 + 1) % coordinates.length;
                    setCharactor3X(coordinates[i3].x - 20);
                    setCharactor3Y(coordinates[i3].y);
                } else {
                    setAnounce("それ以上進めません")
                }
            } else if (turn === 4) {
                if (i4 < diceMaximum) {
                    i4 = (i4 + 1) % coordinates.length;
                    setCharactor4X(coordinates[i4].x);
                    setCharactor4Y(coordinates[i4].y);
                } else {
                    setAnounce("それ以上進めません")
                }
            }
        } else {
            setAnounce("サイコロをふってください")
        }
    }

    const back_1step = () => {              //1マスもどる

        setAnounce("")


        if (isdiceroll) {
            if (turn === 1) {
                if (!(i1 <= diceMinimum)) {
                    i1 = (i1 - 1) % coordinates.length;
                    setCharactor1X(coordinates[i1].x - 20);
                    setCharactor1Y(coordinates[i1].y - 20);
                } else {
                    setAnounce("それ以上戻れません")
                }
            } else if (turn === 2) {
                if (!(i2 <= diceMinimum)) {
                    i2 = (i2 - 1) % coordinates.length;
                    setCharactor2X(coordinates[i2].x);
                    setCharactor2Y(coordinates[i2].y - 20);
                } else {
                    setAnounce("それ以上戻れません")
                }
            } else if (turn === 3) {
                if (!(i3 <= diceMinimum)) {
                    i3 = (i3 - 1) % coordinates.length;
                    setCharactor3X(coordinates[i3].x - 20);
                    setCharactor3Y(coordinates[i3].y);
                } else {
                    setAnounce("それ以上戻れません")
                }
            } else if (turn === 4) {
                if (!(i4 <= diceMinimum)) {
                    i4 = (i4 - 1) % coordinates.length;
                    setCharactor4X(coordinates[i4].x);
                    setCharactor4Y(coordinates[i4].y);
                } else {
                    setAnounce("それ以上戻れません")
                }
            }
        } else {
            setAnounce("サイコロをふってください")
        }
    }

    const stopMasu = () => {        //止まるマスの決定
        if (isdiceroll) {           //サイコロがふられたか
            if (turn == 1) {
                if (coordinates[i1].eventflag) { //止まるマスにイベントがあるか
                    setMinigame(Math.floor(Math.random() * 4));
                }
            }
            setAnounce("")
            if (turn === 4) {
                turn = 1
            } else {
                turn++
            }
            setdiceroll(false)     //プレイヤーの位置が決まったのでサイコロをふれる状態にする
        } else {
            setAnounce("サイコロをふってください")
        }
    }

    const isGoal = () => {
        if ((charactor1X === 785 && charactor1Y === 560) || (charactor2X === 805 && charactor2Y === 560) ||
            (charactor3X === 785 && charactor3Y === 580) || (charactor4X === 805 && charactor4Y === 580)) {
            if (charactor1X === 785 && charactor1Y === 560) {
                setGoalCharacter(1)
            }
            if (charactor2X === 805 && charactor2Y === 560) {
                setGoalCharacter(2)
            }
            if (charactor3X === 785 && charactor3Y === 580) {
                setGoalCharacter(3)
            }
            if (charactor4X === 805 && charactor4Y === 580) {
                setGoalCharacter(4)
            }
            return true
        } else {
            return false
        }
    }


    const dice_roll = () => {
        // サイコロを振った結果に応じて、適切なダイス画像のパスを設定
        const diceImages = [dice_1, dice_2, dice_3, dice_4, dice_5, dice_6];
        let randomIndex = Math.floor(Math.random() * diceImages.length);

        if (!isdiceroll) {
            // 前回のボタン押下時の値と異なるランダムな値を生成する
            while (randomIndex === prevRandomIndex) {
                randomIndex = Math.floor(Math.random() * diceImages.length);
            }

            setdiceroll(true)
            setAnounce("")
            //出目の最大を設定↓↓
            if (turn === 1) {
                setdiceMaximum(i1 + randomIndex + 1)
            }
            if (turn === 2) {
                setdiceMaximum(i2 + randomIndex + 1)
            }
            if (turn === 3) {
                setdiceMaximum(i3 + randomIndex + 1)
            }
            if (turn === 4) {
                setdiceMaximum(i4 + randomIndex + 1)
            }
            //ここまで

            //出目の最小を設定↓↓
            if (turn === 1) {
                setdiceMinimum(i1)
            }
            if (turn === 2) {
                setdiceMinimum(i2)
            }
            if (turn === 3) {
                setdiceMinimum(i3)
            }
            if (turn === 4) {
                setdiceMinimum(i4)
            }
            //ここまで



            // 値を更新する前に現在の値を保存する
            setPrevRandomIndex(randomIndex);

            setDicePath(diceImages[randomIndex]);
            setIsBoxVisible(false);
            setTimeout(() => {
                setIsBoxVisible(true);
            }, 800);
        } else {
            setAnounce("止まるマスを決定して下さい")
        }
    };

    useEffect(() => {
        setIsBoxVisible(true);
    }, []);

    useEffect(() => {
        if (typeof score !== 'undefined') {
            setScore(Playerscore + score);
            console.log("スコア")
        } else {
            setScore(Playerscore);
        }
        setFinisedMinigame(true)
    }, [score]);

    const Cpu = () => {
        dice_roll()
        let cpumove
        let cpugoal
        switch (turn) {
            case 2:
                cpumove = i2 + diceMaximum
                if (cpumove < coordinates.length) {
                    for (let i = 0; i < diceMaximum; i++) {
                        move_1step()
                    }
                } else {
                    cpugoal = cpumove - coordinates.length
                    for (let i = 0; i < diceMaximum - cpugoal - 1; i++) {
                        move_1step()
                    }
                }
                break;
            case 3:
                cpumove = i3 + diceMaximum
                if (cpumove < coordinates.length) {
                    for (let i = 0; i < diceMaximum; i++) {
                        move_1step()
                    }
                } else {
                    cpugoal = cpumove - coordinates.length
                    for (let i = 0; i < diceMaximum - cpugoal - 1; i++) {
                        move_1step()
                    }
                }
                break;
            case 4:
                cpumove = i4 + diceMaximum
                if (cpumove < coordinates.length) {
                    for (let i = 0; i < diceMaximum; i++) {
                        move_1step()
                    }
                } else {
                    cpugoal = cpumove - coordinates.length
                    for (let i = 0; i < diceMaximum - cpugoal - 1; i++) {
                        move_1step()
                    }
                }
                break;
        }
        return <div />
    }

    const Mini_init = () => {
        setMinigame(-1)
        return <div />
    }


    return (
        <Box style={containerStyle}>
            {isGoal() && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
                    <GameClearComponent score={score} ranking={goalCharacter} />
                </div>
            )}

            {(turn == 2 && Minigame == 1) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Bokes /></div> :
                (turn == 2 && Minigame == 2) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Pelmanism pairNumber={5} /></div> :
                    (turn == 2 && Minigame == 3 && (i1 < 3 || i3 > 39)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="大阪" /></div> :
                        (turn == 2 && Minigame == 3 && (i1 < 8)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="和歌山" /></div> :
                            (turn == 2 && Minigame == 3 && (i1 < 13)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="奈良" /></div> :
                                (turn == 2 && Minigame == 3 && (i1 < 20)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="三重" /></div> :
                                    (turn == 2 && Minigame == 3 && (i1 < 25)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="滋賀" /></div> :
                                        (turn == 2 && Minigame == 3 && (i1 < 30)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="京都" /></div> :
                                            (turn == 2 && Minigame == 3 && (i1 < 40)) ? <div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}><Quizzes prefecture="兵庫" /></div> : <div />}
            {(turn == 3 && Minigame >= 0) ? <Mini_init /> : <div />}
            <Grid container xs={12} >
                <Grid item>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1350" height="1200">
                        {Kinki()}
                        <image href={charactor1} x={charactor1X} y={charactor1Y} width="30" height="30" />
                        <image href={charactor2} x={charactor2X} y={charactor2Y} width="30" height="30" />
                        <image href={charactor3} x={charactor3X} y={charactor3Y} width="30" height="30" />
                        <image href={charactor4} x={charactor4X} y={charactor4Y} width="30" height="30" />
                    </svg>
                </Grid>
                <Grid item style={{ position: 'relative', top: '100px', left: '500px' }}>
                    {turn === 1 ? <img src={charactor1} alt={""} style={{ width: '500%', height: 'auto' }} /> : turn === 2 ? <img src={charactor2} alt={""} style={{ width: '500%', height: 'auto' }} />
                        : turn === 3 ? <img src={charactor3} alt={""} style={{ width: '500%', height: 'auto' }} /> : <img src={charactor4} alt={""} style={{ width: '500%', height: 'auto' }} />}
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Box sx={{ fontSize: "64px" }}>
                        {turn}Pのターン
                    </Box>
                    <Box>
                        {dicePath && <img src={dicePath} alt="dice" />}
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="warning"
                            sx={{ fontSize: "25px", position: "relative", width: '250px', height: '100px', top: '0%', right: '0%' }}
                            onClick={dice_roll}
                        >
                            サイコロを振る
                        </Button>
                    </Box>
                    <Grid container justifyContent="center" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} style={{ marginTop: '5%' }}>
                        <Box sx={{ fontSize: "64px" }}>出目：</Box>
                        {isBoxVisible && (<Box sx={{ fontSize: "64px" }}>{prevRandomIndex + 1}</Box>)}
                    </Grid>


                    <Grid container justifyContent="center" spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Grid item sx={{ paddingBottom: 3 }} style={{ marginTop: '5%', marginBottom: '2%' }}>
                            {turn == 1 ? <Button variant="contained" color="inherit" onClick={back_1step} sx={{ fontSize: "20px", position: "relative", width: '120px', height: '70px', }}>1つ戻る</Button> : <div />}
                        </Grid>
                        <Grid item sx={{ paddingBottom: 3 }} style={{ marginTop: '5%', marginBottom: '2%' }}>
                            {turn == 1 ? <Button variant="contained" color="inherit" onClick={move_1step} sx={{ fontSize: "20px", position: "relative", width: '120px', height: '70px', }}>1つ進む</Button> : <div />}
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            {turn == 1 ? <Button variant="contained" color="inherit" onClick={stopMasu} sx={{ fontSize: "20px", position: "relative", width: '250px', height: '60px', }}>このマスに止まる</Button> : <div />}
                        </Grid>
                    </Grid>
                    {turn == 1 ? <Box sx={{ fontSize: "32px", color: "red" }}>{anounceDiceroll}</Box> : <div />}
                    {turn >= 2 && turn <= 4 ? <div><Cpu /> <Button variant="contained" color="inherit" onClick={stopMasu} sx={{ fontSize: "20px", position: "relative", width: '250px', height: '60px', }}>{turn}Pは{prevRandomIndex + 1}動きました</Button></div> : <div />}
                </Grid>

            </Grid>
        </Box>
    )
}
