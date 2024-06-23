import Character from "./Character.json";

const characterkeys = Object.keys(Character);
function parseFile(content: string) {
  let parsingMenu = false;
  const lines = content
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => {
      if (x.startsWith("#")) return false;
      if (x.length == 0) return false;

      for (const key of characterkeys) {
        if (x.startsWith(key)) {
          return true;
        }
      }
      if (x.startsWith('"') && x.endsWith('"')) return true;
      if (x.startsWith("label")) {
        parsingMenu = false;
        return true;
      }
      if (x.startsWith("jump")) {
        return true;
      }
      if (x.startsWith("menu")) {
        parsingMenu = true;
        return true;
      }
      if (parsingMenu) {
        return true;
      }
      return false;
    });

  parsingMenu = false;
  let label = "unknown";
  const expo: any = {};
  for (const line of lines) {
    if (line.startsWith("label")) {
      label = line.slice(6).trim().slice(0, -1);
      console.log("Label:", label);
      expo[label] = [];
      parsingMenu = false;
      continue;
    }
    if (line.startsWith("menu")) {
      console.log("MENU!");
      parsingMenu = true;
      expo[label].push({ menu: true, options: [] });
      continue;
    }
    if (parsingMenu) {
      console.log(
        "Parsing menu option",
        line,
        expo[label][expo[label].length - 1]
      );
      expo[label][expo[label].length - 1].options.push(line);
      continue;
    }

    if (line.startsWith("jump")) {
      const jumpto = line.slice(5).trim();
      expo[label].push({ jump: jumpto });
      continue;
    }

    const hasCharName = !(line.startsWith('"') && line.endsWith('"'));

    if (hasCharName) {
      const lsp = line.split(" ");
      const character = (Character as any)[lsp[0]];
      const text = lsp.slice(1).join(" ").slice(1, -1);
      expo[label].push({ character, text });
    } else {
      expo[label].push({ character: " ", text: line.slice(1, -1) });
    }
  }

  return expo;
}

import { readFileSync, readdirSync, writeFileSync } from "fs";
readdirSync("./")
  .filter((x) => x.startsWith("chapter") && x.endsWith(".rpy"))
  .forEach((f) => {
    console.log("Parsing", f);
    const parse = parseFile(readFileSync(f).toString());
    writeFileSync(f.replace(".rpy", ".json"), JSON.stringify(parse, null, 2));
  });
