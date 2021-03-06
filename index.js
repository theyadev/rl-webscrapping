const fetchInfo = require("./fetchInfo.js");
const getUser = require("./getUser.js");

const platformList = ['steam', 'epic', 'xbl', 'psn', 'switch']

//theyaaaaaa
const platform = "steam";
const id = "theyaaaaaa";

async function init() {
  const x = await getUser(platform, id);
  console.log(x);
}

init()
