const path = require("path");

const yaml = require("./yaml");
const migration = require("./migration");

const basePath = path.join(__dirname, "__tests__/fixtures");

test("should convert", async () => {
  const input = yaml.readFile(`${basePath}/input.yaml`);
  const output = migration.parseDocs(input);
  const expected = yaml.readFile(`${basePath}/output.yaml`);

  expect(output).toStrictEqual(expected);
});
