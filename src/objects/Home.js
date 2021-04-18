import Ant from "./Ant";
import Pheromone from "./Pheromone";

import { canvas, ctx } from '../canvas';

export default class Home {
    constructor (x, y, ants = 100, radius = 10) {
        this.x = x;
        this.y = y;
        this.ants = ants;
        this.radius = radius;
        Home.obj = this;

        new Pheromone(x, y, false, Number.POSITIVE_INFINITY);
    }

    static obj;

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "rgb(209, 77, 77)";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    spawn () {
        for (let i = 0; i < this.ants; i++) {
            let angle = Math.random() * Math.PI * 2;
            let x1 = Math.cos(angle) * this.radius;
            let y1 = Math.sin(angle) * this.radius;
            let length = Math.random();
            let x = x1 * length;
            let y = y1 * length;
            
            new Ant (this.x + x, this.y + y);
        }
    }

    checkDistant (ant) {
        let dx = Math.abs(ant.x - this.x);
        let dy = Math.abs(ant.y - this.y);
        let dlen = (dx ** 2 + dy ** 2) ** 0.5;
        return dlen <= this.radius;
    }
}