/**
 * Copyright 2021, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#!/usr/bin/env node

const glob = require('glob');
const argv = require('minimist')(process.argv.slice(2));

const yaml = require('./yaml');
const migration = require('./migration');
const cli = require('./cli');

function main() {
  try {
    console.log('Starting script...');
    const args = cli.parseArgs(argv);
    if (args.file) {
      console.log('Converting file:', args.file);
      convertFile(args.file);
    } else if (args.dir) {
      glob(`${args.dir}/**/*.y[a]ml`, {}, (err, files) => {
        files.forEach((file) => {
          console.log("Converting file:", file);
          convertFile(file);
        });
      });
    }
  } catch (e) {
    console.log('Error:', e);
  }
}

function convertFile(path) {
  try {
    docs = yaml.readFile(path);
    result = migration.parseDocs(docs);
    yaml.writeFile(path, result);
  } catch (e) {
    console.log(e);
    console.log('Could not read file', path);
  }
}

main();
