import React from "react";
import { MainLayout } from "../../components/Layout/MainLayout";
import { Bokes as BokesComponent } from "../../features/bokes";

export function Bokes() {
  return (
    <MainLayout title={"関西双六 - ボケBOT！"}>
      <BokesComponent/>
    </MainLayout>
  );
}
