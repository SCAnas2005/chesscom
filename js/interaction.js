
class PieceSelectorManager
{
    constructor()
    {
        this._isSelected = false;
        this._isMoveSelected = false;

        this.pieceSelected = null;
        this.moveSelected = null;
    }

    inCase(x, y, l, c)
    {
        if (x >= bg._rectArea[l][c].x && x <= bg._rectArea[l][c].x+bg._rectArea[l][c].w 
        && y >= bg._rectArea[l][c].y && y <= bg._rectArea[l][c].y+bg._rectArea[l][c].h)
        {
            console.log("l : " + l + " | c : " + c);
            return true;
        }
        return false;
    }

    

    isClicked(x, y)
    {
        if (!this._isSelected)
        {
            for (let p = 0; p < pieces.length; p++)
            {
                if (pieces[p].disabled == false)
                {
                    if (this.inCase(x, y, pieces[p]._l, pieces[p]._c))
                    {
                        this._isSelected = true;
                        this.pieceSelected = p;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isMoveSelected(x, y)
    {
        if (this._isSelected && !this._isMoveSelected)
        {
            for (let l = 0; l < 8; l++)
            {
                for (let c = 0; c < 8; c++)
                {
                    if (this.inCase(x, y, l, c))
                    {
                        this.moveSelected = {l:l, c:c};
                        this._isMoveSelected = true;
                        return true;
                    }        
                }
            }
        }
        return false;
    }

    get getSelected()
    {
        if (this._isSelected == true)
            return this.pieceSelected;
        return null;
    }
     
}

pieceSelector = new PieceSelectorManager();