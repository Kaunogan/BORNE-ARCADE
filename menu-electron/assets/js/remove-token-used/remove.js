/*
 * Nom : decrypt.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Remove token used at every night
*/


setInterval(() => {

    var d = new Date();

    if (d.getHours() == 23 && d.getMinutes() <= 58) {


        // Write the time in 'remaining.conf' . 
        fs.writeFile('tokenUsed.conf', "", (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })

        document.location.reload(true);
    }
}, 900000);