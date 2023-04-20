var $$ = function( id ) { return document.getElementById( id ); };
//variables
dataload = ""
dataload2=""
dataload1=""
uc=0
toggleb = 1
dotlist=1
mainmark = 0
mainouts = 0
noteon = 0
nowbat = 1
over=0
ball=0
limit=6
alertl=0
x1="0"
x2="0"
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
        for (let i = 0; i < 10; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Reset dots successfully'
                  }) 
            )
            
        }   
        ball = 0
        dotlist = 0
        database.ref('dotlist').update({
            count:dotlist
                   })
    
    }

    function quickm(b){
       

dotlist = dotlist+1
database.ref('dotlist').update({
 count:dotlist
        })
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
    
      if(ball<(6)){

        ball=parseInt(ball)+1;
        database.ref('overs/').update({
            ball:ball
        })
        $$('ballno').innerText = "Ball No: "+ ball
        console.log(ball+"ball")

        database.ref('scores/last/marks').update(JSON.parse('{"ball'+dotlist+'":"'+b+'"}'))
    } else{
        for (let i = 0; i < 10; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Next Over'
                  }) 
                  
            )
         
        }
 
        //next over
        over= parseInt(over)+1
        limit=6
        database.ref('limit').update({
            count:limit
                   })
        database.ref('overs/').update({
            count:over
        })


        $$('ballno').innerText = "Ball No: 1"

        ball=1
        dotlist=1
        database.ref('dotlist').update({
            count:dotlist
                   })
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
   
    if(parseInt(b)==1||parseInt(b)==3){
        togglebat()
    
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
            title:  school1+' is Batting Now'
          }))
} else{
    nowbat=2
    database.ref('nowbat/').update({
        schl:2
    }).then(
        Toast.fire({
            icon: 'success',
            title:  school2+'  is Batting Now'
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
        dotlist=ball
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
    
            dotlist = dotlist+1
            database.ref('dotlist').update({
                count:dotlist
                       })
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+dotlist+'":"wd"}'))
        database.ref('scores/main/marks').transaction(score =>parseInt(score)+1);
    
        }
    }
if(limit==6){
    limit=7
    database.ref('limit').update({
        count:limit
               })
    repwide()
} else{
    if(limit==7){
        limit=8
        database.ref('limit').update({
            count:limit
                   })
        repwide()
    }  else{
        if(limit==8){
            limit=9
            database.ref('limit').update({
                count:limit
                       })
            repwide()
        }  else{
        Swal.fire(
            'You can not add more balls',
            'Max 3 extra dots can be added!',
            'warning'
          )}
    }
   

    
}
}

function noball (){
    fetch("https://backup2-7l9m.onrender.com/update")
    .then((response) => response.json())
    .then((data) => console.log(data));
    function repwide(){
        if(ball<(limit)){
            dotlist =dotlist+1
            database.ref('dotlist').update({
                count:dotlist
                       })
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+dotlist+'":"nb"}'))
        database.ref('scores/main/marks').transaction(score =>parseInt(score)+1);
    
        }
    }
