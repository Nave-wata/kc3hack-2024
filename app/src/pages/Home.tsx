import { MainLayout } from "../components/Layout/MainLayout";
import * as React from 'react';
import '../index.css';
import { GameComponent } from "../components/Game";
import Background from '../assets/images/Background/background.png';
import {
    Box,
    Button,
    Grid
} from "@mui/material";
import { GameClearComponent } from "../components/Game/gameClearCompornent";

const head = () => {
    return (
        <link href="https://fonts.googleapis.com/css2?family=Aoboshi+One&family=Dela+Gothic+One&family=DotGothic16&family=Kiwi+Maru:wght@500&family=Mochiy+Pop+P+One&family=Zen+Antique&family=Zen+Kurenaido&display=swap" rel="stylesheet"></link>
    );
};
const setWinSize = () => {
    const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    const imageUrlWithParams = `${Background}?w=${windowSize.width}&h=${windowSize.height}`;

    return imageUrlWithParams;
};
const image = {
    backgroundImage: `url(${setWinSize()})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',  // 画像の繰り返しを無効にする
    backgroundPosition: 'center'
};

export const Home = () => {
    const [isFullScreen, setIsFullScreen] = React.useState<boolean>(document.fullscreenElement ? true : false);

    const handleGameStart = () => {
        setIsFullScreen(true);
    }

    const HomeComponent = () => (
        <Box sx={image}>
            <Box sx={{ minHeight: '100vh', minWidth: '100vw', justifyContent: "space-between" }}>
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }} >
                    <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                        <Box sx={{ marginTop: '300px' }}>
                            <Button variant="contained" color='inherit' size="large" onClick={() => handleGameStart()}>
                                ゲームスタート
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <MainLayout title={"関西双六 - " + isFullScreen ? "ようこそ！" : "ゲーム"} head={head()}>
            {isFullScreen ? <GameComponent /> : HomeComponent()}
        </MainLayout>
    )
}
