"use client";

import { getCookie } from "cookies-next";

const Game = () => {
  const student_id = getCookie("student_id");
  return <h1>Game ggggg {student_id}</h1>;
};

export default Game;
