// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.h = 101;
    this.w = 171;
};
// characters
const char = {
    boy: "images/char-boy.png",
    catgirl: "images/char-cat-girl.png",
    horngirl: "images/char-horn-girl.png",
    princessgirl: 'images/char-princess-girl.png',
    pinkgirl: 'images/char-pink-girl.png'
}

var Player = function(x, y, speed) {
    // Load sprite
    this.sprite = "images/char-boy.png";
    // Position player baised on variable
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.h = 101;
    this.w = 171;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x + 80 > player.x && this.x < player.x + 80 && this.y == player.y) {
    // collision detected!
      console.log("collision detected");
    } else if (this.x > 500) {
      this.x == 0; //reset position
    }
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  if (this.y < 0) {
    // return to position, add score
    this.y = 400;
  }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function() {
  // Used the Switch Method as this is more cleaner way of coding instead of having a lot of if/else statements
  switch (event.keyCode) {
    // up
    case 38:
      this.y -= 85;
      console.log(`x: ${this.x}, y: ${this.y}`);
      break;
    // down
    case 40:
      this.y += 85;
      break;
    // left
    case 37:
      this.x -= 100;
      break;
    // right
    case 39:
      this.x += 100;
      break;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 220, 70);
var enemy2 = new Enemy(0, 140, 60);
var enemy3 = new Enemy(0, 60, 50);
const allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 400, 50);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
