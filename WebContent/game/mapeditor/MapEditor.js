function save() {
    localStorage.setItem("grid", JSON.stringify(window._oMapEditor._oRoom.grid));
}

class MapEditor {
    constructor(w, h) {
        this.nextId = 0;
        this.w = w;
        this.h = h;
        this._oRoom = new MapEditorRoom(this.w, this.h, TILESIZE);
        this.initializeEventListener();
    }

    start() {
        if (!this._bRunning) {
            this._bRunning = true;
            this._iInterval = setInterval(() => {
                try {
                    this.loop();
                } catch (e) {
                    this.stop();
                    console.warn("Map Editor stopped due to error");
                    console.error(e);
                }
            }, 20);
            console.log("Map Editor started");
        }
    }

    stop() {
        if (this._bRunning) {
            this._bRunning = false;
            clearInterval(this._iInterval);
            console.log("Map Editor stopped");
        }
    }

    loop() {
        this.draw();
    }

    draw() {
        this._oRoom.draw();
    }

    initializeEventListener() {
        window.addEventListener("mousedown", this.handleClicked.bind(this));
    }

    handleClicked(e) {
        const x = parseInt(e.x / TILESIZE, 10);
        const y = parseInt(e.y / TILESIZE, 10);
        const oCell = this._oRoom.getCell(x, y);
        if (oCell) oCell.toggleState();
    }
}