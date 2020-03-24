class User extends Player {
    constructor(props) {
        super(props);
        this.initializeEventListeners();
        this.sprite = new Sprite(1601, 2397, "./game/sprites/player.png", this.speed);
    }

    initializeEventListeners() {
        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 37: // left arrow
                    this.controls.left = true;
                    break;
                case 38: // up arrow
                    this.controls.up = true;
                    break;
                case 39: // right arrow
                    this.controls.right = true;
                    break;
                case 40: // down arrow
                    this.controls.down = true;
                    break;
            }
        }, false);

        window.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 37: // left arrow
                    this.controls.left = false;
                    break;
                case 38: // up arrow
                    this.controls.up = false;
                    break;
                case 39: // right arrow
                    this.controls.right = false;
                    break;
                case 40: // down arrow
                    this.controls.down = false;
                    break;
                case 80: // key P pauses the game
                    window._oGame.toggle();
                    break;
            }
        }, false);
    }
}