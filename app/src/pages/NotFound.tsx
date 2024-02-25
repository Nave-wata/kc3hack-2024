import React from 'react';
import { MainLayout } from "../components/Layout/MainLayout";
import { Button, Grid, Typography } from "@mui/material";

export function NotFound() {
  return (
    <MainLayout title={"関西双六 - 404"}>
      <Grid container style={{ height: "100vh" }} alignItems={"center"} justifyContent={"center"} direction="column">
        <Grid item mt={25} textAlign="center">
          <Typography variant="h2">404 Not Found</Typography>
          <Typography variant="h6">お探しのページが見つかりません。</Typography>
          <Grid item xs={12} mt={5}>
            <Button variant="contained" color="inherit" size="large" href={"/"}>タイトルに戻る</Button>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
