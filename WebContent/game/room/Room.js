class Room {
    constructor(w, h, map) {
        this.w = w;
        this.h = h;
        this.grid = this.createGrid(map);
        this._cells = this.getCells();
    }

    drawBackground(xView, yView) {
        window._oCtx.fillStyle = "#33353a";
        window._oCtx.fillRect(0, 0, this.w, this.h);
        this._cells
            .filter(e => e instanceof Wall)
            .forEach(e => e.drawFoundation(xView, yView));
    }

    createGrid(map) {
        if (map) {
            return map.map(row => row.map(cell => {
                if (cell.state === 1) {
                    return new Wall(cell);
                } else if (cell.state === 2) {
                    return new WindowWall(cell);
                } else if (cell.state === 4) {
                    return new OutsideWall(cell);
                } else {
                    return new Floor(cell)
                }
            }));
        } else {
            throw new Error("No map defined");
        }
    }

    getCells() {
        const aCells = [];
        this.grid.forEach(row => row.forEach(e => aCells.push(e)));
        return aCells;

        // const aFloor =[], aWall = [], aOther = [];
        // this.grid.forEach(row => {
        //     row.forEach(cell => {
        //         if (cell instanceof Floor) aFloor.push(cell);
        //         else if (cell instanceof Wall) aWall.push(cell);
        //         else aOther.push(cell);
        //     })
        // });
        // return {
        //     floor: aFloor,
        //     wall: aWall,
        //     other: aOther
        // };
    }

    getCell(x, y) {
        return this.grid[x][y];
    }
}