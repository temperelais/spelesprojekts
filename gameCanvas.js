var gameCanvas = document.getElementById("gameCanvas");
var gameCtx = gameCanvas.getContext("2d");

var gameOverScreen = document.getElementById("gameOverCanvas");

var spaceship = new Image();
spaceship.src = "spaceship.png";
var spaceshipX = gameCanvas.width / 2 - 25; 
var spaceshipY = gameCanvas.height / 2 - 25; 

var spaceshipVX = 0; 
var spaceshipVY = 0; 
var spaceshipAX = 0; 
var spaceshipAY = 0; 

var stars = [];
var starImage = new Image();
starImage.src = "ambStar.png";

var asteroids = [];
var asteroidImage = new Image();
asteroidImage.src = "asteroid.png";

// Create a new star outside the canvas
function createStar() {
    var spawnEdge = Math.random() < 0.5 ? "right" : "top";
    var star;

    if (spawnEdge === "right") {
        star = {
            x: gameCanvas.width + 20,
            y: Math.random() * gameCanvas.height,
            vx: -0.5,
            vy: 0.5
        };
    } else {
        star = {
            x: Math.random() * gameCanvas.width,
            y: -20,
            vx: -0.5,
            vy: 0.5
        };
    }

    stars.push(star);
}

// Create a new asteroid above the canvas
function createAsteroid() {
    var asteroid = {
        x: Math.random() * gameCanvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 2, // Random horizontal speed between -1 and 1
        vy: 1 + Math.random() * 2 // Random vertical speed between 1 and 3
    };
    asteroids.push(asteroid);
}

// Draw all stars
function drawStars() {
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        gameCtx.drawImage(starImage, star.x, star.y, 20, 20);
    }
}

// Draw all asteroids
function drawAsteroids() {
    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        gameCtx.drawImage(asteroidImage, asteroid.x, asteroid.y, 30, 30);
    }
}

// Update star positions
function updateStars() {
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < -20 || star.y > gameCanvas.height + 20) {
            stars.splice(i, 1);
            i--;
        }
    }
}

// Update asteroid positions
function updateAsteroids() {
    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        asteroid.x += asteroid.vx;
        asteroid.y += asteroid.vy;
        if (asteroid.y > gameCanvas.height + 20) {
            asteroids.splice(i, 1);
            i--;
        }
    }
}

// Check for collisions between asteroids and the spaceship
function checkCollisions() {
    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        if (
            asteroid.x < spaceshipX + 50 &&
            asteroid.x + 30 > spaceshipX &&
            asteroid.y < spaceshipY + 50 &&
            asteroid.y + 30 > spaceshipY
        ) {
            // Collision detected, switch to game over screen
            gameCanvas.style.display = "none";
            gameOverCanvas.style.display = "block";
        }
    }
}

function drawSpaceship() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawStars();
    drawAsteroids();
    gameCtx.drawImage(spaceship, spaceshipX, spaceshipY, 50, 50);
}

function updateSpaceship() {
    spaceshipVX += spaceshipAX;
    spaceshipVY += spaceshipAY;
    spaceshipX += spaceshipVX;
    spaceshipY += spaceshipVY;
    spaceshipVX *= 0.98;
    spaceshipVY *= 0.98;

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

    updateStars();
    updateAsteroids();
    checkCollisions();
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

// Create a new star every second
setInterval(createStar, 1000);

// Create a new asteroid every 2 seconds
setInterval(createAsteroid, 2000);

// Update the spaceship position and stars every 20 milliseconds
setInterval(updateSpaceship, 20);
drawSpaceship();
