const yaml = require("js-yaml");
const fs = require("fs");

function readFile(path) {
  try {
    const file = fs.readFileSync(path, "utf8");
    const docs = yaml.loadAll(file);

    return docs;
  } catch (e) {
    throw e;
  }
}

function writeFile(path, docs) {
  let result = "";
  docs.forEach((doc) => {
    result += "---\n";
    result += yaml.dump(doc, { noArrayIndent: true });
  });
  console.log("Writing result to:", path);
  fs.writeFileSync(path, result);
}

module.exports = {
  readFile,
  writeFile,
};
