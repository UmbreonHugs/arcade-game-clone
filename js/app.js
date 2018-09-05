// easy = 1 <- Default
// medium = 2
// hard = 3
// expert = 4
let difficulty = 1;
let difficultyText;
let lives = 3;
let score = 0;
let gameActive = false;
let scoreSelector = document.querySelector('.score');
let livesSelector = document.querySelector('.lives');
let difficultySelector = document.querySelector('.current-difficulty');
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

/**
* @description Allows the user to select the difficulty from button click
* @param {number} diff - The value of the difficulty from user selection (via button click method)
*/
function chooseDifficulty(diff) {
  difficulty = diff;
  updateDifficulty(diff);
  // update the difficulty, add class to the span

}

/**
* @description Updates the difficulty text on the main menu and game over screen
* @param {number} diff - The value of the difficulty from user selection
*/
function updateDifficulty(diff) {
  switch(diff) {
    case '1':
    difficultySelector.innerText = "Easy";
    difficultyText = "Easy";
    break;
    case '2':
    difficultySelector.innerText = "Medium";
    difficultyText = "Medium";
    break;
    case '3':
    difficultySelector.innerText = "Hard";
    difficultyText = "Hard";
    break;
    case '4':
    difficultySelector.innerText = "Expert";
    difficultyText = "Expert";
  }
}
function startGame() {
  gameActive = true;
  // set defaults if person wants to restart game
  lives = 3;
  score = 0;
  setEnemy();
}
function resetGame() {
  // reset and update score
  lives = 3;
  score = 0;
  livesSelector.innerText = lives;
  scoreSelector.innerText = score;
  $("#mainmenu").modal({backdrop: false, keyboard: false});
}
function gameOver() {
  // clear enemy array, player will be at default position upon death
  allEnemies.length = 0;
  // record the score and put them in the popup window!
  var modalHTML = `<div class="modal" id="gameover" tabindex="-1" role="dialog" data-backdrop="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content modal-main-menu">
          <div class="modal-body">
            <h1 class="display-2">Game Over</h1>
            <hr />
            <span class="lead">You scored</span>
            <p class="yourscore">${score}</p>
            <p class="yourscore-label">points in <strong>${difficultyText}</strong> mode!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-lg btn-block" data-dismiss="modal" onClick="resetGame()">Play Again</button>
          </div>
        </div>
      </div>
    </div>`;
  $(modalHTML).modal({backdrop: false, keyboard: false});
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
    this.dt = dt;
    this.x = this.x + this.speed * dt;

    if (this.x > 550) {
      // randomize the speed after each turn
      this.speed = 100 + Math.floor(Math.random() * 520);
      this.x = -100;
    }
    // collision detection, see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x + 60 > player.x && this.x < player.x + 60 && player.y < this.y + 25 && 30 + player.y > this.y) {
    // collision detected! set player position, decrease life
      player.x = 200;
      player.y = 400;
      lives -= 1;
      livesSelector.innerText = lives;
    }
    if (lives == 0) {
      // game over, kill the game
      // create a gameOver() function
      gameOver();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  if (gameActive = true) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  // keep player within game bounderies
  if (this.y > 380) {
    this.y = 380;
  } else if (this.x > 400) {
    this.x = 400;
  } else if (this.x < 0) {
    this.x = 0;
  } else if (this.y < 0) {
    // Winner winner, chicken dinner
    this.y = 400;
    score += 200;
    scoreSelector.innerText = score;
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


  // Load the array
const allEnemies = [];
let player = new Player(200, 400, 50);
  // push enemies, baised on difficulty
function setEnemy() {
  switch (difficulty){
    case '1':
      var enemy1 = new Enemy(0, 220, 320);
      var enemy2 = new Enemy(0, 140, 210);
      var enemy3 = new Enemy(0, 60, 180);
      var enemy4 = new Enemy(100, 60, 170);
      var enemy5 = new Enemy(200, 60, 280);
      allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);
      break;
    case '2':
      var enemy1 = new Enemy(0, 220, 320);
      var enemy2 = new Enemy(0, 140, 210);
      var enemy3 = new Enemy(0, 60, 230);
      var enemy4 = new Enemy(100, 60, 430);
      var enemy5 = new Enemy(200, 220, 230);
      var enemy6 = new Enemy(300, 60, 250);
      allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);
      break;
    case '3':
      var enemy1 = new Enemy(0, 220, 330);
      var enemy2 = new Enemy(0, 140, 210);
      var enemy3 = new Enemy(0, 60, 440);
      var enemy4 = new Enemy(100, 60, 320);
      var enemy5 = new Enemy(200, 220, 230);
      var enemy6 = new Enemy(300, 60, 450);
      var enemy7 = new Enemy(200, 60, 480);
      allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7);
      break;
    case '4':
      var enemy1 = new Enemy(0, 220, 390);
      var enemy2 = new Enemy(0, 145, 490);
      var enemy3 = new Enemy(0, 60, 230);
      var enemy4 = new Enemy(100, 220, 450);
      var enemy5 = new Enemy(100, 145, 430);
      var enemy6 = new Enemy(100, 60, 290);
      var enemy7 = new Enemy(200, 220, 310);
      var enemy8 = new Enemy(200, 145, 410);
      var enemy9 = new Enemy(200, 60, 420);
      var enemy10 = new Enemy(300, 220, 460);
      var enemy11 = new Enemy(300, 145, 450);
      var enemy12 = new Enemy(300, 60, 410);
      allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12);
      break;
    }
}
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
