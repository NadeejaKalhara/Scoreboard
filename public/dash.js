var $$ = function( id ) { return document.getElementById( id ); };
//variables
toggleb = 1
mainmark = 0
mainouts = 0
noteon = 0
nowbat = 1
over=0
ball=0
limit=6
alertl=0
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
    database.ref('player/bat1/').update({
name:$$('player1choose').value
    })
    database.ref('player/bat2/').update({
        name:$$('player2choose').value
            })
            database.ref('player/bow/').update({
                name:$$('bowchoose').value
                    }).then(
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated players successfully'
                          })
                    )
}

database.ref('stats/arrow').on('value', snapshot => {
    toggleb = parseInt(snapshot.val())
  });
database.ref('nowbat/schl').on('value', snapshot => {
    nowbat = parseInt(snapshot.val())
  });

database.ref('overs/count').on('value', snapshot => {
    over = parseInt(snapshot.val())
  });

  database.ref('overs/ball').on('value', snapshot => {
    ball = parseInt(snapshot.val())
  });
  
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
    database.ref('player/bat1/name').once('value', snapshot => {
        const rat1 = snapshot.val();
        Toast.fire({
            icon: 'success',
            title: rat1 + ' is now batting.'
          }) 
      })
  
} else{
    toggleb = 1;
    database.ref('stats/arrow').transaction(score =>1); 
    database.ref('player/bat2/name').once('value', snapshot => {
        const rat2 = snapshot.val();
        Toast.fire({
            icon: 'success',
            title: rat2 + ' is now batting.'
          }) 
      })
}
}
database.ref('scores/main/marks').on('value', snapshot => {
    const score = snapshot.val();
    mainmark = score;
    scorelabel.textContent = mainmark+"-"+mainouts;
    $$('mainscoretext').value = mainmark
    
  });

  database.ref('scores/main/out').on('value', snapshot => {
    const score = snapshot.val();
    mainouts = score;
    $$('mainouttext').value = mainouts
    scorelabel.textContent = mainmark+"-"+mainouts;  });

    function clrdots() {
        for (let i = 0; i < 9; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Reset dots successfully'
                  }) 
            )
            
        }   
        ball = 0
    }

    function quickm(b){
if(parseInt(b)==1||parseInt(b)==3){
    togglebat()
}
        
        database.ref('balls/'+bowler+'/balls').once('value', snapshot => {
            if(snapshot.val()==null){
                bowlerballs = 0
            }else{
                bowlerballs  = parseInt(snapshot.val())
            }
            database.ref('balls/'+bowler).update({
                balls:bowlerballs+1
            }); 

            database.ref('balls/'+bowler+'/score').once('value', snapshot => {
                if(snapshot.val()==null){
                    bowlermark = 0
                }else{
                    bowlermark  = parseInt(snapshot.val())
                }
                database.ref('balls/'+bowler).update({
                    score:bowlermark+parseInt(b)
                }); 
            })
        })

        database.ref('scores/main/marks').transaction(score =>parseInt(score)+parseInt(b));
        if(parseInt(b)==4){
            database.ref('notes/').update({
                pop:"4 FOUR"
            })
            database.ref('notes/').update({
                pop:"-"
            })
        } else{
            if(parseInt(b)==6){
                database.ref('notes/').update({
                    pop:"6 SIX"
                })
                database.ref('notes/').update({
                    pop:"-"
                })
            }
        }
    
      if(ball<(limit)){

        ball=ball+1;
        database.ref('overs/').update({
            ball:ball
        })
        $$('ballno').innerText = "Ball No: "+ ball
        console.log(ball+"ball")

        database.ref('scores/last/marks').update(JSON.parse('{"ball'+ball+'":"'+b+'"}'))
    } else{
        for (let i = 0; i < 9; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Next Over'
                  }) 
                  
            )
            togglebat()
        }
        //next over
        over= over+1
        limit=6
        database.ref('overs/').update({
            count:over
        })


        $$('ballno').innerText = "Ball No: 1"

        ball=1
        database.ref('overs/').update({
            ball:ball
        })
        database.ref('scores/last/marks').update(JSON.parse('{"ball1":"'+b+'"}'))
    }

    if(parseInt(toggleb)==2){

        database.ref('bats/'+batter1+'/balls').once('value', snapshot => {
            if(snapshot.val()==null){
                bat1balls = 0
            }else{
                bat1balls  = parseInt(snapshot.val())
            }
            database.ref('bats/'+batter1).update({
                balls:bat1balls+1
            }); 

            database.ref('bats/'+batter1+'/score').once('value', snapshot => {
                if(snapshot.val()==null){
                    bat1mark = 0
                }else{
                    bat1mark  = parseInt(snapshot.val())
                }
                database.ref('bats/'+batter1).update({
                    score:bat1mark+parseInt(b)
                }); 
            })
        })

  
       

    } else{
        database.ref('bats/'+batter2+'/score').once('value', snapshot => {
            if(snapshot.val()==null){
                bat2mark = 0
            }else{
                bat2mark  = parseInt(snapshot.val())
            }
            database.ref('bats/'+batter2).update({
                score:bat2mark+parseInt(b)
            }); 
            database.ref('bats/'+batter2+'/balls').once('value', snapshot => {
                if(snapshot.val()==null){
                    bat2balls = 0
                }else{
                    bat2balls  = parseInt(snapshot.val())
                }
                database.ref('bats/'+batter2).update({
                    balls:bat2balls+1
                }); 
            })
        
        })
    }
   
    

}

    function notice(){
       var note = document.getElementById("tempnote").value;
       database.ref('notice/head').update({
        msg:note
    }).then(
        Toast.fire({
            icon: 'success',
            title: 'Message Saved successfully'
          })
    )
}

