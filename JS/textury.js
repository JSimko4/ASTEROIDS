  // POZADIA
  var pozadie = new Image();
  pozadie.src = './GRAFIKA/POZADIE.jpg';  // Pozadie
  var pozadieMainMenu = new Image();
  pozadieMainMenu.src = './GRAFIKA/POZADIE-MAINMENU.jpg';  // Pozadie
  var instrukciePozadie = new Image();
  instrukciePozadie.src = './GRAFIKA/INSTRUKCIE.jpg';

  var vymazat = new Image(); // docasne pre leaderboard
  vymazat.src = './GRAFIKA/vymazat.jpg';

  // IKONKY
  var back = new Image();
  back.src = './GRAFIKA/IKONKY/back.png';
  var backWhite = new Image();
  backWhite.src = './GRAFIKA/IKONKY/back-white.png';
  var audioON = new Image();
  audioON.src = './GRAFIKA/IKONKY/AUDIO_ON.png';
  var audioOFF = new Image();
  audioOFF.src = './GRAFIKA/IKONKY/AUDIO_OFF.png';
  var musicON = new Image();
  musicON.src = './GRAFIKA/IKONKY/MUSIC_ON.png';
  var musicOFF = new Image();
  musicOFF.src = './GRAFIKA/IKONKY/MUSIC_OFF.png';

  var pause = new Image();
  pause.src = './GRAFIKA/IKONKY/PAUSE.png';
  var UNpause = new Image();
  UNpause.src = './GRAFIKA/IKONKY/UNPAUSE.png';

  var zapauzovanaHra = new Image();
  zapauzovanaHra.src = './GRAFIKA/zapauzovana_hra.png';

  var zivoty = new Image();
  zivoty.src = './GRAFIKA/IKONKY/ZIVOTY.png';

                 // HERNE OBJEKTY
  // TEXTURY HRACA - v pohybe / v neutralnej pozicii
  var lodN = new Image();       // Lod v neutralnej polohe
  var lodP = new Image();       // Lod v pohybe
  var lodN_O = new Image();     // lod pri respawn ochrane + v neutralnej pozicii
  var lodP_O = new Image();     // lod pri respawn ochrane + v pohybe
  lodN.src = './GRAFIKA/LOD/LOD.png';
  lodP.src = './GRAFIKA/LOD/LOD2.png';
  lodN_O.src = './GRAFIKA/LOD/LOD3.png';
  lodP_O.src = './GRAFIKA/LOD/LOD4.png';

  // TEXTURY VSETKYCH ASTEROIDOV V HRE
  texturyAsteroidov = new Array();
  for(var i = 0; i < 5; i++)
    texturyAsteroidov.push(new Image());
  // FARBY ASTEROIDOV PODLA INDEXOV: 0 - Sivy, 1 - Cerveny, 2 - Modry, 3 - Zeleny, 4 - Zlaty
  texturyAsteroidov[0].src = './GRAFIKA/ASTEROIDY/A-SIVY.png';
  texturyAsteroidov[1].src = './GRAFIKA/ASTEROIDY/A-CERVENY.png';
  texturyAsteroidov[2].src = './GRAFIKA/ASTEROIDY/A-MODRY.png';
  texturyAsteroidov[3].src = './GRAFIKA/ASTEROIDY/A-ZELENY.png';
  texturyAsteroidov[4].src = './GRAFIKA/ASTEROIDY/A-ZLATY.png';

  // EXPLOZIA
  var explozia_asteroidu = new Image();
  explozia_asteroidu.src = './GRAFIKA/VYBUCH.png';

  // KONSTANTY
  const rozmeryLode = 86;
  const rozmeryVelkyAsteroid = 120;
  const rozmeryMensiAsteroid = 60;
  const PROJEKTIL_RYCHLOST = 10.5;