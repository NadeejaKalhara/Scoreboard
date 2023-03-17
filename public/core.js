// Initialize Firebase
var $$ = function( id ) { return document.getElementById( id ); };

const firebaseConfig = {
    apiKey: "AIzaSyCcLv7qUiraxWQZAs2jqrzCtnjDneaG0zI",
    authDomain: "wontec-bc185.firebaseapp.com",
    databaseURL: "https://wontec-bc185-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wontec-bc185",
    storageBucket: "wontec-bc185.appspot.com",
    messagingSenderId: "1080716032663",
    appId: "1:1080716032663:web:5e454ec353a7495fa547d2"
  };
    firebase.initializeApp(firebaseConfig);
    //globals
mainmark = 0
mainouts = 0
    // Get a reference to the database
const database = firebase.database();

//Elements
const scorelabel = document.getElementById('mainscore');
const bat1 = document.getElementById('bat1');
const bat2 = document.getElementById('bat2');
const bowname = document.getElementById('bowname');

database.ref('scores/main/marks').on('value', snapshot => {
    const score = snapshot.val();
    mainmark = score;
    scorelabel.textContent = mainmark+"-"+mainouts;
  });

  database.ref('scores/main/out').on('value', snapshot => {
    const score = snapshot.val();
    mainouts = score;
    scorelabel.textContent = mainmark+"-"+mainouts;

    database.ref('player/bat1/name').on('value', snapshot => {
        bat1.textContent = snapshot.val();
      });
      database.ref('player/bat2/name').on('value', snapshot => {
        bat2.textContent = snapshot.val();
      });
      database.ref('player/bow/name').on('value', snapshot => {
        bowname.textContent = snapshot.val();
      });
      database.ref('stats/arrow').on('value', snapshot => {
        var arrn = snapshot.val()
        if (parseInt(arrn)==1){
togglearr(2)
        } else{
togglearr(1)

        }
      
      });
  });

  function togglearr(a){
if (a==1){
    $$('arr2').style.display = "none"
    $$('arr1').style.display = "block"

} else{
    $$('arr2').style.display = "block"
    $$('arr1').style.display = "none"
}
  }
 
