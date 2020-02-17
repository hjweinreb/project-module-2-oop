// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
    //add Text
    this.text = new Text(this.root, 150, 100);
    this.pointText = new Text(this.root, 10, 10);
    this.doubleText = new Text(this.root, 10, 40);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });
    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      const answer = window.confirm("Game over! \nPlay Again?");
      console.log(answer);
      if (answer === true) {
        location.reload();
      }
      stillAlive = false;
      enlarge = false;
      return;
    } else {
      this.pointText.update(counter);
      this.pointText.updateOpacity("0.7");
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 0.01);

    if (enlarge === true) {
      this.player.domElement.width = 150;
      this.enemies[2].domElement.width = 0;
      this.enemies.pop();
      this.text.update("Level 2");
      this.text.updateColor("pink");
      this.text.updateOpacity("0.5");
      this.pointText.update(counter);
      this.doubleText.update("DOUBLE POINTS");
      this.doubleText.updateSize(12);
      this.doubleText.updateColor("pink");
      this.doubleText.updateOpacity("0.8");
    }
  };
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    //console.log(this.enemies[0]);
    //console.log(this.player);
    let yCollide = false;

    if (
      (this.enemies[0].y >= 293 &&
        this.enemies[0].y <= 350 &&
        this.enemies[0].x === this.player.x) ||
      (this.enemies[1].y >= 293 &&
        this.enemies[1].y <= 350 &&
        this.enemies[1].x === this.player.x) ||
      (this.enemies[2].y >= 293 &&
        this.enemies[2].y <= 350 &&
        this.enemies[2].x === this.player.x)
    ) {
      yCollide = true;
    } else if (
      enlarge === true &&
      ((this.enemies[0].y >= 293 &&
        this.enemies[0].y <= 350 &&
        (this.enemies[0].x === this.player.x ||
          this.enemies[0].x === this.player.x + 75)) ||
        (this.enemies[1].y >= 293 &&
          this.enemies[1].y <= 350 &&
          (this.enemies[1].x === this.player.x ||
            this.enemies[1].x === this.player.x + 75)))
      /*(this.enemies[2].y >= 293 &&
          this.enemies[2].y <= 350 &&
          (this.enemies[2].x === this.player.x ||
            this.enemies[2].x === this.player.x + 75))) */
    ) {
      yCollide = true;
    }
    if (yCollide === true) {
      return true;
    }
  };
}
let enlarge = false;
const enlargePlayer = () => {
  console.log("Level 2");
  enlarge = true;
};
setTimeout(enlargePlayer, 20000);

let stillAlive = true;
var counter = 0;
const scoreTracker = () => {
  if (stillAlive === true) {
    console.log("Points!");
    counter = counter + 100;
    console.log(counter);
    //this.pointText.update(counter);
  }
  if (enlarge === true && stillAlive === true) {
    console.log("Double Points!");
    counter = counter + 100;
    console.log(counter);
  }
};
setInterval(scoreTracker, 1000);

/*
    if (
      this.player.x === this.enemies[0].x &&
      this.enemies[0].y === this.player.domElement.height
    ) {

if (enlarge === true) &&
      ((this.enemies[0].y >= 293 &&
        this.enemies[0].y <= 350 &&
        (this.enemies[0].x === this.player.x || this.enemies[0].x === (this.player.x + 75))) ||
      (this.enemies[1].y >= 293 &&
        this.enemies[1].y <= 350 &&
        (this.enemies[1].x === this.player.x || this.enemies[1].x === (this.player.x + 75))) ||
      (this.enemies[2].y >= 293 &&
        this.enemies[2].y <= 350 &&
        (this.enemies[2].x === this.player.x || this.enemies[2].x === (this.player.x + 75))))


//Player height: 54
//Player width: 75
//Player x coordinates: this.player.x */
