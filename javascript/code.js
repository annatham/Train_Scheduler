
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

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var startTime = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(destinationInput);
    console.log(startTime);
    console.log(frequencyInput);
    
    var startTimePretty = moment.unix(startTime).format("HHmm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(empStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

// Append the new row to the table
$("#schedule-table> tbody").append(newRow);
});
