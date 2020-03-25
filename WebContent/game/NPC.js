class NPC extends Player {
    constructor(gameWidth, gameHeight) {
        super();
        this.initializeControls();
        const img = Math.random() > 0.5 ? "./game/sprites/npc.png" : "./game/sprites/npc2.png";
        this.sprite = new Sprite(1601, 2397, img, this.speed);
        this.speed = 0.8;
        this.streak = 0;
        this.streakLength = parseInt(Math.random() * 10, 10) + 50;
        this.textStreak = 0;
        this.textStreakLength = 400;
        this.x = Math.random() * gameWidth;
        this.y = Math.random() * gameHeight;
    }

    update() {
        this.streak++;
        if (this.streak === this.streakLength) {
            this.streak = 0;
            this.randomize();
        }
        this.textStreak++;
        if (this.textStreak === this.textStreakLength) {
            this.textStreak = 0;
            this.text = undefined;
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
        } else if (i > 0.1 && i < 0.2) {
            this.speed *= Math.random() * 2;
            if (this.speed < 0.3) this.speed = 1;
            if (this.speed < 4) this.speed = 1;
        } else if (i < 0.02) {
            this.text = this.getRandomText()
        }
    }

    getRandomText() {
        const aTexts = [
            "Suh dude?",
            "Yo",
            "Sup, my dude",
            "How are ya?"
        ];
        return aTexts[parseInt(Math.random() * aTexts.length - 0.001, 10)];
    }

    initializeControls() {
        this.controls.up = false;
        this.controls.down = false;
        this.controls.left = false;
        this.controls.right = false;
    }

}