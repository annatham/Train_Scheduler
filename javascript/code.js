
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

var firebaseConfig = {
    apiKey: "AIzaSyB3m3NY2JxciKm844qCE7vIk7mdCPjhvy8",
    authDomain: "train-scheduler-be9e4.firebaseapp.com",
    databaseURL: "https://train-scheduler-be9e4.firebaseio.com",
    projectId: "train-scheduler-be9e4",
    storageBucket: "",
};
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();


 // Grabs user input
var trainName = $("#train-name-input").val().trim();
var destinationInput = $("#destination-input").val().trim();
var startTime = moment($("#time-input").val().trim(), "MMhh");
var frequencyInput = $("#frequency-input").val().trim();

var newTrain = {
    name: trainName,
    destination: destinationInput,
    time: startTime,
    frequency: frequencyInput,
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

alert("New train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

});