if(limit==6){
    limit=7
    database.ref('limit').update({
        count:limit
               })
    repwide()
} else{
    if(limit==7){
        limit=8
        database.ref('limit').update({
            count:limit
                   })
        repwide()
    }  else{
        if(limit==8){
            limit=9
            database.ref('limit').update({
                count:limit
                       })
            repwide()
        }  else{
        Swal.fire(
            'You can not add more balls',
            'Max 3 extra dots can be added!',
            'warning'
          )}
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



  



 function wicket(){
    fetch("https://backup2-7l9m.onrender.com/update")
    .then((response) => response.json())
    .then((data) => console.log(data));
    if(nowbat==2){
        database.ref('bats/'+batter1+'/balls').once('value', snapshot => {
            if(snapshot.val()==null){
                bat1balls = 0
            }else{
                bat1balls  = parseInt(snapshot.val())
            }
            database.ref('bats/'+batter1).update({
                balls:bat1balls+1
            }); })
    } else{
        database.ref('bats/'+batter2+'/balls').once('value', snapshot => {
            if(snapshot.val()==null){
                bat2balls = 0
            }else{
                bat2balls  = parseInt(snapshot.val())
            }
            database.ref('bats/'+batter2).update({
                balls:bat2balls+1
            }); })
    }


    database.ref('balls/'+bowler+'/balls').once('value', snapshot => {
        if(snapshot.val()==null){
            bowlerballs = 0
        }else{
            bowlerballs  = parseInt(snapshot.val())
        }
        database.ref('balls/'+bowler).update({
            balls:bowlerballs+1
        }); })


    database.ref('notes/').update({
        pop:"WICKET"
    })
    database.ref('notes/').update({
        pop:"-"
    })

    if(ball<(6)){
    
        ball=ball+1;
        dotlist = dotlist+1
        database.ref('dotlist').update({
            count:dotlist
                   })
        database.ref('overs/').update({
            ball:ball
        })
        $$('ballno').innerText = "Ball No: "+ ball
        console.log(ball+"ball")
        database.ref('scores/main/out').transaction(out =>parseInt(out)+1)
        database.ref('balls/'+bowler+'/outs').once('value', snapshot => {
            if(snapshot.val()==null){
                bowlerouts = 0
            }else{
                bowlerouts  = parseInt(snapshot.val())
            }
            database.ref('balls/'+bowler).update({
                outs:bowlerouts+1
            }); })
        database.ref('scores/last/marks').update(JSON.parse('{"ball'+dotlist+'":"w"}'))
   
    } else{
        for (let i = 0; i < 9; i++) {
            console.log(i+"ay")
            database.ref('scores/last/marks').update(JSON.parse('{"ball'+i+'":"non"}')).then(
                Toast.fire({
                    icon: 'success',
                    title: 'Next Over'
                  }) 
                
            )
            
      
        }
       
        //next over
        over= parent(over)+1
        limit=6
        database.ref('limit').update({
            count:limit
                   })
        database.ref('overs/').update({
            count:over
        })


        $$('ballno').innerText = "Ball No: 1"

        ball=1
        dotlist=1
        database.ref('dotlist').update({
            count:dotlist
                   })
        database.ref('overs/').update({
            ball:ball
        })
        database.ref('scores/main/out').transaction(out =>parseInt(out)+1)
        database.ref('scores/last/marks').update(JSON.parse('{"ball'+dotlist+'":"w"}'))
        database.ref('balls/'+bowler+'/outs').once('value', snapshot => {
            if(snapshot.val()==null){
                bowlerouts = 0
            }else{
                bowlerouts  = parseInt(snapshot.val())
            }
            database.ref('balls/'+bowler).update({
                outs:bowlerouts+1
            }); })

    }

    if(parseInt(toggleb)==2){
 nowbating = batter1
    } else{
        nowbating = batter2
    }
    Swal.fire({
        title: 'Reason for the wicket?',
        input: 'select',
        inputOptions: {
          'Out Reason': {
            c: 'Catch',
            runout: 'RUN OUT',
            b: 'Others'
          }
        },
        inputPlaceholder: 'Select a the out reason',
        showCancelButton: false,
        allowOutsideClick:false
      }).then(rs=>{
        $$('playercchoose').style.display = "block";
        console.log(rs.value)
        if(rs.value=="c"){
            Swal.fire({
                title: 'Select Taker',
           
              html:"<div>"+$$('playercchoose').outerHTML + "</div>"+ "<br> <button onclick='docatch()'>Submit</button>",
                showCancelButton: false,
                showConfirmButton:false,
                allowOutsideClick:false
                      
              }).then(outp=>{
       
 
              }
           

              )
        } else{
            console.log(rs.value)
            if(rs.value=="runout"){
                Swal.fire({
                    title: 'Select Taker',
               
                  html:"<div>"+$$('playercchoose').outerHTML + "</div>"+ "<br> <button onclick='dorunout()'>Submit</button>",
                    showCancelButton: false,
                    showConfirmButton:false,
                    allowOutsideClick:false
                          
                  }).then(outp=>{
           
     
                  }
               
    
                  )
            } else{
                otherouts(rs.value)
            }
      
        }
      })
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
 

    for (let i =1; i < 10; i++) {
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

database.ref('dotlist/count').on('value', snapshot => {
    dotlist = parseInt(snapshot.val())
  });
  database.ref('limit/count').on('value', snapshot => {
    limit = parseInt(snapshot.val())
  });


function loadplayers(){
    database.ref('team'+school1).once('value', snapshot => {
        rcarray = snapshot.val();

       if(rcarray!=null){
        console.log(rcarray)
        for (let i = 0; i < Object.keys(rcarray).length; i++) {
            const e = Object.keys(rcarray)[i];
            $("#playercchoose").append(new Option(e+ " - "+school1, e));
        }
        for (let i = 0; i < Object.keys(rcarray).length; i++) {
            const e = Object.keys(rcarray)[i];
            $("#player1choose").append(new Option(e+ " - "+school1, e));
        }
        for (let i = 0; i < Object.keys(rcarray).length; i++) {
            const e = Object.keys(rcarray)[i];
            $("#player2choose").append(new Option(e+  " - "+school1, e));
        }
        for (let i = 0; i < Object.keys(rcarray).length; i++) {
            const e = Object.keys(rcarray)[i];
            $("#bowchoose").append(new Option(e+  " - "+school1, e));
        }
       }
         }).then(
            database.ref('team'+school2).once('value', snapshot => {
                rcarray = snapshot.val();

              if(rcarray!=null){
                console.log(rcarray)
                for (let i = 0; i < Object.keys(rcarray).length; i++) {
                    const e = Object.keys(rcarray)[i];
                    $("#player1choose").append(new Option(e+ " - "+school2, e));
                }
                for (let i = 0; i < Object.keys(rcarray).length; i++) {
                    const e = Object.keys(rcarray)[i];
                    $("#player2choose").append(new Option(e+  " - "+school2, e));
                }
                for (let i = 0; i < Object.keys(rcarray).length; i++) {
                    const e = Object.keys(rcarray)[i];
                    $("#bowchoose").append(new Option(e+  " - "+school2, e));
                }
                for (let i = 0; i < Object.keys(rcarray).length; i++) {
                    const e = Object.keys(rcarray)[i];
                    $("#playercchoose").append(new Option(e+ " - "+school2, e));
                }
              }
                 } 
         )).then(
         
            callpu()
         )
         function callpu(){
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
         }
}

function docatch(){
    $$('playercchoose').style.display = "none"

    database.ref('bats/'+nowbating+'/score').once('value', snapshot => {
        
database.ref('bats/'+nowbating+'/balls').once('value', snapshot2 => {
        database.ref('batout/'+nowbating).set({
            why:"c",
            bow:bowler,
            who:document.getElementsByClassName("playercchoose")[1].value,
            score:snapshot.val(),
            balls:snapshot2.val()
                            }).then(
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Wicket Added'
                                  }))})
    })
}
function dorunout(){
    $$('playercchoose').style.display = "none"

    database.ref('bats/'+nowbating+'/score').once('value', snapshot => {
        
database.ref('bats/'+nowbating+'/balls').once('value', snapshot2 => {
        database.ref('batout/'+nowbating).set({
            why:"RUN OUT",
            bow:bowler,
            who:document.getElementsByClassName("playercchoose")[1].value,
            score:snapshot.val(),
            balls:snapshot2.val()
                            }).then(
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Wicket Added'
                                  }))})
    })
}
function otherouts(typ){
    if(typ=="runout"){
        database.ref('bats/'+nowbating+'/score').once('value', snapshot => {
        
            database.ref('bats/'+nowbating+'/balls').once('value', snapshot2 => {
                    database.ref('batout/'+nowbating).set({
                        why:"RUN OUT",
                        bow:bowler,
                        who:document.getElementsByClassName("playercchoose")[1].value,
                        score:snapshot.val(),
                        balls:snapshot2.val()
                                        }).then(
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'Wicket Added'
                                              }))})
                })
    } else{
        database.ref('bats/'+nowbating+'/score').once('value', snapshot => {
        
            database.ref('bats/'+nowbating+'/balls').once('value', snapshot2 => {
                if(snapshot.val()==null){ x1="0" } else {  x1 = snapshot.val()}
                if(snapshot2.val()==null){ x2="0" } else {  x2 = snapshot2.val()}
                    database.ref('batout/'+nowbating).set({
                        why:"b",
                        bow:bowler,
                        score:x1,
                        balls:x2
                                        }).then(
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'Wicket Added'
                                              }))})
                })

    }
}

