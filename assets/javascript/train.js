



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMpeHhLDWycpuhC09tbQz-oo8Xjr6ZSJs",
    authDomain: "train-data-24f5e.firebaseapp.com",
    databaseURL: "https://train-data-24f5e.firebaseio.com",
    projectId: "train-data-24f5e",
    storageBucket: "",
    messagingSenderId: "363679792369"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var tName = $("#trainName").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainArrival = moment($("#nextArrival").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = parseInt($("#frequency").val().trim());
    var newTrain = {
      name: tName,
      destination: trainDestination,
      nextArrival: trainArrival,
      frequency: trainFrequency
    
    };
    console.log(newTrain);

    // Uploads train data to the database
    database.ref().push(newTrain);
    // Logs to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.nextArrival);
    console.log(newTrain.frequency);
    
    // Clear all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#nextArrival").val("");
    $("#frequency").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainArrival = childSnapshot.val().nextArrival;
    var trainFrequency = childSnapshot.val().frequency;
    // console log of the train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainArrival);
    console.log(trainFrequency);
    // set the current time
    var now = moment();
    var minAway = trainFrequency - now;
    // Format the next arrival
    var tFirst = moment.unix(tFirst).format("mm");
    // write train info to html table
    $("table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    frequency + "</td><td>" + tFirst + "</td><td>" + minAway + "</td></tr>");
  });