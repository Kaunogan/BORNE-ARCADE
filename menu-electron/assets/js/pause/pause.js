/*
* Nom : pause.js
* Date : 16/01/2020
* Auteur : GUMBAU Elric
* License : MIT
* Desc : Script pause window
*/

// Require
const fs = require('fs');

// Variables
var pauseIsClose = null;

// Auto select button
$('#btn_add_token').focus();

document.onkeydown = change_selected_button;

close_window();

// Change selected buttons
function change_selected_button(e) {

    e = e || window.event;

    // Key "D" is pressed
    if (e.keyCode == '68') {
        $('#btn_exit').focus();
    }
    // Key "Q" is pressed
    else if (e.keyCode == '81') { // Q
        $('#btn_add_token').focus();
    }
}

// Function to open window for add token
function open_window_add_token() {


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

    window.loadURL(`file://${__dirname}/../../assets/html/token.html`);
}

// Function to close the current window and the game
function close_window_and_game() {

    // Write the time in 'gameIsClose.conf'.
    fs.writeFile('config/gameIsClose.conf', "true", (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })

    setTimeout(() => {
        window.close();
    }, 200);
}

// Function to close the current window
function close_window() {

    setInterval(() => {

        readPauseIsClose('../../config/pauseIsClose.conf');

         if (pauseIsClose == "true") {
            window.close();
        }

    }, 1000);

}


// Function to read if the menu pause need to be close
function readPauseIsClose(file) {
    rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                pauseIsClose = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}