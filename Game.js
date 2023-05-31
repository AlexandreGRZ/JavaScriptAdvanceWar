var usernamePlayer = null;

window.addEventListener("message", function (event) {
  if (event.data) usernamePlayer = event.data.username;
});

class MainInfentery{

  

  constructor(id, type, hp, attack, defence, captureCapacity,mouvement , team, multiplicateur,mutiplicateurAgainstArmor , MultiplicatorAgainstInfetry ,xposition, yposition, enableToPlay)
  {   
      this.multiplicateur = multiplicateur
      this.id = id;
      this.type = type;
      this.hp = hp;
      this.attack = attack;
      this.defence = defence;
      this.captureCapacity = captureCapacity;
      this.mouvement = mouvement;
      this.mutiplicateurAgainstArmor = mutiplicateurAgainstArmor;
      this.MultiplicatorAgainstInfetry = MultiplicatorAgainstInfetry;
      this.xposition = xposition;
      this.yposition = yposition;
      this.team = team;
      this.enableToPlay = enableToPlay;
  }

  MoveInfentery(newxposition, newyposition)
  {
      this.xposition = newxposition;
      this.yposition = newyposition;
  }

  checkMouvement(nbMouvement){
    if(nbMouvement <= this.mouvement)
    {
      this.mouvement -= nbMouvement;
      return true;
    }
    else
    {
      return false;
    }
  }

  reloadDeplacement()
  {
    if(this.type == "MainInfetry" )
    {
      this.mouvement = 5;
    }else if(this.type =="Bazouka" )
    {
      this.mouvement = 4;
    }else
    {
      this.mouvement = 6;
    }
    this.enableToPlay = true;
  }

  isBlinde()
  {
    if(this.type !== "MainInfetry" && this.type !== "Bazouka")
      return true;
    else
      return false;
  }

  isInfentry()
  {
    if(this.type === "MainInfetry")
      return true;
    else
      return false;
  }

  greet()
  {
      console.log("MainInfentery : hp = " + this.hp + ", attack = " + this.attack + ", defence = " + this.defence +  ",xposition = " + this.xposition +  ", yposition = " + this.yposition);
  }

  

}

class Base{
  constructor(id ,Team, hp, defence, xposition, yposition)
  { 
    this.id = id;
    this.Team = Team; 
    this.hp = hp;
    this.defence = defence;
    this.xposition = xposition;
    this.yposition = yposition;
  }

  capture(colonisation){
    this.hp -= colonisation;
    if(this.hp <= 0)
      return true;
    else
      return false;
  }

}

class Sprite{
  constructor(id, team, sprite)
  { 
      this.id = id;
      this.team = team;
      this.sprite = sprite;
  }
}

var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
};

var RedScore = 0;
var BlueScore = 0;
var highScore;
getPB();


//si TimeTurn == 0 Alors équipe des rouges joue, si c'est 1 c'est au tour des bleus
var FOREST = 68;
var PLAIN = 1;





var timeTurn = 0;

var ArmySelected = null;

var keyN;
var keyB;
var xcursorposition = 0;
var ycursorposition = 0;

var ycursorpositionBlue = 0;
var xcursorpositionBlue = 0;

var xcursorpositionRed = 0;
var ycursorpositionRed = 0;

var SpriteCursor = null;
var Zoom = 3;
var game = new Phaser.Game(config);
var neutraltown1;
var redtown1;
var InfobulleAttack;
var infobulleUnitySelected;
var Winner = "Red";

var cursorPositionTab = [];
var MapTilesIndice =  [];


//Sprite Unity ***************************************************************************************************************
var TabSprite = [];

//**************************************************************************************************************************** */


//Infentry Unity ***************************************************************************************************************
var maininfentery
var BlueMainInfentery1

var RedLightTank 
var BlueLightTank

var RedBazouka
var BlueBazouka 


var InfenteryTab = [];



//**************************************************************************************************************************** */

//Town Unity ***************************************************************************************************************

var TownTabLocalisation = [];
TownTabLocalisation 

var RedTownVec = [];
var NeutralTownVec = [];
var BlueTownVec = [];


var NeutralTown1
var RedBase 
var BlueBase
var BlueTown1



console.table(TownTabLocalisation);




//**************************************************************************************************************************** */


//Town Unity ***************************************************************************************************************
var SpriteRedTown = [];

var SpriteNeutralTown = [];

var SpriteBlueTown = [];


//**************************************************************************************************************************** */
cursorPositionTab

var armyPositionTab = [];

armyPositionTab

var scene;

var Mouving = false;

