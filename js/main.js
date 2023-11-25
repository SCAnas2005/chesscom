
let selected;


window.addEventListener("click", (event) => {
    console.log("click");
    if (!pieceSelector._isSelected)
    {
        pieceSelector.isClicked(event.clientX, event.clientY);
    }
    else
    {
        pieceSelector.isMoveSelected(event.clientX, event.clientY);
        if (pieceSelector._isMoveSelected)
        {
            update();
            draw();
            pieceSelector._isSelected = false;
            pieceSelector._isMoveSelected = false;
        }
    }
    
});

function update()
{
    selected = pieceSelector.getSelected;
    bg.move(pieces[selected], pieceSelector.moveSelected.l, pieceSelector.moveSelected.c);
    pieces[selected].move(pieceSelector.moveSelected.l, pieceSelector.moveSelected.c);
}


function draw()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    bg.draw();
    for (let i = 0; i < pieces.length; i++)
    {
        pieces[i].draw();
    }
}