import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Pelmanism } from "../pages/games/Pelmanism";
import { Games } from "../pages/Games";
import { NotFound } from "../pages/NotFound";
import { Bokes } from "../pages/games/Bokes";
import { BokeEvaluation } from "../pages/games/BokeEvaluation";
import { Quizzes } from "../pages/games/Quizzes";

export function AppRouter() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/games"} element={<Games/>}/>
      <Route path={"/games/bokes"} element={<Bokes/>}/>
      <Route path={"/games/pelmanism"} element={<Pelmanism/>}/>
      <Route path={"/games/quizzes"} element={<Quizzes/>}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
  );
}
