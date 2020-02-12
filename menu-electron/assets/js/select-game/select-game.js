/*
 * Nom : select.js
 * Date : 08/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Change the selected games with the arrow
*/

// Require
const remote = require('electron').remote;
const shell = require('shelljs');
shell.config.execPath = shell.which('node').toString()

// Variables
var games_selected = document.getElementById('game-1');
var btn_add_token = document.getElementById('btn_add_token');
var i = 1;
var launch_games = null;

// Auto select input when the app launch
games_selected.focus();
games_selected.select();

document.onkeydown = change_selected_games;

// Function to change the selected game
function change_selected_games(e) {

    e = e || window.event;

    // Key "Z" is pressed
    if (e.keyCode == '90') { 
    }
    // Key "S" is pressed
    else if (e.keyCode == '83') {
    }
    // Key "Q" is pressed
    else if (e.keyCode == '81') {
        if (i != 0 && i != 1) {
            i--;
            games_selected = document.getElementById(`game-${i}`);
            games_selected.focus();
            games_selected.select();
            readTimeRemaining(`config/remaining.conf`);
            readTokenRemaining(`config/remainingToken.conf`);
            document.querySelector('.swiper-button-prev').click();
        }
        else if (i == 1) {
            btn_add_token.focus();
            i--;
        }
    }
    // Key "D" is pressed
    else if (e.keyCode == '68') {

        if (i != 0 && i != 6) {
            i++;
            games_selected = document.getElementById(`game-${i}`);
            games_selected.focus();
            games_selected.select();
            readTimeRemaining(`config/remaining.conf`);
            readTokenRemaining(`config/remainingToken.conf`);
            document.querySelector('.swiper-button-next').click();
        }
        else if (i == 0) {
            btn_add_token.blur();
            i++;
        }
    }
    // Key "Enter" is pressed
    else if (e.keyCode == '13') {

        // Check times remaining
        readTimeRemaining("config/remaining.conf");

        //Change the value of close menu pause
        fs.writeFile('config/pauseIsClose.conf', "false", (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })

        if (launch_games != "00:00" && $('#token').html() != "0") {

            // Launch window of superMarioBros game
            if ($(`#game-${i}`).val() === "Super Mario Bros") {

                const BrowserWindow = remote.BrowserWindow;
                const window = new BrowserWindow({
                    height: 600,
                    width: 800,
                    webPreferences: {
                        nodeIntegration: true,
                    }
                });

                //Fullscreen the game
                //window.setFullScreen(true);
                window.maximize();
                //Remove menu bar
                window.removeMenu();

                window.loadURL(`file://${__dirname}/games/window/superMarioBros.html`);
            }
            // Launch window of superMarioBros 2 game
            else if ($(`#game-${i}`).val() === "Super Mario Bros 2") {

                const BrowserWindow = remote.BrowserWindow;
                const window = new BrowserWindow({
                    height: 600,
                    width: 800,
                    webPreferences: {
                        nodeIntegration: true,
                    }
                });

                //Fullscreen the game
                //window.setFullScreen(true);
                window.maximize();
                //Remove menu bar
                window.removeMenu();

                window.loadURL(`file://${__dirname}/games/window/superMarioBros2.html`);
            }
            // Launch window of superMarioBros 3 game
            else if ($(`#game-${i}`).val() === "Super Mario Bros 3") {

                const BrowserWindow = remote.BrowserWindow;
                const window = new BrowserWindow({
                    height: 600,
                    width: 800,
                    webPreferences: {
                        nodeIntegration: true,
                    }
                });

                //Fullscreen the game
                //window.setFullScreen(true);
                window.maximize();
                //Remove menu bar
                window.removeMenu();

                window.loadURL(`file://${__dirname}/games/window/superMarioBros3.html`);
            }
            // Launch window of PacMan game
            else if ($(`#game-${i}`).val() === "Pac-Man") {

                const BrowserWindow = remote.BrowserWindow;
                const window = new BrowserWindow({
                    height: 600,
                    width: 800,
                    webPreferences: {
                        nodeIntegration: true,
                    }
                });

                //Fullscreen the game
                //window.setFullScreen(true);
                window.maximize();
                //Remove menu bar
                window.removeMenu();

                window.loadURL(`file://${__dirname}/games/window/pacman.html`);
            }
            // Launch window of Donkey Kong game
            else if ($(`#game-${i}`).val() === "Donkey Kong") {

                const BrowserWindow = remote.BrowserWindow;
                const window = new BrowserWindow({
                    height: 600,
                    width: 800,
                    webPreferences: {
                        nodeIntegration: true,
                    }
                });

                //Fullscreen the game
                //window.setFullScreen(true);
                window.maximize();
                //Remove menu bar
                window.removeMenu();

                window.loadURL(`file://${__dirname}/games/window/donkeyKong.html`);
            }
            // Launch window of Donkey Kong game
            else if ($(`#game-${i}`).val() === "Space Invaders") {

                // Exec simple_nes C++
                shell.exec('../../../C++WorkSpace/simple_invaders/build/invaders');

                // Decrease Token
                decreaseToken();
            }
        }
    }
}