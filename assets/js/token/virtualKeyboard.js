/*
 * Nom : virtual-keyboard.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : init a virtual keyboard and move with zqsd
*/

// Init the keyboard
init_keyboard();

// Move on keyboard
document.onkeydown = move_on_keyboard_letter;

// Variables
var letter_selected = null;
var number_selected = null;
var letter          = 1;
var number          = 0;
var letterToken     = null;
var tokenFinal      = "";

function init_keyboard() {

    $('#azerty').append(`
    
            <div class="row-keyboard">
            <div  id="a" data-value="a">
                <input id="val_1" value="A" readonly></input>
            </div>
            <div id="z" data-value="z">
                <input id="val_2" value="Z" readonly></input>
            </div>
            <div id="e" data-value="e">
                <input id="val_3" value="E" readonly></input>
            </div>
            <div id="r" data-value="r">
                <input id="val_4" value="R" readonly></input>
            </div>
            <div id="t" data-value="t">
                <input id="val_5" value="T" readonly></input>
            </div>
            <div id="y" data-value="y">
                <input id="val_6" value="Y" readonly></input>
            </div>
            <div id="u" data-value="u">
                <input id="val_7" value="U" readonly></input>
            </div>
            <div id="i" data-value="i">
                <input id="val_8" value="I" readonly></input>
            </div>
            <div id="o" data-value="o">
                <input id="val_9" value="O" readonly></input>
            </div>
            <div id="p" data-value="p">
                <input id="val_10" value="P" readonly></input>
            </div>
        </div>
        <div class="row-keyboard">
            <div id="q" data-value="q">
                <input id="val_11" value="Q" readonly></input>
            </div>
            <div id="s" data-value="s">
                <input id="val_12" value="S" readonly></input>
            </div>
            <div id="d" data-value="d">
                 <input id="val_13" value="D" readonly></input>
            </div>
            <div id="f" data-value="f">
                 <input id="val_14" value="F" readonly></input>
            </div>
            <div id="g" data-value="g">
                 <input id="val_15" value="G" readonly></input>
            </div>
            <div id="h" data-value="h">
                <input id="val_16" value="H" readonly></input>
            </div>
            <div id="j" data-value="j">
                <input id="val_17" value="J" readonly></input>
            </div>
            <div id="k" data-value="k">
                <input id="val_18" value="K" readonly></input>
            </div>
            <div id="l" data-value="l">
                <input id="val_19" value="L" readonly></input>
            </div>
            <div id="m" data-value="m">
                <input id="val_20" value="M" readonly></input>
            </div>
        </div>
        <div class="row-keyboard">
            <div id="w" data-value="w">
                 <input id="val_21" value="W" readonly></input>
            </div>
            <div id="x" data-value="x">
                <input id="val_22" value="X" readonly></input>
            </div>
            <div id="c" data-value="c">
                <input id="val_23" value="C" readonly></input>
            </div>
            <div id="v" data-value="v">
                <input id="val_24" value="V" readonly></input>
            </div>
            <div id="b" data-value="b">
                 <input id="val_25" value="B" readonly></input>
            </div>
            <div id="n" data-value="n">
                <input id="val_26" value="N" readonly></input>
            </div>
        </div>
    `);

    $(document).ready(function () {

        $('.keyboard .row-keyboard div').on('click', function (e) {
            e.preventDefault();
            var inputtext = $('#token_input').val();

            if (e.target.id == 'del') {
                var temp = inputtext.substring(0, inputtext.length - 1);
                $('#token_input').val(temp);
            }
            else if (e.target.id == 'switch') {
                if ($('#azerty').hasClass("showKey")) {
                    $('#azerty').toggleClass("showKey").toggleClass("hiddenKey");
                } else {
                    $('#azerty').addClass("hiddenKey");
                }
            }
            else {
                var temp = $(this).data('value');
                temp = inputtext + temp;
                $('#token_input').val(temp);
            }
        });
    });
}

function fill_keyboard_by_number() {
    $('#azerty').append(`
    
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
        <input id="nbr_11" value="Retour" readonly></input>
    </div>
    </div>
    `);
}

