/*
 * Nom : select.js
 * Date : 08/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Change the selected games with the arrow
*/

// Require
var i = 1;
const remote = require('electron').remote;

document.onkeydown = change_selected_games;

function change_selected_games(e) {

    e = e || window.event;

    if (e.keyCode == '90') {
        if (i != 1) {
            i--;
        }
        games_selected = document.getElementById(`game-${i}`);
        games_selected.focus();
        games_selected.select();
        readTimeRemaining(`remaining.txt`);
    }
    else if (e.keyCode == '83') {
        if (i != 3) {
            i++;
        }
        games_selected = document.getElementById(`game-${i}`);
        games_selected.focus();
        games_selected.select();
        readTimeRemaining(`remaining.txt`);

    }
    else if (e.keyCode == '37') {
        // left arrow
    }
    else if (e.keyCode == '39') {
        // right arrow
    } 
    else if (e.keyCode == '13') {

        if($('#time').html() != '00:00'){

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
                console.log(`${__dirname}/games/window/superMarioBros.html`);
                
                window.loadURL(`file://${__dirname}/games/window/superMarioBros.html`);

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
        }
    }
}