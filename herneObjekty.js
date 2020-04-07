// Vsetky herne objekty maju spolocne ze musia obsahovat x, y, rozmery a texturu.
class HernyObjekt extends Widget{
    constructor(x, y, rozmery, textura){
      super(x, y);
      // Rozmery obrazku
      this.sirka =  rozmery;
      this.vyska =  rozmery;
      // TEXTURA
      this.obrazok = textura;
    }

    // Keyboard handling
    key(key) {
      this.onkey(key);

      // Send key message to other 
      this.notify("key", key)
    }

    // Widget specific drawing
    ondraw(context) {
      this.kolizia(context); // vykonam koliziu
      this.pohyb(context); // vykonam pohyb objektov
      context.drawImage(this.obrazok, this.x, this.y, this.sirka, this.vyska); // vykreslim
    }

    pohyb(context){
      this.onpohyb(context); // vykonam pohyb 
      
      this.notify("pohyb", context); // zavolam ostatne herne objekty aby sa pohli
    }

    onpohyb(context){}

    kolizia(context){
      this.onkoliziaOkraje(); // vykonam koliziu 
      
      this.notify("kolizia", context); // zavolam ostatne herne objekty aby ju vykonali tiez
    }

    onkoliziaOkraje(){
      if(this.x > canvas.width - this.sirka/2)
        this.x = 0;
      
      else if(this.x < 0)
        this.x = canvas.width - this.sirka/2;
      
      if(this.y > canvas.height - this.vyska/2)
        this.y = 0;
      
      else if(this.y < 0)
        this.y = canvas.height - this.vyska/2;
    }

    onkoliziaObjekty(){

    }
  }

class Lod extends HernyObjekt{
  constructor(x, y, rozmery, textura){
    super(x, y, rozmery, textura);
    // radius
    this.r = rozmery/2;
    this.a = 0; // 90 stupnov na radiany -> 90 * Math.PI/180;
    // POHYB a RYCHLOST
    this.rychlost = 0.8;
    this.maxRychlost = 4.5;

    this.friction = 0.985;
    this.velY = 0;
    this.velX = 0;
    this.klavesy = [];
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
        this.obrazok = lodP;
      }
     }

     /*spomalenie -> FIX
      if (this.klavesy[40]) {
        //if (this.velY < 0.1 && this.velX > 0.1){
          this.velY += this.rychlost * Math.cos(this.a);
          this.velX -= this.rychlost * Math.sin(this.a);
          this.obrazok = lodN;
        //}
      }*/

      // otacanie lode
      if (this.klavesy[37]) {
          this.a -= 3.8 * Math.PI/180; // otocim lod o 5 stupnov
      }
      if (this.klavesy[39]) {
          this.a += 3.8 * Math.PI/180; // otocim lod o 5 stupnov
    }
      this.velY *= this.friction;
      this.velX *= this.friction;

      this.y += this.velY;
      this.x += this.velX;
  }
}

class Asteroid extends HernyObjekt{
  constructor(x, y, rychlostX, rychlostY, rozmery, textura){
    super(x, y, rozmery, textura);
    this.rychlostX = rychlostX;
    this.rychlostY = rychlostY;
  }

  onpohyb(){
    this.x += this.rychlostX;
    this.y += this.rychlostY;
  }
}

