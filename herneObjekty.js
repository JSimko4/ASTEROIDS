// Vsetky herne objekty maju spolocne ze musia obsahovat x, y, rozmery a texturu.
class HerneObjekty extends Node{
    constructor(x, y, rozmery, textura){
      // POZICIA
      this.x = x;
      this.y = y;
      // Rozmery obrazku
      this.sirka =  rozmery;
      this.vyska =  rozmery;
      // TEXTURA
      this.obrazok = textura;
  
      // Funkcia na vykreslenie hernych objektov
      this.nakresli = function(){
        c.drawImage(this.obrazok, this.x, this.y, this.sirka, this.vyska);
      }
    }
  }
  
class Lod extends HerneObjekty{
  constructor(x, y, rozmery, textura){
    super(x, y, rozmery, textura);
    // POHYB a RYCHLOST
    this.rychlost = 1.6;
    this.maxRychlost = 8;
    this.friction = 0.96;
    this.velY = 0;
    this.velX = 0;

    this.pohyb = function(){
      if (klavesy[38]) {
        if (this.velY > -this.maxRychlost)
          this.velY-= this.rychlost
        this.obrazok = lodP;
       }
        if (klavesy[40]) {
          if (this.velY < this.maxRychlost)
            this.velY += this.rychlost;
        }
        if (klavesy[37]) {
          if (this.velX > -this.maxRychlost)
            this.velX -= this.rychlost;
        }
        if (klavesy[39]) {
          if (this.velX < this.maxRychlost)
            this.velX+= this.rychlost;
      }

        this.velY *= this.friction;
        this.y += this.velY;
    
        this.velX *= this.friction;
        this.x += this.velX;

        this.nakresli();
        this.obrazok = lodN;
    }

    this.kolizia = function(){
      if(this.x + this.sirka/2 <= 0 || this.x + this.sirka/2 >= canvas.width ||
         this.y + this.vyska/2 <= 0 || this.y + this.vyska/2 >= canvas.height){
        gameLoopBOOL = presuvam = false;
        asteroidy.splice(0, pocetAsteroidov);
      }
    }
  }
}
  
class Asteroid extends HerneObjekty{
  constructor(x, y, rozmery, textura){
    super(x, y, rozmery, textura);
  }
}