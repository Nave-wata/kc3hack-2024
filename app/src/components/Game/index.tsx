import React, { useEffect } from "react";
import { useState } from "react";
import { is_set } from "../../utils/isType";
import { create } from "domain";
import Kinki from "../../assets/images/Kinki";
import charactor1 from "../../assets/images/Charactor/charactor1.png";
import charactor2 from "../../assets/images/Charactor/charactor2.png";
import charactor3 from "../../assets/images/Charactor/charactor3.png";
import charactor4 from "../../assets/images/Charactor/charactor4.png";
import { Coordinate } from "./Coordinate";
import { Box, Button, Grid } from "@mui/material";
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, default_dice } from "../../assets/images/Dice/index";

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

export const GameComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const screenOrientation = window.screen.orientation;
    const [dicePath, setDicePath] = useState(default_dice); // dicePathとその更新関数をuseStateフックで定義
    const [prevRandomIndex, setPrevRandomIndex] = useState(-1); // 前回のランダムインデックスを保持するステート
    const [isBoxVisible, setIsBoxVisible] = useState(false); // ボックスの表示状態を保持するステート
    const [isdiceroll, setdiceroll] = useState(false);// サイコロがふられたかを保持するステート
    const [anounceDiceroll, setAnounce] = useState("");// 「サイコロをふってください」のテキストを格納するステート
    const [diceMaximum, setdiceMaximum] = useState(0);//出目の最大値を設定
    const [diceMinimum, setdiceMinimum] = useState(0);//出目の最小値を設定

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

    const [charactor1X, setCharactor1X] = useState<number | undefined>(745);
    const [charactor1Y, setCharactor1Y] = useState<number | undefined>(540);
    const [charactoreventflag, setCharactoreventflag] = useState<boolean | undefined>(false); //プレイヤーのイベントフラグ
    const [charactor2X, setCharactor2X] = useState<number | undefined>(765);
    const [charactor2Y, setCharactor2Y] = useState<number | undefined>(540);
    const [charactor3X, setCharactor3X] = useState<number | undefined>(745);
    const [charactor3Y, setCharactor3Y] = useState<number | undefined>(560);
    const [charactor4X, setCharactor4X] = useState<number | undefined>(765);
    const [charactor4Y, setCharactor4Y] = useState<number | undefined>(560);
    const coordinates: CoordinateType[] = Coordinate();


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
            setCharactoreventflag(coordinates[i1].eventflag); //止まるマスにイベントがあるか
            setAnounce("")
            if (turn == 4) {
                turn = 1
            } else {
                turn++
            }
            setdiceroll(false)     //プレイヤーの位置が決まったのでサイコロをふれる状態にする
        } else {
            setAnounce("サイコロをふってください")
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
            if (turn == 1) {
                setdiceMaximum(i1 + randomIndex + 1)
            }
            if (turn == 2) {
                setdiceMaximum(i2 + randomIndex + 1)
            }
            if (turn == 3) {
                setdiceMaximum(i3 + randomIndex + 1)
            }
            if (turn == 4) {
                setdiceMaximum(i4 + randomIndex + 1)
            }
            //ここまで

            //出目の最小を設定↓↓
            if (turn == 1) {
                setdiceMinimum(i1)
            }
            if (turn == 2) {
                setdiceMinimum(i2)
            }
            if (turn == 3) {
                setdiceMinimum(i3)
            }
            if (turn == 4) {
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

    return (
        <Box style={containerStyle}>
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
                            color="inherit"
                            sx={{ fontSize: "25px", position: "relative", width: '200px', height: '100px', top: '0%', right: '0%' }}
                            onClick={dice_roll}
                        >
                            サイコロを振る
                        </Button>
                    </Box>
                    <Grid container justifyContent="center" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Box sx={{ fontSize: "64px" }}>出目：</Box>
                        {isBoxVisible && (<Box sx={{ fontSize: "64px" }}>{prevRandomIndex + 1}</Box>)}
                    </Grid>


                    <Grid container justifyContent="center" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Button variant="contained" color="inherit" onClick={back_1step} sx={{ fontSize: "18px", position: "relative", width: '100px', height: '50px', }}>1つ戻る</Button>
                        <Button variant="contained" color="inherit" onClick={move_1step} sx={{ fontSize: "18px", position: "relative", width: '100px', height: '50px', }}>1つ進む</Button>
                    </Grid>
                    <Button variant="contained" color="inherit" onClick={stopMasu} sx={{ fontSize: "18px", position: "relative", width: '200px', height: '50px', }}>このマスに止まる</Button>
                    <Box sx={{ fontSize: "32px", color: "red" }}>{anounceDiceroll}</Box>
                    {charactoreventflag ? <Box sx={{ fontSize: "32px", color: "red" }}>イベント発生</Box> : <div />}
                </Grid>
            </Grid>
        </Box>
    )
}
