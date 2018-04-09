
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

    console.log("This is the info from the input " + train);

    // Upload train data to firebase
    database.ref().push(train);

    // Clear all text input boxes
    $("#new-train-input").val(" ");
    $("#new-destination-input").val(" ");
    $("#new-1st-train-time-input").val(" ");
    $("#new-frequency-input").val(" ");
});

// Make a Firebase event listener to register when any user adds a train to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log("This is the info from firebase " + childSnapshot.val());

    // store info from firebase into variables
    var train = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;


    // calculate Minutes Away and Next Arrival for Current Train Schedule:
    // get current time from momentJS
    var currentTime = moment();
        console.log("This is the current time " + moment(currentTime).format("hh:mm"));
    // trainFirstTime converted so make sure it comes before current time by pushing it back one year
    var convertedFirstTime = moment(trainFirstTime, "hh:mm").subtract(1, "years");
        console.log(convertedFirstTime);
    // subtract current time from converted train first time, make the result in minutes -- so approximately 1 year and additional minutes
    // Note: there are usually 525,600 minutes in a year
    var timeDiff = moment().diff(moment(convertedFirstTime), "minutes");
    // divide timeDiff by the frequency of the train, discard the integer, the remainder is the number of minutes that have passed since the last train "left the station"
    var timeSinceLastTrain = timeDiff % trainFrequency;
        console.log("Minutes since last train left " + timeSinceLastTrain);
    // Minutes until next train is frequency minus the number of minutes since last train left
    var minutesAway = trainFrequency - timeSinceLastTrain;
        console.log("Minutes until next train arrives " + minutesAway);
    // The next train will arrive  = current time + number of minutes for next train
    var nextArrival = moment().add(minutesAway, "minutes");
        console.log("the next arrival is" + nextArrival);



})



