var config = {
    apiKey: "AIzaSyCbQOcfBpz-ggGBomBrqLwZdoQTmC4QzqM",
    authDomain: "trainschedule-d2f2d.firebaseapp.com",
    databaseURL: "https://trainschedule-d2f2d.firebaseio.com",
    projectId: "trainschedule-d2f2d",
    storageBucket: "trainschedule-d2f2d.appspot.com",
    messagingSenderId: "847859614655"
};

firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment();

database.ref().on("child_added", function (childsnapshot) {
    console.log(childsnapshot.val());
    var name = childsnapshot.val().name;
    var destination = childsnapshot.val().destination;
    var firstTrain = childsnapshot.val().firstTrain;
    var frequency = childsnapshot.val().frequency;
    var min = childsnapshot.val().min;
    var next = childsnapshot.val().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency +
        "</td><td>" + next + "</td><td>" + min + "</td></tr>")
});



database.ref().on("value", function (snapshot) {
    console.log(snapshot);

});

$("addTrainBtn").on("click", function () {
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    min = "";
    next = "";

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: min,
        next: next,

    });

});
