var CCanvas = document.getElementById("creditScreen");
var CCtx = CCanvas.getContext("2d");

// Set font size and family
CCtx.font = "36px Arial";

// Set text alignment to center
CCtx.textAlign = "center";

// Set text baseline to middle
CCtx.textBaseline = "middle";

// Set fill style to white
CCtx.fillStyle = "white";

// Draw the text
CCtx.fillText("Spēli veidoja Nikanders, Lukass un Ralfs", CCanvas.width / 2, CCanvas.height / 2);