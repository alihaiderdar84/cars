#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import readline from "readline";
import { server } from "./server.js";

const commands = new Map();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = () => {
  rl.question("> ", async (input) => {
    const [cmd, arg] = input.trim().split(/\s+/);

    if (cmd === "exit") {
      server.close();
      rl.close();
      return;
    }
    await exec(cmd, arg);
    ask();
  });
};

const loadCommands = async () => {
  const commandsPath = path.join(process.cwd(), "commands");
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

const exec = async (cmd, arg) => {
  if (!commands.has(cmd)) {
    console.log("Please enter a valid command");
    return;
  }

  const command = commands.get(cmd);
  await command.execute(arg);
};

const main = async () => {
  server;
  await loadCommands();
  ask();
};

main();
