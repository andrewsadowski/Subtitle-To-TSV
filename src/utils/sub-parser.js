const parser = require('subtitles-parser');
const fs = require('fs');
const path = require('path');

const subParser = file => {
  let srt = fs.readFileSync(file, 'utf8');
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
const generateTSV = (contentArr, outputPath) => {
  let content = contentArr.join('\n');
  let pathForOutput = path.join(outputPath + '/' + 'testOutput.tsv');
  fs.writeFile(pathForOutput, content, err => {
    if (err) throw err;
    console.log('file saved');
  });
};

module.exports = { subParser, generateTSV };
