  // ZAPNEM HRU
  function gameLoop(){
    gameLoopBOOL = true;
    buttony.splice(0,2); // vymazem buttony z main menu aby som tam mohol nahrat game over button
    vytvorObjekty();
    animacia();
    }
    
  // Vytvorim herne objekty
  function vytvorObjekty(){
    hrac = new Lod(canvas.width/2 - rozmeryLode, canvas.height-rozmeryLode*1.5, rozmeryLode, lodN);

    for(var i = 0; i < pocetAsteroidov; i++){
      var x = (Math.random() * canvas.width) - 128;
      var y = (Math.random() * canvas.height) - 128;

      asteroidy.push(new Asteroid(x, y, rozmeryVelkyAsteroid, asteroidS));
    }
  }

  // Animovanie hry a objektov
  function animacia(){
  if(gameLoopBOOL == false){
    aktualneMENU = new Menu("HRAT ZNOVA", 0);
    return;
  }
  
  requestAnimationFrame(animacia);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // nakresli pozadie
  c.drawImage(pozadie, 0, 0, canvas.width, canvas.height);

  // vykresluje kazdy z asteroidov
  for(var i = 0; i < pocetAsteroidov; i++){
    asteroidy[i].nakresli();
  }

  // vykresluje animaciu lode
  hrac.pohyb();

  // vypise text
  c.fillStyle = "black"; // farba textu
  c.font = "Bold 30px Arial";
  c.fillText("Asteroids", (canvas.width/2)-85, 40);

  hrac.kolizia();
  }