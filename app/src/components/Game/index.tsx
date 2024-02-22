import React, { useState, useEffect } from "react";
import { is_set } from "../../utils/isType";
import { create } from "domain";
import Kinki from "../../assets/images/Kinki";
import { Box, Button, Grid } from "@mui/material";
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, default_dice } from "../../assets/images/Dice/index";


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
    },[]);

    return (
        <Box style={containerStyle}>
            <Grid container xs={12} >
                <Grid item>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1350" height="1200">
                        {Kinki()}
                    </svg>
                </Grid>
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
                    <br/>
                    {isBoxVisible && (<Box sx={{fontSize: "64px"}}>{prevRandomIndex+1}</Box>)}
                </Grid>
            </Grid>
        </Box>
    )
    //<canvas id="game" width="800" height="600"></canvas>

}
