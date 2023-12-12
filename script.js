// Define your spells (you can replace these with the actual key codes)
const spells = ['Q', 'W', 'E'];

// game mode array
//const gameMode = ['survival', 'spell_rush', 'situational'];
let gameMode = 'survival';

// Get elements from the DOM
const gameContainer = document.getElementById('game-container');
const userSpellContainer = document.getElementById('user-spell-container');
const timerElement = document.getElementById('time');
const userInput = document.getElementById('keypress');
const startButton = document.getElementById('start-button');
const tryAgainButton = document.getElementById('try-again-button');
const gameModeButtonSurvival = document.getElementById('game-mode-button-survival');
const gameModeButtonSpellRush = document.getElementById('game-mode-button-spell-rush');
const gameModeButtonSituation = document.getElementById('game-mode-button-situation');
const survivalHighScoreDisplay = document.getElementById('survival-high-score');
const spellRushHighScoreDisplay = document.getElementById('spell-rush-high-score');
const situationHighScoreDisplay = document.getElementById('situation-high-score');

let currentSpell;
let key1;
let key2;
let timer;
let score;
let timeRemaining = 7; // Set your desired time limit
let userSpellCount = 0;
let userSpell = '';
let survivalHighScore = 0;
let spellRushHighScore = 0;
let situationHighScore = 0;

function startGame() {
    resetTimer();
    generateSpell();
	if(gameMode === 'situation')
		displayVideo();
	else
		displaySpell();
    userInput.focus();
	// Start the timer countdown
	timer = setInterval(updateTimer, 1000);
	score = setInterval(increaseScore, 1000);
	startButton.remove();
	tryAgainButton.style.display = "none";
	userSpellContainer.style.display = "inline-block";
	
	
	//maybe can use this method but need to fix it or add a 'stop timer' method to stop counting?  not sure how to fix this one yet.
	/*
	//high scores:
	var startTime = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
	
	function startTimeCounter() {
		var now = Math.floor(Date.now() / 1000); // get the time now
		var diff = now - startTime; // diff in seconds between now and start
		var m = Math.floor(diff / 60); // get minutes value (quotient of diff)
		var s = Math.floor(diff % 60); // get seconds value (remainder of diff)
		m = checkTime(m); // add a leading zero if it's single digit
		s = checkTime(s); // add a leading zero if it's single digit
		if(gameMode === 'survival')
			survivalHighScoreDisplay.innerHTML = m + ":" + s; // update the element where the timer will appear
		else if(gameMode ==='situation')
			situationHighScoreDisplay.innerHTML = m + ":" + s; // update the element where the timer will appear
		var t = setTimeout(startTimeCounter, 500); // set a timeout to update the timer
	}
	
	function checkTime(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	
	startTimeCounter();
	*/
}

function startButtonPress() {
	gameContainer.style.height = "200px";
	startGame();
}

function restartGame() {
	alert("game restart!");
}

function generateSpell() {
    // Choose a random spell from the array
    key1 = spells[Math.floor(Math.random() * spells.length)];
	key2 = spells[Math.floor(Math.random() * spells.length)];
	currentSpell = key1.concat(key2);
	// Define user spell count, it must equal 2 before being read
	userSpellCount = 0;
}

function getImageSource(mySpell) {
	if (gameMode === 'situation') {
		switch(mySpell) {
			case 'QQ':
				return 'spells/Hwei_Devastating_Fire.mkv'
			case 'QW':
				return 'spells/Hwei_Severing_Bolt.mkv'
			case 'QE':
				return 'spells/Hwei_Molten_Fissure.mkv'
			case 'WQ':
				return 'spells/Hwei_Fleeting_Current.mkv'
			case 'WW':
				return 'spells/Hwei_Pool_of_Reflection.mkv'
			case 'WE':
				return 'spells/Hwei_Stirring_Lights.mkv'
			case 'EQ':
				return 'spells/Hwei_Grim_Visage.mkv'
			case 'EW':
				return 'spells/Hwei_Gaze_of_the_Abyss.mkv'
			case 'EE':
				return 'spells/Hwei_Crushing_Maw.mkv'
			case 'Q':
				return 'spells/Hwei_Subject_Disaster.jpg'
			case 'W':
				return 'spells/Hwei_Subject_Serenity.jpg'
			case 'E':
				return 'spells/Hwei_Subject_Torment.jpg'
		}
	}
	else {
		switch(mySpell) {
			case 'QQ':
				return 'spells/Hwei_Devastating_Fire.jpg'
			case 'QW':
				return 'spells/Hwei_Severing_Bolt.jpg'
			case 'QE':
				return 'spells/Hwei_Molten_Fissure.jpg'
			case 'WQ':
				return 'spells/Hwei_Fleeting_Current.jpg'
			case 'WW':
				return 'spells/Hwei_Pool_of_Reflection.jpg'
			case 'WE':
				return 'spells/Hwei_Stirring_Lights.jpg'
			case 'EQ':
				return 'spells/Hwei_Grim_Visage.jpg'
			case 'EW':
				return 'spells/Hwei_Gaze_of_the_Abyss.jpg'
			case 'EE':
				return 'spells/Hwei_Crushing_Maw.jpg'
			case 'Q':
				return 'spells/Hwei_Subject_Disaster.jpg'
			case 'W':
				return 'spells/Hwei_Subject_Serenity.jpg'
			case 'E':
				return 'spells/Hwei_Subject_Torment.jpg'
		}
	}
	
}


