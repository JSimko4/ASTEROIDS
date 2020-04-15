// V tomto arrayi su ulozene vsetky zvuky hry
var gameAudio = new Array(); // INDEXY: 0 - HUDBA, 1 - EXPLOZIA, 2 - SMRT, 3 - STRATA ZIVOTA, 4,5,6 - STRELBA

// HUDBA
gameAudio.push(new Audio('ZVUKY/HUDBA.mp3'));
gameAudio[0].loop = true; // aby hrala hudba dookola

// ZVUK PRE VYBUCH ASTEROIDOV / LODE / UFO
gameAudio.push(new Audio('ZVUKY/EXPLOZIA.mp3'));

// ZVUK KTORY SA PREHRA PRI SMRTI HRACA
gameAudio.push(new Audio('ZVUKY/SMRT.mp3'));

// ZVUK PRI STRATE ZIVOTE
gameAudio.push(new Audio('ZVUKY/ZIVOT_DOLE.mp3'));

// ZVUK PRE STRELBU LODE
gameAudio.push(new Audio('ZVUKY/STRELBA1.mp3'));
gameAudio.push(new Audio('ZVUKY/STRELBA2.mp3'));
gameAudio.push(new Audio('ZVUKY/STRELBA3.mp3'));
