var $$ = function( id ) { return document.getElementById( id ); };
 toggleb = 1
 mainmark = 0
mainouts = 0
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
// Initialize Firebase
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
    const database = firebase.database();

function players(){
    database.ref('player/bat1/').set({
name:$$('player1choose').value
    })
    database.ref('player/bat2/').set({
        name:$$('player2choose').value
            })
            database.ref('player/bow/').set({
                name:$$('bowchoose').value
                    }).then(
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated players successfully'
                          })
                    )
}

function marksmain(){
    if ($$("mainscoretext").value!=''&&$$("mainouttext").value!=''){
        database.ref('scores/main/marks').transaction(score =>$$("mainscoretext").value);
        database.ref('scores/main/out').transaction(score =>$$("mainouttext").value).then(
            Toast.fire({
                icon: 'success',
                title: 'Updated main scores successfully'
              })
        );
    } else {
        Swal.fire(
            'Empty Fields',
            'Please fill all the fields',
            'error'
          )
    }
}
function togglebat(){
if  (toggleb ==1){
    toggleb = 2;
    database.ref('stats/arrow').transaction(score =>2);
} else{
    toggleb = 1;
    database.ref('stats/arrow').transaction(score =>1); 
}
}
database.ref('scores/main/marks').on('value', snapshot => {
    const score = snapshot.val();
    mainmark = score;
    scorelabel.textContent = mainmark+"-"+mainouts;
  });

  database.ref('scores/main/out').on('value', snapshot => {
    const score = snapshot.val();
    mainouts = score;
    scorelabel.textContent = mainmark+"-"+mainouts;  });

    function quickm(b){
        database.ref('scores/main/marks').transaction(score =>parseInt(score)+parseInt(b));
    }