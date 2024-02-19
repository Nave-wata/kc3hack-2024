import { MainLayout } from "../components/Layout/MainLayout";
import * as React from 'react';
import '../index.css';
import { GameComponent } from "../components/Game";

const head = () => {
    return (
        <link href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=DotGothic16&family=Kiwi+Maru:wght@500&family=Mochiy+Pop+P+One&family=Zen+Antique&family=Zen+Kurenaido&display=swap" rel="stylesheet"></link>
    );
};

export const Test = () => {
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(document.fullscreenElement ? true : false);

    const TestComponent = () => (
        <div>
            <h1>
                Test画面
            </h1>
        </div>
    );

    return (
        <MainLayout title={"関西双六 - " + isFullScreen ? "ようこそ！" : "ゲーム"} head={head()}>
            {isFullScreen ? <GameComponent /> : TestComponent()}
        </MainLayout>
    )
}