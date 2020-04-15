class Asteroid extends HernyObjekt{
    constructor(x, y, rychlostX, rychlostY, rozmery, textura, bolUzZniceny){
      super(x, y, rozmery, textura);
      this.rychlostX = rychlostX;
      this.rychlostY = rychlostY;
      this.bolUzZniceny = bolUzZniceny;
    }
  
    onpohyb(){
      this.x += this.rychlostX;
      this.y += this.rychlostY;
    }
  
    znicenieADuplikacia(asteroid){
      game.herneZvuky(1); // explozia
      game.skore+=200; // pridam hracovi skore
      game.remove(asteroid); // zničim asteroid
  
      // ak je tento asteroid zniceny po prvy krat tak sa rozbije na 2 menšie asteroidy
      if(!this.bolUzZniceny){
        game.add(new Asteroid(this.x-rozmeryMensiAsteroid, this.y-rozmeryMensiAsteroid, -this.rychlostX*1.2, -this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true));
        game.add(new Asteroid(this.x+rozmeryMensiAsteroid, this.y+rozmeryMensiAsteroid, this.rychlostX*1.2, this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true));
      }
    }
  }
  