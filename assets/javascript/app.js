
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDoVSCDI4teOKVAId_upqDVE1ohm1lmVrI",
    authDomain: "westwood-train-station.firebaseapp.com",
    databaseURL: "https://westwood-train-station.firebaseio.com",
    projectId: "westwood-train-station",
    storageBucket: "westwood-train-station.appspot.com",
    messagingSenderId: "597462120364"
  };
  firebase.initializeApp(config);

// variable that references the database
  var database = firebase.database();

// initial variables


// When button is clicked then the user's train input is transferred to the variables
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#new-train-input").val().trim();
    var destination = $("#new-destination-input").val().trim();
    var firstTime = $("#new-1st-train-time-input").val().trim();
    var frequency = $("#new-frequency-input").val().trim();

    // Make local "temporary" object to hold train data
    var train = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    };

    console.log(train);

    // Upload train data to firebase
    database.ref().push(train);

    // Clear all text input boxes
    $("#new-train-input").val("");
    $("#new-destination-input").val("");
    $("#new-1st-train-time-input").val("");
    $("#new-frequency-input").val("");
});


