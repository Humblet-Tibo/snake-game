
let cellSize = 25;
let boardsize = 20;
let moveSnake = true, speed = 100;

let snake = [];
let snakeHeadX = 0, snakeHeadY = 0;

let food;
let foodX = getRandomFoodLocation(cellSize, boardsize), foodY = getRandomFoodLocation(cellSize, boardsize);

let scoreCount = 0;

// create board + snakehead + food + score_counter
	createScoreCounter();
	createBoard("board", cellSize, boardsize, "lightgreen");
	createSnakeElement("board", snake, "snakeHead", cellSize, "darkgreen", snakeHeadX, snakeHeadY);
	food = createfood("board", "food", cellSize, "red", foodX, foodY);

// move / control snake 
	if(moveSnake) {

		let left = false, up = false, right = false, down = false;

		window.addEventListener("keydown", (e) => {

			switch(e.keyCode) {
				// arrow keys
				case 37: 
					left = true, up = false, right = false, down = false;
					break;

				case 38: 
					left = false, up = true, right = false, down = false;
					break;

				case 39: 
					left = false, up = false, right = true, down = false;
					break;

				case 40: 
					left = false, up = false, right = false, down = true;
					break;

				// wasd keys

				case 65: 
					left = true, up = false, right = false, down = false;
					break;

				case 87: 
					left = false, up = true, right = false, down = false;
					break;

				case 68: 
					left = false, up = false, right = true, down = false;
					break;

				case 83: 
					left = false, up = false, right = false, down = true;
					break;
			}
		});

		setInterval(() => {

			// check direction + move snake			
				for (let i = snake.length - 1; i > 0; i--) {
					snake[i].style.left = snake[i - 1].style.left;
					snake[i].style.top = snake[i - 1].style.top;
				}

				if (left) {
					snakeHeadX -= cellSize;
				} else if (up) {
					snakeHeadY -= cellSize;
				} else if (right) {
					snakeHeadX += cellSize;
				} else if (down) {
					snakeHeadY += cellSize;
				}

				snake[0].style.left = `${snakeHeadX}px`;
				snake[0].style.top = `${snakeHeadY}px`;


			// check foodcatch
				if (checkEatFood(snakeHeadX, snakeHeadY, foodX, foodY)) {

					foodX = getRandomFoodLocation(cellSize, boardsize), foodY = getRandomFoodLocation(cellSize, boardsize);
					food.style.left = `${foodX}px`;
					food.style.top = `${foodY}px`;

					createSnakeElement("board", snake, "snakeHead", cellSize, "green", snakeHeadX, snakeHeadY);

					scoreCount++;
					updateScoreCounter(scoreCount);
				} else {
					checkIfHeadHitsTail(snake);
					checkIfHeadHitsWall(snake);
				}


		}, speed);
	}	


// start functions
	function createBoard(elemenentId, cellSize, boardsize, color) {

		const board = document.createElement("span");
		board.id = `${elemenentId}`;
		board.style.display = "block";
		board.style.position = "relative";
		board.style.width = `${cellSize * boardsize}px`;
		board.style.height = `${cellSize * boardsize}px`;
		board.style.backgroundColor = color;
		document.getElementById("snakeGame").appendChild(board);
	}

	function createSnakeElement(boardId, snake, elemenentId, size, color, posX, posY) {

		const bodyPart = document.createElement("span");
		bodyPart.id = `${elemenentId}`;
		bodyPart.style.display = "block";
		bodyPart.style.position = "absolute";
		bodyPart.style.left = `${posX}px`;
		bodyPart.style.top = `${posY}px`;
		bodyPart.style.width = `${size}px`;
		bodyPart.style.height = `${size}px`;
		bodyPart.style.backgroundColor = color;
		document.getElementById(`${boardId}`).appendChild(bodyPart);

		snake[snake.length] = bodyPart;
	}

	function createfood(boardId, elemenentId, size, color, posX, posY) {

		const newFood = document.createElement("span");
		newFood.id = `${elemenentId}`;
		newFood.style.display = "block";
		newFood.style.position = "absolute";
		newFood.style.left = `${posX}px`;
		newFood.style.top = `${posY}px`;
		newFood.style.width = `${size}px`;
		newFood.style.height = `${size}px`;
		newFood.style.backgroundColor = color;
		document.getElementById(`${boardId}`).appendChild(newFood);

		return newFood;
	}

	function getRandomFoodLocation(cellSize, boardsize) {

		const maxValue = (cellSize*boardsize) - cellSize;
		return Math.floor(Math.random() * ((maxValue / cellSize) + 1)) * cellSize;
	}

	function checkEatFood(snakeX, snakeY, foodX, foodY) {

		if (snakeX == foodX && snakeY == foodY) { return true } else { return false }
	}

	function checkIfHeadHitsTail(snake) {
		let snakeHeadX = snake[0].style.left;
		let snakeHeadY = snake[0].style.top;

		for (var i = snake.length - 1; i >= 1; i--) {
			if (snakeHeadX == snake[i].style.left && snakeHeadY == snake[i].style.top) {
				alert(gameOverMessage(scoreCount));
				location.reload();
			}
		}
	}

	function checkIfHeadHitsWall(snake) {
		let snakeHeadX = snake[0].style.left;
		let snakeHeadY = snake[0].style.top;

		if (snakeHeadX == `-${cellSize}px` || snakeHeadX == `${(cellSize * boardsize) + cellSize}px`) {
			alert(gameOverMessage(scoreCount));
			location.reload();
		}

		if (snakeHeadY == `-${cellSize}px` || snakeHeadY == `${(cellSize * boardsize) + cellSize}px`) {
			alert(gameOverMessage(scoreCount));
			location.reload();
		}
	}

	function createScoreCounter() {
		const scoreCounter = document.createElement("span");
		scoreCounter.id = "score__counter";
		scoreCounter.style.display = "flex";
		scoreCounter.style.justifyContent ="center";
		scoreCounter.style.padding = "2ch";
		scoreCounter.style.color = "white";
		scoreCounter.style.fontSize = "30px";
		scoreCounter.innerHTML = "Score: 0";
		document.getElementById("snakeGame").appendChild(scoreCounter);

		return scoreCounter;
	}

	function updateScoreCounter(scoreCount) {
		const scoreCounter = document.getElementById("score__counter");
		scoreCounter. innerHTML = `Score: ${scoreCount}`;
	}

	function gameOverMessage(scoreCount) {
		return `Game Over, Your Score Is: ${scoreCount}`;
	}

// end functions