function shownote(){
if (noteon==0){
    noteon=1;
    $$('notebtn').innerText = "SHOW";
    database.ref('notice/visible').update({
bool:1
    })
} else{
    noteon=0;
    $$('notebtn').innerText = "HIDE";
    database.ref('notice/visible').update({
bool:0
    }) 
}
}

function flagchange(){
if (nowbat==2){
    nowbat=1
    database.ref('nowbat/').update({
        schl:1
    }).then(
        Toast.fire({
            icon: 'success',
            title: 'Rahula College is Batting Now'
          }))
} else{
    nowbat=2
    database.ref('nowbat/').update({
        schl:2
    }).then(
        Toast.fire({
            icon: 'success',
            title: 'Pannipitiya Dharmapala is Batting Now'
          }))
}
}

function updateball(){
    if($$('ballc').value!=''){
        database.ref('overs/').update({
            ball:$$('ballc').value
        }).then(
            Toast.fire({
                icon: 'success',
                title: 'Updated Ball count'
              }) 
        )
        ball = parseInt($$('ballc').value)
    } else{
        Toast.fire({
            icon: 'error',
            title: 'Bad Input'
          })
    }
   
}


function updateover(){
    if($$('overc').value!=''){
        database.ref('overs/').update({
            count:$$('overc').value
        }).then(
            Toast.fire({
                icon: 'success',
                title: 'Updated Over'
              }) 
        )
        over = parseInt($$('overc').value)
    } else{
        Toast.fire({
            icon: 'error',
            title: 'Bad Input'
          })
    }
   
}

function wide (){
    function repwide(){
        if(ball<(limit)){
    
            ball=ball+1;
            database.ref('overs/').update({
                ball:ball
            })
            $$('ballno').innerText = "Ball No: "+ ball
            console.log(ball+"ball")
    
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+ball+'":"wd"}'))
        database.ref('scores/main/marks').transaction(score =>parseInt(score)+1);
    
        }
    }
if(limit==6){
    limit=7
    repwide()
} else{
    if(limit==7){
        limit=8
        repwide()
    }  else{
        alert("Max 2 dots")
    }
   

    
}
}

function noball (){
    function repwide(){
        if(ball<(limit)){
    
            ball=ball+1;
            database.ref('overs/').update({
                ball:ball
            })
            $$('ballno').innerText = "Ball No: "+ ball
            console.log(ball+"ball")
    
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+ball+'":"nb"}'))
        database.ref('scores/main/marks').transaction(score =>parseInt(score)+1);
    
        }
    }
if(limit==6){
    limit=7
    repwide()
} else{
    if(limit==7){
        limit=8
        repwide()
    }  else{
        alert("Max 2 dots")
    }
   

    
}
}

