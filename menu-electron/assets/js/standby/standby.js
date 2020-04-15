
const { remote } = require('electron').remote;


document.addEventListener('keydown', closeStandby);

function closeStandby(e){

    if(e.keyCode == 90 || e.keyCode == 83 || e.keyCode == 81 || e.keyCode == 68){
        window.close();
    }
}