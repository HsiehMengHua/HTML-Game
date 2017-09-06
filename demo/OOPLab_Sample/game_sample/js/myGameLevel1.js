var GameLevel = Framework.Class(Framework.Level , {
  
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(define.imagePath + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};          
    },

    loadingProgress: function(ctx, requestInfo) {
        this.loading.draw(ctx);
        ctx.fillStyle = '#82aa16';
        ctx.fillRect(470,425,400*Math.round(requestInfo.percent)/100,49);
        ctx.font ='30pt Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , 1000 , 462);
    },
  
	load: function(){
      
        this.gameMap = new GameMap();
		this.gameMap.load();
        this.rootScene.attach(this.gameMap);
      
        this.audio = new Framework.Audio({
            bgMusic: {
                mp3: define.musicPath + 'funkyelement.mp3'
            }, star:{
                mp3: define.musicPath + 'electronic_bubbles.mp3'
            }, engine:{
                mp3: define.musicPath + 'engine.mp3'
            }, crash:{
                mp3: define.musicPath + 'rock_crash.mp3'
            }, over:{
                mp3: define.musicPath + 'popdance.mp3'
            }
        });
                
        this.audio.play({name: 'bgMusic', loop: true});
        this.isMusicOn = true;
        this.isSoundOn = true;
        this.isOver = false;
        this.guideOK = false;
      
        this.char = new Character(define.imagePath + 'player.png', {
          position: {x:400,y:500},
          run: {from: 0, to: 1},
          moveUp: {from: 2, to: 5},
          moveDown: {from: 6, to: 6},
          hurt: {from: 6, to: 12}
        });
        this.rootScene.attach(this.char.sprite);
        
        this.heart = new Framework.Sprite(define.imagePath + 'heart.png');        
        this.hp = 50;
      
        this.pauseButton = new Framework.Sprite(define.imagePath + 'pause_btn.png');
        this.playerPause = new Framework.Sprite(define.imagePath + 'player_front.png');
        this.homeButton = new Framework.Sprite(define.imagePath + 'home_btn.png');
        this.replayButton = new Framework.Sprite(define.imagePath + 'replay_btn.png');
        this.playButton = new Framework.Sprite(define.imagePath + 'play_btn.png');
        this.bgDark = new Framework.Sprite(define.imagePath + 'bg_dark.png');
        this.musicButton = new Framework.Sprite(define.imagePath + 'music_btn.png');
        this.musicOffButton = new Framework.Sprite(define.imagePath + 'music_btn_off.png');
        this.soundButton = new Framework.Sprite(define.imagePath + 'sound_btn.png');
        this.soundOffButton = new Framework.Sprite(define.imagePath + 'sound_btn_off.png');
        this.gameOverScene = new Framework.Sprite(define.imagePath + 'game_over.jpg');
        this.guidePic = new Framework.Sprite(define.imagePath + 'guide.png');
      
      
      
		var characterPosition;
        
        this.isStop = false;
        this.isPlayed = false;

        this.clock = new Framework.Sprite(define.imagePath + 'clock.png');
        this.clock.scale = 0.3;
        this.clock.position = {
            x: 0,
            y: 0
        };
        
        //characterPosition = {x: 0, y: -1138 * this.clock.scale};
        characterPosition = {x: 0, y: -1138};
        this.secondHand = new Framework.Sprite(define.imagePath + 'secondHand.jpg'); 
        this.firen = new Character_ex(define.imagePath + 'firen.png', {position: characterPosition, run: {from: 20, to: 22}, beHit: {from:30, to: 35}, hit: {from: 10, to: 13}}); 
        //this.freeze = new Character(define.imagePath + 'freeze.png', {position: characterPosition, scale: 1, run: {from: 29, to: 27}, beHit: {from:39, to: 35}, hit: {from: 19, to: 16}});
        this.freeze = new Character_ex(define.imagePath + 'firen.png', {position: characterPosition, run: {from: 20, to: 22}, beHit: {from:30, to: 35}, hit: {from: 10, to: 13}}); 
        
        this.clockCenter = new Framework.Scene();
        this.clockCenter.position = {
            x: -10.5 * this.clock.scale,
            y: 51 * this.clock.scale
        };

        this.clockCenterNeg = new Framework.Scene();
        this.clockCenterNeg.position = {
            x: -10.5 * this.clock.scale,
            y: 51 * this.clock.scale
        };

        this.secondHand.position = {
            x: 0,
            y: -100
        };

        this.wholeClock = new Framework.Scene();
        this.wholeClock.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };
        

        this.secondHandRotationRate = 0.3;
        //this.wholeClock.attach(this.clock);
        //this.clockCenter.attach(this.secondHand);
        //this.clockCenter.attach(this.firen.sprite);
        this.clockCenterNeg.attach(this.freeze.sprite);
        this.wholeClock.attach(this.clockCenterNeg); 
        //this.wholeClock.attach(this.clockCenter);                    
        this.rootScene.attach(this.wholeClock);
       
/*
        //繪製Sprite的boundry (Debug用)
        this.firen.sprite.isDrawBoundry = true;
        this.clock.isDrawBoundry = true;

        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
        this.audio = new Framework.Audio({
            kick: {
                mp3: define.musicPath + 'kick2.mp3',
                //ogg: define.musicPath + 'kick2.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }, song1:{
                mp3: define.musicPath + 'NTUT_classic.mp3',
                //ogg: define.musicPath + 'Hot_Heat.ogg',
                //wav: define.musicPath + 'Hot_Heat.wav'
            }, song2:{
                mp3: define.musicPath + 'NTUT_modern.mp3',
                //ogg: define.musicPath + 'The_Messenger.ogg',
                //wav: define.musicPath + 'The_Messenger.wav'
            }
        });

        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({name: 'song2', loop: true});

        this.rectPosition = { 
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2 - 90
        };
		
		this.position = {
			x: 100,
			y: 100
		}
		this.rotation = 0;*/
	},

    initialize: function() {
        
                           
    },

    update: function() {
        
        //this.rootScene.update();
        
        // 人物右邊是空的地圖才會動，否則地圖靜止
        if(this.gameMap.getTileType(this.char.sprite.position.x+this.char.sprite.width, this.char.sprite.position.y)!='tile'
            && this.gameMap.getTileType(this.char.sprite.position.x+this.char.sprite.width, this.char.sprite.position.y+this.char.sprite.height/2)!='tile'){
          this.gameMap.position={
            x: this.gameMap.position.x - this.gameMap.moveSpeed,
            y: this.gameMap.position.y
          }
        }        
      
        /********************
         *******人物移動******
         ********************/
      
        if(this.isSpace){
          if(this.gameMap.getTileType(this.char.sprite.position.x+120, this.char.sprite.position.y-10)!='tile'
              && this.gameMap.getTileType(this.char.sprite.position.x+40, this.char.sprite.position.y-10)!='tile'){
            this.char.sprite.position.y -= 4;
          }else{
            this.char.sprite.position.y += 0;
          }
        }else{
          if(this.gameMap.getTileType(this.char.sprite.position.x+120,this.char.sprite.position.y+130)!='tile'
              && this.gameMap.getTileType(this.char.sprite.position.x+40,this.char.sprite.position.y+130)!='tile'){
            this.char.sprite.position.y += 4;
            this.char.moveDown();
          }else{
            this.char.sprite.position.y += 0;
            this.char.run();
          }
        }
      
        
        /********************
         ********吃星星*******
         ********************/  
      
        for(let i=this.gameMap.findStarY(this.char.sprite.position.y)-2; i<this.gameMap.findStarY(this.char.sprite.position.y); i++){
          for(let j=this.gameMap.findStarX(this.char.sprite.position.x); j<this.gameMap.findStarX(this.char.sprite.position.x)+3; j++){
            if(this.gameMap.star[i][j]==1){
              this.gameMap.star[i][j]=0;
              this.gameMap.starCount++;
              if(this.isSoundOn)
                this.audio.play({name: 'star'});
            }
          }
        }
      
      
        /********************
         *******碰到扣HP******
         ********************/
      
        if(this.gameMap.getTileType(this.char.sprite.position.x+20, this.char.sprite.position.y+80)=='sting'){
          this.hp -= 0.1;
          this.char.hurt();
          if(this.isSoundOn)
            this.audio.play({name: 'crash'});
        }
      
        if(Math.floor(this.hp) == 0){
          //var distance = Math.floor(this.gameMap.position.x/-20);
          //this.level = Math.ceil(this.gameMap.distance/400);
          //Framework.Game.goToNextLevel();
          //Framework.Game.stop();
          this.isOver = true;
          this.audio.pauseAll();
          this.audio.play({name: 'over', loop: true});
        }
        //console.log(distance);
        
      
/*
        //以下為當被攻擊時會停下來, 並且當被攻擊的動畫播放完時便繼續跑的Scenario
        if(this.firen.collide(this.freeze) && !this.isStop && !this.isPlayed) {
            this.isStop = true;
            this.isPlayed = true;
            //當碰攻擊時, 播放音效(可一次播放多首音樂)
            this.audio.play({name: 'kick'});
            this.firen.hit(function() {
                game.freeze.beHit(function() {
                    game.isStop = false;
                    game.freeze.run();
                });
                game.firen.run();
            });
            
        }
        else if(!this.firen.collide(this.freeze)){
            this.isPlayed = false;
            this.clockCenter.rotation += this.secondHandRotationRate;
            this.clockCenterNeg.rotation = -this.clockCenter.rotation;
        }
        else if(this.firen.collide(this.freeze) && !this.isStop)
        {
            this.clockCenter.rotation += this.secondHandRotationRate;
            this.clockCenterNeg.rotation = -this.clockCenter.rotation;
        }
        //以上為當被攻擊時會停下來, 並且當被撞到的動畫播放完時便繼續跑的Scenario


        this.isPlayHit = this.firen.collide(this.freeze)  */                             
    },

    draw:function(parentCtx){
      
        this.rootScene.draw(parentCtx);
      
        parentCtx.fillStyle = '#e03f32';
        parentCtx.fillRect(70,95,this.hp*4,30);
        this.heart.scale = 0.8;
        this.heart.position = {x:60,y:110};
        this.heart.scale = 1.5
        this.heart.draw();
        this.gameMap.starPic.position = {x:60,y:180};
        this.gameMap.starPic.draw();
        parentCtx.font = '32pt Arial';
        parentCtx.fillStyle = 'lightgrey';
        parentCtx.textAlign = 'left';
        parentCtx.fillText(Math.floor(this.hp).toString(),110,125,100);
        parentCtx.fillStyle = '#f1d133';
        parentCtx.fillText(this.gameMap.starCount.toString(),110,200,100);
        parentCtx.fillStyle = 'white';
        parentCtx.fillText(Math.floor(this.gameMap.position.x/-20).toString()+' m',30,270,150);
      
        this.guidePic.position = {x:1000,y:450};
        this.musicButton.position = {x:Framework.Game.getCanvasWidth()-240,y:110};
        this.musicOffButton.position = {x:Framework.Game.getCanvasWidth()-240,y:110};
        this.soundButton.position = {x:Framework.Game.getCanvasWidth()-150,y:110};
        this.soundOffButton.position = {x:Framework.Game.getCanvasWidth()-150,y:110};
        this.pauseButton.position = {x:Framework.Game.getCanvasWidth()-60,y:110};
        this.playerPause.position = {x:Framework.Game.getCanvasWidth()/2,y:250};
        this.replayButton.position = {x:Framework.Game.getCanvasWidth()/2,y:500};
        this.homeButton.position = {x:Framework.Game.getCanvasWidth()/2-140,y:500};
        this.playButton.position = {x:Framework.Game.getCanvasWidth()/2+170,y:500};
        this.bgDark.position = {x:750,y:500};
        this.gameOverScene.position = {x:Framework.Game.getCanvasWidth()/2, y:Framework.Game.getCanvasHeight()/2};
      
        this.musicOffButton.scale = 1.5;
        this.musicButton.scale = 1.5;
        this.soundOffButton.scale = 1.5;
        this.soundButton.scale = 1.5;
        this.pauseButton.scale = 1.5;
        this.playerPause.scale = 1.5;
        this.replayButton.scale = 1.5;
        this.homeButton.scale = 1.5;
        this.playButton.scale = 1.5;
      
        if(!this.guideOK){
          this.guidePic.draw();
        }
        
        this.pauseButton.draw();
        this.musicOffButton.draw();
        this.soundOffButton.draw();
        if(this.isMusicOn){
          this.musicButton.draw();
        }
        if(this.isSoundOn){
          this.soundButton.draw();
        }
      
        if(this.isPause){
          this.bgDark.draw();
          this.playerPause.draw();
          this.replayButton.draw();
          this.homeButton.draw();
          this.playButton.draw();
        }
        
        if(this.isOver){
          this.gameOverScene.draw();
          Framework.Game.stop();
          parentCtx.fillText(Math.floor(this.gameMap.position.x/-20).toString()+' m',400,190,150);
          parentCtx.fillStyle = '#f1d133';
          parentCtx.fillText(this.gameMap.starCount.toString(),460,375,100);
        }
          
        
        

        
        /*
        //可支援畫各種單純的圖形和字
        parentCtx.fillStyle = (this.secondHandRotationRate > 0)?'green':'red'; 
        parentCtx.fillRect(this.rectPosition.x , this.rectPosition.y, 260, 90);  
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Click Me', this.rectPosition.x + 130, this.rectPosition.y, 260);
         */
        
    },

    keydown:function(e){
        if(e.key === 'Space'){
          this.guideOK = true;
          this.isSpace = true;
          this.char.moveUp();
          if(this.isSoundOn)
            this.audio.play({name: 'engine', loop: true});
        }
    },
  
    keyup:function(e){
      this.isSpace = false;
      this.audio.stop('engine');
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },
    
    click: function (e) {
      
        if(e.x>1060 && e.x<1137 && e.y>70 && e.y<130 && !this.isPause){
          if(this.isMusicOn){
            this.audio.pause('bgMusic');
            this.isMusicOn = false;
          }else{
            this.audio.resume('bgMusic');
            this.isMusicOn = true;
          }
        }
      
        if(e.x>1165 && e.x<1225 && e.y>70 && e.y<130 && !this.isPause){
          if(this.isSoundOn){
            this.isSoundOn = false;
          }else{
            this.isSoundOn = true;
          }
        }
      
        if(e.x>this.pauseButton.position.x-25 && e.x<this.pauseButton.position.x+25 && e.y>this.pauseButton.position.y-25 && e.y<this.pauseButton.position.y+25){
          this.isPause = true;
          Framework.Replay.pause();
          this.audio.pause('bgMusic');
        }
      
        if(e.x>755 && e.x<920 && e.y>425 && e.y<570){
            Framework.Replay.resume();
          }
      
        if(e.x>480 && e.x<580 && e.y>450 && e.y<540){
          Framework.Game.goToLevel('menu');
          this.isPause = false;
        }
      
        if(e.x>620 && e.x<720 && e.y>450 && e.y<550){
          Framework.Game.goToLevel('level1');
          this.isPause = false;
        }
      
        if(e.x>875 && e.x<1080 && e.y>500 && e.y<670){
          Framework.Game.goToLevel('level1');
          this.audio.pauseAll();
        }else if(e.x>1155 && e.x<1285 && e.y>570 && e.y<670){
          Framework.Game.goToLevel('menu');
          this.audio.pauseAll();
        }

        console.log(e.x, e.y);
        if (!this.rectPosition) {
            return;
        }  
        
        if(e.x >= this.rectPosition.x && e.x <= this.rectPosition.x + 260 && e.y >= this.rectPosition.y && e.y <= this.rectPosition.y + 90) {
            if(!this.isClockStop) {
                this.secondHandRotationRate = 0;
                this.isClockStop = true;
                //Audio可以一次暫停所有的音樂
                this.audio.pauseAll();
            } else {
                this.isClockStop = false;
                this.secondHandRotationRate = 0.3;
                //Audio也可以針對一首歌進行操作(繼續播放)
                this.audio.resume('song2');
            }
        } else if(e.x >= this.clock.upperLeft.x && e.x <= this.clock.lowerRight.x && e.y >= this.clock.upperLeft.y && e.y <= this.clock.lowerRight.y) {
            //由於Click Me在太小的螢幕的情況下會蓋到Clock, 導致點擊Click Me時, 會回到前一個Level,
            //故使用else if, 並優先選擇Click Me會觸發的條件
            this.audio.stopAll();
            Framework.Game.goToPreviousLevel();            
            return;
        }
    },
});