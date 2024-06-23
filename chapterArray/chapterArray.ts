import output from "./output.json";
let nowNumber = 0;
const scripts: { text: string; character: string }[][] = [[]];
const run = (label: keyof typeof output) => {
  scripts[scripts.length - 1] = [
    ...scripts[scripts.length - 1],
    ...(output[label].filter((x) => Object.keys(x).includes("text")) as any),
  ];
  const jump = output[label].at(-1)?.jump!;
  if (!jump) return;
  if (jump.startsWith("chapter")) {
    const chapternum = parseInt(jump.slice(7));
    if (nowNumber !== chapternum) {
      nowNumber = chapternum;
      scripts.push([]);
    }
  }
  console.log(jump);
  run(jump as any);
};

run("prologue");

console.log(scripts);
import { writeFileSync } from "fs";
writeFileSync("scripts.json", JSON.stringify(scripts, null, 2));
