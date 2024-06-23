import { writeFileSync, mkdirSync } from "fs";
import scrirpts from "./scripts.json";

mkdirSync("./out", {
  recursive: true,
});

for (let i = 0; i < scrirpts.length; i++) {
  const myscript = scrirpts[i] as { text: string; character: string }[];
  let lastCn = false;
  let content = "";

  for (const line of myscript) {
    let append = line.text.trim().replace(/\{[^\}]*\}/gi, "");

    if (
      line.text.startsWith("“") ||
      ["\\n", "ω", "▽", "٩", "و", "`", "๑", "⁺", "д", "๑"]
        .map((x) => line.text.includes(x))
        .filter((x) => x).length > 0
    ) {
      append = "  " + append;
      if (!lastCn) append = "\n" + append;
      append += "\n";
      lastCn = true;
    } else if (lastCn) {
      lastCn = false;
    } else {
      append += " ";
    }
    content += append;
  }
  content = content.replace(/\\n/gi, "\n");
  writeFileSync(`./out/chapter${i + 1}.txt`, content);
}