function displaySpell() {
    // Clear the current content of the gameContainer
    gameContainer.innerHTML = '';

    // Display the image in the game container
    const imageSrc = getImageSource(currentSpell); // Assuming you have a function to get the image source based on the spell
    const image = new Image();
    image.src = imageSrc;
    image.width = 200; // Adjust width as needed
    image.height = 200; // Adjust height as needed

    // Append the image to the gameContainer
    gameContainer.appendChild(image);
}

function displayVideo() {
	// Clear the current content of the gameContainer
    gameContainer.innerHTML = '';

    // Display the image in the game container
	const videoSrc = getImageSource(currentSpell);
    const video = document.createElement('video');
    video.src = videoSrc;
    video.width = 400; // Adjust width as needed
    video.height = 300; // Adjust height as needed
	video.autoplay = true;
	video.loop = true;
	video.load();

    // Append the image to the gameContainer
    gameContainer.appendChild(video);
}

function displayUserSpell(myKey, mySpellCount) {
    // Clear the current content of the userSpellContainer
	if(mySpellCount === 1){
		userSpellContainer.innerHTML = '';
	// Display the image in the game container
    const imageSrc = getImageSource(myKey); // Assuming you have a function to get the image source based on the spell
    const image = new Image();
    image.src = imageSrc;
    image.width = 100; // Adjust width as needed
    image.height = 100; // Adjust height as needed

    // Append the image to the userSpellContainer
    userSpellContainer.appendChild(image);
	}
	
	
	else if(mySpellCount === 2) {
		if (userSpell === currentSpell) {
			userSpellContainer.innerHTML = '';
			const image = new Image();
			// TODO future state:  include currentSpell image with checkmark overlaid
				//const imageSrc = getImageSource(currentSpell);
				//image.src = imageSrc;
			image.src = 'spells/checkmark.jpg'
			image.width = 100;
			image.height = 100;
			userSpellContainer.appendChild(image);
		}
		else {
			userSpellContainer.innerHTML = '';
			const image = new Image();
			image.src = 'spells/redX.jpg'
			image.width = 100;
			image.height = 100;
			userSpellContainer.appendChild(image);
		}
	}
	
	else console.log("displayUserSpell error");

}

// deprecated function
/*
function displaySpell() {
    // Display the spell in the game container
    gameContainer.textContent = currentSpell;
}
*/

function resetTimer() {
    // Reset the timer to the initial time
	if(gameMode === 'spell_rush')
		timeRemaining = 30;
	else if(gameMode === 'survival')
		timeRemaining = 7;
	else if(gameMode === 'situation')
		timeRemaining = 10;
    updateTimer();
}

function updateTimer() {
    // Update the timer display
    timerElement.textContent = timeRemaining;
    // Check if time is up
    if (timeRemaining === 0) {
        endGame();
    } else {
        timeRemaining--;
    }
}

function increaseScore() {
	if(gameMode === 'survival')
		survivalHighScore++;
	if(gameMode === 'situation')
		situationHighScore++;
}

function endGame() {
    // Handle game over logic
	tryAgainButton.style.display = "block";
    alert('Game Over!'); // You can replace this with your own game over message
    clearInterval(timer);
	switch(gameMode) {
		case 'survival':
			survivalHighScoreDisplay.innerHTML = survivalHighScore;
		case 'spell_rush':
			spellRushHighScoreDisplay.innerHTML = spellRushHighScore;
		case 'situation':
			situationHighScoreDisplay.innerHTML = situationHighScore;
	}
	survivalHighScore = 0;
	spellRushHighScore = 0;
	situationHighScore = 0;
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}

function gameModeSurvival() {
	console.log('survival');
	gameMode = 'survival';
}

function gameModeSpellRush() {
	console.log('spell rush');
	gameMode = 'spell_rush';
	updateTimer;
}

function gameModeSituation() {
	console.log('situation');
	gameMode = 'situation';
}


// Event listener for user input
userInput.addEventListener('keydown', function (event) {
	userKey = event.key.toUpperCase();
	if (userKey === "R") {
		userSpellCount = 0;
		userSpell = '';
		userInput.value = '';
		userSpellContainer.innerHTML = '';
		const image = new Image();
		image.src = 'spells/Hwei_Wash_Brush.jpg'
		image.width = 100;
		image.height = 100;
		userSpellContainer.appendChild(image);
	}
	else if (spells.includes(userKey)) {
		userSpellCount++;
		userSpell = userSpell.concat(userKey);
		displayUserSpell(userKey, userSpellCount);
		
		// Check if the entered key matches the current spell
		if (userSpellCount === 2) {
			if (userSpell === currentSpell) {
				// Correct input, reset the timer and generate a new spell
				if (gameMode === 'survival' || gameMode === 'situation') {
					resetTimer();
				}
				generateSpell();
				if (gameMode === 'survival' || gameMode === 'spell_rush') {
					displaySpell();
				}
				else if (gameMode === 'situation') {
					displayVideo();
				}
				if (gameMode ==='spell_rush')
					spellRushHighScore++;
				userInput.value = ''; // Clear the input field
				userSpell = ''; // Clear user's spell
			}
			else {
				userInput.value = ''; // Clear the input field
				userSpell = ''; // Clear user's spell
			}
			
			// reset user spell count
			userSpellCount = 0;
		}
	}
});

//restartGame not restartGame() - we want function reference, not function invocation
//https://stackoverflow.com/questions/29526556/javascript-onclick-function-is-called-immediately-not-when-clicked
tryAgainButton.onclick = startGame;
startButton.onclick = startButtonPress;
gameModeButtonSurvival.onclick = gameModeSurvival;
gameModeButtonSpellRush.onclick = gameModeSpellRush;
gameModeButtonSituation.onclick = gameModeSituation;

// Start the game when the page loads
//document.addEventListener('DOMContentLoaded', startGame);
