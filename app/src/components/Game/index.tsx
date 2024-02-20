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
            <div>
                <div>{Kinki()}</div>
            </div>
        </div>
    )
    //<canvas id="game" width="800" height="600"></canvas>

}