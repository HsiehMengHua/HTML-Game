class MyGame{
  load(){
    this.gameLevel = new GameLevel();
    this.gameOver = new GameOver();
  }
  
  update(){
    this.distance = this.gameLevel.gameMap.position.x;
    window.console.log("this.distance");
  }
}