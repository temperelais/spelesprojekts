var creditCanvas = document.getElementById("creditScreen")

var startCanvas = document.getElementById("startScreen");
var startCtx = startCanvas.getContext("2d");

startCtx.font = "48px Arial";
startCtx.textAlign = "center";
startCtx.textBaseline = "middle";
startCtx.fillStyle = "white";
startCtx.fillText("Izvairīšanās!", startCanvas.width / 2, startCanvas.height / 5);

var startButtonImg = new Image();
startButtonImg.src = "startBut.png";

startButtonImg.onload = function() {
    startCtx.drawImage(startButtonImg, startCanvas.width / 4, startCanvas.height / 2, 200, 100);
};

var creditsButtonImg = new Image();
creditsButtonImg.src = "creditsBut.png";

creditsButtonImg.onload = function() {
    startCtx.drawImage(creditsButtonImg, startCanvas.width / 4, startCanvas.height / 2 + 150, 200, 100);
};

startCanvas.addEventListener("click", function(event) {
    var rect = startCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (x >= startCanvas.width / 4 && x <= startCanvas.width / 4 + 200 &&
        y >= startCanvas.height / 2 && y <= startCanvas.height / 2 + 100) {
        startCanvas.style.display = "none";
        gameCanvas.style.display = "block";
    }

    if (x >= startCanvas.width / 4 && x <= startCanvas.width / 4 + 200 &&
        y >= startCanvas.height / 2 + 150 && y <= startCanvas.height / 2 + 250) {
        startCanvas.style.display = "none";
        creditScreen.style.display = "block";
    }
});