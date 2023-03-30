var $$ = function( id ) { return document.getElementById( id ); };
schln = "RC"


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

    database.ref('entry').on('value', snapshot => {
        if(snapshot.val()["schl"]=="RCM"){
            schln = "RC"
            $$("schlf").src = "images/images.png"
        } else{
            schln = "PD"
            $$("schlf").src = "images/images.png"



        }
        console.log('team'+schln+"/"+snapshot.val()["man"])   
        database.ref('team'+schln+"/"+snapshot.val()["man"]).once('value', snapshot => {
     
       $$("pff").src = snapshot.val()["link"]
       $$("fnn").innerHTML = "<b>"+(snapshot.val()["fullName"]).split(" ")[0]+"</br>"
       $$("fll").innerHTML =(snapshot.val()["fullName"]).split(" ")[1]


      });})