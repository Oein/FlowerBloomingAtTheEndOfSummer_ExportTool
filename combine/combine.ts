import { readdirSync, readFileSync, writeFileSync } from "fs";

const files = readdirSync("./");

let res = {};
for (const file of files) {
  if (!(file.startsWith("chapter") && file.endsWith(".json"))) continue;
  const content = readFileSync(file, "utf-8");
  const json = JSON.parse(content);
  res = { ...res, ...json };
}

console.log(res);

writeFileSync("output.json", JSON.stringify(res, null, 2));
