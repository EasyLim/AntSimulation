export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static random (length = 1) {
        let way = Math.random() * Math.PI * 2;
        let x = Math.cos(way) * length;
        let y = Math.sin(way) * length;
        return new Vector(x, y);
    }
}