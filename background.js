
class background
{
    constructor(filepath, x, y, width, height)
    {
        this._rect = {x:x,y:y,w:width*8, h:height*8};
        this._image = new Image();
        this._image.src = filepath;
        this._image.onload = () => 
        {
            this.draw();
        }

        this.area =  
        [
            ["br1", "bk1", "bb1", "bk", "bq", "bb2", "bk2", "br2"],
            ["bp1", "bp2", "bp3", "bp4", "bp5", "bp6", "bp7", "bp8"],
            ["v", "v", "v", "v", "v", "v", "v", "v"],
            ["v", "v", "v", "v", "v", "v", "v", "v"],
            ["v", "v", "v", "v", "v", "v", "v", "v"],
            ["v", "v", "v", "v", "v", "v", "v", "v"],
            ["wp1", "wp2", "wp3", "wp4", "wp5", "wp6", "wp7", "wp8"],
            ["wr1", "wk1", "wb1", "wk", "wq", "wb2", "wk2", "wr2"]
        ];

        this._rectArea = this.getRectArea(0,0, width, height);
    }


    getRectArea(startX, startY, width, height)
    {
        let rect = Array(8);
        for (let i = 0; i < 8; i++)
        {
            rect[i] = Array(8);
            for (let j = 0; j < 8; j++)
            {
                rect[i][j] = {x:j*width+startX, y:i*height+startY, w:width, h:height};
            }
        }

        return rect;
    }

    move(piece, newL, newC)
    {
        if (!this.isOut(newL, newC))
        {
            for (let i = 0; i < pieces.length; i++)
            {
                if (pieces[i]._l == newL && pieces[i]._c == newC)
                    pieces[i].disabled = true;
            }
            this.area[newL][newC] = piece._color+piece._name;
            this.area[piece._l][piece._c] = "v";
        }
        
    } 

    isOut(l, c)
    {
        return l < 0 || l > 7 || c < 0 || c > 7;
    }

    draw()
    {
        ctx.drawImage(this._image, this._rect.x, this._rect.y, this._rect.w, this._rect.h);
    }
}

let bg = new background(CHESSBOARD_PATH+"board.jpg", 0,0, 80, 80);