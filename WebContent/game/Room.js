class Room {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }

    draw() {
        window._oCtx.fillStyle = "#FF0000";
        window._oCtx.fillRect(0, 0, this.w, this.h);
    }
}