class Room {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.grid = this.createGrid();
    }

    draw() {
        window._oCtx.fillStyle = "#33353a";
        window._oCtx.fillRect(0, 0, this.w, this.h);
        this.drawGrid();
    }

    createGrid() {
        if (localStorage.getItem("grid")) {
            const grid = JSON.parse(localStorage.getItem("grid"));
            return grid.map(row => row.map(cell => {
                if (cell.state === 1) {
                    return new Wall(cell);
                } else {
                    return new Cell(cell);
                }
            }));
        }

        const cols = this.w / TILESIZE;
        const rows = this.h / TILESIZE;
        const grid = [];

        for (let iCol = 0; iCol < cols; iCol++) {
            const aRow = [];
            for (let iRow = 0; iRow < rows; iRow++) {
                if (Math.random() > 0.1)
                    aRow.push(new Cell({x: iCol, y: iRow}));
                else
                    aRow.push(new Wall({x: iCol, y: iRow}));
            }
            grid.push(aRow);
        }

        return grid;
    }

    drawGrid() {
        this.grid.forEach(oCol => {
            oCol.forEach(oCell => oCell.draw());
        });
    }

    getCell(x, y) {
        return this.grid[x][y];
    }
}