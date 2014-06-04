var loginSound;
var beepSound;

function loadSounds() {
	console.log("loadSounds called");
	loginSound = new buzz.sound("sounds/Visions/Error.mp3");
	beepSound = new buzz.sound("sounds/Simplex/talk.mp3");
}

function playLoginSound() {
	console.log("playLogin called");
	loginSound.play();
}

function playBeep() {
	console.log("playBeep called");
	beepSound.play();
}