function InitialisationGame()
{
  TabSprite = [];
  maininfentery = new MainInfentery(1,"MainInfetry", 100, 20, 10, 10, 5,"Red" ,0.5, 0.1, 1, 0, 0, true);
  BlueMainInfentery1 = new MainInfentery(2,"MainInfetry", 100, 20, 10, 10, 5,"Blue",0.5, 0.1, 1, 5, 0, true);

  RedLightTank = new MainInfentery(3,"TankInfentry", 100, 35, 40, 0, 6,"Red",0.5, 1, 1.2, 6, 3, true);
  BlueLightTank = new MainInfentery(4,"TankInfentry", 100, 35, 40, 0, 6,"Blue",0.5, 1, 1.2, 7, 6, true);

  RedBazouka = new MainInfentery(5,"Bazouka", 100, 30, 10, 0, 4,"Red",0.5, 1, 1, 2, 3, true);
  BlueBazouka = new MainInfentery(6,"Bazouka", 100, 30, 10, 0, 4,"Blue",0.5, 1, 1, 3, 7, true);

  InfenteryTab = [];

  InfenteryTab.push(maininfentery);
  InfenteryTab.push(BlueMainInfentery1);
  InfenteryTab.push(RedLightTank);
  InfenteryTab.push(BlueLightTank);
  InfenteryTab.push(RedBazouka);
  InfenteryTab.push(BlueBazouka);



  TownTabLocalisation = [];
  TownTabLocalisation = InitialisationTab(TownTabLocalisation);
  
  RedTownVec = [];
  NeutralTownVec = [];
  BlueTownVec = [];
  
  
  NeutralTown1 = new Base(1, "Neutral", 20 , 10, 1, 8);
  RedBase = new Base(2, "Red", 20, 10, 1, 5);
  BlueBase = new Base(3, "Blue", 20, 10, 17, 4);
  BlueTown1 = new Base(4, "Blue", 20, 10, 18, 5);
  
  RedTownVec.push(RedBase);
  
  NeutralTownVec.push(NeutralTown1);
  
  BlueTownVec.push(BlueBase);
  BlueTownVec.push(BlueTown1);
  

  for (let element of RedTownVec) {
    TownTabLocalisation[element.yposition][element.xposition] = element.id;
  } 

  for (let element of NeutralTownVec) {
    TownTabLocalisation[element.yposition][element.xposition] = element.id;
  } 

  for (let element of BlueTownVec) {
    TownTabLocalisation[element.yposition][element.xposition] = element.id;
  } 


  SpriteRedTown = [];

  SpriteNeutralTown = [];

  SpriteBlueTown = [];



  cursorPositionTab = InitialisationTab(cursorPositionTab);

  armyPositionTab = [];

  armyPositionTab = InitialisationTab(armyPositionTab);
  InitInfenteryTab(InfenteryTab, armyPositionTab);
  console.log(armyPositionTab);


  cursorPositionTab[0][0] = 1;

  scene;

  Mouving = false;

}




class Menu extends Phaser.Scene{

  constructor() {
    super({ key: "Menu"});
  }

  preload() {
    this.load.image("playButton", "src/asset/Playbtn.jpg");
  
    this.load.image("quitButton", "src/asset/ExitBtn.jpg");  
  }

  create()
  {
    var style = { font: "bold 32px Arial", fill: "#fff" };
    var title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "Menu", style);
    title.setOrigin(0.5);

    var playButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "playButton", this.startGame, this);
    playButton.setOrigin(0.5);
    playButton.setInteractive();
    playButton.on("pointerup",  this.startGame, this);
    
    var quitButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 100, "quitButton", this.quitGame, this);
    quitButton.setOrigin(0.5);
    quitButton.setInteractive();
    quitButton.on("pointerup", this.quitGame, this);
  }

  update() {
   
  }

  startGame() {
    // Code pour démarrer le jeu lorsque le bouton "JOUER" est cliqué
    this.scene.start("Game");
  }

  quitGame() {
    // Code pour quitter le jeu lorsque le bouton "QUITTER" est cliqué
    window.close();
  }
}

class GameOver extends Phaser.Scene{

  constructor() {
    super({ key: "GameOver"});
  }

  preload() {
    this.load.image("playButton", "src/asset/Playbtn.jpg");
  
    this.load.image("quitButton", "src/asset/ExitBtn.jpg");  
  }

  create()
  {
    var style = { font: "bold 32px Arial", fill: "#fff" };
    if(Winner == "Red")
    {
      var title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "RED WIN !", style);
      title.setOrigin(0.5);
    }
    else
    {
      var title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, "BLUE WIN !", style);
      title.setOrigin(0.5);
    }
    var playButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "playButton", this.startGame, this);
    playButton.setOrigin(0.5);
    playButton.setInteractive();
    playButton.on("pointerup", this.startGame, this);
    
    var quitButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 100, "quitButton", this.quitGame, this);
    quitButton.setOrigin(0.5);
    quitButton.setInteractive();
    quitButton.on("pointerup",  this.quitGame, this);
  }

  update() {
   
  }

  startGame() {
    // Code pour démarrer le jeu lorsque le bouton "JOUER" est cliqué
    this.scene.start("Game");
  }

  quitGame() {
    // Code pour quitter le jeu lorsque le bouton "QUITTER" est cliqué
    window.close();
  }
}


class Game extends Phaser.Scene{

    constructor(){
      super({ key: "Game"});
      
    }

