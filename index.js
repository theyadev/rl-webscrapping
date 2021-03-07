const prompt = require("prompt-sync")();
const colors = require("colors");

const getUser = require("./getUser.js");

const platformList = ["steam", "epic", "xbl", "psn", "switch"];

//theyaaaaaa
//const platform = "steam";
//const id = "theyaaaaaa";
async function init() {
  const platform = prompt(
    "What platform? (" + platformList.join(", ") + ") : "
  );
  const id = prompt("User Id : ");
  const x = await getUser(platform.toLowerCase(), id.toLowerCase());
  if (x == null) return console.error("User not found.");
  else {
    console.log("------------------------".blue);
    console.log("Username: ".yellow + x.username);
    console.log("------------------------".blue);
    x.ranks.forEach((e) => {
      console.log(e.playlist);
      let u = "";
      const rankSplit = e.rank.split(" ")[0];

      if (rankSplit == "Bronze") u = e.rank.bgRed + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Silver")
        u = e.rank.grey + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Gold")
        u = e.rank.yellow + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Platinum")
        u = e.rank.cyan + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Diamond")
        u = e.rank.blue + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Champion")
        u = e.rank.magenta + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Grand") u = e.rank.red + " (" + e.mmr.yellow + ")";
      else if (rankSplit == "Supersonic")
        u = e.rank.bgWhite.magenta + " (" + e.mmr.yellow + ")";
      else u = e.rank.gray + " (" + e.mmr.yellow + ")";

      if (e.winStreak > 0) console.log(u + ` +${e.winStreak}`.green);
      else if (e.lossStreak > 0) console.log(u + ` -${e.lossStreak}`.red);
      else console.log(u);
      console.log(e.ranking);
      if (e.matches != "N/A") console.log("Matches: " + e.matches);
      console.log("------------------------".blue);
    });
  }
}

init();
