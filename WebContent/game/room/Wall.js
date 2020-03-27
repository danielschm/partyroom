class Wall extends Cell {
    constructor(props) {
        super(props);
        this.wallColor = "rgb(46,50,56)";
        this.roofColor = "rgb(35,38,42)";
        this.foundColor = "rgb(71,75,83)";
        this.xOffset = TILESIZE * 0.15;
        this.yOffset = -TILESIZE * 0.5;
    }

    drawFoundation(xView, yView) {
        window._oCtx.fillStyle = this.foundColor;
        window._oCtx.fillRect(
            this.x * TILESIZE - Math.floor(xView),
            this.y * TILESIZE - Math.floor(yView),
            TILESIZE,
            TILESIZE
        );
    }

    draw(xView = 0, yView = 0) {
        const xDrawn = this.x * TILESIZE - Math.floor(xView);
        const yDrawn = this.y * TILESIZE - Math.floor(yView);
        const xOffset = this.xOffset;
        const yOffset = this.yOffset;

        this.drawWalls(xDrawn, yDrawn, xOffset, yOffset);
        this.drawRoof(xDrawn, yDrawn, xOffset, yOffset);
    }

    drawRoof(xDrawn, yDrawn, xOffset, yOffset) {
        window._oCtx.fillStyle = this.roofColor;
        window._oCtx.fillRect(
            xDrawn + xOffset,
            yDrawn + yOffset,
            TILESIZE,
            TILESIZE
        );
    }

    drawWalls(xDrawn, yDrawn, xOffset, yOffset) {
        window._oCtx.fillStyle = this.wallColor;
        this.drawWallHorizontal(xDrawn, yDrawn, xOffset, yOffset);
        this.drawWallHorizontal(xDrawn, yDrawn + TILESIZE, xOffset, yOffset);
        this.drawWallVertical(xDrawn, yDrawn, xOffset, yOffset);
        this.drawWallVertical(xDrawn + TILESIZE, yDrawn, xOffset, yOffset);
    }

    drawWallHorizontal(xDrawn, yDrawn, xOffset, yOffset) {
        window._oCtx.beginPath();
        window._oCtx.moveTo(xDrawn, yDrawn);
        window._oCtx.lineTo(xDrawn + xOffset, yDrawn + yOffset);
        window._oCtx.lineTo(xDrawn + xOffset + TILESIZE, yDrawn + yOffset);
        window._oCtx.lineTo(xDrawn + TILESIZE, yDrawn);
        window._oCtx.lineTo(xDrawn, yDrawn);
        window._oCtx.fill();
    }

    drawWallVertical(xDrawn, yDrawn, xOffset, yOffset) {
        window._oCtx.beginPath();
        window._oCtx.moveTo(xDrawn, yDrawn);
        window._oCtx.lineTo(xDrawn, yDrawn + TILESIZE);
        window._oCtx.lineTo(xDrawn + xOffset, yDrawn - yOffset);
        window._oCtx.lineTo(xDrawn + xOffset, yDrawn + yOffset);
        window._oCtx.lineTo(xDrawn, yDrawn);
        window._oCtx.fill();
    }

}