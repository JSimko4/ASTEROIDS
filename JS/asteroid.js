class Asteroid extends HernyObjekt{
    constructor(x, y, rychlostX, rychlostY, rozmery, textura, bolUzZniceny, skoreZaZnicenie, zelenyAsteroid, HP, farba){
      super(x, y, rozmery, textura);
      this.rychlostX = rychlostX;
      this.rychlostY = rychlostY;
      this.farba = farba;
      this.bolUzZniceny = bolUzZniceny;
      this.skoreZaZnicenie = skoreZaZnicenie;
      this.zelenyAsteroid = zelenyAsteroid;
      this.HP = HP;
    }
  
    onpohyb(){
      this.x += this.rychlostX;
      this.y += this.rychlostY;
    }
  
    znicenieADuplikacia(asteroid){
      let skoreZaZnicenie, HP = 0, farba, explosion = new Explozia(this.x,this.y,this.sirka*1.5,explozia_asteroidu);  // vytvori exploziu tam kde vybuchol asteroid
      skoreZaZnicenie = this.skoreZaZnicenie;
      farba = this.farba;
      
      if(farba == 2)
        HP = 2;

      game.add(explosion);
      game.herneZvuky(1);     // zvuk vybuchu
      game.skore += skoreZaZnicenie;  // pridam hracovi skore
      game.remove(asteroid);  // zničim asteroid
      game.pocetAsteroidov--; // znizim pocet asteroidov na hernej ploche

      // ak je tento asteroid zniceny po prvy krat tak sa rozbije na 2 menšie asteroidy
      if(!this.bolUzZniceny){
        // Ak je to zeleny asteroid tak sa rozbije na 4 mensie
        if(this.zelenyAsteroid){
          game.add(new Asteroid(this.x-rozmeryMensiAsteroid, this.y-rozmeryMensiAsteroid, -this.rychlostX*1.2, -this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.add(new Asteroid(this.x+rozmeryMensiAsteroid, this.y+rozmeryMensiAsteroid, this.rychlostX*1.2, this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.add(new Asteroid(this.x-rozmeryMensiAsteroid, this.y+rozmeryMensiAsteroid, -this.rychlostX*1.2, this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.add(new Asteroid(this.x+rozmeryMensiAsteroid, this.y-rozmeryMensiAsteroid, this.rychlostX*1.2, -this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.pocetAsteroidov += 4;
        }
        else{
          game.add(new Asteroid(this.x-rozmeryMensiAsteroid, this.y-rozmeryMensiAsteroid, -this.rychlostX*1.2, -this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.add(new Asteroid(this.x+rozmeryMensiAsteroid, this.y+rozmeryMensiAsteroid, this.rychlostX*1.2, this.rychlostY*1.2, rozmeryMensiAsteroid, this.obrazok, true, skoreZaZnicenie, false, HP, farba));
          game.pocetAsteroidov += 2;
        }
      }

      // NEXT LEVEL
      if(game.pocetAsteroidov == 0){
        game.level++; // dalsi level
        nextLevel(game.level, game.zvolenaObtiaznost); // vytvorim dalsi level
      }
    }
  }
  