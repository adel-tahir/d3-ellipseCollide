var tape = require('tape'),
  sinon = require('sinon'),
  ellipseCollide = require('../');

tape('ellipseCollide() returns a valid force module.', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(typeof ellipseCollide, 'object');
  test.equal(typeof ellipseCollide.ellipseCollide, 'function');
  test.equal(typeof unit, 'function');
  test.equal(typeof unit.initialize, 'function');
  test.equal(typeof unit.strength, 'function');
  test.equal(typeof unit.radius, 'function');
  test.end();
});

tape('initialize(nodes) calls strength and radius accessors once for each node', function (test) {
  var stub_strength = sinon.stub(),
    stub_radius = sinon.stub(),
    stub_distance = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = ellipseCollide.ellipseCollide();
  unit.strength(stub_strength);
  unit.radius(stub_radius);
  unit.distance(stub_distance);
  unit.initialize(nodes);
  test.equal(stub_strength.callCount, nodes.length);
  test.equal(stub_radius.callCount, nodes.length);
  test.equal(stub_distance.callCount, nodes.length);
  test.end();
});

tape('strength(const) wraps in a function and returns the force', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(unit.strength(1), unit);
  test.equal(typeof unit.strength(), 'function');
  test.end();
});

tape('strength(fn) calls fn once for each node and returns the force', function (test) {
  var stub = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = ellipseCollide.ellipseCollide();
  unit.initialize(nodes);
  test.equal(unit.strength(stub), unit);
  test.equal(stub.callCount, nodes.length);
  test.end();
});

tape('strength() returns the accessor', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(typeof unit.strength(), 'function');
  test.end();
});

tape('radius(const) wraps in a function and returns the force', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(unit.radius([0, 0]), unit);
  test.equal(typeof unit.radius(), 'function');
  test.end();
});

tape('radius(fn) calls fn once for each node and returns the force', function (test) {
  var stub = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = ellipseCollide.ellipseCollide();
  unit.initialize(nodes);
  test.equal(unit.radius(stub), unit);
  test.equal(stub.callCount, nodes.length);
  test.end();
});

tape('radius() returns the accessor', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(typeof unit.radius(), 'function');
  test.end();
});

tape('distance(const) wraps in a function and returns the force', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(unit.distance(1), unit);
  test.equal(typeof unit.distance(), 'function');
  test.end();
});

tape('distance(fn) calls fn once for each node and returns the force', function (test) {
  var stub = sinon.stub(),
    nodes = [{}, {}, {}],
    unit = ellipseCollide.ellipseCollide();
  unit.initialize(nodes);
  test.equal(unit.distance(stub), unit);
  test.equal(stub.callCount, nodes.length);
  test.end();
});

tape('distance() returns the accessor', function (test) {
  var unit = ellipseCollide.ellipseCollide();
  test.equal(typeof unit.distance(), 'function');
  test.end();
});