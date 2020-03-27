class WindowWall extends Wall {
    constructor(props) {
        super(props);
        this.depth = TILESIZE / 5;
    }

    draw(xView = 0, yView = 0) {
        const xDrawn = this.x * TILESIZE - Math.floor(xView);
        const yDrawn = this.y * TILESIZE - Math.floor(yView);
        this.color = "rgba(61,126,145,0.8)";
        this.drawRoof(xDrawn, yDrawn);
        this.color = "rgba(107,221,255,0.57)";
        this.drawGlass(xDrawn, yDrawn);
    }

    drawRoof(xDrawn, yDrawn) {
        window._oCtx.fillStyle = this.color;
        window._oCtx.beginPath();
        window._oCtx.moveTo(xDrawn + this.xOffset, yDrawn);
        window._oCtx.lineTo(xDrawn + this.xOffset + TILESIZE, yDrawn);
        window._oCtx.lineTo(xDrawn + this.xOffset + TILESIZE, yDrawn - this.depth);
        window._oCtx.lineTo(xDrawn + this.xOffset, yDrawn - this.depth);
        window._oCtx.lineTo(xDrawn + this.xOffset, yDrawn);
        window._oCtx.fill();
    }

    drawGlass(xDrawn, yDrawn) {
        window._oCtx.fillStyle = this.color;
        window._oCtx.beginPath();
        window._oCtx.moveTo(xDrawn + this.xOffset, yDrawn);
        window._oCtx.lineTo(xDrawn + this.xOffset + TILESIZE, yDrawn);
        window._oCtx.lineTo(xDrawn + TILESIZE, yDrawn + this.depth - this.yOffset);
        window._oCtx.lineTo(xDrawn, yDrawn + this.depth - this.yOffset);
        // window._oCtx.lineTo(xDrawn + this.xOffset, yDrawn + this.depth);
        window._oCtx.fill();
    }
}