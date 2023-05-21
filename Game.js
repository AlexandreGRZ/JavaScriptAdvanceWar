class MainInfentery{

  

  constructor(type, hp, attack, defence, captureCapacity,mouvement , team, multiplicateur, xposition, yposition)
  {   
      this.deplacement = 5;
      this.multiplicateur = multiplicateur
      this.type = type;
      this.hp = hp;
      this.attack = attack;
      this.defence = defence;
      this.captureCapacity = captureCapacity;
      this.mouvement = mouvement;
      this.xposition = xposition;
      this.yposition = yposition;
      this.team = team;
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
    this.mouvement = this.deplacement;
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
  height: 480,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

//si TimeTurn == 0 Alors équipe des rouges joue, si c'est 1 c'est au tour des bleus

var timeTurn = 0;

var ArmySelected = null;

var keyN;
var keyB;
var xcursorposition = 0;
var ycursorposition = 0;
var Zoom = 3;
var game = new Phaser.Game(config);
var neutraltown1;
var redtown1;

var cursorPositionTab = [];


//Sprite Unity ***************************************************************************************************************
var TabSprite = [];

//**************************************************************************************************************************** */


//Infentry Unity ***************************************************************************************************************
var maininfentery = new MainInfentery(1, 100, 20, 5, 10, 5,"Red" ,0.5, 0, 0);
var BlueMainInfentery1 = new MainInfentery(2, 100, 20, 5, 10, 5,"Blue",0.5, 5, 0);



var InfenteryTab = [];

InfenteryTab.push(maininfentery);
InfenteryTab.push(BlueMainInfentery1);

//**************************************************************************************************************************** */

//Town Unity ***************************************************************************************************************

var TownTabLocalisation = [];
TownTabLocalisation = InitialisationTab(TownTabLocalisation);

var RedTownVec = [];
var NeutralTownVec = [];
var BlueTownVec = [];


var NeutralTown1 = new Base(1, "Neutral", 20 , 10, 1, 8);
var RedBase = new Base(2, "Red", 20, 10, 1, 5);
var BlueBase = new Base(3, "Blue", 20, 10, 17, 4);
var BlueTown1 = new Base(4, "Blue", 20, 10, 18, 5);

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

console.table(TownTabLocalisation);




//**************************************************************************************************************************** */


//Town Unity ***************************************************************************************************************
var SpriteRedTown = [];

var SpriteNeutralTown = [];

var SpriteBlueTown = [];


//**************************************************************************************************************************** */
cursorPositionTab = InitialisationTab(cursorPositionTab);

var armyPositionTab = [];

armyPositionTab = InitialisationTab(armyPositionTab);
InitInfenteryTab(InfenteryTab, armyPositionTab);
console.log(armyPositionTab);


cursorPositionTab[0][0] = 1;

var scene;

var Mouving = false;

function preload() {
  this.load.image("tiles", "src/asset/TILESET.jpg");

  this.load.tilemapTiledJSON("carte", "src/asset/1stMap.json");

  this.load.image("RedBase", "src/asset/RedBase.png");

  this.load.image("cursor", "src/asset/cursor.png");
  
  this.load.image("NeutralTown", 'src/asset/neutralTown.png');

  this.load.image("RedTown", "src/asset/RedTown.png");

  this.load.image("BlueTown", "src/asset/blueTown.png");

  this.load.image("BlueBase", "src/asset/BlueBase.png");

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













function create() {

  scene = this;


  var map = this.make.tilemap({ key: "carte" });
  var tiles = map.addTilesetImage("MainAssetForMap", "tiles");

  var layer = map.createLayer("Map", tiles);

  var cursor = this.add.image(16, 16, "cursor");
  cursor.setDepth(3);

 


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

  // Push Des Sprite Dans le Tab***************************************************************************************************
  var sprite = this.add.sprite(8, 8, 'RedMainInfentery');
  sprite.setDepth(2);
  var SpriteAddTab = new Sprite(maininfentery.type, "Red", sprite);
  TabSprite.push(SpriteAddTab);

  var BlueSprite = this.add.sprite(88, 8, 'BlueMainInfentery');
  BlueSprite.setDepth(2);
  var SpriteAddTab = new Sprite(BlueMainInfentery1.type, "Blue", BlueSprite);
  TabSprite.push(SpriteAddTab);

  //**************************************************************************************************************************** */

  // Play Anim***************************************************************************************************
  sprite.anims.play('RedMainInfenteryAnim');
  BlueSprite.anims.play('BlueMainInfenteryAnim');


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
              console.log(ArmySelected);
          }
        }else if(event.key === "n")
        {
          if(ArmySelected != null)
          {
            deplacementInfentery(ArmySelected, getSprite(ArmySelected));
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
              unityCapture(TownTabLocalisation[ycursorposition][xcursorposition]);
          }
        }else if(event.key === "t")
        {
            ChangeTurn();
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
                      UnityAttack(ArmySelected, defenceArmy);
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

function update(time, delta) {
 
}

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
    tableau[ypositionArmy][xpositioArmy] = element.type;
  }
    
  
}
function getArmySelected(type)
{ 
  for (let element of InfenteryTab) {
    if (element.type === type) {
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

function getUnity(type)
{
  for (let element of InfenteryTab) {
    if (element.type === type) {
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
          armyPositionTab[ycursorposition][xcursorposition] = unitSelected.type;
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

        captureEnd = TownCaptured.capture(ArmySelected.captureCapacity);
    
        if(captureEnd)
        {   
            console.log("Captured");
            
            if(idTown == 3)
            {
                var SpriteSearch = SearchSpriteBlueTown(idTown);
                Sprite.sprite.setVisible(false);
            }
            else
            {

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

              var SpriteAddTab = new Sprite(TownCaptured.id, "Blue", BlueBase2);
              
              console.log(RedTownVec.indexOf(TownCaptured));
             
              SpriteRedTown.splice(RedTownVec.indexOf(TownCaptured), 1);
              
              SpriteBlueTown.push(SpriteAddTab);

              RedTownVec.splice(RedTownVec.indexOf(TownCaptured), 1);

              BlueTownVec.push(BlueBase2);
            }
            else
            {
              
            }
        }
        else
        {
          console.log("capture");
        }
    }


   
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
    if(element.id == InfenterySelected.type)
      return element.sprite;
  }
}
function ChangeTurn()
{   
  console.log("ChnageTurn");
    ReloadMouvement();
    if(timeTurn == 0)
      timeTurn = 1;
    else 
      timeTurn = 0;
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
    var puissanceDesAttaquant = AttackUnity.attack + (AttackUnity.multiplicateur * AttackUnity.hp);
    var degat = (puissanceDesAttaquant * 0.5 - defenceUnity.defence * 0.2) + 10;
    defenceUnity.hp -= degat;

    defenceUnity.hp = Math.floor(defenceUnity.hp);

    if(!VerifyHpOfUnity(defenceUnity))
    {
      var puissanceDesDefenseur = defenceUnity.attack + (defenceUnity.multiplicateur * defenceUnity.hp);
      var degat = (puissanceDesDefenseur * 0.3 - AttackUnity.defence * 0.1) + 10;
      AttackUnity.hp -= degat;
  
      AttackUnity.hp = Math.floor(AttackUnity.hp);
  
      VerifyHpOfUnity(AttackUnity);
    }

}

function VerifyHpOfUnity(UnityToCheck)
{
    if(UnityToCheck.hp <= 10)
    {
      var sprite = getSprite(UnityToCheck);
      sprite.destroy();

      armyPositionTab[UnityToCheck.yposition][UnityToCheck.xposition] = 0;

      console.table(armyPositionTab);

      InfenteryTab.splice((UnityToCheck.type - 1), 1);
      console.log(InfenteryTab);

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