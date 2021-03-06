const fs = require("fs");
const fetchInfo = require("./fetchInfo.js");

module.exports = async function (platform, id) {
  const path = "./players/" + id + ".json";
  const userExist = fs.existsSync(path);

  let user = null;
  if (userExist == true) user = JSON.parse(fs.readFileSync(path));
  else user = await fetchInfo(platform, id);
;
  return user
};
