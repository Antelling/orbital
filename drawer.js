$(function () {
    canvas = document.getElementById("canvas");
    can = canvas.getContext("2d");


    can.lineWidth = 0;
    can.canvas.width = window.innerWidth;
    can.canvas.height = window.innerHeight;

    // start the mainloop
    animFrame(recursiveAnim);
});

var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

var recursiveAnim = function () {
    draw();
    animFrame(recursiveAnim);
};


function draw() {
    console.log("drawing");
    //clear the canvas
    can.fillStyle = "rgba(255,255,255,.02)";
    //can.fillRect(0,0,canvas.width, canvas.height);

    var updatePlanets = [];
    planets.forEach(function (planet) {
        if (!planet.fixed) {
            planet = update(planet);
        }
        if (!planet.hidden) {
            drawCircle(planet.position[0], planet.position[1], planet.mass / 100, planet.color);
        }
        updatePlanets.push(planet)
    });

    planets = updatePlanets;
    //planets = simulateCollisions(updatePlanets);
}

function drawCircle(x, y, rad, fill) {
    can.beginPath();
    can.moveTo(x, y);
    can.fillStyle = fill;
    can.arc(x, y, rad, 0, 2 * Math.PI, false);
    can.fill();
    can.stroke();
    can.closePath();
}
