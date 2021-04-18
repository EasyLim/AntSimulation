import Pheromone from "./Pheromone";
import { canvas, ctx } from '../canvas';

export default class Food {
    constructor (x, y, radius = 10) {
        this.x = x;
        this.y = y;
        this.weight = 1;
        this.radius = radius;
        Food.all.push(this);

        new Pheromone(x, y, true, Number.POSITIVE_INFINITY);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(81, 202, 70, ${this.weight})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    checkDistant (ant) {
        let dx = Math.abs(ant.x - this.x);
        let dy = Math.abs(ant.y - this.y);
        let dlen = (dx ** 2 + dy ** 2) ** 0.5;
        return dlen <= this.radius;
    }
}