//Variables
var seconds = 30;
var isStanby = false;
var gameIsStarted;

document.addEventListener("keydown", resetTimer);
//Function to start timer
function startTimerStandby() {
  setInterval(function () {
    fs.readFile("conf/gameIsStarted.conf", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      gameIsStarted = data;
    });
    if (gameIsStarted == "false") {
      if (seconds == 0) {
        if (!isStanby) {
          open_window_standby();
          isStanby = true;
        }
      } else {
        seconds -= 1;
      }
    }
  }, 1000);
}

function open_window_standby() {
  const { remote } = require("electron");

  const BrowserWindow = remote.BrowserWindow;
  const window = new BrowserWindow({
    height: 500,
    width: 850,
    webPreferences: {
      nodeIntegration: true,
    },
    fullscreen: true,
    //frame: false
  });

  window.loadURL(`file://${__dirname}/standby.html`);
}

function resetTimer(e) {
  e = e || window.event;

  if (
    e.keyCode == 39 ||
    e.keyCode == 37 ||
    e.keyCode == 38 ||
    e.keyCode == 40
  ) {
    isStanby = false;
    fs.writeFile("conf/gameIsStarted.conf", "false", (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });
    seconds = 30;
  }
}

startTimerStandby();
