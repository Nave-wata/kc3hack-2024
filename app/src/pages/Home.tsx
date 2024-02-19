import { MainLayout } from "../components/Layout/MainLayout";
import * as React from 'react';
import '../index.css';
import { GameComponent } from "../components/Game";
import {useEffect} from "react";

const head = () => {
    return (
        <link href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=DotGothic16&family=Kiwi+Maru:wght@500&family=Mochiy+Pop+P+One&family=Zen+Antique&family=Zen+Kurenaido&display=swap" rel="stylesheet"></link>
    );
};

export const Home = () => {
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(document.fullscreenElement ? true : false);

    const Test = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen(false);
        } else {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        }
    }

    const HomeComponent = () => (
        <div>
            <style>
                {`
                    h1 {
                        font-family: 'Aoboshi One', cursive;
                        font-size: 3rem;
                        text-align: center;
                    }
                    button {
                        font-family: 'Aoboshi One', cursive;
                        font-size: 2rem;
                        text-align: center;
                    }
                `}
            </style>
            <h1>
                関西双六
            </h1>
            <center>
                <button type="button" onClick={() => Test()}>ゲームスタート</button>
            </center>
        </div>
    );

    return (
        <MainLayout title={"関西双六 - " + isFullScreen ? "ようこそ！" : "ゲーム"} head={head()}>
            {isFullScreen ? <GameComponent /> : HomeComponent()}
        </MainLayout>
    )
}
