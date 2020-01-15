/*
 * Nom : select.js
 * Date : 08/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Change the selected games with the arrow
*/

// Require
const remote = require('electron').remote;

// Variables
var games_selected = document.getElementById('game-1');
var btn_add_token = document.getElementById('btn_add_token');
var i = 1;

// Auto select input when the app launch
games_selected.focus();
games_selected.select();

document.onkeydown = change_selected_games;

function change_selected_games(e) {

    e = e || window.event;

    if (e.keyCode == '90') { // Z

    }
    else if (e.keyCode == '83') { // S

    }
    else if (e.keyCode == '81') { // Q
        if (i != 0 && i != 1) {
            i--;
            games_selected = document.getElementById(`game-${i}`);
            games_selected.focus();
            games_selected.select();
            readTimeRemaining(`remaining.txt`);
            document.querySelector('.swiper-button-prev').click();
        }
        else if (i == 1) {
            btn_add_token.focus();
            i--;
        }
    }
    else if (e.keyCode == '68') { // D

        if (i != 0 && i != 5) {
            i++;
            games_selected = document.getElementById(`game-${i}`);
            games_selected.focus();
            games_selected.select();
            readTimeRemaining(`remaining.txt`);
            document.querySelector('.swiper-button-next').click();
        }
        else if (i == 0) {
            btn_add_token.blur();
            i++;
        }
    }
    else if (e.keyCode == '13') {

        if ($('#time').html() != '00:00') {

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
        }
    }
}