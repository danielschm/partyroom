class Cell {
    constructor({ x, y, color }) {
        this.x = x;
        this.y = y;
        this.color = color || "#25272b";
    }
    
    draw() {
        window._oCtx.fillStyle = this.color;
        window._oCtx.fillRect(this.x * TILESIZE, this.y * TILESIZE, TILESIZE, TILESIZE);
    }
}