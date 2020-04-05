  // Po nacitani stranky vytvorim CANVAS
  window.onload = function(){
  canvas = document.createElement("CANVAS");      // vytvorim canvas
  document.body.appendChild(canvas);              // vlozim canvas do HTML
  canvas.width = window.innerWidth * 0.90;        // sirka canvas
  canvas.height = window.innerHeight * 0.95;      // vyska canvas
  c = canvas.getContext('2d');

  // Vytvorim main menu a vykreslim ho
  var aktualneMENU = new Menu("PLAY GAME", 1);
  }