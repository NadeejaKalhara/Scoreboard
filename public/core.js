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

    // Get a reference to the database
const database = firebase.database();

// Function

// Get references to the score elements
const team1Score = document.getElementById('team1-score');
const team2Score = document.getElementById('team2-score');

// Set up event listeners to update the score when it changes
function team1add() {
  database.ref('team1/score').transaction(score => score + 1);
};

function team2add() {
    database.ref('team2/score').transaction(score => score + 1);
  };


// Listen for changes to the score in the database and update the scoreboard
database.ref('team1/score').on('value', snapshot => {
  const score = snapshot.val();
  team1Score.textContent = score;
});

database.ref('team2/score').on('value', snapshot => {
  const score = snapshot.val();
  team2Score.textContent = score;
});
