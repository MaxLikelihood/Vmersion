var loginSound;
var beepSound;

function loadSounds() {
	loginSound = new buzz.sound("sounds/Visions/Error.mp3");
	beepSound = new buzz.sound("sounds/Simplex/talk.mp3");
}

function playLoginSound() {
	loginSound.play();
}

function playBeep() {
	beepSound.play();
}