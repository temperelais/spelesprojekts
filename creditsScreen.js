var CCanvas = document.getElementById("creditScreen");
var CCtx = CCanvas.getContext("2d");

// definēti burti, kur būs teksts
CCtx.font = "36px Arial";
CCtx.textAlign = "center";
CCtx.textBaseline = "middle";
CCtx.fillStyle = "white";
// Credits teksts, kur aprakstīts, kas veidoja spēli
CCtx.fillText("Spēli veidoja Nikanders, Lukass un Ralfs un Toms", CCanvas.width / 2, CCanvas.height / 2);
var backButtonImg = new Image();
backButtonImg.src = "atgrBut.png";

backButtonImg.onload = function() {
    CCtx.drawImage(backButtonImg, CCanvas.width / 4, CCanvas.height / 2 + 100, 200, 100);
};
// Poga, lai atgrieztos uz sākuma canvasu
CCanvas.addEventListener("click", function(event) {
    var rect = CCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (x >= CCanvas.width / 4 && x <= CCanvas.width / 4 + 200 &&
        y >= CCanvas.height / 2 + 100 && y <= CCanvas.height / 2 + 200) {
        CCanvas.style.display = "none";
        startCanvas.style.display = "block";
    }
});