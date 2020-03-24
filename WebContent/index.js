window.onload = main;

function main() {
    window._oCtx = document.getElementById("canvas").getContext("2d");
    window._oGame = new Game(800,800);
    window._oGame.addNPCs(20);
    window._oGame.addPlayer(new User());
    window._oGame.start();
}