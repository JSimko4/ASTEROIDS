// Simple application abstraction
class Game extends Widget {
    constructor(element) {
      var canvas = window.document.getElementById(element)
      var context = canvas.getContext("2d")
      canvas.width = 1400;        // sirka canvas
      canvas.height = 690;      // vyska canvas
      super(0, 0, canvas.width, canvas.height)
      this.canvas = canvas
      this.context = context

      this.gameLoop;               // gameloop interval
      this.skore = 0;             // skore hráča
      this.mute = false;          // vypnutie / zapnutie audia 
      this.pocetZivotov = 3;     // pocet zivotov hraca
      this.pocetProjektilov = 0; // pocet projektilov vystrelenych z lode
      this.pocetAsteroidov = 0;

      this.pause = false;      // kontrolovanie pauzy v hre
      
      this.level = 1;             // aktualny level
      this.zvolenaObtiaznost = 2; // 1 - lahka, 2 stredna, 3 tazka

      this.leaderBoardSkore = []; // ulozene usporiadane leaderboard skore
    }

    // funkcia na prehravanie game audia
    // INDEXY: 1 - EXPLOZIA, 2 - SMRT, 3 - STRATA ZIVOTA, 4,5,6 - STRELBA
    herneZvuky(index){
      if(!this.mute) // pozeram sa ci nie je audio mutnute
        gameAudio[index].cloneNode(true).play(); // fix na to aby som mohol mat aj viac vybuchov asteroidov naraz
    }
  
    // Redefine draw
    ondraw(context) {
        context.drawImage(pozadieMainMenu, 0, 0, canvas.width, canvas.height);
    }
  
    // Redraw everything
    update() {
      if(!this.pause){ // ak hra nie je zapauzovana tak hra vykresluje vsetky objekty, vykonava pohyb atd..
        this.animaciaHry(this.context);
      }
    }
  
    // Initialize application handlers
    start() {
      var game = this;
  
      // Register mouse handler
      window.onclick = function (event) {
        var point = {
          x: event.layerX,
          y: event.layerY,
        }
        // Send click message
        game.click(point)
      }
  
      // Register keyb handler
      window.onkeydown = function (event) {
        // Send key message
        game.key(event)
      }

      window.onkeyup = function (event) {
        // Send key message
        game.key(event)
      }

      // register onmousemove
      window.onmousemove = function(event){
        var pointMove = {
          x: event.layerX,
          y: event.layerY,
        }

        game.mouseMove(pointMove);
      }
  
      // HLAVNY CYKLUS
      game.gameLoop = setInterval(function () {
        game.update()
      }, 1000 / 80)
    }
  }