const parser = require("subtitles-parser");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} file - Accepts a file-path
 * @return {array} subArr - Returns an array of tabulated subtitle data
 */

const subParser = file => {
  let srt = fs.readFileSync(file, "utf8");
  let data = parser.fromSrt(srt);
  let subArr = [];
  data.forEach(sub => {
    let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${
      sub.text
    }\n`;
    subArr.push(output);
  });
  return subArr;
};

/**
 *
 * @param {array} contentArr - Array of tabulated subtitle data
 * @param {string} outputPath - Path to output directory
 * @param {string} fileName - Name of file without extension/path
 */

/**
 * [Issues to Fix]
 *
 * @TODO: Currently adding superfluous line break by adding '\n' to join array
 */
const generateTSV = (contentArr, outputPath, fileName) => {
  let content = contentArr.join("");
  let pathForOutput = path.join(outputPath + "/" + fileName + ".tsv");
  fs.writeFile(pathForOutput, content, err => {
    if (err) throw err;
    console.log("file saved");
  });
};

module.exports = { subParser, generateTSV };
