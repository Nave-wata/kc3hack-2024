import React from "react";
import { is_set } from "../../utils/isType";
import { create } from "domain";
import Kinki from "../../assets/images/Kinki";


export const GameComponent = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const screenOrientation = window.screen.orientation;

    const containerStyle: React.CSSProperties = {
        margin: 0,
        padding: 0,
        backgroundColor: '#00FFFF', // 任意の背景色を指定
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

    return (
        <div style={containerStyle}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
                {Kinki()}
            </svg>
        </div>
    )
    //<canvas id="game" width="800" height="600"></canvas>

}