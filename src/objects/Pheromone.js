import { canvas, ctx } from '../canvas';

export default class Pheromone {
    constructor (x, y, type, power = 1) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.power = power;
        Pheromone.all.push(this);
    }

    static all = [];
    static get fromHome () {
        return Pheromone.all.filter(pher => !pher.type);
    }

    static get fromFood () {
        return Pheromone.all.filter(pher => pher.type);
    }

    draw () {
        ctx.beginPath();
        if (this.type) ctx.fillStyle = `rgba(81, 202, 70, ${this.power})`;
        else ctx.fillStyle = `rgba(209, 77, 77, ${this.power})`;
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        ctx.fill();
    }

    evaporate () {
        this.power -= 0.005;
    }

    static clear () {
        Pheromone.all = Pheromone.all.filter(pher => pher.power > 0);
    }
}