const parser = require("subtitles-parser");
const fs = require("fs");

/**
 * @param {string} filePath - accepts a string with a path to the subtitle
 * @return {string} sub - returns a subtitle file as well as a properly formatted srt
 */
const msNormalizer = async filePath => {
  const srt = fs.readFileSync(filePath, "utf8");

  const parsedDirPath = getDefaultDirPath(filePath);
  const subtitleFileName = getFileName(filePath);

  const outputNameAndPath = path.join(
    parsedDirPath + subtitleFileName + "_msUpdated.srt"
  );

  let sub = parser.fromSrt(srt);
  let updatedSrt;
  for (let i = 0; i < sub.length; i++) {
    for (let j = i + 1; j <= i + 1; j++) {
      if (sub[j] === undefined) return;
      const msCheckAndUpdate = await (() => {
        //save substring of MS for both preceeding start and end times
        let iMS = sub[i].endTime.substr(9, 3);
        let iSS = sub[i].endTime.substr(6, 2);
        let jMS = sub[j].startTime.substr(9, 3);
        let jSS = sub[j].startTime.substr(6, 2);

        if (iMS > jMS && iSS === jSS) {
          console.log(`iMS: ${iMS} should be the same as jMS: ${jMS}`);
          sub[j].startTime = sub[j].startTime.replace(/\d{3}/g, iMS);
        }
      })();
    }
    updatedSrt = await parser.toSrt(sub);
  }

  return updatedSrt;
};

/**
 *
 * @param {string} filePath - Takes a filePath to parse
 * @return {string} parsedDirPath - Returns the path without file and extension
 */
const getDefaultDirPath = filePath => {
  let parsedDirPath = filePath.replace(/[^\/]*$/, "");
  defaultDirPath = parsedDirPath;
  return parsedDirPath;
};

/**
 *
 * @param {string} filePath - Takes a path as a string to parse
 * @return {string} subtitleFileName - Returns only the filename, removing path and file extension
 */
const getFileName = filePath => {
  let subtitleFileName;
  subtitleFileName = filePath.replace(/^.*[\\\/]/, "");
  subtitleFileName = subtitleFileName.replace(/(.srt)/, "");
  return subtitleFileName;
};

/**
 *
 * @param {string} outputNameAndPath - Path and Name of output
 * @param {object} subtitle - Object consisting of updated subtitle file
 */
const writeSubToFile = (outputNameAndPath, subtitle) => {
  fs.writeFileSync(outputNameAndPath, subtitle, err => {
    if (err) throw err;
    console.log("Updated Srt created");
  });
};

module.exports = {
  msNormalizer
};
