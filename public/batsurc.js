var $$ = function( id ) { return document.getElementById( id ); };
mainmark=0
mainouts=0
purem=0
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

    database.ref('nowbat/schl').on('value', snapshot => {
        if(parseInt(snapshot.val())==1){
            $$("schl").innerHTML="<b>"+"RAHULA COLLEGE MATARA"+"</br>"
        } else{
            $$("schl").innerHTML="<b>"+"DHARMAPALA COLLEGE PANNIPITIYA"+"</br>"
        }
    })

    database.ref('scores/main/marks').on('value', snapshot => {
        const score = snapshot.val();
        mainmark = score;
        $$("tot").innerHTML ="<b>"+ mainmark+"-"+mainouts+"</br>";
        $$('morem').innerHTML=parseInt(mainmark)-purem
        
      });
    
      database.ref('scores/main/out').on('value', snapshot => {
        const score = snapshot.val();
        mainouts = score;
        $$("tot").innerHTML ="<b>"+ mainmark+"-"+mainouts+"</br>";
        $$('morem').innerHTML=parseInt(mainmark)-purem
    });


database.ref('batout').on('value', snapshot => {
    purem=0
for (let i = 1; i < 12; i++) {
   $$('batt'+i).innerText = "-"
   $$('def'+i).innerText = "-"
   $$('bow'+i).innerText = "-"
   $$('bc'+i).innerText = "-"
   $$('or'+i).innerText = "-"
   $$('M'+i).innerText = "-"
    
}

 array=snapshot.val()

pushlen = Object.keys(array).length;
 for (let i = 0; i < (Object.keys(array).length); i++) {
    const e = Object.keys(array)[i];
    $$('batt'+(i+1)).innerHTML = "<b>"+e+"</b>"
    $$('bow'+(i+1)).innerHTML =    array[e]["bow"]
    $$('bc'+(i+1)).innerHTML = "<b>b</b>"
    if(array[e]["score"]==undefined){
        y1 = 0
    } else {
        y1 = array[e]["score"]

    }
    if(array[e]["balls"]==undefined){
        z1 = 0
    } else {
        z1 = array[e]["balls"]

    }
    $$('M'+(i+1)).innerHTML =  "<b>"+  y1 +" ("+ z1+")" +"</b>"
    purem=parseInt(y1)+purem
    $$('morem').innerHTML=parseInt(mainmark)-purem

    if( array[e]["why"]=="RUN OUT"){
   $$('def'+(i+1)).innerText =  array[e]["who"]
   $$('or'+(i+1)).innerHTML ="<b>RUN OUT</b>"
    
    } else{
        if( array[e]["why"]=="c"){
            $$('def'+(i+1)).innerText =  array[e]["who"]
            $$('or'+(i+1)).innerHTML ="<b>c</b>"
             
             } else{
            
                $$('def'+(i+1)).innerText =  array[e]["bow"]
                $$('or'+(i+1)).innerHTML ="<b>b</b>"
                     
             }
    }
 




    
 }
 gon = 1
 database.ref('player/bat1/name').once('value', snapshot => {
    batter1 = snapshot.val();
    for (let i = 1; i < 12; i++) {
        if(  $$('batt'+i).innerText ==batter1){
gon = 0
        } 
        if(i==11&&gon==1){

            $$('batt'+(pushlen+1)).innerHTML = "<b>"+batter1+"</b>"
            $$('def'+(pushlen+1)).innerHTML =  "<b>"+"NOT OUT"+"</b>"
            $$('or'+(pushlen+1)).innerHTML =""

   database.ref('bats/'+batter1+'/score').once('value', snapshot => {
    if(snapshot.val()==null){
        bat1mark = 0
    }else{
        bat1mark  = parseInt(snapshot.val())
    }
   $$('M'+(pushlen+1)).innerHTML = "<b>"+bat1mark+"</b>"
   purem=purem+parseInt(bat1mark)
   $$('morem').innerHTML=parseInt(mainmark)-purem

   sec(1)
})

        } else{
            sec(2)
        }
 }})


 function sec(rx){
    gon = 1
    database.ref('player/bat2/name').once('value', snapshot => {
       batter2 = snapshot.val();
       for (let i = 1; i < 12; i++) {
           if(  $$('batt'+i).innerText ==batter2){
   gon = 0
           } 
           if(i==11&&gon==1){
   
               $$('batt'+(pushlen+rx)).innerHTML = "<b>"+batter2+"</b>"
               $$('def'+(pushlen+rx)).innerHTML =  "<b>"+"NOT OUT"+"</b>"
               $$('or'+(pushlen+rx)).innerHTML =""
   
      database.ref('bats/'+batter2+'/score').once('value', snapshot => {
       if(snapshot.val()==null){
           bat2mark = 0
       }else{
           bat2mark  = parseInt(snapshot.val())
       }
      $$('M'+(pushlen+rx)).innerHTML = "<b>"+bat2mark+"</b>"
      purem=purem+parseInt(bat2mark)
      $$('morem').innerHTML=parseInt(mainmark)-purem
   
   })
   
           }
    }})
 }

  });



  database.ref('overs').on('value', snapshot => {
   xw = snapshot.val()
    $$("ooc").innerHTML ="<b>"+ xw["count"]+"."+xw["ball"]+"</br>";
   
    
  });






