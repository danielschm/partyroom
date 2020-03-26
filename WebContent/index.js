window.onload = main;

const FPS = 30;
const INTERVAL = 1000 / FPS;
const TILESIZE = 40;
const DEBUG = false;
const SIZE = 0.8;
const INFECTEDTIME = 800;
const TEXTTIME = 50;
const SPEED = 3;

const bMapEditor = false;

function main() {
    window._oCtx = document.getElementById("canvas").getContext("2d");
    const w = document.getElementById("canvas").width;
    const h = document.getElementById("canvas").height;

    if (bMapEditor) {
        window._oMapEditor = new MapEditor(w,h);
        window._oMapEditor.start();
    } else {
        window._oGame = new Game(w,h);
        window._oGame.addNPCs(7);
        window._oGame.addPlayer(new User());
        window._oGame.start();
    }
}