function resoutz(){
    database.ref('batout').set({}).then(
        Toast.fire({
            icon: 'success',
            title: 'Batsman Wickets cleared successfully'
          })
    )
}

function display(a){
if(a=="bt1"){
    database.ref('entry').set({
man:batter1,
schl:(($( "#player1choose option:selected" ).text()).split("-")[1]).trim(),
bat:"yes"
    })
} else{
    if(a=="bt2"){
        database.ref('entry').set({
    man:batter2,
    schl:(($( "#player2choose option:selected" ).text()).split("-")[1]).trim(),
bat:"yes"
        })
    }  else{
        if(a=="bw"){
            database.ref('entry').set({
        man:bowler,
        schl:(($( "#bowchoose option:selected" ).text()).split("-")[1]).trim(),
bat:"no"
            })
        }   
    }
}
}

//ADDED CORDS

database.ref('couple').on('value', snapshot => {
    $$('sc2').value = snapshot.val()["sc2"]
    $$('sc1').value = snapshot.val()["sc1"]
    school2 = snapshot.val()["sc2"]
    school1 =  snapshot.val()["sc1"]
    loadplayers()
  })




  function updatescls(){
  console.log("updated!")
    database.ref('couple/').update({
     sc1: $$('sc1').value,
     sc2: $$('sc2').value
            })
  }

  function uuu(a){
    database.ref('teamMC/'+a).update({
        fn:a
            })
  }