class Player{

  constructor(){
    this.playerW = 140;
    this.playerH = 150;
    this.isSpace = false;
    this.moveSpeed = 2;
  }

  load(){
    this.sprite = new Framework.AnimationSprite({url:[define.imagePath+'player_run1.png', define.imagePath+'player_run2.png']});
    this.sprite.position = {x: 200, y: 450};
    this.sprite.scale = 1;
    this.run();
    
    
    this.playerPic = new Framework.Sprite(define.imagePath + 'player.gif');
    this.playerPic.position = {
      x: 200,
      y: 350
    };
  }
  
  run(){
    this.sprite.start({from:1, to: 2});
  }
  
  update(){

  }
  
  draw(ctx){
    this.playerPic.draw(ctx);
  }
  
  moveUp(){
    this.playerPic.position.y -= this.moveSpeed;
  }
  
  moveDown(){
      this.playerPic.position.y += this.moveSpeed;
      
  }
  
  keydown(e){
    if(e.key === 'Space')
      this.isSpace = true;
  }
  
  keyup(e){
    this.isSpace = false;
  }
}
