const FPS = 30;
const INTERVAL = 1000 / FPS;
const STEP = INTERVAL / 1000;

class Game {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this._aPlayers = [];
        this._oRoom = new Room(this.w, this.h);
        this._bRunning = false;
    }

    start() {
        if (!this._bRunning) {
            this._bRunning = true;
            this._iInterval = setInterval(() => {
                try {
                    this.gameLoop();
                } catch(e) {
                    this.stop();
                    console.warn("Game stopped due to error");
                    console.error(e);
                }
            }, 20);
            console.log("Game started");
        }
    }

    stop() {
        if (this._bRunning) {
            this._bRunning = false;
            clearInterval(this._iInterval);
            console.log("Game stopped");
        }
    }

    toggle() {
        this._bRunning ? this.stop() : this.start();
    }

    gameLoop() {
        this._aPlayers.forEach(e => e.update());
        this.draw();
    }

    addPlayer(oPlayer) {
        this._aPlayers.push(oPlayer);
    }

    addNPCs(i) {
        for (let j = 0; j < i; j++) {
            this.addNPC();
        }
    }

    addNPC() {
        this._aPlayers.push(new NPC(this.w, this.h));
    }

    draw() {
        this._oRoom.draw();
        this._aPlayers.forEach(e => e.draw());
    }
}