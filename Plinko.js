class Plinko {
  constructor(x, y) {
    var options = {
      isStatic: true,
    };

    this.body = Bodies.circle(x, y, 7, options);
    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    ellipseMode(RADIUS);
    fill("White");
    ellipse(pos.x, pos.y, 7, 7);
  }
}
