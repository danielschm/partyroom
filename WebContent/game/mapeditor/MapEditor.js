function save() {
    const map = JSON.stringify(window._oMapEditor._oRoom.grid);
    localStorage.setItem("grid", map);

    if (SAVETOFILE) {
        const fileName = prompt("Please type in file name:");
        const myFile = new Blob([map], {type: 'text/plain'});

        window.URL = window.URL || window.webkitURL;
        document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
        document.getElementById('download').setAttribute('download', fileName);
    }
}

class MapEditor {
    constructor(viewW, viewH, w, h, offsetX = 0, offsetY = 0) {
        this.w = w;
        this.h = h;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
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
        this._oRoom.draw(this.offsetX, this.offsetY);
    }

    initializeEventListener() {
        window.addEventListener("mousedown", this.handleClicked.bind(this));
    }

    handleClicked(e) {
        const x = parseInt((e.x + this.offsetX) / TILESIZE, 10);
        const y = parseInt((e.y + this.offsetY) / TILESIZE, 10);
        const oCell = this._oRoom.getCell(x, y);
        if (oCell) oCell.toggleState();
    }
}