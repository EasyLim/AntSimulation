// Resize canvas
    function resize () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.onresize = resize;
    resize();
// ---

const ctx = canvas.getContext("2d");

class Ant {
    constructor (home) {
        this.x = home.x;
        this.y = home.y;
        this.hasFood = false;
        self.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
    }

    move () {
        let way = Math.random() * Math.PI * 2;
        let x = Math.cos(way);
        let y = Math.sin(way);

        this.x += x;
        this.y += y;
    }

    trace () {
        new Pheromone(this.x, this.y);
    }

    eat () {
        Food.all.forEach(food => {
            if (food.checkDistant(this)) {
                this.hasFood = true;
                food.weight -= 0.001;
            }
        });
    }
}

class Pheromone {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.power = 1;
        self.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(81, 202, 70, ${this.power})`;
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
    }

    evaporate () {
        this.power *= 0.999;
    }
}

class Home {
    constructor (x, y, ants = 10, radius = 25) {
        this.x = x;
        this.y = y;
        this.ants = ants;
        this.radius = radius;
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "rgb(209, 77, 77)";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI, false);
        ctx.fill();
    }

    spawn () {
        for (let i = 0; i < ants; i++) {
            let angle = Math.random * Math.PI * 2;
            let x1 = Math.cos(angle);
            let y1 = Math.sin(angle);
            let length = Math.random;
            let x = x1 * length;
            let y = y1 * length;
            
            new Ant (this.x + x, this.y + y);
        }
    }
}

class Food {
    constructor (x, y, radius = 25) {
        this.x = x;
        this.y = y;
        this.weight = 1;
        this.radius = radius;
        self.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(201, 163, 58, ${this.weight})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI, false);
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw () {
    clear();


}

setInterval(draw, 10);