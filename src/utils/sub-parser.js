const parser = require('subtitles-parser');
const fs = require('fs');

const subParser = (file, outputPath) => {
  let srt = fs.readFileSync(file, 'utf8');
  let data = parser.fromSrt(srt);

  const generateSub2TSV = outputPath => {
    data.forEach(sub => {
      let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${
        sub.text
      }\n`;
      console.log(output);
      fs.appendFile('./srt/outputTSV.tsv', output, err => {
        if (err) return;
      });
    });
  };
};

module.exports = { subParser };
