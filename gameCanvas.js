var gameCanvas = document.getElementById("gameCanvas");
var gameCtx = gameCanvas.getContext("2d");

var spaceship = new Image();
spaceship.src = "spaceship.png";
var spaceshipX = gameCanvas.width / 2 - 25; 
var spaceshipY = gameCanvas.height / 2 - 25; 

var spaceshipVX = 0; 
var spaceshipVY = 0; 
var spaceshipAX = 0; 
var spaceshipAY = 0; 

function drawSpaceship() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCtx.drawImage(spaceship, spaceshipX, spaceshipY, 50, 50);
}

function updateSpaceship() {
    // Update velocity based on acceleration
    spaceshipVX += spaceshipAX;
    spaceshipVY += spaceshipAY;

    // Update position based on velocity
    spaceshipX += spaceshipVX;
    spaceshipY += spaceshipVY;

    // Apply some friction to reduce velocity over time
    spaceshipVX *= 0.98;
    spaceshipVY *= 0.98;

    // Boundary checks to prevent moving out of the canvas
    if (spaceshipX < 0) {
        spaceshipX = 0;
        spaceshipVX = 0;
    }
    if (spaceshipX + 50 > gameCanvas.width) {
        spaceshipX = gameCanvas.width - 50;
        spaceshipVX = 0;
    }
    if (spaceshipY < 0) {
        spaceshipY = 0;
        spaceshipVY = 0;
    }
    if (spaceshipY + 50 > gameCanvas.height) {
        spaceshipY = gameCanvas.height - 50;
        spaceshipVY = 0;
    }

    drawSpaceship();
}

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            spaceshipAY = -0.5;
            break;
        case "ArrowDown":
            spaceshipAY = 0.5;
            break;
        case "ArrowLeft":
            spaceshipAX = -0.5;
            break;
        case "ArrowRight":
            spaceshipAX = 0.5;
            break;
    }
});

document.addEventListener("keyup", function(event) {
    switch(event.key) {
        case "ArrowUp":
        case "ArrowDown":
            spaceshipAY = 0;
            break;
        case "ArrowLeft":
        case "ArrowRight":
            spaceshipAX = 0;
            break;
    }
});

// Update the spaceship position every 20 milliseconds
setInterval(updateSpaceship, 20);
drawSpaceship();
