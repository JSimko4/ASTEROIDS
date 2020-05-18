// OBRAZOVKA KTORA SA ZOBRAZUJE MEDZI JEDNOTLIVY LEVELMI
function nextLevelScreen(level){
    var aktualny_node, predchadzajuciCas = game.dalsiLevelCas, zaKolkoSekundPrejdeny = 0;
    for(var i = 0; i < game.nodes.length; i++){
      aktualny_node = game.nodes[i];
  
      // Najdem hraca a resetujem jeho poziciu (Hladam ho pretoze v game nodes mam aj projektily a ine...)
      if(aktualny_node instanceof Lod){
        // restartujem poziciu hraca na X, Y, uhol a jeho aktualnu rychlost
        aktualny_node.x = canvas.width/2 - rozmeryLode/2;
        aktualny_node.y = canvas.height/2 + rozmeryLode;
        aktualny_node.velX = 0;
        aktualny_node.velY = 0;
        aktualny_node.a = 0;
      }
  
      // Ak su na obrazovke nejake explozie tak ich vymazem
      else if(aktualny_node instanceof Explozia)
        game.remove(aktualny_node);
  
      else if(aktualny_node instanceof Projektil){
        game.remove(aktualny_node);
        game.pocetProjektilov--;
      }
    }
    game.dalsiLevelCas = new Date();
    game.dalsiLevel = true;
    zaKolkoSekundPrejdeny = (game.dalsiLevelCas-predchadzajuciCas)/1000;
    game.celkovaDlzkaHry += zaKolkoSekundPrejdeny;
  
    game.context.save();
    game.context.fillStyle =  "black";
    game.context.fillRect(0,0,canvas.width, canvas.height);
    game.context.fillStyle = "white";
    game.context.font = "Bold 30px Charcoal";
    game.context.fillText("Level " + (level-1) + " bol dokonceny za " + zaKolkoSekundPrejdeny.toFixed(2) + "s!", (canvas.width/2)-235, 210);
    game.context.font = "Bold 50px Charcoal";
    game.context.fillStyle = "green";
    game.context.fillText("NASLEDUJE LEVEL " + level, (canvas.width/2)-280, 310);
    game.context.font = "Bold 22px Charcoal";
    game.context.fillStyle = "white";
    game.context.fillText("Doba prezita vo vesmire: " + game.celkovaDlzkaHry.toFixed(2) + "s", 13, 30);
    game.context.restore();
  }