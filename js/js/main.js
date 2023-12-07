
let selected;


window.addEventListener("click", (event) => {
    console.log("click");
    if (!pieceSelector._isSelected)
    {
        if (pieceSelector.isClicked(event.clientX, event.clientY))
        {
            calculateAllMove();
            console.log("Piece selected")
            selected = pieceSelector.getSelected;
            console.log("Move for " + pieces[selected]._name + " : " + pieces[selected]._moves.length);
            pieces[selected].printMoves();
            pieces[selected].colorMoves();
            console.log(bg.area);
        }
        else 
        {
            pieceSelector._isSelected = false;
        }
    }
    else
    {
        
        if (pieceSelector.isMoveSelected(event.clientX, event.clientY, pieces[selected]))
        {
            update();
        }
        draw();
        pieceSelector._isSelected = false;
        pieceSelector._isMoveSelected = false;
    }
    
});

function update()
{
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