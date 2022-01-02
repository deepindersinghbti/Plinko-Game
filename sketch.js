const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;

var ground;
var world, engine;

var particle = null;
var plinkos = [];
var divisions = [];

var divisionHeight = 150;

var score = 0;

var hiScore = 0;

var turn = 0;

var gameState = "Play";

function setup() {
  createCanvas(800, 600);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(396, 590, 799, 20);

  wall1 = new Ground(800, 300, 10, 600);
  wall2 = new Ground(0, 300, 10, 600);

  for (var i = 0; i <= width; i = i + 80) {
    divisions.push(
      new Division(i, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 5; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var k = -30; k <= width; k = k + 50) {
    plinkos.push(new Plinko(k, 175));
  }

  for (var l = 5; l <= width; l = l + 50) {
    plinkos.push(new Plinko(l, 275));
  }

  for (var m = -30; m <= width; m = m + 50) {
    plinkos.push(new Plinko(m, 375));
  }
}

function draw() {
  background(0);

  Engine.update(engine);

  if (gameState === "End") {
    fill("White");
    textSize(50);
    textFont("MS UI Gothic");
    text("GAME OVER!", 250, 150);
    text("Total Score: " + score, 220, 265);
    text("High Score: " + hiScore, 227, 335);
    text("Press ENTER to Restart", 140, 450);

    if (keyDown("Enter")) {
      gameState = "Play";
      score = 0;
      turn = 0;
    }

    HiScore();
  }

  if (gameState !== "End") {
    fill("White");
    textSize(20);
    text("Score: " + score, 675, 40);
    text("Turn: " + turn, 50, 40);

    text("500", 25, 480);
    text("400", 105, 480);
    text("300", 185, 480);
    text("200", 265, 480);
    text("100", 345, 480);
    text("100", 425, 480);
    text("200", 505, 480);
    text("300", 585, 480);
    text("400", 665, 480);
    text("500", 745, 480);

    for (var x = 0; x < divisions.length; x++) {
      divisions[x].display();
    }

    for (var y = 0; y < plinkos.length; y++) {
      plinkos[y].display();
    }

    ground.display();
  }

  if (particle !== null) {
    particle.display();

    var pos = particle.body.position;

    if (pos.y > 500) {
      if ((pos.x > 0 && pos.x < 80) || (pos.x > 720 && pos.x < 800)) {
        score += 500;
        particle = null;

        if (turn >= 5) {
          gameState = "End";
        }
      }

      if ((pos.x > 80 && pos.x < 160) || (pos.x > 640 && pos.x < 720)) {
        score += 400;
        particle = null;

        if (turn >= 5) {
          gameState = "End";
        }
      }

      if ((pos.x > 160 && pos.x < 240) || (pos.x > 560 && pos.x < 640)) {
        score += 300;
        particle = null;

        if (turn >= 5) {
          gameState = "End";
        }
      }

      if ((pos.x > 240 && pos.x < 320) || (pos.x > 480 && pos.x < 560)) {
        score += 200;
        particle = null;

        if (turn >= 5) {
          gameState = "End";
        }
      }

      if (pos.x > 320 && pos.x < 480) {
        score += 100;
        particle = null;

        if (turn >= 5) {
          gameState = "End";
        }
      }
    }
  }
}

function mouseReleased() {
  if (gameState !== "End" && particle === null) {
    particle = new Particle(mouseX, 10);
    turn++;
  }
}

function HiScore() {
  if (score > hiScore) {
    hiScore = score;
  }
}
