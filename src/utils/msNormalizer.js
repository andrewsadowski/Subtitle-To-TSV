const parser = require("subtitles-parser");
const fs = require("fs");

//Parse and save srt
const srt = fs.readFileSync(filePath, "utf8");
const data = parser.fromSrt(srt);

/**
 * @param {object} sub - a parsed object containing Index, StartTime/StopTime, Text
 * @return {string} sub - returns a subtitle file (via fs) as well as a properly formatted srt
 */

const msNormalizer = sub => {
  for (let i = 0; i < sub.length; i++) {
    for (let j = i + 1; j <= i + 1; j++) {
      if (sub[j] === undefined) return;

      //save substring of MS for both preceeding start and end times
      let iMS = sub[i].endTime.substr(9, 3);
      let jMS = sub[j].startTime.substr(9, 3);

      if (iMS > jMS) {
        console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
        sub[j].startTime = sub[j].startTime.replace(/\d{3}/g, iMS);
      }
    }

    const updatedSrt = parser.toSrt(sub);
    fs.writeFileSync("updatedTest.srt", updatedSrt, err => {
      if (err) throw err;
      console.log("Updated Srt created");
    });
  }
  return sub;
};

msNormalizer(data);

module.exports = {
  msNormalizer
};
