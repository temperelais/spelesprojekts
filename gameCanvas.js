var gameCanvas = document.getElementById("gameCanvas");
var gameCtx = gameCanvas.getContext("2d");

var spaceship = new Image();
spaceship.src = "spaceship.png";
var spaceshipX = gameCanvas.width / 2 - 25; // Initial x position
var spaceshipY = gameCanvas.height / 2 - 25; // Initial y position

function drawSpaceship() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCtx.drawImage(spaceship, spaceshipX, spaceshipY, 50, 50);
}

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            spaceshipY -= 10;
            break;
        case "ArrowDown":
            spaceshipY += 10;
            break;
        case "ArrowLeft":
            spaceshipX -= 10;
            break;
        case "ArrowRight":
            spaceshipX += 10;
            break;
    }
    drawSpaceship();
});
drawSpaceship();
