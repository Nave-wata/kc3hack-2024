import React, {useState} from "react";
import { is_set } from "../../utils/isType";
import { create } from "domain";
import Kinki from "../../assets/images/Kinki";
import charactor1 from "../../assets/images/Charactor/charactor1.png";
import charactor2 from "../../assets/images/Charactor/charactor2.png";
import charactor3 from "../../assets/images/Charactor/charactor3.png";
import charactor4 from "../../assets/images/Charactor/charactor4.png";
import {Coordinate} from "./Coordinate";

interface CoordinateType {
    x: number;
    y: number;
}

let i1 = 1;
let i2 = 1;
let i3 = 1;
let i4 = 1;
let i = 1;

export const GameComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const screenOrientation = window.screen.orientation;

    const containerStyle: React.CSSProperties = {
        margin: 0,
        padding: 0,
        backgroundColor: '#02C5FC', // 任意の背景色を指定
        fontFamily: 'sans-serif',
        backgroundSize: 'cover', // 画像をコンポーネント全体に広げる
        minHeight: '100vh', // 最小の画面の高さを指定
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000', // テキストの色を指定
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

    const handleClick1 = () => {
        const coordinates: CoordinateType[] = Coordinate();

        setCharactor1X(coordinates[i1].x-20);
        setCharactor1Y(coordinates[i1].y-20);
        i1 = (i1 + 1) % coordinates.length;
    }

    const handleClick2 = () => {
        const coordinates: CoordinateType[] = Coordinate();

        setCharactor2X(coordinates[i2].x);
        setCharactor2Y(coordinates[i2].y-20);
        i2 = (i2 + 1) % coordinates.length;
    }

    const handleClick3 = () => {
        const coordinates: CoordinateType[] = Coordinate();

        setCharactor3X(coordinates[i3].x-20);
        setCharactor3Y(coordinates[i3].y);
        i3 = (i3 + 1) % coordinates.length;
    }

    const handleClick4 = () => {
        const coordinates: CoordinateType[] = Coordinate();

        setCharactor4X(coordinates[i4].x);
        setCharactor4Y(coordinates[i4].y);
        i4 = (i4 + 1) % coordinates.length;
    }

    const handleClick = () => {
        const coordinates: CoordinateType[] = Coordinate();

        setCharactor1X(coordinates[i1].x-20);
        setCharactor1Y(coordinates[i1].y-20); 
        setCharactor2X(coordinates[i2].x);
        setCharactor2Y(coordinates[i2].y-20);
        setCharactor3X(coordinates[i3].x-20);
        setCharactor3Y(coordinates[i3].y);
        setCharactor4X(coordinates[i4].x);
        setCharactor4Y(coordinates[i4].y);
        
        i1 = (i1 + 1) % coordinates.length;
        i2 = (i2 + 1) % coordinates.length;
        i3 = (i3 + 1) % coordinates.length;
        i4 = (i4 + 1) % coordinates.length;
    }

    return (
        <div style={containerStyle}>
            <button onClick={handleClick1}>1</button>
            <button onClick={handleClick2}>2</button>
            <button onClick={handleClick3}>3</button>
            <button onClick={handleClick4}>4</button>
            <button onClick={handleClick}>全</button>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
                {Kinki()}
                <image href={charactor1} x={charactor1X} y={charactor1Y} width="30" height="30" />
                <image href={charactor2} x={charactor2X} y={charactor2Y} width="30" height="30" />
                <image href={charactor3} x={charactor3X} y={charactor3Y} width="30" height="30" />
                <image href={charactor4} x={charactor4X} y={charactor4Y} width="30" height="30" />
            </svg>
        </div>
    )

}