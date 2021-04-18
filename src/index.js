import Ant from './objects/Ant';
import Food from './objects/Food';
import Home from './objects/Home';
import Pheromone from './objects/Pheromone';
import { canvas, ctx } from './canvas';


// Resize canvas
    function resize () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.onresize = resize;
    resize();
// ---

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

    Pheromone.all.forEach(pher => {
        pher.evaporate();
        pher.draw();
    })

    Ant.all.forEach(ant => {
        ant.move();
        ant.eat();
        ant.trace();
        ant.draw();
    });

    Pheromone.clear();
}

setInterval(draw, 50);