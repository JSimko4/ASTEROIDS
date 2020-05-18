 // FUNKCIA VYTVORI ASTEROIDY PRE DANY LEVEL
 function vytvorAsteroidy(level, obtiaznost){
    game.dalsiLevelCas = new Date(); // ulozim si kedy zacal tento level
    var asteroidy = [];
    var x, y, rychlostX, rychlostY, nahodnaFarba, skoreZaZnicenie, zelenyAsteroid, HP;
    for(var i = 0; i < level+(obtiaznost*2); i++){
      zelenyAsteroid = false;
      HP = 0;
      nahodnaFarba = Math.floor(Math.random() * 5); // vygenerujem nahodne cislo od 0 do 4 aby som vybral farbu asteroidu
      x = Math.random()*canvas.width;
      y = Math.random()*canvas.height;
      rychlostX = Math.random()*2.25;
      rychlostY = Math.random()*2.25;
      skoreZaZnicenie = 200;
  
      // SPECIALNE VLASTNOSTI ASTEROIDOV
      // 1 - Cerveny, 2 - Modry, 3 - Zeleny, 4 - Zlaty
      switch(nahodnaFarba){
        case 1:
          rychlostX += 1.6;
          rychlostY += 1.6;
          break;
        
        case 2:
          HP = 2;
          break;
  
        case 3:
          zelenyAsteroid = true;
          break;
  
        case 4:
          skoreZaZnicenie = 400;
          break;
      }
  
      // Osetrenie predtym aby sa asteroidy nespawnovali nad zaciatocnou poziciou hraca
      if(x - rozmeryVelkyAsteroid*2 <= canvas.width/2 + rozmeryLode && x + rozmeryVelkyAsteroid*2 >= canvas.width/2 - rozmeryLode &&
         y - rozmeryVelkyAsteroid*2 <= canvas.height/2 - rozmeryLode && y +rozmeryVelkyAsteroid*2 >= canvas.height/2 + rozmeryLode){
        i--;
        continue;
      }
  
      asteroidy[i] = new Asteroid(x, y, rychlostX,rychlostY, rozmeryVelkyAsteroid, texturyAsteroidov[nahodnaFarba], false, skoreZaZnicenie, zelenyAsteroid, HP,nahodnaFarba);
      game.pocetAsteroidov++;
      game.add(asteroidy[i]);
    }
  }