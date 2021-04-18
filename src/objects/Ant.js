import Pheromone from "./Pheromone";
import Vector from "../Vector";
import Food from "./Food";
import Home from "./Home";

import config from "../config";
import { canvas, ctx } from '../canvas';

export default class Ant {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.hasFood = false;
        this.contactSmell = 1;
        this.direction = Vector.random(config.antSpeed);
        Ant.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        ctx.fill();
    }

    move () {
        let angle = Math.atan2(this.direction.y, this.direction.x);
        let change = (Math.random() - 0.5) * 0.7;
        let ts = this.takeSmell();
        if (ts) angle = ts;

        angle += change;
        
        let x = Math.cos(angle) * config.antSpeed;
        let y = Math.sin(angle) * config.antSpeed;
        this.direction = new Vector(x, y);

        this.x += x;
        this.y += y;

        this.goBack();

        this.contactSmell -= 0.01;
    }

    takeSmell () {
        let dir;
        let power = 0;
        let check = (pher) => {
            let dist = (Math.abs(pher.x - this.x) ** 2 + Math.abs(pher.y - this.y) ** 2) ** 0.5;
            let newPower = pher.power;
            if (newPower > power && dist <= 15) {
                power = newPower
                let x = pher.x - this.x;
                let y = pher.y - this.y;
                dir = new Vector(x, y);
            }
        }

        if (this.hasFood) Pheromone.fromHome.forEach(check);
        else Pheromone.fromFood.forEach(check);

        if (power > 0) {
            return Math.atan2(dir.y, dir.x);
        }

        return false;    
    }

    goBack () {
        if (this.x < 0) {
            this.x = Math.abs(this.x);
            this.direction.x = -this.direction.x;
        }

        if (this.y < 0) {
            this.y = Math.abs(this.y);
            this.direction.y = -this.direction.y;
        }

        if (this.x > canvas.width) {
            this.x = 2 * canvas.width - this.x;
            this.direction.x = -this.direction.x;
        }

        if (this.y > canvas.height) {
            this.y = 2 * canvas.width - this.y;
            this.direction.y = -this.direction.y;
        }
    }

    trace () {
        if (this.contactSmell > 0) new Pheromone(this.x, this.y, this.hasFood, this.contactSmell);
    }

    eat () {
        if (!this.hasFood) {
            Food.all.forEach(food => {
                if (food.checkDistant(this)) {
                    this.hasFood = true;
                    food.weight -= 0.001;
                    this.contactSmell = 1;
                }
            });
        }

        if (this.hasFood && Home.obj.checkDistant(this)) {
            this.hasFood = false;
            this.contactSmell = 1;
        }
    }
}