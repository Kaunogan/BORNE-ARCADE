/*
 * Nom : timer.js
 * Date : 08/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Functions for te timer
*/

// Require
const fs = require('fs');

// Variables
var data = null;
var times_remaining = null;
var rawFile = null;
var split_times_remaining = null;
var minutes = null;
var seconds = null;
var exec = false;
var isPaused = true;
var gameIsPause = true;
var pause;
var tokenRemaining = "";

// Function to start the timer
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    // No time remaining
    if (minutes == 00 && seconds == 00 && gameIsPause == true) {

      if (isPaused) {
        $('#time').html('00:00');

        // Simulate click to pause
        pause = new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 13,
          code: "Enter",
        });

        // Pause the game
        document.dispatchEvent(pause);

        // Write time
        writeTime();

        // Open window pause
        open_window_pause();

        // Write value to pause the game
        writeGamePause();

        isPaused = false;
      }

      // Detect if the game need to be resume
      readGameIsPause('../../config/gameIsPause.conf');

      // Detect if the game need to be close
      readGameIsClose('../../config/gameIsClose.conf');
    }
    else {

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }

  }, 1000);
}

// Function to write times remaining
function writeTime() {

  data = $('#time').html();

  // Write the time in 'remaining.conf' . 
  fs.writeFile('config/remaining.conf', data, (err) => {

    // In case of a error throw err. 
    if (err) throw err;
  })
}

// Function to write game close
function writeGameIsClose() {

  fs.writeFile('config/gameIsClose.conf', "false", (err) => {

    // In case of a error throw err. 
    if (err) {
      console.log(err);
    }
  })
}

// Function to write game pause
function writeGamePause() {

  fs.writeFile('config/gameIsPause.conf', "true", (err) => {

    // In case of a error throw err. 
    if (err) {
      console.log(err);
    }
  })
}

// Function to read the times remaining
function readTimeRemaining(file) {
  rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        launch_games = allText;


        $('#time').html(allText);

        if (exec === true) {

          split_times_remaining = allText.split(':');
          minutes = split_times_remaining[0];
          seconds = split_times_remaining[1];

          // Start the timer               
          times_remaining = (parseInt(minutes) * 60) + parseInt(seconds);
          display = document.querySelector('#time');
          startTimer(times_remaining, display);
        }
      }
    }
  }
  rawFile.send(null);
}

// Function to read the token remaining
function readTokenRemaining(file) {
  rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
       
        launch_games = allText;

        $('#token').html(allText);
        tokenRemaining = allText;
      }
    }
  }
  rawFile.send(null);
}

// Function to detect if the game need to be close
function readGameIsClose(file) {

  rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {

        var allText = rawFile.responseText;
        if (allText == "true") {
          writeGameIsClose();
          setTimeout(() => {
            window.close();
          }, 500);
        }
      }
    }
  }
  rawFile.send(null);
}

// Function to detect if the game need to be close
function readGameIsPause(file) {
  rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;


        if (allText == "false") {

          readTimeRemaining('../../config/remaining.conf');
          gameIsPause = false;
          // Simulate click to pause
          pause = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 68,
            code: "Enter",
          });

          // Pause the game
          document.dispatchEvent(pause);
        }

      }
    }
  }
  rawFile.send(null);
}

// Function to open the pause menu
function open_window_pause() {

  const { remote } = require('electron');

  const BrowserWindow = remote.BrowserWindow;
  const window = new BrowserWindow({
    height: 500,
    width: 850,
    webPreferences: {
      nodeIntegration: true,
    },
    //frame: false
  });

  //Remove menu bar
  //window.removeMenu();

  window.loadURL(`file://${__dirname}/../../assets/html/pause.html`);

}

// Function to decrease token remaining
function decreaseToken() {
  tokenRemaining = parseInt(tokenRemaining) - 1;
  
  $('#token').html(tokenRemaining);

  fs.writeFile('config/remainingToken.conf', tokenRemaining, (err) => {

    // In case of a error throw err. 
    if (err) {
      console.log(err);
    }
  })
}