    preload()
    {
      
      this.load.image("tiles", "src/asset/TILESET.jpg");

      this.load.tilemapTiledJSON("carte", "src/asset/1stMap.json");
    
      this.load.image("RedBase", "src/asset/RedBase.png");
    
      this.load.image("cursor", "src/asset/cursor.png");
      
      this.load.image("NeutralTown", 'src/asset/neutralTown.png');
    
      this.load.image("RedTown", "src/asset/RedTown.png");
    
      this.load.image("BlueTown", "src/asset/blueTown.png");
      
      this.load.image("BlueBase", "src/asset/BlueBase.png");

      this.load.spritesheet("RedBasouka", "src/asset/RedBasouka.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });

      this.load.spritesheet("BlueBasouka", "src/asset/BlueBasouka.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });

      this.load.spritesheet("RedLightTank", "src/asset/RedLightTank.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });

      this.load.spritesheet("BlueLightTank", "src/asset/BlueLightTank.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });

      this.load.spritesheet("RedMainInfentery", "src/asset/MainInfenteryStyleSheet.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });
    
      this.load.spritesheet("BlueMainInfentery", "src/asset/BlueMainInfentery.png", {
        frameWidth: 16,
        frameHeight: 16,
        spacing: 1,
      });
    }

    create()
    {

      InitialisationGame();
    

      scene = this;


      var map = this.make.tilemap({ key: "carte" });
      var tiles = map.addTilesetImage("MainAssetForMap", "tiles");
    
      var layer = map.createLayer("Map", tiles);

      var tilesGroud = layer.layer.data;

      console.log()
      for (var y = 0; y < 10; y++) {
        MapTilesIndice[y] = [];
        for (var x = 0; x < 20; x++) {
          var tileIndex = tilesGroud[y][x].index;
          MapTilesIndice[y][x] = tileIndex
        }
      }
      
      console.log(MapTilesIndice[0][10])
    
      var cursor = this.add.image(16, 16, "cursor");
      cursor.setDepth(3);
      SpriteCursor = cursor;
    
     
    
    
      //RED TOWN######################################
      var RedBaseImage = this.add.image(24, 80, "RedBase");
      var SpriteAddTab = new Sprite(RedBase.id, "Red", RedBaseImage);
    
    
      SpriteRedTown.push(SpriteAddTab);
    
    
      //Neutral TOWN######################################
      var neutralTown1 = this.add.image(24, 135, "NeutralTown");
      
      var SpriteAddTab = new Sprite(NeutralTown1.id, "Neutral", neutralTown1);
      SpriteNeutralTown.push(SpriteAddTab);
      
      //BLUE TOWN######################################
      var BlueBase1 = this.add.image(BlueBase.xposition * 16 + 8, BlueBase.yposition * 16, "BlueBase");
      var blueTown1 = this.add.image(BlueTown1.xposition * 16 + 8, BlueTown1.yposition * 16 + 7, "BlueTown");
    
     
      var SpriteAddTab = new Sprite(BlueBase.id, "Blue", BlueBase1);
      SpriteBlueTown.push(SpriteAddTab);
      var SpriteAddTab = new Sprite(BlueTown1.id, "Blue", blueTown1);
       SpriteBlueTown.push(SpriteAddTab);
    
      
    
    
      
    
      var InfoBulle = this.add.text(50, 50, {font : '16px Arial', fill: "#ffffff"});
      InfoBulle.setVisible(false);
      InfoBulle.setStyle({ fontSize: '9px', backgroundColor: '#202020' });
    
      var TurnRed = this.add.text(50, 50, {font : '16px Arial', fill: "#ffffff"});
      TurnRed.setVisible(true);
      TurnRed.setStyle({ fontSize: '9px'});

      
      TurnRed.setText("Turn Red !");
      TurnRed.setPosition(1, 159);
    
      var TurnBlue = this.add.text(50, 50, {font : '16px Arial', fill: "#ffffff"});
      TurnBlue.setVisible(false);
      TurnBlue.setStyle({ fontSize: '9px'});

      
      TurnBlue.setText("Turn Blue !");
      TurnBlue.setPosition(1, 159);

      InfobulleAttack = this.add.text(50, 50, {font : '16px Arial', fill: "#ffffff"});
      InfobulleAttack.setVisible(true);
      InfobulleAttack.setStyle({ fontSize: '9px'});

      InfobulleAttack.setText("HP ATTACK = " + "    " + "HP DEFENCE = ");
      InfobulleAttack.setPosition(70, 159);

      infobulleUnitySelected = this.add.text(50, 50,{font : '16px Arial', fill: "#ffffff"} )
      infobulleUnitySelected.setVisible(true);
      infobulleUnitySelected.setStyle({ fontSize: '9px'});

      infobulleUnitySelected.setText("TYPE = " + "   " + "HP = " + "   " + "MOUVEMENT = ")
      infobulleUnitySelected.setPosition(1, 168);
    
      //ZOOM ###################################################################
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      var ZOOM = this.cameras.main;
    
      ZOOM.setZoom(Zoom);
    
    
    
    
    
    
    
      this.anims.create({
        key: 'RedMainInfenteryAnim',
        frames: this.anims.generateFrameNumbers('RedMainInfentery', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });
    
      this.anims.create({
        key: 'BlueMainInfenteryAnim',
        frames: this.anims.generateFrameNumbers('BlueMainInfentery', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });

      this.anims.create({
        key: 'RedBasoukaAnim',
        frames: this.anims.generateFrameNumbers('RedBasouka', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });

      this.anims.create({
        key: 'BlueBasoukaAnim',
        frames: this.anims.generateFrameNumbers('BlueBasouka', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });

      this.anims.create({
        key: 'RedLightTankAnim',
        frames: this.anims.generateFrameNumbers('RedLightTank', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });

      this.anims.create({
        key: 'BlueLightTankAnim',
        frames: this.anims.generateFrameNumbers('BlueLightTank', { start: 0, end: 2 }),
        frameRate: 5  ,
        repeat: -1
      });



    
      // Push Des Sprite Dans le Tab***************************************************************************************************
      var sprite = this.add.sprite(8, 8, 'RedMainInfentery');
      sprite.setDepth(2);
      var SpriteAddTab = new Sprite(maininfentery.id, "Red", sprite);
      TabSprite.push(SpriteAddTab);
    
      var BlueSprite = this.add.sprite(88, 8, 'BlueMainInfentery');
      BlueSprite.setDepth(2);
      var SpriteAddTab = new Sprite(BlueMainInfentery1.id, "Blue", BlueSprite);
      TabSprite.push(SpriteAddTab);

      console.log(BlueLightTank);
      var BlueLightTankSprite = this.add.sprite(BlueLightTank.xposition * 16 + 8  , BlueLightTank.yposition * 16 + 8  , 'BlueLightTank');
      BlueLightTankSprite.setDepth(2);
      var SpriteAddTab = new Sprite(BlueLightTank.id, "Blue", BlueLightTankSprite);
      TabSprite.push(SpriteAddTab);

      var RedLightTankSprite = this.add.sprite(RedLightTank.xposition * 16 + 8, RedLightTank.yposition * 16 + 8 , 'RedLightTank');
      RedLightTankSprite.setDepth(2);
      var SpriteAddTab = new Sprite(RedLightTank.id, "Red", RedLightTankSprite);
      TabSprite.push(SpriteAddTab);

      var BlueBazoukaSprite = this.add.sprite(BlueBazouka.xposition * 16 + 8  , BlueBazouka.yposition * 16 + 8  , 'BlueBasouka');
      BlueBazoukaSprite.setDepth(2);
      var SpriteAddTab = new Sprite(BlueBazouka.id, "Blue", BlueBazoukaSprite);
      TabSprite.push(SpriteAddTab);

      var RedBazoukaSprite = this.add.sprite(RedBazouka.xposition * 16 + 8, RedBazouka.yposition * 16 + 8 , 'RedBasouka');
      RedBazoukaSprite.setDepth(2);
      var SpriteAddTab = new Sprite(RedBazouka.id, "Red", RedBazoukaSprite);
      TabSprite.push(SpriteAddTab);

    
      //**************************************************************************************************************************** */
    
      // Play Anim***************************************************************************************************
      sprite.anims.play('RedMainInfenteryAnim');
      BlueSprite.anims.play('BlueMainInfenteryAnim');
      BlueLightTankSprite.play("BlueLightTankAnim");
      RedLightTankSprite.play("RedLightTankAnim");
      BlueBazoukaSprite.play("BlueBasoukaAnim");
      RedBazoukaSprite.play("RedBasoukaAnim");
    
    
      //**************************************************************************************************************************** */
    
      this.input.keyboard.on("keydown", function (event) {
        
        if(!Mouving)
        {
            if (event.key === "ArrowUp") {
              // Déplacer l'image vers le haut
              if(ycursorposition != 0)
              { 
                  cursorPositionTab[ycursorposition][xcursorposition] = 0;
                  cursor.y -= 16;
                  ycursorposition -= 1;
                  cursorPositionTab[ycursorposition][xcursorposition] = 1;
                
              }
            } else if (event.key === "ArrowDown") {
              // Déplacer l'image vers le bas
        
              if(ycursorposition != 9)
              {   
                  cursorPositionTab[ycursorposition][xcursorposition] = 0;
                  cursor.y += 16;
                  ycursorposition += 1;
                  cursorPositionTab[ycursorposition][xcursorposition] = 1;
              }
            } else if (event.key === "ArrowLeft") {
              // Déplacer l'image vers la gauche
              
              if(xcursorposition != 0)
              { 
                  cursorPositionTab[ycursorposition][xcursorposition] = 0;
                  cursor.x -= 16;
                  xcursorposition -= 1;
                  cursorPositionTab[ycursorposition][xcursorposition] = 1;
                  
              }
            } else if (event.key === "ArrowRight") {
              // Déplacer l'image vers la droite
              if(xcursorposition != 19)
              {   
                  cursorPositionTab[ycursorposition][xcursorposition] = 0;
                  cursor.x += 16;
                  xcursorposition += 1;
                  cursorPositionTab[ycursorposition][xcursorposition] = 1;
                  
              }
            }else if(event.key === "b")
            {
              if(armyPositionTab[ycursorposition][xcursorposition] != 0)
              {
                  ArmySelected = getArmySelected(armyPositionTab[ycursorposition][xcursorposition]);
                  infobulleUnitySelected.setText("TYPE = " + ArmySelected.type + "   " + "HP = " + ArmySelected.hp + "   " + "MOUVEMENT = " + ArmySelected.mouvement)
                  console.log(ArmySelected);
              }
            }else if(event.key === "n")
            {
              if(ArmySelected != null)
              { 
                if(ArmySelected.enableToPlay)
                {
                  deplacementInfentery(ArmySelected, getSprite(ArmySelected));
                  infobulleUnitySelected.setText("TYPE = " + ArmySelected.type + "   " + "HP = " + ArmySelected.hp + "   " + "MOUVEMENT = " + ArmySelected.mouvement)
                }
                
              }
            }else if(event.key === "v")
            {
              if(ArmySelected != null)
              {
                InfoBulle.setText('health : ' + ArmySelected.hp + 
                "\nAttack :  " + ArmySelected.attack +
                "\nDefence : " + ArmySelected.defence +
                "\nMouvement : " + ArmySelected.mouvement);
                InfoBulle.setPosition((8 + (ArmySelected.xposition) * 16) + 16, 8 + (ArmySelected.yposition - 1) * 16)
                InfoBulle.setVisible(true);
              }
            }else if(event.key === "c")
            {
              if(ArmySelected != null)
              { 
                if(ArmySelected.enableToPlay)
                    unityCapture(TownTabLocalisation[ycursorposition][xcursorposition]);
              }
            }else if(event.key === "t")
            {   
                
                ChangeTurn();
                ArmySelected = null;

                if(timeTurn == 0)
                {
                
                  TurnRed.setVisible(true);
                  TurnBlue.setVisible(false);
                }
                else
                {
                  TurnBlue.setVisible(true);
                  TurnRed.setVisible(false);
                }
              
            }else if(event.key === "a")
            {
              
              
              
              var defenceArmy = getUnity(armyPositionTab[ycursorposition][xcursorposition])
            
              if(defenceArmy != false)
              {   
                var check = VerifyTheProximityOfUnity(ArmySelected, defenceArmy);
                console.log(check);
                  if(check)
                  {
                      if(armyPositionTab[ycursorposition][xcursorposition] != 0)
                      {   
                        if(ArmySelected.enableToPlay)
                        {
                          UnityAttack(ArmySelected, defenceArmy);
                          infobulleUnitySelected.setText("TYPE = " + ArmySelected.type + "   " + "HP = " + ArmySelected.hp + "   " + "MOUVEMENT = " + ArmySelected.mouvement)
                        }
                           
                      }
                  }
                  else
                  {
                    console.log("Trop loin");
                  }
              }
              else
              {
                console.log("Case Vide");
              }
            }
          
          }
        });
    
    
      this.input.keyboard.on('keyup', function(event) {
        // Cache l'info-bulle lorsque la touche est relâchée
        InfoBulle.setVisible(false);
      });
      
      game.start();
    }
}

game.scene.add("Menu", Menu);
game.scene.add("Game", Game);
game.scene.add("GameOver", GameOver);


game.scene.start("Menu");



function InitialisationTab(tableau)
{
  for (var i = 0; i < 10; i++) {
    tableau[i] = [];
    for (var j = 0; j < 20; j++) {
      tableau[i][j] = 0;
    }
  }

  return tableau;
}

function InitInfenteryTab(InfenteryTab, tableau)
{
  for(let element of InfenteryTab)
  { 
    var xpositioArmy = element.xposition;
    var ypositionArmy = element.yposition;
    tableau[ypositionArmy][xpositioArmy] = element.id;
  }
    
  
}
function getArmySelected(id)
{ 
  for (let element of InfenteryTab) {
    if (element.id === id) {
        console.log(element);
        if(timeTurn == 0)
        {
          if(element.team == "Red")
            return element;
          else
            return null;
        }
        else
        {
          if(element.team == "Blue")
            return element;
          else
            return null;
        }
    }
  }
}

function getUnity(id)
{
  for (let element of InfenteryTab) {
    if (element.id === id) {
      return element;
    }
  }
  return false;

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deplacementInfentery(unitSelected, sprite)
{   
    Mouving = true;
    var oldXposition = unitSelected.xposition + 1;
    var oldYposition = unitSelected.yposition + 1;

    //calcule du nombre de case a ce déplacer

    var nbDeplacement = 0;

      //changer les coordoner interne de mon infentrie

      
      //chnager la position de l'infenterie dans la grille de l'infentery

      if(armyPositionTab[ycursorposition][xcursorposition] == 0)
      { 

        if(oldXposition - 1 < xcursorposition)
        {
            nbDeplacement += (xcursorposition - (oldXposition - 1));
        }
        else
        {
            nbDeplacement += ((oldXposition - 1) - xcursorposition);
        }

        if(oldYposition - 1 < ycursorposition)
        {
            nbDeplacement += (ycursorposition - (oldYposition - 1));
        }
        else
        {
            nbDeplacement += ((oldYposition - 1) - ycursorposition);
        }
        
        if(ArmySelected.checkMouvement(nbDeplacement))
        {
          unitSelected.MoveInfentery(xcursorposition, ycursorposition);
          armyPositionTab[oldYposition - 1][oldXposition - 1] = 0;
          armyPositionTab[ycursorposition][xcursorposition] = unitSelected.id;
          console.table(armyPositionTab);
          
          //faire bouger l'image petit a petit

          if(oldXposition < (xcursorposition + 1))
          { 
            console.log("ox < nx")
            console.log(xcursorposition + " : " + ycursorposition + " / " + oldXposition + " : " + oldYposition);
              while (oldXposition < xcursorposition + 1) {
                oldXposition ++;

                Xposition = 8 + (oldXposition - 1 ) * 16;
                Yposition = 8 + (oldYposition - 1) * 16;
                
                console.log(Xposition, Yposition);
                sprite.setPosition(Xposition , Yposition);
                await sleep(500); 
                
              }
          }
          else
          {
            if(oldXposition > xcursorposition + 1)
            { 
              console.log("ox > nx")
              while(oldXposition > xcursorposition + 1)
              {
                oldXposition -= 1;
                sprite.setPosition(8 + (oldXposition - 1 ) * 16, 8 + (oldYposition - 1) * 16);
                await sleep(500);
              }
            }
          }

          if(oldYposition < ycursorposition + 1)
          {   
            console.log("oy < ny")
            console.log(xcursorposition + " : " + ycursorposition + " / " + oldXposition + " : " + oldYposition);
              while (oldYposition < ycursorposition + 1) {
                oldYposition += 1;
                sprite.setPosition(8 + (oldXposition - 1 ) * 16, 8 + (oldYposition - 1) * 16);
                await sleep(500);
              }
          }
          else
          {
            if(oldYposition > ycursorposition + 1)
            {
              console.log("oy > ny")
              while(oldYposition > ycursorposition + 1)
              {
                oldYposition -= 1;
                sprite.setPosition(8 + (oldXposition - 1 ) * 16, 8 + (oldYposition - 1) * 16);
                await sleep(500);
              }
            
            }
          }
        }
      }
      else
      {

      }

      Mouving = false;
      
    
}

function unityCapture(idTown)
{   
  


    if(timeTurn == 0)
    {
        var TownCaptured = getTownCapturedForRed(idTown);

        if(ArmySelected.captureCapacity != 0)
        {
          captureEnd = TownCaptured.capture(Math.floor(ArmySelected.hp / 10));
        }
       
    
        if(captureEnd)
        {   
            console.log("Captured");
            
            if(idTown == 3)
            {
              var SpriteSearch = SearchSpriteBlueTown(idTown);
              SpriteSearch.sprite.setVisible(false);
              
              var RedBaseSprite2 = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16, "RedBase");
              console.log(RedBaseSprite2);
              RedBaseSprite2.setDepth(0);
              
              var RedBase2 = new Base(TownCaptured.id, "Red", 20, 10, TownCaptured.xposition, TownCaptured.yposition);

              var SpriteAddTab = new Sprite(TownCaptured.id, "Red", RedBaseSprite2);
              console.log(SpriteAddTab);
              SpriteBlueTown.splice(BlueTownVec.indexOf(TownCaptured), 1);
              
              SpriteRedTown.push(SpriteAddTab);

              BlueTownVec.splice(BlueTownVec.indexOf(TownCaptured), 1);

              RedTownVec.push(RedBase2);

              Winner = "Red";
              RedScore += 2000;

              if (RedScore > highScore) {
                console.log("coucou2");
                highScore = RedScore;
                updateScore();
              }
              
              game.scene.start("GameOver");
              game.scene.remove('Game');
            }
            else
            {
              if(TownCaptured.Team == "Blue")
              {
                var SpriteSearch = SearchSpriteBlueTown(idTown);
                SpriteSearch.sprite.setVisible(false);
  
                var RedTown2Sprite = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16 + 6, "RedTown");
                RedTown2Sprite.setDepth(0);
                
                var RedTown2 = new Base(TownCaptured.id, "Red", 20, 10, TownCaptured.xposition, TownCaptured.yposition);
  
                var SpriteAddTab = new Sprite(TownCaptured.id, "Red", RedTown2Sprite);

                SpriteBlueTown.splice(BlueTownVec.indexOf(TownCaptured), 1);
              
                SpriteRedTown.push(SpriteAddTab);
  
                BlueTownVec.splice(BlueTownVec.indexOf(TownCaptured), 1);
  
                RedTownVec.push(RedTown2);

                RedScore += 500;
  
              }
              else
              {

                var SpriteSearch = SearchSpriteNeutralTown(idTown);
                SpriteSearch.sprite.setVisible(false);
  
                var RedTown2Sprite = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16 + 6, "RedTown");
                RedTown2Sprite.setDepth(0);
                
                var BlueTown2 = new Base(TownCaptured.id, "Red", 20, 10, TownCaptured.xposition, TownCaptured.yposition);
  
                var SpriteAddTab = new Sprite(TownCaptured.id, "Red", RedTown2Sprite);

                SpriteNeutralTown.splice(NeutralTownVec.indexOf(TownCaptured), 1);
              
                SpriteRedTown.push(SpriteAddTab);
  
                NeutralTownVec.splice(NeutralTownVec.indexOf(TownCaptured), 1);
  
                RedTownVec.push(RedTown2);

                RedScore += 200;
  
              }

             
            }


        }
        else
        {
          console.log("capture");
        }
    }
    else
    {
        var TownCaptured = getTownCapturedForBlue(idTown);

        captureEnd = TownCaptured.capture(ArmySelected.captureCapacity);
    
        if(captureEnd)
        {   
            console.log("Captured");
            if(idTown == 2)
            {
              var SpriteSearch = SearchSpriteRedTown(idTown);
              SpriteSearch.sprite.setVisible(false);
              
              var BlueBaseSprite2 = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16, "BlueBase");
              
              BlueBaseSprite2.setDepth(0);
              
              var BlueBase2 = new Base(TownCaptured.id, "Blue", 20, 10, TownCaptured.xposition, TownCaptured.yposition);

              var SpriteAddTab = new Sprite(TownCaptured.id, "Blue", BlueBaseSprite2);
             
              SpriteRedTown.splice(RedTownVec.indexOf(TownCaptured), 1);
              
              SpriteBlueTown.push(SpriteAddTab);

              RedTownVec.splice(RedTownVec.indexOf(TownCaptured), 1);

              BlueTownVec.push(BlueBase2);

              Winner = "Blue";
              BlueScore += 2000;
              game.scene.start("GameOver");
              game.scene.remove('Game');
            }
            else
            {
              if(TownCaptured.Team == "Red")
              {
                var SpriteSearch = SearchSpriteRedTown(idTown);
                SpriteSearch.sprite.setVisible(false);
  
                var BlueTown2Sprite = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16 + 6, "BlueTown");
                BlueTown2Sprite.setDepth(0);
                
                var BlueTown2 = new Base(TownCaptured.id, "Blue", 20, 10, TownCaptured.xposition, TownCaptured.yposition);
  
                var SpriteAddTab = new Sprite(TownCaptured.id, "Blue", BlueTown2Sprite);



                SpriteRedTown.splice(RedTownVec.indexOf(TownCaptured), 1);
              
                SpriteBlueTown.push(SpriteAddTab);
  
                RedTownVec.splice(RedTownVec.indexOf(TownCaptured), 1);
  
                BlueTownVec.push(BlueTown2);

                BlueScore += 500;
  
              }
              else
              {

                var SpriteSearch = SearchSpriteNeutralTown(idTown);
                SpriteSearch.sprite.setVisible(false);
  
                var BlueTown2Sprite = scene.add.image(TownCaptured.xposition * 16 + 8, TownCaptured.yposition * 16 + 6, "BlueTown");
                BlueTown2Sprite.setDepth(0);
                
                var BlueTown2 = new Base(TownCaptured.id, "Blue", 20, 10, TownCaptured.xposition, TownCaptured.yposition);
  
                var SpriteAddTab = new Sprite(TownCaptured.id, "Blue", BlueTown2Sprite);

                SpriteNeutralTown.splice(NeutralTownVec.indexOf(TownCaptured), 1);
              
                SpriteBlueTown.push(SpriteAddTab);
  
                NeutralTownVec.splice(NeutralTownVec.indexOf(TownCaptured), 1);
  
                BlueTownVec.push(BlueTown2);

                BlueScore += 200;
  
              }

              console.log(SpriteNeutralTown);

              console.log(NeutralTownVec)

              console.log(SpriteBlueTown);

              console.log(BlueTownVec);
            }
        }
        else
        {
          console.log("capture");
        }    
    }
    ArmySelected.enableToPlay = false;
}

function getTownCapturedForRed(id)
{ 

  for (let element of NeutralTownVec) {
    if (element.id === id) {
      console.log(element);
      return element;
    }
  }

  for (let element of BlueTownVec) {
    if (element.id === id) {
      console.log(element);
      return element;
    }
  }
}

function getTownCapturedForBlue(id)
{ 

  for (let element of NeutralTownVec) {
    if (element.id === id) {
      console.log(element);
      return element;
    }
  }

  for (let element of RedTownVec) {
    if (element.id === id) {
      console.log(element);
      return element;
    }
  }
}

function getSprite(InfenterySelected)
{
  for(let element of TabSprite)
  {
    if(element.id == InfenterySelected.id)
      return element.sprite;
  }
}
function ChangeTurn()
{   
  console.log("ChnageTurn");
    ReloadMouvement();
    infobulleUnitySelected.setText("TYPE = " + "   " + "HP = " + "   " + "MOUVEMENT = ")
    if(timeTurn == 0)
    {
      setNewPositionForCursor(xcursorpositionBlue, ycursorpositionBlue);
      xcursorpositionRed = xcursorposition;
      ycursorpositionRed = ycursorposition;

      xcursorposition = xcursorpositionBlue;
      ycursorposition = ycursorpositionBlue;
     
      timeTurn = 1;
    }
    
    else 
    {
      setNewPositionForCursor(xcursorpositionRed, ycursorpositionRed);
      xcursorpositionBlue = xcursorposition;
      ycursorpositionBlue = ycursorposition;

      xcursorposition = xcursorpositionRed;
      ycursorposition = ycursorpositionRed;

      
      timeTurn = 0;
    }
     
}

function setNewPositionForCursor( xcursorpositionNewValue, ycursorpositionNewValue)
{
    SpriteCursor.setPosition(xcursorpositionNewValue * 16 + 16, ycursorpositionNewValue * 16 + 16);
    cursorPositionTab[ycursorposition][xcursorposition] = 0;
    cursorPositionTab[ycursorpositionNewValue][xcursorpositionNewValue] = 1;
    console.log(cursorPositionTab)
}

function ReloadMouvement()
{ 
  var teamToReload ;
  if(timeTurn == 0)
      teamToReload = "Red";
  else
      teamToReload = "Blue";
  for (let element of InfenteryTab) {
    if(element.team == teamToReload)
      element.reloadDeplacement();
  }
}

function UnityAttack(AttackUnity, defenceUnity)
{   

    var HpDefenserToDesplay;
    var HpAttackerToDesplay;
    var defenceOfGround = CalculateTheDefenceOfTheGround(defenceUnity);
    var puissanceDesAttaquant = AttackUnity.attack + (AttackUnity.multiplicateur * AttackUnity.hp);
    var degat = (puissanceDesAttaquant * 0.5 - defenceUnity.defence * 0.1) / defenceOfGround + 10;
    
    if(defenceUnity.isBlinde())
    { 
        console.log("IS BLINDE ! Def")
        degat *= AttackUnity.mutiplicateurAgainstArmor;
    }
    if(defenceUnity.isInfentry())
    {   
      console.log("IS Inf ! Def");
        degat *= AttackUnity.MultiplicatorAgainstInfetry;
    }
    
    defenceUnity.hp -= degat;

    defenceUnity.hp = Math.floor(defenceUnity.hp);

    if(!VerifyHpOfUnity(defenceUnity))
    { 
      HpDefenserToDesplay = defenceUnity.hp;
      var puissanceDesDefenseur = defenceUnity.attack + (defenceUnity.multiplicateur * defenceUnity.hp);
      defenceOfGround = CalculateTheDefenceOfTheGround(AttackUnity);
      var degat = (puissanceDesDefenseur * 0.2 - AttackUnity.defence * 0.1) / defenceOfGround + 10;
      
      if(AttackUnity.isBlinde())
      {   
        console.log("IS BLINDE ! AT")
          degat *= defenceUnity.mutiplicateurAgainstArmor;
      }
      if(AttackUnity.isInfentry())
      {
        console.log("IS Inf ! At");
          degat *= defenceUnity.MultiplicatorAgainstInfetry;
      }
    
      AttackUnity.hp -= degat;
  
      AttackUnity.hp = Math.floor(AttackUnity.hp);
  
      if(VerifyHpOfUnity(AttackUnity))
      {
        HpAttackerToDesplay = "DESTROYED";
        if(AttackUnity.type == "MainInfetry" )
        {
          if(AttackUnity.team = "Red")
              RedScore += 100;
          else
              BlueScore += 100;
        }else if(AttackUnity.type =="Bazouka" )
        {
          if(AttackUnity.team = "Red")
              RedScore += 150;
          else
              BlueScore += 150;
        }else
        {
          if(AttackUnity.team = "Red")
              RedScore += 300;
          else
              BlueScore += 300;
        }
      }
      else
      {
        HpAttackerToDesplay = AttackUnity.hp;
      }
    }
    else
    {
        HpDefenserToDesplay = "DESTROYED";
        if(defenceUnity.type == "MainInfetry" )
        {
          if(defenceUnity.team = "Blue")
              RedScore += 100;
          else
              BlueScore += 100;
        }else if(defenceUnity.type =="Bazouka" )
        {
          if(defenceUnity.team = "Blue")
              RedScore += 150;
          else
              BlueScore += 150;
        }else
        {
          if(defenceUnity.team = "Blue")
              RedScore += 300;
          else
              BlueScore += 300;
        }
        HpAttackerToDesplay = AttackUnity.hp;
    }
    console.log("BLUE =" + BlueScore + "RED = " + RedScore)

    InfobulleAttack.setText("HP ATTACK = " + HpAttackerToDesplay + "  " + "HP DEFENCE = " + HpDefenserToDesplay);

    AttackUnity.enableToPlay = false;

}

function VerifyHpOfUnity(UnityToCheck)
{
    if(UnityToCheck.hp <= 10)
    {
      var sprite = getSprite(UnityToCheck);
      sprite.destroy();

      armyPositionTab[UnityToCheck.yposition][UnityToCheck.xposition] = 0;

      console.table(armyPositionTab);

      InfenteryTab.splice((UnityToCheck.id - 1), 1);
      console.log(InfenteryTab);

      LookIfTheGameIsEnd();
      return true;

    }
    else
      return false;
}

function VerifyTheProximityOfUnity(AttackUnity, DefenceUnity)
{
    if(AttackUnity.xposition != (DefenceUnity.xposition - 1) && AttackUnity.xposition != (DefenceUnity.xposition + 1))
    { 
      
        if(AttackUnity.yposition != (DefenceUnity.yposition -1) && AttackUnity.yposition != (DefenceUnity.yposition + 1))
          return false;
        else return true;
    }
    else return true;
}

function SearchSpriteRedTown(idTown)
{
  for (let element of SpriteRedTown ) {
      if(element.id == idTown)
        return element;
  }
}

function SearchSpriteNeutralTown(idTown)
{
  for (let element of SpriteNeutralTown ) {
      if(element.id == idTown)
        return element;
  }
}

function SearchSpriteBlueTown(idTown)
{
  for (let element of SpriteBlueTown ) {
      if(element.id == idTown)
        return element;
  }
}

function LookIfTheGameIsEnd()
{
  var BlueTeamIsOver = false;
  var RedTeamIsOver = false;
  for (let element of InfenteryTab ) {
    console.log(element.team);  
      if(element.team == "Red")
        RedTeamIsOver = true;
      if(element.team == "Blue")
        BlueTeamIsOver = true;
      if(BlueTeamIsOver && RedTeamIsOver)
        break;
  }

  if(RedTeamIsOver == false)
  { 
    Winner = "Blue";
    game.scene.start("GameOver");
  }

  if(BlueTeamIsOver == false)
  {
    Winner = "Red";
    console.log("coucou");
    if (RedScore > highScore) {
      console.log("coucou2");
      highScore = RedScore;
      updateScore();
    }
    game.scene.start("GameOver");
  }
    
}

function CalculateTheDefenceOfTheGround(ArmyToCalulate)
{   
    var x = ArmyToCalulate.xposition
    var y = ArmyToCalulate.yposition
    var Ground = MapTilesIndice[y][x];
    console.log(Ground + " " + ArmyToCalulate.yposition + " " + ArmyToCalulate.xposition );
    if(Ground == FOREST)
    {
      return 1.5;
    }else if(Ground == PLAIN)
    {
      return 1;
    }else
    {
      return 1
    }
}

function getPB() {
  if (usernamePlayer != null) {
    fetch(
      "https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/getPB",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Advanced Wars",
          username: usernamePlayer,
        }),
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        highScore = data.score;
        
      })
      .catch((err) => {
        
      });
  } else {
    
  }
}

function updateScore() {
  console.log("update")
  if (usernamePlayer != null) {
    fetch(
      "https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/updateScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Advanced Wars",
          username: usernamePlayer,
          score: RedScore, 
        }),
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log("Update")
      })
      .catch((err) => {
        console.log("Error while get update score : ", err);
      });
  } else {
    
  }
}