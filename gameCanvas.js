var gameCanvas = document.getElementById("gameCanvas");
var gameCtx = gameCanvas.getContext("2d");

var gameOverScreen = document.getElementById("gameOverCanvas");
// definēts kosmosa kuģa atrašanās vieta, un kā izskatās
var spaceship = new Image();
spaceship.src = "spaceship.png";
var spaceshipX = gameCanvas.width / 2 - 25; 
var spaceshipY = gameCanvas.height / 2 - 25; 
// Paātrināšanās no sākuma stādīta uz 0
var spaceshipVX = 0; 
var spaceshipVY = 0; 
var spaceshipAX = 0; 
var spaceshipAY = 0; 
// definētas zvaignzes, kas spēlē smukuma pēc kustēsies
var stars = [];
var starImage = new Image();
starImage.src = "ambStar.png";
// definēti asteroidi, no kuriem spēlē ir jāizvairas
var asteroids = [];
var asteroidImage = new Image();
asteroidImage.src = "asteroid.png";

// Zvaigznes spawnojas neredzamā vietā, bet vēlāk ir redzamas, un kustās uz leju un pa kreisi
function createStar() {
    var spawnEdge = Math.random() < 0.5 ? "right" : "top"; // definēts, ka zvaigzne var spawnot tikai uz aukšu un pa labi
    var star;
//  Zvaigznei ir dota random augstums, ja spawnojas pa kreisi
    if (spawnEdge === "right") {
        star = {
            x: gameCanvas.width + 20,
            y: Math.random() * gameCanvas.height,
            vx: -0.5,
            vy: 0.5
        };
    } else {
        // Zvaigznei 
        star = {
            x: Math.random() * gameCanvas.width,
            y: -20,
            vx: -0.5,
            vy: 0.5
        };
    }

    stars.push(star);
}

// aster
function createAsteroid() {
    var asteroid = {
        x: Math.random() * gameCanvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 2, // horizontāls ātrums ir random
        vy: 1 + Math.random() * 2 // Vertikāls ātrums ir random
    };
    asteroids.push(asteroid);
}

// Tiek zīmētas zvaignzes
function drawStars() {
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        gameCtx.drawImage(starImage, star.x, star.y, 20, 20);
    }
}

// tiek zīmēti asterodi
function drawAsteroids() {
    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i]; // asteroidi pievienoti listam, lai vēlāk listu varētu salīdzināt, vai asteroidi saskārās ar kuģi
        gameCtx.drawImage(asteroidImage, asteroid.x, asteroid.y, 30, 30);
    }
}

// katrā frame tiek zvaignzes atrašanās vietas update
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

// Skatās, vai kuģis un asteroidi ir saskrējusies
function checkCollisions() {
    for (var i = 0; i < asteroids.length; i++) {
        var asteroid = asteroids[i];
        if (
            asteroid.x < spaceshipX + 50 &&
            asteroid.x + 30 > spaceshipX &&
            asteroid.y < spaceshipY + 50 &&
            asteroid.y + 30 > spaceshipY
        ) {
            // Ja saskrienas kuģis un asteroids, tad canvas pāriet uz gameOver kanvasu
            gameCanvas.style.display = "none";
            gameOverCanvas.style.display = "block";
        }
    }
}

// Tiek spawnots kuģis
function drawSpaceship() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawStars();
    drawAsteroids();
    gameCtx.drawImage(spaceship, spaceshipX, spaceshipY, 50, 50);
}
// Kosmosa kuģa paatrināšanās tiek pārvērsta kustībā, kā arī liegts kustēties ārpus kanvasa
function updateAll() {
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
// Tiek lasīts, kādas kustības notiek, un attiecīgam virzienam palielināts 
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

// kad spēlētājs beidz spiest arrow pogas, paātrināšanās beidzas
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

// zvaigzne izveidota katru sekundi
setInterval(createStar, 1000);

// Zvaigzne izveidota katru otro sekundi
setInterval(createAsteroid, 2000);

// kuģa pozīcija tiek updated bieži
setInterval(updateAll, 20);
drawSpaceship();
