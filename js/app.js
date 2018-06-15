// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.x = x;
  this.y = y;
  this.speed = getRandomInt(100, 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if(this.x > 6 * 101) {
    this.x = -101;
    this.speed = getRandomInt(100, 200);
  }

  // Handle collisions with the player
  if(Math.abs(this.x - player.x) < 101 &&
      Math.abs(this.y - player.y) < 83) {
    player.reset();
    score.updateMiss();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function() {
  this.sprite = 'images/char-pink-girl.png';
  this.reset();
};

// Update the player's position, required method for game
Player.prototype.update = function() {
  if(this.col < 0) {
    this.col = 0;
  }

  if(this.col > 4) {
    this.col = 4;
  }

  if(this.row > 5) {
    this.row = 5;
  }

  // Reset the player's position... has reached the water
  if(this.row == 0) {
    this.reset();
    score.updateSuccess();
  }

  this.x = this.col * 101;
  this.y = this.row * 83;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      this.col--;
      break;
    case 'right':
      this.col++;
      break;
    case 'up':
      this.row--;
      break;
    case 'down':
      this.row++;
      break;
  }
};

Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.x = this.col * 101;
  this.y = this.row * 83;
};

var Score = function() {
  this.success = 0;
  this.miss = 0;
};




Score.prototype.updateSuccess = function() {
  this.success += 1;
  document.getElementById('score-success').innerHTML = this.success;
};

Score.prototype.updateMiss = function() {
  this.miss += 1;
  document.getElementById('score-miss').innerHTML = this.miss;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var numEnemies = 3;
var allEnemies = [];
for(var i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy(i*101, (i+1)*83));
}

var player = new Player();
var score = new Score();



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

/* Star Class  (Feeback for scoring a goal)
 *
*/

var Star = function() {
  this.sprite = 'images/Star.png';

  this.finalCol = 0;  //column to place the star in (the water tile the player steps on)
  this.Y_OFFSET = -1 * Math.floor(0.025 * COL_WIDTH);  //due to transparency, shift star to center
};

/* Star Methods */

//Once player reaches the water, give him/her a gold star
Star.prototype.render = function() {
  if (player.finished) {  //only when player has scored a goal (reached the water)
    ctx.drawImage(Resources.get(this.sprite), this.finalCol * COL_WIDTH, this.Y_OFFSET);
    //Also display a label with the points received for scoring a goal:
    ctx.fillStyle = '#000';
    ctx.font = '20pt Tahoma, sans-serif';
    ctx.fillText('+1' , this.finalCol * COL_WIDTH + COL_WIDTH/2, ROW_HEIGHT);
  }
};

//Save the col position of the water tile the player stepped on to score
Star.prototype.setCol = function(col) {
  this.finalCol = col;
};




function getRandomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};