function alerttog(){
if(alertl==0){
    alertl=1
    database.ref('notes/').update({
        vis:"hide"
    })
} else{
    alertl=0
    database.ref('notes/').update({
        vis:"show"
    })
}
}

database.ref('player/bat1/name').on('value', snapshot => {
     batter1 = snapshot.val();
     $$('player1choose').value = snapshot.val()
  })

  
database.ref('player/bat2/name').on('value', snapshot => {
    batter2 = snapshot.val();
    $$('player2choose').value = snapshot.val()

 })

 database.ref('player/bow/name').on('value', snapshot => {
    bowler = snapshot.val();
    $$('bowchoose').value = snapshot.val()

 })


 function wicket(){
    database.ref('notes/').update({
        pop:"WICKET"
    })
    database.ref('notes/').update({
        pop:"-"
    })

    if(ball<(limit)){
    
        ball=ball+1;
        database.ref('overs/').update({
            ball:ball
        })
        $$('ballno').innerText = "Ball No: "+ ball
        console.log(ball+"ball")
        database.ref('scores/main/out').transaction(out =>parseInt(out)+1)
        database.ref('scores/last/marks').update(JSON.parse('{"ball'+ball+'":"w"}'))
   
    } else{
        for (let i = 0; i < 9; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Next Over'
                  }) 
            )
            togglebat()
        }
        //next over
        over= over+1
        limit=6
        database.ref('overs/').update({
            count:over
        })


        $$('ballno').innerText = "Ball No: 1"

        ball=1
        database.ref('overs/').update({
            ball:ball
        })
        database.ref('scores/main/out').transaction(out =>parseInt(out)+1)
        database.ref('scores/last/marks').update(JSON.parse('{"ball'+ball+'":"w"}'))

    }
 }

 function batreset(){
    Swal.fire({
        title: 'Enter reset password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      }).then(pass => {
if(pass.value=="1717"){
    database.ref('bats').set({}).then(
        Toast.fire({
            icon: 'success',
            title: 'Reset batsman scores successfully'
          })
    )
} else{
    Toast.fire({
        icon: 'error',
        title: 'Incorrect Password'
      })
}
      })
 
 }

 function ballreset(){
    Swal.fire({
        title: 'Enter reset password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      }).then(pass => {
if(pass.value=="1717"){
    database.ref('balls').set({}).then(
        Toast.fire({
            icon: 'success',
            title: 'Reset bowler scores successfully'
          })
    )
} else{
    Toast.fire({
        icon: 'error',
        title: 'Incorrect Password'
      })
}
      })
 
 }
 database.ref('overs/count').on('value', snapshot => {
    $$('overc').value = snapshot.val();

  });

  database.ref('overs/ball').on('value', snapshot => {

   $$('ballc').value = snapshot.val();

   });


function dotpush(){
    database.ref('scores/last/marks').on('value', snapshot => {
        array1 = snapshot.val()
        
        for (let i =1; i < 9; i++) {
            if(parseInt(array1["ball"+i])==0){
                $$('dot'+i).value= "0"
              }
              if(array1["ball"+i]=="w"){
                $$('dot'+i).value= "Wicket"
              }
              if(array1["ball"+i]=="nb"){
                $$('dot'+i).value= "No Ball"
            
              }
              if(array1["ball"+i]=="wd"){
                $$('dot'+i).value= "Wide"
            
                        }
              if(array1["ball"+i]=='non'){
                $$('dot'+i).value= "Empty"
              } else{
                if(parseInt(array1["ball"+i])){
                  $$('dot'+i).value= parseInt(array1["ball"+i])
                }
              }



        }})
}
dotpush()


function dotupdate(){
 

    for (let i =1; i < 9; i++) {
        if(isNaN(($$('dot'+i).value))){
        if($$('dot'+i).value=="Wide"){
            datan="wd"
        }
        if($$('dot'+i).value=="Wicket"){
            datan="w"
        }
        if($$('dot'+i).value=="No Ball"){
            datan="nb"
        }
        if($$('dot'+i).value=="Empty"){
            datan="non"
        }} else{
            datan=$$('dot'+i).value
        }

        database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"'+datan+'"}')).then(
            Toast.fire({
                icon: 'success',
                title: 'Updated dots successfully'
              }) 
        )
    }

}

function togglearrau(){
    
}