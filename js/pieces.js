
class piece
{
    constructor(filepath, l, c, name, color)
    {
        this._l = l;
        this._c = c;

        this._image = new Image();
        this._image.src = filepath;

        this._image.onload = () => {this.draw();};
        this._color = color;
        this._name = name;
        this._moves = {};
        this.disabled = false;
    }
    
    set setMoves(moves)
    {
        this._moves = moves;
    }

    move(newL, newC)
    {
        if (!bg.isOut(newL, newC))
        {
            this._l = newL;
            this._c = newC;
            console.log("New position for " + this._name + " : " + this._l + "|" + this._c);
        }
        
    }   

    draw()
    {
        if (this.disabled == false)
        {
            ctx.drawImage(this._image, bg._rectArea[this._l][this._c].x, bg._rectArea[this._l][this._c].y, 
            bg._rectArea[this._l][this._c].w, bg._rectArea[this._l][this._c].h);
        }
    }

}



// White let pieces
wk = new piece(PIECE_PATH+"br.png", 7,4, "king", "w");
let wq = new piece(PIECE_PATH+"bq.png", 7,3, "q1", "w");
let wr1 = new piece(PIECE_PATH+"bt.png", 7,0, "r1", "w");
let wr2 = new piece(PIECE_PATH+"bt.png", 7,7, "r2", "w");
let wk1 = new piece(PIECE_PATH+"bc.png", 7,1, "k1", "w");
let wk2 = new piece(PIECE_PATH+"bc.png", 7,6, "k2", "w");
let wb1 = new piece(PIECE_PATH+"bf.png", 7,2, "b1", "w");
let wb2 = new piece(PIECE_PATH+"bf.png", 7,5, "b2", "w");


let wp1 = new piece(PIECE_PATH+"bp.png", 6,0, "p1", "w");
let wp2 = new piece(PIECE_PATH+"bp.png", 6,1, "p2", "w");
let wp3 = new piece(PIECE_PATH+"bp.png", 6,2, "p3", "w");
let wp4 = new piece(PIECE_PATH+"bp.png", 6,3, "p4", "w");
let wp5 = new piece(PIECE_PATH+"bp.png", 6,4, "p5", "w");
let wp6 = new piece(PIECE_PATH+"bp.png", 6,5, "p6", "w");
let wp7 = new piece(PIECE_PATH+"bp.png", 6,6, "p7", "w");
let wp8 = new piece(PIECE_PATH+"bp.png", 6,7, "p8", "w");


// Black pieces
let bk = new piece(PIECE_PATH+"nr.png", 0,4, "king", "b");
let bq = new piece(PIECE_PATH+"nq.png", 0,3, "q1", "b");
let br1 = new piece(PIECE_PATH+"nt.png", 0,0, "r1", "b");
let br2 = new piece(PIECE_PATH+"nt.png", 0,7, "r2", "b");
let bk1 = new piece(PIECE_PATH+"nc.png", 0,1, "k1", "b");
let bk2 = new piece(PIECE_PATH+"nc.png", 0,6, "k2", "b");
let bb1 = new piece(PIECE_PATH+"nf.png", 0,2, "b1", "b");
let bb2 = new piece(PIECE_PATH+"nf.png", 0,5, "b2", "b");


let bp1 = new piece(PIECE_PATH+"np.png", 1,0, "p1", "b");
let bp2 = new piece(PIECE_PATH+"np.png", 1,1, "p2", "b");
let bp3 = new piece(PIECE_PATH+"np.png", 1,2, "p3", "b");
let bp4 = new piece(PIECE_PATH+"np.png", 1,3, "p4", "b");
let bp5 = new piece(PIECE_PATH+"np.png", 1,4, "p5", "b");
let bp6 = new piece(PIECE_PATH+"np.png", 1,5, "p6", "b");
let bp7 = new piece(PIECE_PATH+"np.png", 1,6, "p7", "b");
let bp8 = new piece(PIECE_PATH+"np.png", 1,7, "p8", "b");


// list of all pieces
let pieces = [
    wk,
    wq,
    wr1,
    wr2,
    wk1,
    wk2,
    wb1,
    wb2,
    wp1,
    wp2,
    wp3,
    wp4,
    wp5,
    wp6,
    wp7,
    wp8,
    bk,
    bq,
    br1,
    br2,
    bk1,
    bk2,
    bb1,
    bb2,
    bp1,
    bp2,
    bp3,
    bp4,
    bp5,
    bp6,
    bp7,
    bp8];
