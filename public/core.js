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
mainmark = 0;
mainouts = 0;
ball=0
ocount=0
bcount=0
wideno=0
smvis=0
bowlerballs = 0
bowlerrate = 0
noticemsg = "none";
    // Get a reference to the database
const database = firebase.database();

//Elements
const scorelabel = document.getElementById('mainscore');
const bat1 = document.getElementById('bat1');
const bat2 = document.getElementById('bat2');
const bowname = document.getElementById('bowname');

database.ref('scores/last/marks').on('value', snapshot => {
array1 = snapshot.val()
console.log(snapshot.val())

for (let i =1; i < 9; i++) {

  if(array1["ball"+i]=="wd"){
    $$('dot'+i).src= "images/wd.png"
    wideno= wideno+1
  }
  if(array1["ball"+i]=="nb"){
    $$('dot'+i).src= "images/nb.png"
    wideno= wideno+1
  }
  if(parseInt(array1["ball"+i])==0){
    $$('dot'+i).src= "images/0.png"
  }
  
  if(array1["ball"+i]=="w"){
    $$('dot'+i).src= "images/w.png"
  }

  if(wideno==1){
    $("#dot7").fadeIn();
  } else{
    if(wideno==2){
    $("#dot7").fadeIn();
    $("#dot8").fadeIn();} else{
      $("#dot7").fadeOut();
      $("#dot8").fadeOut();
    }
  }
  if(array1["ball"+i]=='non'){
    $$('dot'+i).src= "images/empty.png"
  } else{
    if(parseInt(array1["ball"+i])){
      $$('dot'+i).src= "images/"+parseInt(array1["ball"+i])+".png"
    }
  }
  if(i==8){
    wideno=0
  }
}


});

database.ref('scores/main/marks').on('value', snapshot => {
    const score = snapshot.val();
    mainmark = score;
    scorelabel.textContent = mainmark+"-"+mainouts;
    
 calculate()
  });

  database.ref('scores/main/out').on('value', snapshot => {
    const score = snapshot.val();
    mainouts = score;
    scorelabel.textContent = mainmark+"-"+mainouts;



    
    database.ref('player/bat1/name').on('value', snapshot => {
        bat1.textContent = snapshot.val();
        batter1 = snapshot.val();
        database.ref('bats/'+batter1+'/score').on('value', snapshot => {
          if(snapshot.val()!=null){
            $$('bat1mark').innerText =     snapshot.val();
          } else{
            $$('bat1mark').innerText =  0;

          }
            })
            database.ref('bats/'+batter1+"/balls").on('value', snapshot => {
              if(snapshot.val()!=null){
                $$('bat1balls').innerText = snapshot.val()
              } else{
                $$('bat1balls').innerText =   00;
    
              }
          
             });
             
      });
      database.ref('player/bat2/name').on('value', snapshot => {
        bat2.textContent = snapshot.val();
        batter2 = snapshot.val();
        database.ref('bats/'+batter2+'/score').on('value', snapshot => {
          if(snapshot.val()!=null){
            $$('bat2mark').innerText =     snapshot.val();
          } else{
            $$('bat2mark').innerText =   00;

          }
            })
            database.ref('bats/'+batter2+"/balls").on('value', snapshot => {
              if(snapshot.val()!=null){
                $$('bat2balls').innerText =     snapshot.val();
              } else{
                $$('bat2balls').innerText =   00;
    
              }
             });
      });

      database.ref('player/bow/name').on('value', snapshot => {
        bowname.textContent = snapshot.val();
        bowlernm =  snapshot.val();
        database.ref('balls/'+bowlernm+'/score').on('value', snapshot => {
          if(snapshot.val()!=null){
            bowlerrate = parseInt(snapshot.val())
    $$('bowlerrate').innerText = bowlerrate + "-"+bowlerballs;

          } else{
                    bowlerrate = 0
                    $$('bowlerrate').innerText = bowlerrate + "-"+bowlerballs;


          }
            })
            database.ref('balls/'+bowlernm+"/outs").on('value', snapshot => {
              if(snapshot.val()!=null){
                bowlerballs = parseInt( snapshot.val())
    $$('bowlerrate').innerText = bowlerrate + "-"+bowlerballs;

              } else{
                bowlerballs = 0
    $$('bowlerrate').innerText = bowlerrate + "-"+bowlerballs;
              }
          
             });
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
 
  database.ref('notice/head/msg').on('value', snapshot => {
    noticemsg = snapshot.val();
    $$('noticetext').innerText  =snapshot.val();
  });
  database.ref('notice/visible/bool').on('value', snapshot => {
if(parseInt(snapshot.val())==0){
  $("#noticeboard").fadeIn();
  console.log(snapshot.val())
} else{
  $("#noticeboard").fadeOut();
  console.log(snapshot.val())

}
  });
  database.ref('nowbat/schl').on('value', snapshot => {
    notbatno = parseInt(snapshot.val())
    if(notbatno==1){
      $$('nowplayingtext').innerText = "RC"
      $$('image01').src = "images/ukraine-flag-png-xl.png";
      $$('image02').src = "images/images.png";
    } else{
      $$('nowplayingtext').innerText = "PD"
      $$('image02').src = "images/ukraine-flag-png-xl.png";
      $$('image01').src = "images/images.png";

    }
    
    ;
 
  });

  database.ref('overs/count').on('value', snapshot => {
    ocount = snapshot.val();
   $$('ballno').innerText = ocount+"."+bcount
  });

  database.ref('overs/ball').on('value', snapshot => {
    if( $$("dot7").style.display=="none"&& $$("dot8").style.display=="none"){
      thislimit = 6
    } else{
      if( $$("dot7").style.display!="none"&& $$("dot8").style.display=="none"){
        thislimit = 7
      }  else{
        if( $$("dot7").style.display!="none"&& $$("dot8").style.display!="none"){
          thislimit = 8
        } 
      }
    }
    bcount = snapshot.val();
    if (parseInt(bcount)>=thislimit){
      bcount = 0;
      ocount = ocount+1;
      $("#dot7").fadeOut();
      $("#dot8").fadeOut();
    }
   $$('ballno').innerText = parseInt(ocount)+"."+parseInt(bcount)
  });

  database.ref('notes/pop').on('value', snapshot => {
    if(snapshot.val()!="-"){
      smvis=1
      $('#runrate').fadeIn()
      $$('smallal').style.backgroundColor = "#f60c0c"
      $$('runrate').innerText = snapshot.val();
      setTimeout(() => {
        calculate()
      }, 5000);
    }

    
   
  })




  database.ref('notes/vis').on('value', snapshot => {
 
    if(snapshot.val()=="hide"){
      smvis=0
      $$('smallal').style.backgroundColor = "transparent"
      $("#runrate").fadeOut();
    } else{
      smvis=1
      $$('smallal').style.backgroundColor = "#1c1052"

      $("#smallal").fadeIn();
      $("#runrate").fadeIn();
    }
  
 
})

function calculate(){
var domtext = ($$('ballno').innerText).toString()
var tcom = domtext.split(".")
rtoc = tcom[0]
rtbc = tcom[1]
newdec = (parseFloat(rtbc)*1.666).toString().replace('.',"")
devider = rtoc.toString()+"."+newdec
brun = parseFloat(mainmark)/parseFloat(devider).toFixed(5)
console.log(rtoc,brun)
if(smvis==1){
  $("#runrate").fadeIn();

 $$("runrate").innerText = "RUN RATE "+ ((brun.toFixed(2)).replace("Infinity","0.00")).replace("NaN","0.00") ;
 $$('smallal').style.backgroundColor = "#1c1052";
}
}