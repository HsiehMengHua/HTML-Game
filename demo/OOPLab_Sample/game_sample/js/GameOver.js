var GameOver = Framework.Class(Framework.Level , {
  load: function(){
    this.pic = new Framework.Sprite(define.imagePath + 'game_over.jpg');
    this.pic.position = {x:Framework.Game.getCanvasWidth()/2, y:Framework.Game.getCanvasHeight()/2};
  },
  
  update: function(){
    this.rootScene.update();
  },
  
  draw: function(parentCtx){
    this.rootScene.draw(parentCtx);
    this.pic.draw();
    parentCtx.fillStyle = 'white Arial';
    parentCtx.fillText(this.distance.toString()+' m',270,270,150);
    parentCtx.fillStyle = '#f1d133';
    parentCtx.fillText(this.gameMap.starCount.toString(),400,500,100);
  },
  
  click: function (e) {
    console.log('x = '+e.x+', y = '+e.y);
    if(e.x>875 && e.x<1080 && e.y>500 && e.y<670){
      Framework.Game.goToLevel('level1');
    }else if(e.x>1155 && e.x<1285 && e.y>570 && e.y<670){
      Framework.Game.goToLevel('menu');
    }
  },
  
});