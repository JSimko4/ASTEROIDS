class Widget extends Node {
  constructor(x, y, sirka, vyska, visible) {
    // Construct Node
    super();
    this.x = x;
    this.y = y;
    this.sirka = sirka;
    this.vyska = vyska;                                   // ak nechcem aby bol widget visible tak donho poslem false
    this.visible = visible != undefined ? visible : true; //ak chcem aby bol visible nebudem posielat nic -> undefined
  }

  // Tu sa vykonava hlavna slučka hry -> animacia hry
  animaciaHry(context) {
    if (!this.visible) return
    // Each widget contained in its parent
    context.save()
    // Draw
    this.ondraw(context)

    // Send draw event to other Widgets
    this.notify("animaciaHry", context)

    context.restore()
  }

  // Widget specific drawing
  ondraw(context) {}

  // Click handling
  click(point) {
    if (!this.visible) return

    // Call onclick function -> podmienka
    if(point.x > this.x && point.x < this.x + this.sirka &&
      point.y > this.y && point.y < this.y + this.vyska){
        this.onclick(point)
      }

    // Send click event to other Widgets
    this.notify("click", point)
  }

  onclick(point) {}

  // mouse move
  mouseMove(pointMove){
    // zistim ci som s kurzorom nad buttonom
    if(pointMove.x > this.x && pointMove.x < this.x + this.sirka &&
      pointMove.y > this.y && pointMove.y < this.y + this.vyska){
        this.hover = true;
      }
    else
      this.hover = false;

    this.onmouseMove(pointMove);

    // Send mousemove event to other Widgets
    this.notify("mouseMove", pointMove)
  }

  onmouseMove(pointMove){}

  // Keyboard handling
  key(key) {
    // Send key message to other Widgets
    this.notify("key", key)
  }

  onkey(key) {}
}
  
class Button extends Widget{
  constructor(x, y, sirka, vyska, farba, text, dlzkaSlov){
    super(x, y, sirka, vyska);
    this.x = x - sirka/2;
    this.y = y - vyska/2;
    this.farba = farba;
    this.prvotnaFarba = farba;
    this.text = text;
    this.dlzkaSlov = dlzkaSlov;
    this.hover = false;
    this.odKliknute = false;
  }

  ondraw(context) {
    context.strokeStyle = this.farba; // modry button
    context.strokeRect(this.x, this.y, this.sirka, this.vyska); // button v strede
    context.fillStyle = this.farba; // farba textu
    context.font = "Bold 30px Arial";
    context.fillText(this.text, this.x + this.dlzkaSlov, this.y + this.vyska/2 + 10); // play game

    this.specialnyHOVER(context); // specialny hover (LOD vedla textu)
  }

  specialnyHOVER(context){
    if (this.hover){
      context.drawImage(lodP, this.x - 80, this.y + 5, 70, 70);
    }
  }

  onclick(event) {
    this.action();
  }

  // default hover
  onmouseMove(){
    if(this.hover)
      this.farba = "white";
    else
      this.farba = this.prvotnaFarba;
  }
}