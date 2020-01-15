/*
 * Nom : add.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Open window with virtual keyboard to add token
*/

// Opening new window and token
function add_token() {

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

    window.loadURL(`file://${__dirname}/assets/html/token.html`);
}

