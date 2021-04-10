// Resize canvas
    function resize () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.onresize = resize;
    resize();
// ---

const ctx = canvas.getContext("2d");
const config = {
    antSpeed: 5
}


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static random (lenght = 1) {
        let way = Math.random() * Math.PI * 2;
        let x = Math.cos(way) * length;
        let y = Math.sin(way) * length;

        return new Vector(x, y);
    }
}

class Ant {
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
        let change = (Math.random() - 0.5) * 0.5;
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
            if (newPower > power && dist < 50) {
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

        if (this.hasFood && home.checkDistant(this)) {
            this.hasFood = false;
            this.contactSmell = 1;
        }
    }
}

class Pheromone {
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
        this.power -= 0.001;
    }

    static clear () {
        Pheromone.all = Pheromone.all.filter(pher => pher.power > 0);
    }
}

class Home {
    constructor (x, y, ants = 100, radius = 25) {
        this.x = x;
        this.y = y;
        this.ants = ants;
        this.radius = radius;
    }

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

class Food {
    constructor (x, y, radius = 25) {
        this.x = x;
        this.y = y;
        this.weight = 1;
        this.radius = radius;
        Food.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(201, 163, 58, ${this.weight})`;
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

function clear () {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let home = new Home(100, 100);
let food = new Food(400, 400);

home.spawn();

function draw () {
    clear();

    home.draw();
    food.draw();

    Ant.all.forEach(ant => {
        ant.move();
        ant.eat();
        ant.trace();
        ant.draw();
    });

    Pheromone.all.forEach(pher => {
        pher.evaporate();
        pher.draw();
    })

    Pheromone.clear();
}

function smell () {
    
}

setInterval(draw, 50);
setInterval(smell, 50);