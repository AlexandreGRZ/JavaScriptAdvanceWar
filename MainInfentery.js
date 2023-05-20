class MainInfentery{

    constructor(type, hp, attack, defence,xposition, yposition)
    {
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.defence = defence;
        this.xposition = xposition;
        this.yposition = yposition;
    }

    greet()
    {
        console.log("MainInfentery : hp = ${this.hp} , attack = ${this.attack}, defence = ${this.defence}, xposition = ${this.xposition}, yposition = ${this.yposition}");
    }

}