#!/usr/bin/env node
import env from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const commands = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config({ path: path.join(__dirname, ".env"), quiet: true});

const rl = createInterface({
  input,
  output,
});

const ask = async () => {
  const input = await rl.question("> ");

  const cmd = input.trim().split(/\s+/)[0];

  if (cmd === "exit") {
    server.close();
    rl.close();
    return;
  }

  await exec(cmd);
  await ask();
};

const loadCommands = async () => {
  const commandsPath = path.join(__dirname, "commands");
  const files = await fs.readdir(commandsPath);

  for (const file of files) {
    try {
      const command = await import(path.join(commandsPath, file));
      commands.set(command.default.name, command.default);
    } catch (err) {
      console.error(`Failed to load ${file}: ${err}`);
    }
  }
};

const exec = async (cmd) => {
  
  if (!commands.has(cmd)) {
    console.log("Please enter a valid command");
    return;
  }

  const command = commands.get(cmd);
  await command.execute(rl);
};

const main = async () => {
  await loadCommands();
  await ask();
};

main();
