class MapEditorRoom extends Room {
    createGrid() {
        if (localStorage.getItem("grid")) {
            const grid = JSON.parse(localStorage.getItem("grid"));
            return grid.map(row => row.map(cell => new MapEditorCell(cell)));
        }

        const cols = this.w / TILESIZE;
        const rows = this.h / TILESIZE;
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