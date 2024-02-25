import React from "react";
import { MainLayout } from "../../components/Layout/MainLayout";
import { Pelmanism as PelmanismComponent } from "../../features/pelmanism";

export function Pelmanism() {
  return (
    <MainLayout title={"関西双六 - 神経衰弱ゲーム！"}>
      <PelmanismComponent pairNumber={5}/>
    </MainLayout>
  );
}
