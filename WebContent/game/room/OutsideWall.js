class OutsideWall extends Wall {

    draw(xView = 0, yView = 0) {
        const xDrawn = this.x * TILESIZE - Math.floor(xView);
        const yDrawn = this.y * TILESIZE - Math.floor(yView) + 10;
        const xOffset = this.xOffset;
        const yOffset = this.yOffset;

        window._oCtx.fillStyle = "#3f4e52";
        window._oCtx.beginPath();
        window._oCtx.moveTo(xDrawn, yDrawn);
        window._oCtx.lineTo(xDrawn + TILESIZE + 1, yDrawn);
        window._oCtx.lineTo(xDrawn + TILESIZE + 1 - xOffset, yDrawn + TILESIZE);
        window._oCtx.lineTo(xDrawn - xOffset, yDrawn + TILESIZE);
        window._oCtx.lineTo(xDrawn, yDrawn);
        window._oCtx.fill();
    }
}