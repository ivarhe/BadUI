const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const canvasSize = canvas.width / gridSize;
let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let numbers = generateAllNumbers();  // Generate all numbers (0-9)
let backButton = generateBackButton();
let finishedButton = null;
let collectedNumbers = '';
const maxNumbers = 10;  // Limit the phone number to 10 digits

// Start the game loop
document.addEventListener('keydown', changeDirection);
gameLoop();

// Main game loop
function gameLoop() {
    moveSnake();

    if (checkCollision()) {
        resetGame();
        return;
    }

    // Check if snake eats a number
    for (let i = 0; i < numbers.length; i++) {
        if (snake[0].x === numbers[i].x && snake[0].y === numbers[i].y) {
            if (collectedNumbers.length < maxNumbers) {
                collectedNumbers += numbers[i].number;
                updatePhoneNumberDisplay();
                numbers[i] = generateRandomNumber(numbers[i].number); // Reposition the eaten number
            }
            snake.push({});  // Grow the snake
        }
    }

    // Check if snake eats the back-button
    if (snake[0].x === backButton.x && snake[0].y === backButton.y) {
        if (collectedNumbers.length > 0) {
            collectedNumbers = collectedNumbers.slice(0, -1);  // Remove last number
            updatePhoneNumberDisplay();
        }
        snake.push({});  // Grow the snake instead of shrinking
        backButton = generateBackButton();  // Generate a new back-button
    }

    // Check if snake eats the finished-button
    if (finishedButton && snake[0].x === finishedButton.x && snake[0].y === finishedButton.y) {
        alert('Thank you for signing up to our collaborator, Telefonselgere AS');
        // Don't reset the numbers, but hide the finished button
        finishedButton = null;
        return;
    }

    // Check if we need to show the finished button
    if (collectedNumbers.length === 8 && !finishedButton) {
        finishedButton = generateFinishedButton();
    }

    draw();

    const speedSlider = document.getElementById('speedSlider');

    // Inside the gameLoop function, replace the existing speed setting logic with this:
    const sliderValue = parseInt(speedSlider.value, 10);
    let speed;
    if (sliderValue === 0) {
        speed = 500;  // Slow
    } else if (sliderValue === 1) {
        speed = 100;  // Fast
    } else {
        const time = (Date.now() / 1000) % (2 * Math.PI);  // Time in seconds
        speed = 200 + 150 * Math.sin(time);  // Sine wave speed
    }

    setTimeout(gameLoop, speed);


    // setTimeout(gameLoop, 500);
}

// Draw game elements
function draw() {
    // Fill the background with a color to increase visibility
    ctx.fillStyle = '#f0f0f0';  // Light gray background for the canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw numbers (food) that are yet to be collected
    ctx.fillStyle = 'red';
    numbers.forEach(num => {
        ctx.fillRect(num.x * gridSize, num.y * gridSize, gridSize, gridSize);
        ctx.fillStyle = 'white';
        ctx.fillText(num.number, num.x * gridSize + 5, num.y * gridSize + 15);
        ctx.fillStyle = 'red';  // Reset fill color for next number
    });

    // Draw back-button
    ctx.fillStyle = 'blue';
    ctx.fillRect(backButton.x * gridSize, backButton.y * gridSize, gridSize, gridSize);
    ctx.fillStyle = 'white';
    ctx.fillText('B', backButton.x * gridSize + 5, backButton.y * gridSize + 15);

    // Draw finished-button
    if (finishedButton) {
        ctx.fillStyle = 'purple';
        ctx.fillRect(finishedButton.x * gridSize, finishedButton.y * gridSize, gridSize, gridSize);
        ctx.fillStyle = 'white';
        ctx.fillText('F', finishedButton.x * gridSize + 5, finishedButton.y * gridSize + 15);
    }

    // Draw a border around the canvas
    ctx.strokeStyle = 'cyan';  // Border color
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Draw border around the canvas
}

// Move the snake
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    snake.pop();
}

// Change direction of the snake
function changeDirection(event) {
    const keyCode = event.keyCode;
    if (keyCode === 37 && direction.x !== 1) {  // Left arrow
        direction = { x: -1, y: 0 };
    } else if (keyCode === 38 && direction.y !== 1) {  // Up arrow
        direction = { x: 0, y: -1 };
    } else if (keyCode === 39 && direction.x !== -1) {  // Right arrow
        direction = { x: 1, y: 0 };
    } else if (keyCode === 40 && direction.y !== -1) {  // Down arrow
        direction = { x: 0, y: 1 };
    }
}

// Check for collisions (walls or self)
function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.y < 0 || 
        head.x >= canvasSize || head.y >= canvasSize || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

// Generate all numbers (0-9) at random positions
function generateAllNumbers() {
    const allNumbers = [];
    for (let i = 0; i < 10; i++) {
        allNumbers.push(generateRandomNumber(i));
    }
    return allNumbers;
}

// Generate a random number object with a given number at a random position
function generateRandomNumber(number) {
    return {
        x: Math.floor(Math.random() * canvasSize),
        y: Math.floor(Math.random() * canvasSize),
        number: number.toString()
    };
}

// Generate a back-button at a random position
function generateBackButton() {
    return {
        x: Math.floor(Math.random() * (canvasSize - 4)),
        y: Math.floor(Math.random() * canvasSize)
    };
}

// Generate a finished-button at a random position
function generateFinishedButton() {
    return {
        x: Math.floor(Math.random() * canvasSize),
        y: Math.floor(Math.random() * canvasSize)
    };
}

// Update the displayed phone number
function updatePhoneNumberDisplay() {
    document.getElementById('wordDisplay').textContent = collectedNumbers;
}

// Reset the game to start fresh
function resetGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
    collectedNumbers = '';
    updatePhoneNumberDisplay();
    if (!finishedButton) {
        numbers = generateAllNumbers();
    }
    backButton = generateBackButton();
    finishedButton = null;  // Hide the finished button

    
}