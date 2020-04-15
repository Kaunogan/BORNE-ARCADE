// require
const remote = require("electron").remote;
const fs = require("fs");

// variable
var index_game = 0;
var token = 999999;
var Swiper = require("swiper");

// Init swiperjs
$(document).ready(function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    effect: "coverflow",
    spaceBetween: 30,
    centeredSlides: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Display token remaining
  token_remaining();
});

// Keydown on function select_game()
document.onkeydown = select_game;

// Call function to start fade animation
fadeAnimation();

// Section functions

// Select a game
function select_game(e) {
  if (e.keyCode == "83") {
    // S
  } else if (e.keyCode == "81") {
    // Q
    if (index_game !== 0) {
      token_remaining();

      document.querySelector(".swiper-button-prev").click();
      index_game--;

      // Detect which highscore to display based on the game index
      if (index_game === 0) {
        fs.readFile("highscore/mario.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore World " + data);
        });
      } else if (index_game === 1) {
        $("#highscore_content").html("");
      } else if (index_game === 2) {
        fs.readFile("highscore/pacman.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore " + data);
        });
      } else if (index_game === 3) {
        fs.readFile("highscore/tetris.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore " + data);
        });
      }
    }
  } else if (e.keyCode == "68") {
    // D
    if (index_game !== 3) {
      token_remaining();
      document.querySelector(".swiper-button-next").click();
      index_game++;

      // Detect which highscore to display based on the game index
      if (index_game === 0) {
        fs.readFile("highscore/mario.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore " + data);
        });
      } else if (index_game === 1) {
        $("#highscore_content").html("");
      } else if (index_game === 2) {
        fs.readFile("highscore/pacman.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore " + data);
        });
      } else if (index_game === 3) {
        fs.readFile("highscore/tetris.txt", "utf-8", (err, data) => {
          $("#highscore_content").html("Highscore " + data);
        });
      }
    }
  } else if (e.keyCode == "70") {
    // New window to add tokens
    writeGameIsStarted();

    var BrowserWindow = remote.BrowserWindow;
    var window = new BrowserWindow({
      height: 500,
      width: 900,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    window.setMenuBarVisibility(false);

    //Remove menu bar
    //window.removeMenu();
    // Load the URL
    window.loadURL(`file://${__dirname}/token.html`);
  } else if (e.keyCode == "13" && token !== 0) {
    // Enter

    switch (index_game) {
      case 0:
        token--;
        writeTokenRemaining(token);
        writeGameIsStarted();

        // Launch mario bros infinite

        var BrowserWindow = remote.BrowserWindow;
        var window = new BrowserWindow({
          height: 600,
          width: 800,
          webPreferences: {
            nodeIntegration: true,
          },
        });

        //Fullscreen the game
        window.setFullScreen(true);
        window.maximize();
        //Remove menu bar
        window.removeMenu();

        window.loadURL(
          `file://${__dirname}/../games/mario_bros_infinite/main.html`
        );

        break;
      case 1:
        token--;
        writeTokenRemaining(token);
        writeGameIsStarted();

        // Launch pong game

        var BrowserWindow = remote.BrowserWindow;
        var window = new BrowserWindow({
          height: 600,
          width: 800,
          webPreferences: {
            nodeIntegration: true,
          },
        });

        //Fullscreen the game
        window.setFullScreen(true);
        window.maximize();
        //window.webContents.openDevTools();
        //Remove menu bar
        window.removeMenu();

        window.loadURL(`file://${__dirname}/../games/pong/index.html`);

        break;
      case 2:
        token--;
        writeTokenRemaining(token);
        writeGameIsStarted();

        // Launch pacman game
        var BrowserWindow = remote.BrowserWindow;
        var window = new BrowserWindow({
          height: 600,
          width: 800,
          webPreferences: {
            nodeIntegration: true,
          },
        });

        //Fullscreen the game
        window.setFullScreen(true);
        //Remove menu bar
        window.removeMenu();

        window.loadURL(`file://${__dirname}/../games/pacman/index.html`);

        break;
      case 3:
        token--;
        writeTokenRemaining(token);
        writeGameIsStarted();
        // Launch tetris game
        var BrowserWindow = remote.BrowserWindow;
        var window = new BrowserWindow({
          height: 600,
          width: 800,
          webPreferences: {
            nodeIntegration: true,
          },
        });

        //Fullscreen the game
        window.setFullScreen(true);
        //Remove menu bar
        window.removeMenu();

        window.loadURL(`file://${__dirname}/../games/tetris/index.html`);
        break;
      default:
        console.log("error");
    }
  }
}

// Display the token remaining
function token_remaining() {
  fs.readFile("conf/tokenRemaining.conf", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    $("#token_remainig").html(`${data} JETONS`);
    token = parseInt(data);
  });
}

function writeTokenRemaining(token) {
  fs.writeFile("conf/tokenRemaining.conf", token, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

// Fade animation between text association
function fadeAnimation() {
  var index = 0;
  var array_text = [
    `ACCOMPAGNER, AGIR ET TÉMOIGNER : Par nos actions, nous recréons des liens permettant aux personnes âgées souffrant d’isolement de retrouver une dynamique de vie : partager des expériences, trouver ensemble des solutions à leurs problèmes, retrouver la joie, être soi, être libre de ses choix, rêver et oser réaliser ses rêves, oser se projeter à nouveau.`,
    `FAVORISER LE LIEN SOCIAL : Par nos actions, nous recréons des liens permettant de retrouver une dynamique de vie : partager  des expériences, trouver ensemble des solutions à leurs problèmes, retrouver la joie, être soi, être libre de ses choix, rêver et oser réaliser ses rêves, oser se projeter à nouveaux. Vivre tout simplement.`,
    `AGIR CONTRE LA VULNÉRABILITÉ : Lutter contre la solitude et l'exclusion des personnes âgées, c'est aussi apporter des réponses aux nombreux facteurs aggravants d'isolement : des vulnérabilités liées à la santé, au logement et aux ressources financières notamment, accentuent la mise à l'écart de nos aînés.`,
    `Plus d'informations sur https://www.petitsfreresdespauvres.fr/`,
  ];

  setInterval(() => {
    $("#content")
      .fadeOut(function () {
        if (index === 4) {
          index = 0;
        }
        $(this).text(array_text[index]);
        index++;
      })
      .fadeIn();
  }, 20000);
}

function writeGameIsStarted() {
  fs.writeFile("conf/gameIsStarted.conf", "true", (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}
