class Cell {
    constructor({ x, y, color }) {
        this.x = x;
        this.y = y;
        this.color = color || "#25272b";
    }
    
    draw(xView = 0, yView = 0) {
        window._oCtx.fillStyle = this.color;
        window._oCtx.fillRect(this.x * TILESIZE - Math.floor(xView), this.y * TILESIZE - Math.floor(yView), TILESIZE, TILESIZE);
    }
}