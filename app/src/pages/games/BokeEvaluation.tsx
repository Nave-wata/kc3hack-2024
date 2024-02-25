import React from "react";
import { MainLayout } from "../../components/Layout/MainLayout";
import { BokeEvaluation as BokeEvaluationComponent } from "../../features/boke_evaluation";

export function BokeEvaluation() {
  return (
    <MainLayout title={"関西双六 - なんでやねんBOT！"}>
      <BokeEvaluationComponent/>
    </MainLayout>
  );
}
