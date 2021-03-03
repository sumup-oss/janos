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

const path = require('path');

const yaml = require('./yaml');
const migration = require('./migration');

const basePath = path.join(__dirname, '__tests__/fixtures');

test('should convert', async () => {
  const input = yaml.readFile(`${basePath}/input.yaml`);
  const output = migration.parseDocs(input);
  const expected = yaml.readFile(`${basePath}/output.yaml`);

  expect(output).toStrictEqual(expected);
});
