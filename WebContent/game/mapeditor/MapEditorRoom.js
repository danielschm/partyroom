class MapEditorRoom extends Room {
    createGrid() {
        const cols = parseInt(this.w / TILESIZE, 10);
        const rows = parseInt(this.h / TILESIZE, 10);

        if (localStorage.getItem("grid")) {
            const map = JSON.parse(localStorage.getItem("grid"));
            const grid = map.map(row => row.map(cell => new MapEditorCell(cell)));
            if (grid.length < cols || grid[0].length < rows) {
                for (let iCol = grid.length; iCol < cols; iCol++) {
                    const aRow = [];
                    for (let iRow = 0; iRow < rows; iRow++) {
                        aRow.push(new MapEditorCell({x: iCol, y: iRow}));
                    }
                    grid.push(aRow);
                }
            }
            return grid;
        }

        const grid = [];

        for (let iCol = 0; iCol < cols; iCol++) {
            const aRow = [];
            for (let iRow = 0; iRow < rows; iRow++) {
                aRow.push(new MapEditorCell({x: iCol, y: iRow}));
            }
            grid.push(aRow);
        }

        return grid;
    }
}