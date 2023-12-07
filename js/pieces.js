
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
        this._moves = [];
        this.disabled = false;
    }
    
    get Color()
    {
        return this._color;
    }

    get Fullname()
    {
        return this._color+this._name;
    }

    addMove(move)
    {
        this._moves.push(move);
    }

    set Moves(value)
    {
        this._moves = value;
    }

    printMoves()
    {
        console.log("- Moves -");
        for (let i = 0; i < this._moves.length; i++)
        {
            console.log(`{${this._moves[i].l},${this._moves[i].c}}`);
        }
    }

    colorMoves()
    {
        let move;
        let box;
        for (let m = 0; m < this._moves.length; m++)
        {
            move = this._moves[m];
            box = {x:bg._rectArea[move.l][move.c].x+20, y:bg._rectArea[move.l][move.c].y+20, w:40, h:40};
            fillRect(ctx, box, "red");
        }
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
function isPawn(piecename) {return piecename[1] == "p";}
function isRock(piecename) {return piecename[1] == "r";}
function isKnight(piecename) {return piecename[1] == "k";}
function isBishop(piecename) {return piecename[1] == "b";}
function isQueen(piecename) {return piecename[1] == "q";}

function isOut(l, c) {return l < 0 || l > 7 || c < 0 || c > 7;}
function isWhite(piecename) {return piecename[0] == "w";}
function isEmpty(area, l, c) {return !isOut(l, c) && area[l][c] == "v";}
function isEnemy(area, l, c, color) {
    if (!isOut(l, c))
    {   
        return (!isEmpty(area, l, c) && area[l][c][0] != color);
    }
    return false;
}

function calculateMove(area, l, c)
{
    let moves = [];
    let piecename = area[l][c];
    if (isPawn(piecename))
    {
        if (isWhite(piecename))
        {
            if (isEmpty(area, l-1, c))
            {
                moves.push({l:l-1, c:c});
                if (l == 6 && isEmpty(area, l-2, c))
                {
                    moves.push({l:l-2, c:c});
                }
            }
            if (isEnemy(area, l-1, c-1, piecename[0]))
                moves.push({l:l-1, c:c-1});
            if (isEnemy(area, l-1, c+1, piecename[0]))
                moves.push({l:l-1, c:c+1});
        }
        else 
        {
            if (isEmpty(area, l+1, c))
            {
                moves.push({l:l+1, c:c});
                if (l == 1 && isEmpty(area, l+2, c))
                {
                    moves.push({l:l+2, c:c});
                }
            }
            if (isEnemy(area, l+1, c+1, piecename[0]))
                moves.push({l:l+1, c:c+1});
            if (isEnemy(area, l+1, c-1, piecename[0]))
                moves.push({l:l+1, c:c-1});
        }
    }   
    else if (isRock(piecename))
    {
        i = 1;
        while (isEmpty(area, l+i, c))                     // up for white, down for black
        {
            moves.push({l:l+i, c:c});
            i++;
        }
        if (isEnemy(area, l+i, c, piecename[0]))
            moves.push({l:l+i, c:c});
        i = -1;
        while (isEmpty(area, l+i, c))                     // up for white, down for black
        {
            moves.push({l:l+i, c:c});
            i--;
        }
        if (isEnemy(area, l+i, c, piecename[0]))
            moves.push({l:l+i, c:c});
        // ---------------
        i = 1;
        while (isEmpty(area, l, c+i))                     // right
        {
            moves.push({l:l, c:c+i});
            i++;
        }
        if (isEnemy(area, l, c+i, piecename[0]))
            moves.push({l:l, c:c+i});
        i = -1;
        while (isEmpty(area, l, c+i))                     // right
        {
            moves.push({l:l, c:c+i});
            i--;
        }
        if (isEnemy(area, l, c+i, piecename[0]))
            moves.push({l:l, c:c+i});
    }
    else if (isKnight(piecename))
    {
        let n = 0;
        let i = -2, j = -1;
        while(n < 8)
        {
            if (isEmpty(area, l+i, c+j) || isEnemy(area,l+i, c+j, piecename[0]))
            {
                moves.push({l:l+i, c:c+j});
            }
            if (j > 0)
            {
                i++;
                if (i < 0)
                    j++;
                else
                    j--;   
            }
            if (i == 0)
            {
                i++;
                j = 2;
            }
            j = -j;
            n++;
        }
    }
    else if (isBishop(piecename))
    {
        i = 1;
        while (isEmpty(area, l-i, c+i))                     // right top diagonal for white 
        {
            moves.push({l:l-i, c:c+i});
            i++;
        }
        if (isEnemy(area, l-i, c+i, piecename[0]))
            moves.push({l:l-i, c:c+i});
        i = 1;
        while (isEmpty(area, l+i, c-i))                     // left bottom diagonal for white
        {
            moves.push({l:l+i, c:c-i});
            i++;
        }
        if (isEnemy(area, l+i, c-i, piecename[0]))
            moves.push({l:l+i, c:c-i});
        // ---------------
        i = 1;
        while (isEmpty(area, l+i, c+i))                     // right bottom diagonal for white
        {
            moves.push({l:l+i, c:c+i});
            i++;
        }
        if (isEnemy(area, l+i, c+i, piecename[0]))
            moves.push({l:l+i, c:c+i});

        i = 1;
        while (isEmpty(area, l-i, c-i))                     // left top diagonal for white
        {
            moves.push({l:l-i, c:c-i});
            i++;
        }
        if (isEnemy(area, l-i, c-i, piecename[0]))
            moves.push({l:l-i, c:c-i});
    }
    else if (isQueen(piecename))
    {
        i = 1;
        while (isEmpty(area, l-i, c+i))                     // right top diagonal for white 
        {
            moves.push({l:l-i, c:c+i});
            i++;
        }
        if (isEnemy(area, l-i, c+i, piecename[0]))
            moves.push({l:l-i, c:c+i});
        i = 1;
        while (isEmpty(area, l+i, c-i))                     // left bottom diagonal for white
        {
            moves.push({l:l+i, c:c-i});
            i++;
        }
        if (isEnemy(area, l+i, c-i, piecename[0]))
            moves.push({l:l+i, c:c-i});
        // ---------------
        i = 1;
        while (isEmpty(area, l+i, c+i))                     // right bottom diagonal for white
        {
            moves.push({l:l+i, c:c+i});
            i++;
        }
        if (isEnemy(area, l+i, c+i, piecename[0]))
            moves.push({l:l+i, c:c+i});

        i = 1;
        while (isEmpty(area, l-i, c-i))                     // left top diagonal for white
        {
            moves.push({l:l-i, c:c-i});
            i++;
        }
        if (isEnemy(area, l-i, c-i, piecename[0]))
            moves.push({l:l-i, c:c-i});

        // =================================================================
        
        i = 1;
        while (isEmpty(area, l+i, c))                     // up for white, down for black
        {
            moves.push({l:l+i, c:c});
            i++;
        }
        if (isEnemy(area, l+i, c, piecename[0]))
            moves.push({l:l+i, c:c});
        i = -1;
        while (isEmpty(area, l+i, c))                     // up for white, down for black
        {
            moves.push({l:l+i, c:c});
            i--;
        }
        if (isEnemy(area, l+i, c, piecename[0]))
            moves.push({l:l+i, c:c});
        // ---------------
        i = 1;
        while (isEmpty(area, l, c+i))                     // right
        {
            moves.push({l:l, c:c+i});
            i++;
        }
        if (isEnemy(area, l, c+i, piecename[0]))
            moves.push({l:l, c:c+i});
        i = -1;
        while (isEmpty(area, l, c+i))                     // left
        {
            moves.push({l:l, c:c+i});
            i--;
        }
        if (isEnemy(area, l, c+i, piecename[0]))
            moves.push({l:l, c:c+i});
        
    }

    return moves;
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



function calculateAllMove()
{
    for (let p = 0; p < pieces.length; p++)
    {
        console.log(pieces[p]._l, pieces[p]._c);
        pieces[p].Moves = calculateMove(bg.area, pieces[p]._l, pieces[p]._c);
    }
}

