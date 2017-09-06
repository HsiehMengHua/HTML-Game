var Character = function(file, options) {
    this.url = file;
    this.sprite = new Framework.AnimationSprite({url:this.url, col:5 , row:3 , loop:true , speed:1}); 
  
    this.sprite.position = options.position || {x: 0, y: 0};
    this.sprite.scale = options.scale || 1;

    this.run = function() {
        this.sprite.start({ from: options.run.from, to: options.run.to, loop: true });
    };
  
    this.moveUp = function() {
        this.sprite.start({ from: options.moveUp.from, to: options.moveUp.to, loop: true });
    };
  
    this.moveDown = function() {
        this.sprite.start({ from: options.moveDown.from, to: options.moveDown.to, loop: true });
    };
  
    this.hurt = function() {
        this.sprite.start({ from: options.hurt.from, to: options.hurt.to, loop: true });
    };

    //預設人物就是在跑步
    this.run();

};