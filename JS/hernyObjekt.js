/*
Vsetky herne objekty maju spolocne ze musia obsahovat x, y, rozmery a texturu.
Rozhodol som sa ze hernyobjekt bude dedit metody od Widgetu pretoze potrebujem aby som animoval hru a taktiez mal informacie o stlacenych klavesach
*/
class HernyObjekt extends Widget{
    constructor(x, y, rozmery, textura){
      super(x, y);
      // Rozmery obrazku
      this.sirka =  rozmery;
      this.vyska =  rozmery;
      // TEXTURA
      this.obrazok = textura;
    }

    key(key) {
      this.onkey(key);

      // Send key message to other 
      this.notify("key", key)
    }

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
      this.onkoliziaObjekty(context); // kolizia objektov s hracom

      this.notify("kolizia", context); // zavolam ostatne herne objekty aby ju vykonali tiez
    }

    onkoliziaOkraje(){
      if(this.x > canvas.width - this.sirka/2){
        this.x = 0;
      }
      else if(this.x < 0)
        this.x = canvas.width - this.sirka/2;
      
      if(this.y > canvas.height - this.vyska/2)
        this.y = 0;
      
      else if(this.y < 0)
        this.y = canvas.height - this.vyska/2;
    }

    onkoliziaObjekty(context){}
  }
