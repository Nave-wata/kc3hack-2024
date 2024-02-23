import React from "react";
import { useBokes } from "../api/getBokes";
import { is_set } from "../../../utils/isType";
import { Boke } from "../types";

export function Bokes() {
  const bokesQuery = useBokes();

  if (bokesQuery.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (!is_set<Boke[]>(bokesQuery.data)) {
    return (
      <div>No bokes found</div>
    )
  }

  const rand = Math.floor(Math.random() * bokesQuery.data.length);

  return <BokeComponent {...bokesQuery.data[rand]} />;
}

function BokeComponent(boke: Boke) {
  return (
    <div key={boke.id}>
      <span>{boke.text}</span>
      <button onClick={() => alert(boke.boke ? "正解！" : "不正解...")}>
        なんでやねん
      </button>
      <button onClick={() => alert(boke.boke ? "不正解..." : "正解！")}>
        なんもせん
      </button>
    </div>
  );
}
