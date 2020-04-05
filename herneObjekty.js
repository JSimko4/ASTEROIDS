// Vsetky herne objekty maju spolocne ze musia obsahovat x, y, rozmery a texturu.
class HerneObjekty{
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

class Menu{ // GAME OVER obrazovka a obrazkova hlavneho menu
  constructor(text, main){  // main == 1 - > vypis main menu
    c.fillStyle = "#0D0D0D"; // farba pozadia
    c.fillRect(0, 0, canvas.width, canvas.height); // cierne pozadie

    // vytvorim button -> PLAY GAME / GAME OVER
    buttony.push(new Button(canvas.width/2, canvas.height/3, 250, 80, "#2B26BF", text, 32));

    // ak vypisujem main menu tak vypisem aj dalsie buttony
    if(main)
      buttony.push(new Button(canvas.width/2, canvas.height/2, 250, 80, "#2B26BF", "INSTRUKCIE", 32));
    // ak vypisujem game over obrazokvu vypisem aj game over
    else{
      c.fillStyle = "red"; 
      c.fillText("GAME OVER", canvas.width/2 - 92, canvas.height/4.3);
    }

    // vykreslim button/y
    for(var i = 0; i < main+1; i++)
      buttony[i].draw();
  }
}
  
class Button{
  constructor(x, y, sirka, vyska, farba, text, dlzkaSlov){
    this.x = x - sirka/2;
    this.y = y - vyska/2;
    this.sirka = sirka;
    this.vyska = vyska;
    this.farba = farba;
    this.text = text;
    this.dlzkaSlov = dlzkaSlov;
    
    this.draw = function(){
      c.strokeStyle = this.farba; // cerveny button
      c.strokeRect(this.x, this.y, this.sirka, this.vyska); // button v strede

      c.fillStyle = this.farba; // farba textu
      c.font = "Bold 30px Arial";
      c.fillText(this.text, this.x + this.dlzkaSlov, this.y + this.vyska/2 + 10); // play game
    }
  }
}