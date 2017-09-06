var Menu = Framework.Class(Framework.Level , {
  
  load: function(){
    this.pic = new Framework.AnimationSprite({url:[define.imagePath+'game_menu_1.jpg', define.imagePath+'game_menu_2.jpg']});
    this.pic.position = {x:Framework.Game.getCanvasWidth()/2, y:Framework.Game.getCanvasHeight()/2};
    this.pic.start({from:0, to: 1});
  },
  
  update: function(){
    this.rootScene.update();
  },
  
  draw: function(parentCtx){
    this.rootScene.draw(parentCtx);
    this.pic.draw();
  },
  
  click: function (e) {
    console.log('x = '+e.x+', y = '+e.y);
    if(e.x>1050 && e.x<1277 && e.y>485 && e.y<650){
      Framework.Game.goToNextLevel();
    }
  },
  
});