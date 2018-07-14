var config = {
    apiKey: "AIzaSyCbQOcfBpz-ggGBomBrqLwZdoQTmC4QzqM",
    authDomain: "trainschedule-d2f2d.firebaseapp.com",
    databaseURL: "https://trainschedule-d2f2d.firebaseio.com",
    projectId: "trainschedule-d2f2d",
    storageBucket: "trainschedule-d2f2d.appspot.com",
    messagingSenderId: "847859614655"
};

firebase.initializeApp(config);

//make firebase a variable
var database = firebase.database();
//grab the current time for the math of the train times
var currentTime = moment();


database.ref().on("value", function (snapshot) {

});

//on button click load results
$("#addTrainBtn").on("click", function () {

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = $("#timeInput").val().trim();
    var trainFrequency = $("#frequencyInput").val().trim();

    database.ref().on("child_added", function (childSnap) {

        var name = childSnap.val().name;
        var destination = childSnap.val().destination;
        var firstTrain = childSnap.val().firstTrain;
        var frequency = childSnap.val().frequency;
        var min = childSnap.val().min;
        var next = childSnap.val().next;

        //add train information to the table
        $("#trainTable > tbody").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
    });

    //convert train time 
    
    //subtracts the first train time back a year to make sure it is before current time.
    var firstTrainTime = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainTime), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
    
    //create a object for the new train
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrain,
        frequency: trainFrequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    //push new train to firebase
    database.ref().push(newTrain);
    //clear all inputs
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    return false;
});