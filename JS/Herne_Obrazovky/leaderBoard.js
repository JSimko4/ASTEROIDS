// Modifikovany bubblesort pre usporiadanie leaderboard hodnot
function bubbleSort(arr){
    for (var i = arr.length-1; i >= 0; i--){
      for(var j = 1; j <= i; j++){
        if(arr[j-1].skore < arr[j].skore){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    return arr;
  }
  
  // Nacita leaderboard hodnoty do arrayu game.leaderBoardSkore
  function nacitaj_Leaderboard(){
    game.leaderBoardSkore = []; // vyprazdnim array na leaderboard skore
    // nacitam vsetky skore z localstorage
    for(var i = 0; i < localStorage.length; i++){
      var vysokeSkore = {
        skore: 0,
        keyName: ""
      };
      vysokeSkore.keyName = localStorage.key(i);
      vysokeSkore.skore = parseInt(localStorage.getItem(vysokeSkore.keyName), 10);
      game.leaderBoardSkore[i] = vysokeSkore;
    }
  
    // usporiadam high skore
    bubbleSort(game.leaderBoardSkore);
  }