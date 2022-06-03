/*
 * Nom : virtual-keyboard.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : init a virtual keyboard and move with zqsd
 */

// Init the keyboard
fill_keyboard_by_number();

// Move on keyboard
document.onkeydown = move_on_keyboard_number;

// Variables
var number_selected = null;
var number = 0;
var tokenFinal = "";

function fill_keyboard_by_number() {
    $("#azerty").append(`
    
        <div class="row-keyboard">
        <div  id="init_number" data-value="0">
            <input id="nbr_0" value="0" readonly></input>
        </div>
        <div  id="1" data-value="1">
            <input id="nbr_1" value="1" readonly></input>
        </div>
        <div id="2" data-value="1">
            <input id="nbr_2" value="2" readonly></input>
        </div>
    </div>
    <div class="row-keyboard">
        <div id="3" data-value="3">
            <input id="nbr_3" value="3" readonly></input>
        </div>
        <div id="4" data-value="4">
            <input id="nbr_4" value="4" readonly></input>
        </div>
        <div id="5" data-value="5">
            <input id="nbr_5" value="5" readonly></input>
        </div>
    </div>
    <div class="row-keyboard">
        <div id="6" data-value="6">
            <input id="nbr_6" value="6" readonly></input>
        </div>
        <div id="7" data-value="7">
            <input id="nbr_7" value="7" readonly></input>
        </div>
        <div id="8" data-value="8">
            <input id="nbr_8" value="8" readonly></input>
        </div>
        
    </div>
    <div class="row-keyboard">
        <div id=9" data-value="9">
            <input id="nbr_9" value="9" readonly></input>
        </div>
        <div id=10" data-value="10">
            <input id="nbr_10" value="<-" readonly></input>
        </div>
         <div id=11" data-value="11">
            <input id="nbr_11" value="OK" readonly></input>
        </div>
        
    </div>
    `);
}

function move_on_keyboard_number(e) {
    e = e || window.event;

    if (number === 0) {
        number_selected = document.getElementById(`nbr_${number}`);
        // Auto select input when the app launch
        number_selected.focus();
        number_selected.select();
    }

    if (e.keyCode === "38") {
        // haut

        if (number >= 3 && number <= 11) {
            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                color: "white",
            });

            number -= 3;

            $(`#nbr_${number}`).parent().css({
                "background-color": "var(--main-blue)",
                color: "white",
            });

            number_selected = document.getElementById(`nbr_${number}`);
            number_selected.focus();
            number_selected.select();
        }
    } else if (e.keyCode === "40") {
        // S

        if (number >= 0 && number <= 8) {
            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                color: "white",
            });

            number += 3;

            $(`#nbr_${number}`).parent().css({
                "background-color": "var(--main-blue)",
                color: "white",
            });

            number_selected = document.getElementById(`nbr_${number}`);
            number_selected.focus();
            number_selected.select();
        }
    } else if (e.keyCode === "37") {
        // Q
        if (number !== 0) {
            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                color: "white",
            });

            number--;
        }

        $(`#nbr_${number}`).parent().css({
            "background-color": "var(--main-blue)",
            color: "white",
        });

        number_selected = document.getElementById(`nbr_${number}`);
        number_selected.focus();
        number_selected.select();
    } else if (e.keyCode === "39") {
        // D

        $(`#nbr_${number}`).parent().css({
            "background-color": "white",
            color: "white",
        });

        if (number !== 11) {
            number++;
        }

        $(`#nbr_${number}`).parent().css({
            "background-color": "var(--main-blue)",
            color: "white",
        });

        number_selected = document.getElementById(`nbr_${number}`);
        number_selected.focus();
        number_selected.select();
    } else if (e.keyCode === "13") {
        // Enter

        if (number === 10) {
            var inputtext = $("#token_input").val();
            var temp = inputtext.substring(0, inputtext.length - 1);
            $("#token_input").val(temp);
            tokenFinal = temp;
            $("#token_input").val(tokenFinal);
        } else if (number === 11) {
            // Decrypt the token
            if (tokenFinal !== "" && tokenFinal.length > 3) {
                $("#azerty").empty();
                parse_token(tokenFinal);
                tokenFinal = "";
                number = 0;
            }
        } else {
            tokenFinal = tokenFinal + $(`#nbr_${number}`).val();

            if (!tokenFinal.includes("undefined")) {
                $("#token_input").val(tokenFinal);
            }
        }
    } else if (e.keyCode === "27") {
        // Echap
        window.close();
    }
}
