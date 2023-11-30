// Define your spells (you can replace these with the actual key codes)
const spells = ['Q', 'W', 'E'];

// Get elements from the DOM
const gameContainer = document.getElementById('game-container');
const userSpellContainer = document.getElementById('user-spell-container');
const timerElement = document.getElementById('time');
const userInput = document.getElementById('keypress');
const startButton = document.getElementById('start-button');
const tryAgainButton = document.getElementById('try-again-button');

let currentSpell;
let key1;
let key2;
let timer;
let timeRemaining = 7; // Set your desired time limit
let userSpellCount = 0;
let userSpell = '';

function startGame() {
    resetTimer();
    generateSpell();
    displaySpell();
    userInput.focus();
	// Start the timer countdown
	timer = setInterval(updateTimer, 1000);
	startButton.remove();
	tryAgainButton.style.display = "none";
	userSpellContainer.style.display = "inline-block";
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
    timeRemaining = 7;
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

function endGame() {
    // Handle game over logic
	tryAgainButton.style.display = "block";
    alert('Game Over!'); // You can replace this with your own game over message
    clearInterval(timer);
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
				resetTimer();
				generateSpell();
				displaySpell();
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

// Start the game when the page loads
//document.addEventListener('DOMContentLoaded', startGame);
