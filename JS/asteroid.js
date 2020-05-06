class Asteroid extends HernyObjekt{
    constructor(x, y, rychlostX, rychlostY, rozmery, textura, bolUzZniceny){
      super(x, y, rozmery, textura);
      this.rychlostX = rychlostX;
      this.rychlostY = rychlostY;
      this.bolUzZniceny = bolUzZniceny;
      this.cas = 0;
    }
  
    onpohyb(){
      this.x += this.rychlostX;
      this.y += this.rychlostY;
    }
  
    znicenieADuplikacia(asteroid){
      let explosion = new Explozia(this.x,this.y,this.sirka*1.5,explozia_asteroidu);  // vytvori exploziu tam kde vybuchol asteroid
      game.add(explosion);

      game.herneZvuky(1);     // zvuk vybuchu
      game.skore+=200;        // pridam hracovi skore
      game.remove(asteroid);  // zničim asteroid
      game.pocetAsteroidov--; // znizim pocet asteroidov na hernej ploche

      // ak je tento asteroid zniceny po prvy krat tak sa rozbije na 2 menšie asteroidy
      if(!this.bolUzZniceny){
        game.add(new Asteroid(this.x-rozmeryMensiAsteroid, this.y-rozmeryMensiAsteroid, -this.rychlostX*1.2, -this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true));
        game.add(new Asteroid(this.x+rozmeryMensiAsteroid, this.y+rozmeryMensiAsteroid, this.rychlostX*1.2, this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true));
        game.pocetAsteroidov += 2;
      }

      // NEXT LEVEL
      if(game.pocetAsteroidov == 0){
        game.level++; // dalsi level
        nextLevel(game.level, game.zvolenaObtiaznost); // vytvorim dalsi level
      }
    }
  }
  