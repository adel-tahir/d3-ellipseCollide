import { Intersection, Shapes } from 'kld-intersections';
/**
 * Detect collision of ellipses with the specified maximum distance.
 */
export default function (radius /* [rx, ry] */, distance) {
  let nodes,
    distances,
    radiuses,
    strength,
    strengths;

  function force (alpha) {
    let oneNode, otherNode, oneStrength, otherStrength, oneRadius, otherRadius, oneDistance, otherDistance;
    for (let i=0; i<nodes.length; i++) {
      oneNode = nodes[i];
      oneDistance = distances[i];
      oneStrength = strengths[i];
      oneRadius = radiuses[i];
      for(let j=i+1; j<nodes.length; j++) {
        otherNode = nodes[j];
        otherDistance = distances[j];
        otherStrength = strengths[j];
        otherRadius = radiuses[j];
        checkCollision(oneNode, otherNode, oneRadius, otherRadius, alpha);
      }
    }
  }

  function checkCollision(oneNode, otherNode, oneRadius, otherRadius, alpha) {
    let ellipseOne = Shapes.ellipse(oneNode.x, oneNode.y,oneRadius[0], oneRadius[1])
    let ellipseTwo = Shapes.ellipse(otherNode.x, otherNode.y,otherRadius[0], otherRadius[1])
    let overlap = checkEllipsesOverlap(ellipseOne, ellipseTwo)
    if (!overlap) {
      return false
    }
    let directionVector = {x:0, y:0}
    if ((ellipseOne.args[0].x == ellipseTwo.args[0].x) &&(ellipseOne.args[0].y == ellipseTwo.args[0].y)) {
      directionVector = {x:1, y:0}
    }
    else {
      let centerDistance = Math.sqrt((ellipseOne.args[0].x - ellipseTwo.args[0].x)*(ellipseOne.args[0].x - ellipseTwo.args[0].x) + (ellipseOne.args[0].y - ellipseTwo.args[0].y)*(ellipseOne.args[0].y - ellipseTwo.args[0].y))
      directionVector.x = (ellipseOne.args[0].x - ellipseTwo.args[0].x) / centerDistance
      directionVector.y = (ellipseOne.args[0].y - ellipseTwo.args[0].y) / centerDistance
    }
    let step = 10
    while(overlap) {
      ellipseOne = Shapes.ellipse(ellipseOne.args[0].x + directionVector.x * step, ellipseOne.args[0].y + directionVector.y * step, ellipseOne.args[1], ellipseOne.args[2])
      ellipseTwo = Shapes.ellipse(ellipseTwo.args[0].x - directionVector.x * step, ellipseTwo.args[0].y - directionVector.y * step, ellipseTwo.args[1], ellipseTwo.args[2])
      overlap = checkEllipsesOverlap(ellipseOne, ellipseTwo)
    }
    // reverse last step
    ellipseOne = Shapes.ellipse(ellipseOne.args[0].x - directionVector.x * step, ellipseOne.args[0].y - directionVector.y * step, ellipseOne.args[1], ellipseOne.args[2])
    ellipseTwo = Shapes.ellipse(ellipseTwo.args[0].x + directionVector.x * step, ellipseTwo.args[0].y + directionVector.y * step, ellipseTwo.args[1], ellipseTwo.args[2])
    overlap = true
    // granulate step
    step = 1
    while(overlap) {
      ellipseOne = Shapes.ellipse(ellipseOne.args[0].x + directionVector.x * step, ellipseOne.args[0].y + directionVector.y * step, ellipseOne.args[1], ellipseOne.args[2])
      ellipseTwo = Shapes.ellipse(ellipseTwo.args[0].x - directionVector.x * step, ellipseTwo.args[0].y - directionVector.y * step, ellipseTwo.args[1], ellipseTwo.args[2])
      overlap = checkEllipsesOverlap(ellipseOne, ellipseTwo)
    }
    oneNode.x = ellipseOne.args[0].x
    oneNode.y = ellipseOne.args[0].y
    otherNode.x = ellipseTwo.args[0].x
    otherNode.y = ellipseTwo.args[0].y
    return true
  }

  function checkEllipsesOverlap(ellipseOne, ellipseTwo) {
    // returns true if the two ellipse-surfaces overlap
    let intersection = Intersection.intersect(ellipseOne,ellipseTwo)
    if (intersection.status == 'Intersection') {
      return true
    }
    else {
      let rectangleOne = Shapes.rectangle(ellipseOne.args[0].x - ellipseOne.args[1], ellipseOne.args[0].y - ellipseOne.args[2], 2*ellipseOne.args[1], 2*ellipseOne.args[2])
      let rectangleTwo = Shapes.rectangle(ellipseTwo.args[0].x - ellipseTwo.args[1], ellipseTwo.args[0].y - ellipseTwo.args[2], 2*ellipseTwo.args[1], 2*ellipseTwo.args[2])
      if (checkPointInRectangle(ellipseOne.args[0], rectangleTwo) || checkPointInRectangle(ellipseTwo.args[0], rectangleOne)) {
        return true
      }
      return false
    }
  }

  function checkPointInRectangle(point,rectangle) {
    if (Math.sign(rectangle.args[0].x - point.x) == Math.sign(rectangle.args[1].x - point.x)) {
      return false
    }
    if (Math.sign(rectangle.args[0].y - point.y) == Math.sign(rectangle.args[1].y - point.y)) {
      return false
    }
    return true
  }

  function initialize () {
    if (!nodes) return;

    // populate local `strengths` using `strength` accessor
    strengths = new Array(nodes.length);
    for (let i=0; i<nodes.length; i++) strengths[i] = strength(nodes[i], i, nodes);

    // populate local `distances` using `distance` accessor
    distances = new Array(nodes.length);
    for (let i=0; i<nodes.length; i++) distances[i] = distance(nodes[i], i, nodes);

    // populate local `radiuses` using `radius` accessor
    radiuses = new Array(nodes.length);
    for (let i=0; i<nodes.length; i++) radiuses[i] = radius(nodes[i], i, nodes);
  }

  force.initialize = _ => {
    nodes = _;
    initialize();
  };

  force.strength = _ => {
    // return existing value if no value passed
    if (_ == null) return strength;

    // coerce `strength` accessor into a function
    strength = typeof _ === 'function' ? _ : () => +_;

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  force.distance = _ => {
    // return existing value if no value passed
    if (_ == null) return distance;

    // coerce `distance` accessor into a function
    distance = typeof _ === 'function' ? _ : () => +_;

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  force.radius = _ => {
    // return existing value if no value passed
    if (_ == null) return radius;

    // coerce `radius` accessor into a function
    radius = typeof _ === 'function' ? _ : () => _;

    // reinitialize
    initialize();

    // allow chaining
    return force;
  };

  if (!strength) force.strength(0.1);
  if (!distance) force.distance(0);
  if (!radius) force.radius([30, 40]);

  return force;
}