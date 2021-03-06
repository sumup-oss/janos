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

const fs = require('fs');

const yaml = require('js-yaml');

function readFile(path) {
  const file = fs.readFileSync(path, 'utf8');
  return yaml.loadAll(file);
}

function writeFile(path, docs) {
  let result = '';
  docs.forEach((doc) => {
    result += '---\n';
    result += yaml.dump(doc, { noArrayIndent: true });
  });
  console.log('Writing result to:', path);
  fs.writeFileSync(path, result);
}

module.exports = {
  readFile,
  writeFile,
};
