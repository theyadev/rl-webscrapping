const puppeteer = require("puppeteer");
const fs = require("fs");
module.exports = async function (platform, id) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${id}/overview`
  );
  const x = await page.$(".content--error");
  if (x != null) {
    browser.close();
    return null;
  }
  await page.waitForSelector(".trn-table");

  const res = await page.evaluate(() => {
    let x = [];
    const username = document.querySelector(".trn-ign__username").innerText;
    document
      .querySelector(".trn-table")
      .querySelector("tbody")
      .querySelectorAll("tr")
      .forEach((e) => {
        const playlist = e.querySelector(".playlist").innerText;
        const mmr = e.querySelector(".mmr").innerText;
        const rank = e.querySelector(".rank").innerText;
        const ranking = e.querySelector(".rating").querySelector(".rank")
          .innerText;
        let changeUp = e.querySelector(".up")
          ? e.querySelector(".up").innerText
          : null;
        let changeDown = e.querySelector(".down")
          ? e.querySelector(".down").innerText
          : null;

        let matches = e.querySelector(".matches").innerText;

        let winStreak = 0;
        let lossStreak = 0;

        if (matches.toLowerCase().includes("win")) {
          const x = matches.match(/\d+/g);
          if (x.length == 2) {
            winStreak = parseInt(x[1]);
            matches = parseInt(x[0]);
          }
        } else if (matches.toLowerCase().includes("loss")) {
          const x = matches.match(/\d+/g);
          if (x.length == 2) {
            lossStreak = parseInt(x[1]);
            matches = parseInt(x[0]);
          }
        }

        x = [
          ...x,
          {
            playlist,
            mmr,
            rank,
            matches,
            winStreak,
            lossStreak,
            ranking,
            change: {
              changeUp,
              changeDown,
            },
          },
        ];
      });
    return { username, x };
  });
  const user = { username: res.username, platform, id, ranks: res.x };
  if (!fs.existsSync("./players")) fs.mkdirSync("./players");
  fs.writeFileSync("./players/" + id + ".json", JSON.stringify(user));
  browser.close();
  return user;
};
