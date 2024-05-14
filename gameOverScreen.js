var GCanvas = document.getElementById("gameOverCanvas");
var GCtx = GCanvas.getContext("2d");

GCtx.font = "36px Arial";
GCtx.textAlign = "center";
GCtx.textBaseline = "middle";
GCtx.fillStyle = "red";

GCtx.fillText("Tu zaudēji!!", GCanvas.width / 2, GCanvas.height / 2);

var backButtonImg = new Image();
backButtonImg.src = "atgrBut.png";

backButtonImg.onload = function() {
    GCtx.drawImage(backButtonImg, GCanvas.width / 4, GCanvas.height / 2 + 100, 200, 100);
};

GCanvas.addEventListener("click", function(event) {
    var rect = GCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (x >= GCanvas.width / 4 && x <= GCanvas.width / 4 + 200 &&
        y >= GCanvas.height / 2 + 100 && y <= GCanvas.height / 2 + 200) {
        GCanvas.style.display = "none";
        startCanvas.style.display = "block";
    }
});