# d3-elllipse-collision

Modular force for use with D3's [`forceSimulation`](https://github.com/d3/d3-force#forceSimulation).

Detect collision of ellipses.

## Installing

#### npm

We haven't published as npm  yet.

#### CDN (UNPKG), via <script>

We haven't uploaded to any CDN yet.

#### Local, via `<script>`

Download the [latest release](https://github.com/adel-tahir/d3-ellipseCollide/releases)

`<script src="./d3-ellipse-collision.js"></script>`


## Usage

### Accessing the module

The install method you use determines the syntax for accessing the module in your code:

#### npm

Import the `ellipseCollide()` method and use it in a `forceSimulation`.

```
import { ellipseCollide } from './d3-ellipse-collision'
// ...
d3.forceSimulation
	.force('collide', ellipseCollide()
	.radius(function(d) { return [d.rx, d.ry]; }));
```

#### via `<script>` or CDN ([UNPKG](https://unpkg.com/))

The `ellipseCollide()` method is available in the global `ellipseCollision` namespace.

```
d3.forceSimulation
	.force('collide', ellipseCollide()
	.radius(function(d) { return [d.rx, d.ry]; }));
```

### Using the module

Add an `'collide'` force just like you would any other D3 force module:

```
d3.forceSimulation()
	.force('collide', ellipseCollide()
	.radius(function(d) { return [d.rx, d.ry]; }));
```


## API

The [`ellipseCollide`](https://github.com/adel-tahir/d3-ellipseCollide) module follows the [basic interface described in d3-force](https://github.com/d3/d3-force/blob/master/README.md#forces), additionally implementing the following:

<a name="ellipseCollide_initialize" href="#ellipseCollide_initialize">#</a> <i>ellipseCollide</i>.<b>initialize</b>(<i>nodes</i>)

Assigns the array of *nodes* to this force. This method is called when a force is bound to a simulation via [*simulation*.force](https://github.com/d3/d3-force/blob/master/README.md#simulation_force) and when the simulation’s nodes change via [*simulation*.nodes](https://github.com/d3/d3-force/blob/master/README.md#simulation_nodes). A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.

<a name="ellipseCollide_radius" href="#ellipseCollide_radius">#</a> <i>ellipseCollide</i>.<b>radius</b>([<i>radius</i>])

If *radius* is specified, sets the radius accessor to the specified two-element array `[rx, ry]` or function, re-evaluates the radius accessor for each node, and returns this force. If *radius* is not specified, returns the current radius accessor, which is specified in `ellipseCollide(radius)` function.

The radius accessor is invoked for each node in the simulation, being passed the node, its zero-based index, and the array of all nodes (the standard D3 format of `(d, i, nodes)`). The resulting `[rx, ry]` is then stored internally.

<a name="ellipseCollide_strength" href="#ellipseCollide_strength">#</a> <i>ellipseCollide</i>.<b>strength</b>([<i>strength</i>])

If *strength* is specified, sets the force strength to the specified number in the range [0,1] and returns this force. If *strength* is not specified, returns the current strength, which defaults to 0.1.

**Not yet implemented*


## Building and testing

Install [nvm](http://nvm.sh) and [npm](http://npmjs.com) if you haven't already.

Build with the following commands:

```bash
nvm use
npm install
npm run dist
```

Test with `npm run test`.
