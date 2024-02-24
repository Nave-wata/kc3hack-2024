import React, { useEffect } from "react";
import { useState } from "react";
import { is_set } from "../../utils/isType";
import Kinki from "../../assets/images/Kinki";
import { Coordinate } from "./Coordinate";
import { Box, Button, Grid } from "@mui/material";
import charactor1 from "../../assets/images/Charactor/charactor1.png";
import charactor2 from "../../assets/images/Charactor/charactor2.png";
import charactor3 from "../../assets/images/Charactor/charactor3.png";
import charactor4 from "../../assets/images/Charactor/charactor4.png";
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6, default_dice } from "../../assets/images/Dice/index";
import goalimage from '../../assets/images/Background/goalend.png'


export const GameClearComponent = () => {
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
        backgroundColor: '#393939',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', // 横方向に中央揃え
        justifyContent: 'center', // 縦方向に中央揃え
        color: '#000000',
        position: 'relative', // 相対位置を設定
    };

    return (
        <Box style={containerStyle}>
            <Grid container>
                <Grid item xs={3} md={3}>
                    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: "200px"}}>
                        <img src={charactor4} alt="キャラクター" width={200}/>                        
                        <img src={charactor1} alt="キャラクター" width={200}/>
                    </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
                        <img src={goalimage} alt="失敗" width={650}/>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1}}>
                    <Button variant="contained" color="inherit" href="../../pages/Home.tsx" sx={{ fontSize: "18px", position: "relative", width: '200px', height: '50px', }}>
                        タイトル画面へ
                    </Button>
                </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: "200px"}}>
                        <img src={charactor3} alt="キャラクター" width={200}/>
                        <img src={charactor2} alt="キャラクター" width={200}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
