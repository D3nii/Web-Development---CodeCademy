	let doorImage1 = document.getElementById('door1');
	let doorImage2 = document.getElementById('door2');
	let doorImage3 = document.getElementById('door3');
	let startButton = document.getElementById('start');
	let numClosedDoors = 3;
	let currentlyPlaying = true;
	let openDoor1;
	let openDoor2;
	let openDoor3;

	let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
	let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
	let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
	let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

	function isBot(door) {
		if(door.src == botDoorPath) {
			return true;
		} return false;
	};

	function isClicked(door) {
		if(door.src == closedDoorPath) {
			return false;
		} return true;
	};

	function playDoor(door) {
		numClosedDoors--;

		if(numClosedDoors==0) {
			gameOver('win');
		} else if(isBot(door)==true) {
			gameOver();
		}
	};

	function randomChoreDoorGenerator() {
		const choreDoor = Math.floor(Math.random() * numClosedDoors);
		
		console.log(choreDoor);

		if(choreDoor == 0) {
			openDoor1 = botDoorPath;
			openDoor3 = beachDoorPath;
			openDoor2 = spaceDoorPath;
		} else if(choreDoor == 1) {
			openDoor2 = botDoorPath;
			openDoor3 = beachDoorPath;
			openDoor1 = spaceDoorPath;
		} else {
			openDoor3 = botDoorPath;
			openDoor2 = beachDoorPath;
			openDoor1 = spaceDoorPath;
		}

	};

	doorImage1.onclick = () => {
	  if(isClicked(doorImage1)==false && currentlyPlaying == true) {
	  	doorImage1.src = openDoor1;
	  	playDoor(doorImage1);
	  }
	};

	doorImage2.onclick = () => {
	  if(isClicked(doorImage2)==false && currentlyPlaying == true) {
	  	doorImage2.src = openDoor2;
	  	playDoor(doorImage2);
	  }
	};
 
	doorImage3.onclick = () => {
	  if(isClicked(doorImage3)==false && currentlyPlaying == true) {
	  	doorImage3.src = openDoor3;
	  	playDoor(doorImage3);
	  }
	};

	function startRound() {
		doorImage1.src = closedDoorPath;
		doorImage2.src = closedDoorPath;
		doorImage3.src = closedDoorPath;
		numClosedDoors = 3;
		startButton.innerHTML = 'Good luck!';
		currentlyPlaying = true;
		randomChoreDoorGenerator();
	};

	startButton.onclick = startRound;

	function gameOver(status) {
		if(status=='win') {
			startButton.innerHTML = 'You win! Play again?';
		} else {
			startButton.innerHTML = 'Game over! Play again?';
		}
		currentlyPlaying = false;
	};

	startRound();