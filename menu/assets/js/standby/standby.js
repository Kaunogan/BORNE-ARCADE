const { remote } = require("electron").remote;

document.addEventListener("keydown", closeStandby);

function closeStandby(e) {
	if (
		e.keyCode == 38 ||
		e.keyCode == 40 ||
		e.keyCode == 37 ||
		e.keyCode == 39
	) {
		window.close();
	}
}
