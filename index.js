console.clear();
console.log("");

import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { setupMaster, fork } from "cluster";
import { watchFile, unwatchFile } from "fs";
import cfonts from "cfonts";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === "string" && args[0].includes("Ouch")) return;
  originalWarn(...args);
};

const kanekiEye = `
        ${chalk.black("○○○○○○○○")}
      ${chalk.black("○")}   ${chalk.red("●")}   ${chalk.black("○")}
     ${chalk.black("○")}       ${chalk.red("●")}       ${chalk.black("○")}
      ${chalk.black("○")}   ${chalk.red("●")}   ${chalk.black("○")}
        ${chalk.black("○○○○○○○○")}
`;

console.log(kanekiEye);
console.log(chalk.redBright("🚀 The bot is starting..."));

cfonts.say("Hero", {
  font: "block",
  align: "center",
  gradient: ["#d3d3d3", "#555555"],
  env: "node",
});

cfonts.say("Heroes", {
  font: "console",
  align: "center",
  gradient: ["yellow", "blue"],
  env: "node",
});


let isWorking = false;

async function launch(scripts) {
  if (isWorking) return;
  isWorking = true;

  for (const script of scripts) {
    const args = [join(__dirname, script), ...process.argv.slice(2)];

    setupMaster({
      exec: args[0],
      args: args.slice(1),
    });

    let child = fork();

    child.on("exit", (code) => {
      console.log(`⚠️ The bot has stopped (exit code: ${code})`);
      isWorking = false;

      if (code === 0) {
        console.log("♻️ The bot was restarted manually by the owner...");
      } else {
        console.log("🛑 The bot has completely stopped. No restart will be made.");
        process.exit(0); // ⛔ Stop everything يوقف البوت ويخلية يلعب رياضة 🗿🚬
      }
    });
  }
}

launch(["main.js"]);