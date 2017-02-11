var simTicker = 0;
function simulateCollisions(planets) {
    simTicker++;
    if(simTicker > 20) {
        return planets;
    }

    console.log("----------");
    console.log(JSON.stringify(planets, null, 4));

    //if the coordinates are within 3, collide them, add the mass, take the biggest color, and total the vectors
    var collidedPlanets = [];
    planets.forEach(function (planet1) {
        planets.forEach(function (planet2) {
            if (planet1.name !== planet2.name) {
                if (touching(planet1.position, planet2.position)) {
                    collidedPlanets.push(collide(planet1, planet2));
                } else {
                    collidedPlanets.push(planet1);
                }
            }
        })
    });

    console.log("collided planets: " + JSON.stringify(collidedPlanets));
    console.log("singular collided planets: " + JSON.stringify(removeDups(collidedPlanets)));
    return removeDups(collidedPlanets);
}

function touching(a, b) {
    return (Math.abs(a[0] - b[0]) < 2 && Math.abs(a[1] - b[1]) < 2);
}

function collide (a, b) {
    if(a.mass < b.mass) {
        var c = a;
        a = b;
        b = c;
    }
    //a is bigger than b
    return {
        "name": a.name,
        "mass": a.mass + b.mass,
        "color": a.color,
        "vector": [a.vector[0] + b.vector[0], a.vector[1] + b.vector[1]],
        "position": a.position
    };
}

function removeDups(planetList) {
    var newPlanets = [];
    planetList.forEach(function(planet) {
        if(instances(planet.name, newPlanets) < 2) {
            newPlanets.push(planet);
        }
    });
    console.log(newPlanets);
    return newPlanets;
}

function instances(name, planets) {
    var instances = 0;
    planets.forEach(function(planet) {
        if(planet.name === name) {
            instances++;
        }
    });
    return instances;
}