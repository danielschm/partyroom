class Room {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }

    draw() {
        window._oCtx.fillStyle = "#33353a";
        window._oCtx.fillRect(0, 0, this.w, this.h);
    }
}