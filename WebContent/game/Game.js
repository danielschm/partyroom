const FPS = 30;
const INTERVAL = 1000 / FPS;
const STEP = INTERVAL / 1000;

class Game {
    constructor(w, h) {
        this.nextId = 0;
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
                } catch (e) {
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
        this.corona();
    }

    addPlayer(oPlayer) {
        this._aPlayers.push(oPlayer);
        oPlayer.id = this.getNextId();
    }

    addNPCs(i) {
        for (let j = 0; j < i; j++) {
            this.addNPC();
        }
    }

    addNPC() {
        const oNPC = new NPC(this.w, this.h);
        oNPC.id = this.getNextId();
        this._aPlayers.push(oNPC);
    }

    draw() {
        this._oRoom.draw();
        this._aPlayers.forEach(e => e.draw());
    }

    corona() {
        this._aPlayers.forEach((e, i, a) => {
            if (e.infected) {
               a.forEach(other => {
                   if (this.isNear(e, other)) {
                       if (!other.infected) {
                           other.setInfected();
                       }
                   }
               })
            }
        });
    }

    isNear(playerA, playerB) {
        if (playerA.id === playerB.id) {
            return false;
        }
        const bXnear = playerA.x-40 <= playerB.x && playerA.x+40 >= playerB.x;
        const bYnear = playerA.y-40 <= playerB.y && playerA.y+40 >= playerB.y;
        return bXnear && bYnear;
    }

    getNextId() {
        this.nextId++;
        return this.nextId;
    }
}