//Variables
var seconds = 5;
var isStanby = false;
var gameIsClose = true;

document.addEventListener('keydown', resetTimer)
//Function to start timer
function startTimerStandby() {
    setInterval(function(){
        if(gameIsClose){
            if(seconds == 0 ){
                if(!isStanby){
                    open_window_standby();
                    isStanby = true;
                }
            }
            else{
                seconds -=1;
            } 
            
        }
        readGameIsClose('config/gameIsClose.conf');
              
    }, 1000)
}


function open_window_standby() {

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
  
    window.loadURL(`file://${__dirname}/assets/html/standby.html`);
  
  }

  function resetTimer(e){
    e = e || window.event;

    if(e.keyCode == 90 || e.keyCode == 83 || e.keyCode == 81 || e.keyCode == 68){
        isStanby = false;
        seconds = 5;
    }
  }

  function readGameIsClose(file) {

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(data)
      })
  }

  startTimerStandby()




  