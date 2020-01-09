/*
 * Nom : timer.js
 * Date : 08/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Functions for te timer
*/

// Require
const fs = require('fs')

// Variables
var data                  = null;
var times_remaining     = null; 
var rawFile               = null;
var split_times_remaining = null;
var minutes               = null;
var seconds               = null;
var exec                  = false;

// Functions
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {

      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      // No time remaining
      if(minutes == 00 && seconds == 00){
        $('#time').html('00:00');
        writeTime();
        setTimeout(() => {
          window.close();
        }, 100);
      }

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
}

function writeTime() {

    data = $('#time').html();

    // Write the time in 'remaining.txt' . 
    fs.writeFile('remaining.txt', data, (err) => {

      // In case of a error throw err. 
      if (err) throw err;
    })
}

function readTimeRemaining(file)
{
    rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;

                $('#time').html(allText);

                if(exec === true){
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