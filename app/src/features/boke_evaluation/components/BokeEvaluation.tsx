import React from "react";
import { getBokeEvaluation, useBokeEvaluation } from "../api/getBokeEvaluation";
import { is_set } from "../../../utils/isType";
import { BokeEvaluationResponse } from "../types";

export function BokeEvaluation() {
  const [bokes, setBokes] = React.useState<string[]>(new Array(4).fill(""));
  const [ranks, setRanks] = React.useState<string[] | number[]>([]);

  const handleSubmit = () => {
    const requestBody: string[] = [];
    bokes.forEach((boke) => {
      if (boke) {
        requestBody.push(boke);
      }
    });

    if (requestBody.length === 0) {
      return;
    }

    getBokeEvaluation({"bokes": requestBody})
      .then((response) => is_set<BokeEvaluationResponse>(response) ? setRanks(response.ranks) : null);
  }

  return (
    <div>
      {bokes.map((boke, i) => (
        <input
          key={i}
          value={boke}
          onChange={(e) => {
            const newBokes = bokes.slice();
            newBokes[i] = e.target.value;
            setBokes(newBokes);
          }}
        />
      ))}
      <button onClick={() => handleSubmit()}>評価</button>
      <hr/>
      <ol>
        {Object.values(ranks).map((rank, index) => (
          <li key={index}>{bokes[rank - 1]}</li>
        ))}
      </ol>
    </div>
  );
}
