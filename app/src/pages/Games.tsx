import React from "react";
import { MainLayout } from "../components/Layout/MainLayout";
import { Button, Grid, Typography } from "@mui/material";

export function Games() {
  return (
    <MainLayout title={"関西双六 - ミニゲーム"}>
      <Grid container style={{ height: "100vh" }} alignItems={"center"} justifyContent={"center"} direction="column">
        <Grid item mt={30} textAlign="center">
          <Typography variant="h3" mb={1}>ミニゲーム</Typography>
          <Typography variant="h6" my={2}>ここでは、関西双六のミニゲームを楽しむことができます。</Typography>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large" href={"/games/nandeyanen"}>なんでやねん Bot</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large" href={"/games/bokes"}>ボケ Bot</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large" href={"/games/pelmanism"}>神経衰弱</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large" href={"/games/quizzes"}>クイズ</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="inherit" size="large" href={"/"}>タイトルに戻る</Button>
            </Grid>
        </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
