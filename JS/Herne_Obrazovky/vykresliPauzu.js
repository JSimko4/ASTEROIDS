// FUNKCIA VYKRESLUJE PAUZU KED HRAC STLACI IKONKU PRE PAUZU
function vykresliPauzu(context){
    var vyska = 200*0.7;
    var sirka = 605*0.75;
    let napovedy = [
    'Červené asteroidy sú nebezpečné kvôli ich vysokej rýchlosti',
    '        Modré asteroidy sú z veľmi odolného materiálu',
    'Zlaté asteroidy pridávajú po zničení dvojnásobné skóre',
    'Zelený asteroid sa po zničení rozbije na 4 menšie asteroidy',
    '        Sivé asteroidy nemajú žiadne špeciálne vlastnosti',];
    let nahodnaNapoveda = Math.floor(Math.random() * 5); // nahodna napoveda od 0 do 4
  
    context.save();
    context.fillStyle = 'rgba(7, 2, 2, 0.3)'; // zatmavenie okolia
    context.fillRect(0,0,canvas.width, canvas.height,); // zatmavenie okolia
    context.drawImage(zapauzovanaHra, 444, 245, sirka, vyska); // presypacie hodiny v strede
    context.drawImage(UNpause, 1320,20,50,50); // prekreslim ikonku pauzy aby bola lepsie viditelna
    context.fillStyle = "black";
    context.font = "Bold 30px Charcoal";
    context.fillText("SKORE: " + game.skore, canvas.width/2.375, 40); // prekreslim skore aby ho bolo jasne vidiet aj pocas pauzy
    context.fillStyle = "white";
    context.font = "13.7px Charcoal";
    context.fillText(napovedy[nahodnaNapoveda], 560, 320);
    context.restore();
  }