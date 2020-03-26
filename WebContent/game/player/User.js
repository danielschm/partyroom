class User extends Player {
    constructor(props = {}) {
        props.sprite = "./WebContent/game/sprites/player.png";
        super(props);
        this.initializeEventListeners();
        // setTimeout(() => this.setInfected(),1000);
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
                case 96:
                    this.text = this.getRandomText();
                    break;
            }
        }, false);
    }

    getRandomText() {
        const aTexts = [
            "Stay at home!",
            "Stay at home!",
            "Stay at home!",
            "Guys, GO!",
            "Not so close!!",
            "PLEASE!",
            "Do u even COVID?"
        ];
        return aTexts[parseInt(Math.random() * aTexts.length - 0.001, 10)];
    }
}