function move_on_keyboard_letter(e) {

    e = e || window.event;

    if (letter == 1) {
        letter_selected = document.getElementById(`val_${letter}`);
        // Auto select input when the app launch
        letter_selected.focus();
        letter_selected.select();
    };

    if (e.keyCode == '90') { // Z

        if (letter >= 11 && letter <= 26) {

            $(`#val_${letter}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            letter -= 10;

            $(`#val_${letter}`).parent().css({
                "background-color": "var(--main-blue)",
                "color": "white"
            });

            letter_selected = document.getElementById(`val_${letter}`);
            letter_selected.focus();
            letter_selected.select();

        }
    }
    else if (e.keyCode == '83') { // S

        if (letter >= 1 && letter <= 16) {

            $(`#val_${letter}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            letter += 10;

            $(`#val_${letter}`).parent().css({
                "background-color": "var(--main-blue)",
                "color": "white"
            });


            letter_selected = document.getElementById(`val_${letter}`);
            letter_selected.focus();
            letter_selected.select();
        }

    }
    else if (e.keyCode == '81') { // Q
        if (letter !== 1) {

            $(`#val_${letter}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            letter--;
        }

        $(`#val_${letter}`).parent().css({
            "background-color": "var(--main-blue)",
            "color": "white"
        });

        letter_selected = document.getElementById(`val_${letter}`);
        letter_selected.focus();
        letter_selected.select();

    }
    else if (e.keyCode == '68') { // D

        if (letter !== 26) {

            $(`#val_${letter}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            letter++;
        }

        $(`#val_${letter}`).parent().css({
            "background-color": "var(--main-blue)",
            "color": "white"
        });

        letter_selected = document.getElementById(`val_${letter}`);
        letter_selected.focus();
        letter_selected.select();
    }
    else if (e.keyCode == '13') { // Enter
        $("#token_input").val($(`#val_${letter}`).val());
        letterToken = $(`#val_${letter}`).val()
        tokenFinal = letterToken;
        letter = 1;
        $('#azerty').empty();

        // Move on keyboard
        document.onkeydown = move_on_keyboard_number;
        fill_keyboard_by_number();
    }
    else if (e.keyCode == '27') { // Echap
        window.close();
    }
}

function move_on_keyboard_number(e) {

    e = e || window.event;

    if (number == 0) {

        number_selected = document.getElementById(`nbr_${number}`);
        // Auto select input when the app launch
        number_selected.focus();
        number_selected.select();
    };

    if (e.keyCode == '90') { // Z

        if (number >= 3 && number <= 11) {

            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            number -= 3;

            $(`#nbr_${number}`).parent().css({
                "background-color": "var(--main-blue)",
                "color": "white"
            });

            number_selected = document.getElementById(`nbr_${number}`);
            number_selected.focus();
            number_selected.select();

        }
    }
    else if (e.keyCode == '83') { // S

        if (number >= 0 && number <= 8) {

            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            number += 3;

            $(`#nbr_${number}`).parent().css({
                "background-color": "var(--main-blue)",
                "color": "white"
            });

            number_selected = document.getElementById(`nbr_${number}`);
            number_selected.focus();
            number_selected.select();
        }

    }
    else if (e.keyCode == '81') { // Q
        if (number !== 0) {

            $(`#nbr_${number}`).parent().css({
                "background-color": "white",
                "color": "white"
            });

            number--;
        }

        $(`#nbr_${number}`).parent().css({
            "background-color": "var(--main-blue)",
            "color": "white"
        });

        number_selected = document.getElementById(`nbr_${number}`);
        number_selected.focus();
        number_selected.select();

    }
    else if (e.keyCode == '68') { // D

        $(`#nbr_${number}`).parent().css({
            "background-color": "white",
            "color": "white"
        });

        if (number !== 11) {


            number++;
        }

        $(`#nbr_${number}`).parent().css({
            "background-color": "var(--main-blue)",
            "color": "white"
        });

        number_selected = document.getElementById(`nbr_${number}`);
        number_selected.focus();
        number_selected.select();
    }
    else if (e.keyCode == '13') { // Enter

        if (number == 10) {
            var inputtext = $('#token_input').val();
            if (inputtext.length != 1) {
                var temp = inputtext.substring(0, inputtext.length - 1);
                $('#token_input').val(temp);
                tokenFinal = temp;
                $("#token_input").val(tokenFinal);
            }

        }
        else if (number == 11) {
            $('#azerty').empty();
            $('#token_input').val(letterToken);
            init_keyboard();
            document.onkeydown = move_on_keyboard_letter;
            number = 0;
        }
        else {
            tokenFinal = tokenFinal + $(`#nbr_${number}`).val();

            if(!tokenFinal.includes("undefined")){
                $("#token_input").val(tokenFinal);
            }

            if (tokenFinal.length == 7) {
                // Decrypt the token
                $('#azerty').empty();
                parse_token(tokenFinal);
            }
        }
    }
    else if (e.keyCode == '27') { // Echap
        window.close();
    }
}