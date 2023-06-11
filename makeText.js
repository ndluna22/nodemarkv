/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov"); //current directory js

/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

/** read file and generate text from it. */
//callback error and data
function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

/** read URL and make text from it. */

async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data);
}

// interpret cmdline

if (process.argv.slice(2) === "file") {
  makeText(path);
} else {
  console.error("error");
}

if (process.argv.slice(2) === "url") {
  makeURLText(path);
} else {
  console.error("error");
}
