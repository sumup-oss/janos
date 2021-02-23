const BASE_DIR = process.env.BASE_DIR || ".";

function parseArgs(argv) {
  const result = {};
  if (argv["f"]) {
    result.file = `${BASE_DIR}/${argv["f"]}`;
  }

  if (argv["d"]) {
    result.dir = `${BASE_DIR}/${argv["d"]}`;
  }

  if (!argv["f"] && !argv["d"]) {
    throw new Error("argument -d or -f must be provided");
  }

  return result;
}

module.exports = {
  parseArgs,
};
