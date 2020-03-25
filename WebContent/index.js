window.onload = main;

function main() {
    window._oCtx = document.getElementById("canvas").getContext("2d");
    const w = document.getElementById("canvas").width;
    const h = document.getElementById("canvas").height;
    window._oGame = new Game(w,h);
    window._oGame.addNPCs(70);
    window._oGame.addPlayer(new User());
    window._oGame.start();
}