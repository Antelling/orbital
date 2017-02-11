var gravConstant = .0001;

function update(planet) {
    //so, we need to update the vector and position of this planet
    //the updated vector is just where we move it
    //so we just need to calculate the new position
    //let us assemble a list of force vectors
    var vectors = [];

    //now for every planet, we calculate a vector
    planets.forEach(function (newPlanet) {
        if(newPlanet.name !== planet.name) {
            vectors.push(makeVector(planet, newPlanet));
        }
    });

    //now for every force vector, we make an actual vector
    vectors = vectors.map(positionVector);

    //let us include our previous movement vector into these vectors
    vectors.push(planet.vector);

    //now we total the vectors to get the absolute movement
    var movement = totalVectors(vectors);

    //we need to save this movement, as it is next steps momentum
    planet.vector = movement;

    //now we apply movement to our x and y
    planet.position[0] += movement[0];
    planet.position[1] += movement[1];
    return planet;
}

function makeVector(start, end) {
    //we find the force that is exerted
    var grav = calcGravity(start, end);

    //we divide the force by the mass of the planet
    var force = grav/start.mass;

    //but that's super slow
    force = force * 100;

    //we find the radians between the two planets
    var radians = calcRadians(start.position, end.position);

    return [radians, force];
}

function calcGravity(start, end) {
    return gravConstant * ((start.mass * end.mass) / findDistance(start.position, end.position, start.mass));
}

function findDistance(startPos, endPos, mass) {
    //pythag
    var xDist = startPos[0] - endPos[0];
    var yDist = startPos[1] - endPos[1];
    var dist =  Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    //now, normally planets cannot get within centimeters of each other
    //let us limit the distance to the mass of the planet
    if(dist < mass) {
        dist = mass;
    }

    return dist;
}

function calcRadians(start, end) {
    //we need to center start and end at start = (0,0)
    var newEndX = (end[0] - start[0]);
    var newEndY = (end[1] - start[1]);

    //now we use atan(y/x) to find radians
    return Math.atan(newEndY / newEndX) + Math.PI/2 - sign(newEndX)*(Math.PI/2);
}

function positionVector(vector) {
    //we have radians
    //this lets us find the x ratio and the y ratio
    //negatives are taken care of
    var xRatio = Math.cos(vector[0]);
    var yRatio = Math.sin(vector[0]);

    //now, we distribute the force over these ratios.
    return ([vector[1] * xRatio, vector[1] * yRatio]);
}

function totalVectors(vectors) {
    var total = [0, 0];
    vectors.forEach(function (vector) {
        total[0] += vector[0];
        total[1] += vector[1];
    });
    return total;
}

function sign(num) {
    return num < 0 ? -1 : 1;
}
