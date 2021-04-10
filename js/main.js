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
        self.all.push(this);
    }

    static all = [];

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
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
}

class Pheromone {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.power = 1;
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = `rgba(81, 202, 70, ${this.power})`;
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    evaporate () {
        this.power *= 0.999;
    }
}

class Home {

}

class Food {
    
}

function draw () {

}

setInterval(draw, 10);