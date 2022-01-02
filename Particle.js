class Particle {
  constructor(x, y) {
    var options = {
      restitution: 0.4,
    };

    this.body = Bodies.circle(x, y, 10, options);
    this.color = color(random(1, 225), random(1, 225), random(1, 225));
    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    noStroke();
    ellipseMode(RADIUS);
    fill(this.color);
    ellipse(0, 0, 10, 10);
    pop();
  }
}
