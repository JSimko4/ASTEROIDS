class Lod extends HernyObjekt{
    constructor(x, y, rozmery, textura){
      super(x, y, rozmery, textura);
      this.r = rozmery/2;
      this.a = 0; // 90 stupnov na radiany -> 90 * Math.PI/180;

      // POHYB a RYCHLOST
      this.klavesy = [];
      this.rychlost = 0.65; // zrychlenie
      this.maxRychlost = 6;
  
      // Smooth spomalovanie a akceleracia na X/Y
      this.friction = 0.96;
      this.velY = 0;
      this.velX = 0;
  
      // OCHRANA PO SMRTI
      this.respawnProtection = 0;
    }
  
    // ovladanie lode a strelba
    onkey(key) {
      if(key.type === "keydown" && key.keyCode === 32)
        this.strelba(); // zavolam metodu strelania

      if(key.type === "keyup")
        this.klavesy[key.keyCode] = false;
      else
        this.klavesy[key.keyCode] = true;
    }
  
    // vykreslovanie a herna logika
    ondraw(context) {
      this.pohyb(); // vykonam pohyb
      this.kolizia(context); // vykonam koliziu objektov

      context.translate(this.x, this.y); // zaciatocny bod je v strede lodi
      context.rotate(this.a); // otocim lod podla nastaveneho uhla
      context.drawImage(this.obrazok, -(this.r), -(this.r), this.sirka, this.vyska); // nakreslim lod
    }
  
    onpohyb(context){
      // akceleracia
      if (this.klavesy[38] || this.klavesy[87]) {
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

        // otacanie lode
        if (this.klavesy[37] || this.klavesy[65]) {
            this.a -= 3.5 * Math.PI/180; // otocim lod o 3.5 stupna do lava
        }
        if (this.klavesy[39] || this.klavesy[68]) {
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
        if(asteroid instanceof Asteroid){ // testujem ci sa jedna fakt o asteroid (v game nodes mam aj hraca, buttony a projektily)
          if(vzdialenostBodov(this.x, this.y, asteroid.x+asteroid.sirka/2, asteroid.y+asteroid.sirka/2) < this.sirka/2.75 + asteroid.sirka/2.15){
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
      game.herneZvuky(3); // strata zivota
      // restartujem poziciu hraca na X a Y a jeho aktualnu rychlost
      this.x = canvas.width/2 - rozmeryLode/2;
      this.y = canvas.height/2 + rozmeryLode;
      this.velX = 0;
      this.velY = 0;
      this.a = 0;

      game.pocetZivotov--; // znizim poceet zivotov
      this.respawnProtection = 160; // ochrana hraca pred koliziu na priblizne 2 sekundy
    }

    strelba(){
      var strelaX, strelaY, strelaVX, strelaVY;
      if(game.pocetProjektilov < 6){ // maximalny pocet projektilov je 6
        // Vlastnosti novo vytvoreneho projektilu
        strelaX = this.x + 4/3 * this.r * Math.sin(this.a);
        strelaY = this.y - 4/3 * this.r * Math.cos(this.a);
        strelaVX = PROJEKTIL_RYCHLOST * Math.sin(this.a);
        strelaVY = PROJEKTIL_RYCHLOST * Math.cos(this.a);

        // vytvorim projektil a vlozim ho do hry
        game.add(new Projektil(strelaX,strelaY,strelaVX,strelaVY,10));
        game.pocetProjektilov++;
      }
    }
  }