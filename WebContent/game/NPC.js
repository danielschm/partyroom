class NPC extends Player {
    constructor(gameWidth, gameHeight) {
        super();
        this.initializeControls();
        const img = Math.random() > 0.5 ? "./game/sprites/npc.png" : "./game/sprites/npc2.png";
        this.sprite = new Sprite(1601, 2397, img, this.speed);
        this.speed = 0.8;
        this.streak = 0;
        this.streakLength = 10;
        this.x = Math.random() * gameWidth;
        this.y = Math.random() * gameHeight;
    }

    update() {
        this.streak++;
        if (this.streak === this.streakLength) {
            this.streak = 0;
            this.randomize();
        }
        super.update();
    }

    randomize() {
        const i = Math.random();
        this.initializeControls();
        if (i > 0.9) {
            this.controls.up = true;
        } else if (i > 0.8) {
            this.controls.down = true;
        } else if (i > 0.7) {
            this.controls.right = true;
        } else if (i > 0.6) {
            this.controls.left = true;
        }
    }

    initializeControls() {
        this.controls.up = false;
        this.controls.down = false;
        this.controls.left = false;
        this.controls.right = false;
    }

}