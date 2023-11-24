
let selected;


window.addEventListener("click", (event) => {
    console.log("click");
    if (pieceSelector.isClicked(event.clientX, event.clientY))
    {
        update();
        draw();
    }
});

function update()
{
    selected = pieceSelector.getSelected;
    bg.move(pieces[selected], pieces[selected]._l-1, pieces[selected]._c);
    pieces[selected].move(pieces[selected]._l-1, pieces[selected]._c);
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