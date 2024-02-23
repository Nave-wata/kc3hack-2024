import React, { useEffect } from "react";
import { useState } from "react";
import { is_set } from "../../utils/isType";
import Kinki from "../../assets/images/Kinki";
import { Coordinate } from "./Coordinate";
import { Box, Button, Grid } from "@mui/material";
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


    return (
        <Box>
            <img src={goalimage} alt="失敗" />
        </Box>
    )
}
