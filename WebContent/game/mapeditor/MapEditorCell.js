class MapEditorCell extends Cell {
    constructor(props) {
        super(props);
        this.state = props.state || 0;
    }

    toggleState() {
        if (this.state === 0) {
            this.setWall();
        } else if (this.state === 1) {
            this.state = 2;
            this.color = "rgba(107,221,255,0.57)"; // Window
        } else {
            this.setFloor();
        }
    }

    setWall() {
        this.state = 1;
        this.color = "#363636";
    }

    setFloor() {
        this.state = 0;
        this.color = "#25272b";
    }

    setOutsideWall() {
        this.state = 4;
        this.color = "#4a4e57";
    }
}