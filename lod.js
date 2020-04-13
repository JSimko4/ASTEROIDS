class Lod extends HernyObjekt{
    constructor(x, y, rozmery, textura){
      super(x, y, rozmery, textura);
      // radius
      this.r = rozmery/2;
      this.a = 0; // 90 stupnov na radiany -> 90 * Math.PI/180;
      // POHYB a RYCHLOST
      this.klavesy = [];
      this.rychlost = 0.8;
      this.maxRychlost = 4.5;
  
      // Smooth spomalovanie a akceleracia na X/Y
      this.friction = 0.985;
      this.velY = 0;
      this.velX = 0;
  
      // OCHRANA PO UMRTI
      this.respawnProtection = 0;
    }
  
    // ovladanie lode
    onkey(key) {
      if(key.type === "keyup")
        this.klavesy[key.keyCode] = false;
      else
        this.klavesy[key.keyCode] = true;
    }
  
    // vykreslovanie
    ondraw(context) {
      this.onpohyb();
      this.kolizia(context);
  
      context.translate(this.x, this.y); // zaciatocny bod je v strede lodi
      context.rotate(this.a); // otocim lod podla nastaveneho uhla
      context.drawImage(this.obrazok, -(this.r), -(this.r), this.sirka, this.vyska); // nakreslim lod
    }
  
    onpohyb(context){
      // akceleracia
      if (this.klavesy[38]) {
        if (this.velY > -this.maxRychlost && this.velX > -this.maxRychlost &&
          this.velY < this.maxRychlost && this.velX < this.maxRychlost ){
          this.velY -= this.rychlost * Math.cos(this.a);
          this.velX += this.rychlost * Math.sin(this.a);
          if(this.respawnProtection > 0)
            this.obrazok = lodP_O; // textura lode je v bubline(ochrana) + v pohybe
          else
          this.obrazok = lodP; // textura lode ma za sebou plamene -> hybe sa
        }
       }
       // lod prave nie je v pohybe
       else{
        if(this.respawnProtection > 0)
          this.obrazok = lodN_O; // lod je v bubline(ochrana) + v neutralnej pozicii
        else
          this.obrazok = lodN; // textura lode ma vyzor lode v neutralnej pozicii
       }
  
       //spomalenie -> UPRAVIT
        if (this.klavesy[40]) {
            this.velY = 0;
            this.velX = 0;
        }
  
        // otacanie lode
        if (this.klavesy[37]) {
            this.a -= 3.5 * Math.PI/180; // otocim lod o 3.5 stupna do lava
        }
        if (this.klavesy[39]) {
            this.a += 3.5 * Math.PI/180; // otocim lod o 3.5 stupna do prava
      }
        this.velY *= this.friction;
        this.velX *= this.friction;
  
        this.y += this.velY;
        this.x += this.velX;
    }
  
    // kolizia s asteroidmi
    onkoliziaObjekty(context){
      if(this.respawnProtection > 0){ // ak hrac pred chvilou zomrel tak ma docasnu ochranu pred koliziou
        this.respawnProtection--;
        return;
      }
      
      var asteroid;
      for(var i = 0; i < game.nodes.length; i++){
        asteroid = game.nodes[i];
        if(asteroid instanceof Asteroid){ // testujem ci sa jedna fakt o asteroid (v game nodes mam aj hraca a buttony)
          if( (this.x + this.sirka/2.9 >= asteroid.x) && (this.x - this.sirka/2.9 <= asteroid.x + asteroid.sirka/1.35)  &&
              (this.y + this.vyska/2.75 >= asteroid.y) && (this.y - this.vyska/2.75 <= asteroid.y + asteroid.vyska/1.45) ){
            if(game.pocetZivotov == 0){
              gameOver();
              break;
            }
            else{
              this.respawn(context); // respawn hraca
              asteroid.znicenieADuplikacia(asteroid); // znicim asteroid, ktory sa rozdvoji na dalsie mini asteroidy
              break;
            }
          }
        }
      }
    }
  
      respawn(context){
        // restartujem poziciu hraca na X a Y a jeho aktualnu rychlost
        this.x = canvas.width/2 - rozmeryLode/2;
        this.y = canvas.height/2 + rozmeryLode;
        this.velX = 0;
        this.velY = 0;
        this.a = 0;
  
        game.pocetZivotov--; // znizim poceet zivotov
        this.respawnProtection = 160; // ochrana hraca pred koliziu na priblizne 2 sekundy
        game.herneZvuky(3); // strata zivota
      }
  }