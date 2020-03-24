class Player {
    constructor(oProps = {}) {
        this.color = oProps.color || "#000";
        this.x = oProps.x || 0;
        this.y = oProps.y || 0;
        this.speed = 2;
        this.controls = {
            left: false,
            up: false,
            right: false,
            down: false
        };
    }

    draw() {
        this.sprite.draw(this.x,this.y,this.controls, 100, 150);
    }

    update() {
        if (this.controls.left)
            this.x -= this.speed * STEP * 80;
        if (this.controls.up)
            this.y -= this.speed * STEP * 80;
        if (this.controls.right)
            this.x += this.speed * STEP * 80;
        if (this.controls.down)
            this.y += this.speed * STEP * 80;
    }
}