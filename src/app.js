#!/usr/bin/env node

const glob = require("glob");
const argv = require("minimist")(process.argv.slice(2));

const yaml = require("./yaml");
const migration = require("./migration");
const cli = require("./cli");

function main() {
  try {
    console.log("Starting script...");
    const args = cli.parseArgs(argv);
    if (args.file) {
      console.log("Converting file:", args.file);
      convertFile(args.file);
    } else if (args.dir) {
      glob(`${args.dir}/**/*.y[a]ml`, {}, function (err, files) {
        files.forEach((file) => {
          console.log("Converting file:", file);
          convertFile(file);
        });
      });
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

function convertFile(path) {
  try {
    docs = yaml.readFile(path);
    result = migration.parseDocs(docs);
    yaml.writeFile(path, result);
  } catch (e) {
    console.log(e);
    console.log("Could not read file", path);
  }
}

main();
