$(function () {
    var xPos = 0;
    var yPos = 0;
    while(xPos < window.innerWidth) {
        xPos += 200;
        while(yPos < window.innerHeight) {
            yPos += 200;
            planets.push(Planet(xPos, yPos));
        }
        yPos = 0;
    }
    console.log(JSON.stringify(planets.map(function(planet) {
        return planet.position;
    })));
});

function Planet(xPos, yPos) {
    return {
        "name": "sdhk;",
        "mass": 10,
        "vector": [0, 0],
        "color": "blue",
        "position": [xPos, yPos]
    };
}