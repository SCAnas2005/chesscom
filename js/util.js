
let canvas = document.getElementById("ChessCanvas");
let ctx;
try {
    ctx = canvas.getContext("2d");
} catch (error) {
    console.log("Rendering context failed");
}

DEFAULT_THEME = "basic/"
PIECE_PATH = "Assets/theme/"+DEFAULT_THEME;
CHESSBOARD_PATH = PIECE_PATH;


function drawRect(ctx, x,y,w,h, color)
{
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, w, h);
}

function drawRect(ctx, rect, color)
{
    ctx.fillStyle = color;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
}

function fillRect(ctx, x,y,w,h, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function fillRect(ctx, rect, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}




