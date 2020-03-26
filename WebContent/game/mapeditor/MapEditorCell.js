class MapEditorCell extends Cell {
    constructor(props) {
        super(props);
        this.state = props.state || 0;
    }

    toggleState() {
        if (this.state === 0) {
            this.state = 1;
            this.color = "#363636"; // Wall
        } else {
            this.state = 0;
            this.color = "#25272b"; // Floor
        }
    }
}