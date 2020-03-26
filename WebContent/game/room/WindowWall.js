class WindowWall extends Wall {
    constructor(props) {
        super(props);
        this.color = "rgba(107,221,255,0.57)";
    }

    draw(xView = 0, yView = 0) {
        window._oCtx.fillStyle = this.color;
        window._oCtx.fillRect(this.x * TILESIZE - Math.floor(xView), this.y * TILESIZE - Math.floor(yView) + TILESIZE/2, TILESIZE, TILESIZE/5);
    }
}