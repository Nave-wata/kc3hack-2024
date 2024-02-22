import React, { useEffect } from "react";
import {useState} from "react";
import { is_set } from "../../utils/isType";
import { create } from "domain";
import Kinki from "../../assets/images/Kinki";
import charactor1 from "../../assets/images/Charactor/charactor1.png";
import charactor2 from "../../assets/images/Charactor/charactor2.png";
import charactor3 from "../../assets/images/Charactor/charactor3.png";
import charactor4 from "../../assets/images/Charactor/charactor4.png";
import {Coordinate} from "./Coordinate";
import { Box, Button, Grid } from "@mui/material";
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, default_dice } from "../../assets/images/Dice/index";

interface CoordinateType {
    x: number;
    y: number;
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

    const backgroundImageStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
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
    const [charactor2X, setCharactor2X] = useState<number | undefined>(765);
    const [charactor2Y, setCharactor2Y] = useState<number | undefined>(540);
    const [charactor3X, setCharactor3X] = useState<number | undefined>(745);
    const [charactor3Y, setCharactor3Y] = useState<number | undefined>(560);
    const [charactor4X, setCharactor4X] = useState<number | undefined>(765);
    const [charactor4Y, setCharactor4Y] = useState<number | undefined>(560);
    const coordinates: CoordinateType[] = Coordinate();

    const handleClick1 = () => {
        if(turn === 1){
            i1 = (i1 + prevRandomIndex + 1) % coordinates.length;
            setCharactor1X(coordinates[i1].x-20);
            setCharactor1Y(coordinates[i1].y-20);
            turn++;
        }
    }

    const handleClick2 = () => {
        if(turn === 2){
            i2 = (i2 + prevRandomIndex + 1) % coordinates.length;
            setCharactor2X(coordinates[i2].x);
            setCharactor2Y(coordinates[i2].y-20);
            turn++;
        }
    }

    const handleClick3 = () => {
        if(turn === 3){
            i3 = (i3 + prevRandomIndex + 1) % coordinates.length;
            setCharactor3X(coordinates[i3].x-20);
            setCharactor3Y(coordinates[i3].y);
            turn++;
        }
    }

    const handleClick4 = () => {
        if(turn === 4){
            i4 = (i4 + prevRandomIndex + 1) % coordinates.length;
            setCharactor4X(coordinates[i4].x);
            setCharactor4Y(coordinates[i4].y);
            turn = 1;
        }
    }

    const handleClick = () => {
        i1 = (i1 + 1) % coordinates.length;
        i2 = (i2 + 1) % coordinates.length;
        i3 = (i3 + 1) % coordinates.length;
        i4 = (i4 + 1) % coordinates.length;
        setCharactor1X(coordinates[i1].x-20);
        setCharactor1Y(coordinates[i1].y-20); 
        setCharactor2X(coordinates[i2].x);
        setCharactor2Y(coordinates[i2].y-20);
        setCharactor3X(coordinates[i3].x-20);
        setCharactor3Y(coordinates[i3].y);
        setCharactor4X(coordinates[i4].x);
        setCharactor4Y(coordinates[i4].y);
    }

    const dice_roll = () => {
        // サイコロを振った結果に応じて、適切なダイス画像のパスを設定
        const diceImages = [dice_1, dice_2, dice_3, dice_4, dice_5, dice_6];
        let randomIndex = Math.floor(Math.random() * diceImages.length);

        // 前回のボタン押下時の値と異なるランダムな値を生成する
        while (randomIndex === prevRandomIndex) {
            randomIndex = Math.floor(Math.random() * diceImages.length);
        }

        // 値を更新する前に現在の値を保存する
        setPrevRandomIndex(randomIndex);

        setDicePath(diceImages[randomIndex]);
        setIsBoxVisible(false);
        setTimeout(() => {
            setIsBoxVisible(true);
        }, 800);
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
                <div>{turn}</div>
                <button onClick={handleClick1}>1</button>
                <button onClick={handleClick2}>2</button>
                <button onClick={handleClick3}>3</button>
                <button onClick={handleClick4}>4</button>
                <button onClick={handleClick}>全</button>
                <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
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
                    <br />
                    {isBoxVisible && (<Box sx={{ fontSize: "64px" }}>{prevRandomIndex + 1}</Box>)}
                </Grid>
            </Grid>
        </Box>
    )
}
