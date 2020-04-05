
  // OVLADANIE
  document.addEventListener("keydown", function (e) {
    klavesy[e.keyCode] = true;
  });
  document.addEventListener("keyup", function (e) {
    klavesy[e.keyCode] = false;
  });

  // Ked kliknem zavolam funkciu ktora zisti ci sa nachadzam v buttone alebo nie
  document.addEventListener('click', function(event){
    var ktoryButton = jeVButtone(event);

    if (ktoryButton == 1) // start game button
      gameLoop();

    else if(ktoryButton == 2){ // instrukcie button
      buttony.splice(0,2);
      c.drawImage(instrukcie, 0, 0, canvas.width, canvas.height);
      krizik = new Button(30, 30, 50, 50, "red", "X", 15);
      krizik.draw();
    }

    else if(ktoryButton == 3){ // krizik
      aktualneMENU = new Menu("PLAY GAME", 1);
    }
  });

  // Zistuje v ktorom buttone sa nachadzam pri kliknuti
  function jeVButtone(event){
    rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    // START GAME BUTTON / GAME OVER BUTTON
    if(buttony[0] != undefined){ // ked zacnem hru tak vymazem play game button z arraya
      if( x > buttony[0].x && x < buttony[0].x + buttony[0].sirka &&
          y > buttony[0].y && y < buttony[0].y + buttony[0].vyska){
            return 1;
      }
    }

    if(buttony[1] != undefined){ // ked zacnem hru tak vymazem play game button z arraya
        if( x > buttony[1].x && x < buttony[1].x + buttony[1].sirka &&
            y > buttony[1].y && y < buttony[1].y + buttony[1].vyska){
              return 2;
        }
      }

    if(krizik != undefined){ // ked zacnem hru tak vymazem play game button z arraya
      if( x > krizik.x && x < krizik.x + krizik.sirka &&
          y > krizik.y && y < krizik.y + krizik.vyska){
            return 3;
      }
    }

    else // undefined buttony
      return 0;
}


var poziciaMysi;
// prenasanie objektov
document.addEventListener('mousedown', function(event){
  if(canvas != undefined)
    poziciaMysi = zistiXYMysi();

  if(asteroidy.length > 0){
    for(var i = 0; i < pocetAsteroidov; i++){
      if(poziciaMysi.x <= asteroidy[i].x + rozmeryVelkyAsteroid && poziciaMysi.x >= asteroidy[i].x &&
         poziciaMysi.y <= asteroidy[i].y + rozmeryVelkyAsteroid && poziciaMysi.y >= asteroidy[i].y ){
           presuvam = true;
           presuvanyObjektX = asteroidy[i];
      }
    }
  }
});

window.addEventListener('mouseup', function(event){
  if (presuvam === true) {
    presuvam = false;
  }
});

window.addEventListener('mousemove', function(event){
  if(canvas != undefined)
    poziciaMysi = zistiXYMysi();
  
  if (presuvam === true){
    presuvanyObjektX.nakresli();
    presuvanyObjektX.x = poziciaMysi.x - rozmeryVelkyAsteroid/2;
    presuvanyObjektX.y = poziciaMysi.y - rozmeryVelkyAsteroid/2;
  }
});

function zistiXYMysi(){
  var rect = canvas.getBoundingClientRect();
  var mysX = event.clientX - rect.left;
  var mysY = event.clientY - rect.top;

  return{
    x: mysX = event.clientX - rect.left,
    y: mysY = event.clientY - rect.top
  }
}