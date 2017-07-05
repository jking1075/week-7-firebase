



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

  var trainData = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var tName = $("#train-name-input").val().trim();
    var tDest = $("#dest-input").val().trim();
    var tFirst = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
    var tFreq = moment($("#frequency-input").val().trim(), "HH:mm").format("HH:mm");

    var newTrain = {
      name: tName,
      destination: tDest,
      firstTrainTime: tFirst,
      frequency: tFreq
    };
    // Uploads train data to the database
    database.ref().push(newTrain);
    // Logs to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
    
    // Clear all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDest = childSnapshot.val().destination;
    var tFirst = childSnapshot.val().firstTrainTime;
    var tFreq = childSnapshot.val().frequency;
    // console log of the train info
    console.log(tName);
    console.log(tDest);
    console.log(tFirst);
    console.log(tFreq);
    // set the current time
    var now = moment();
    var minAway = tFreq - now;
    // Format the firstTrainTime
    var tFirstPretty = moment.unix(tFirst).format("mm");
    // write train info to html table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
    tFreq + "</td><td>" + tFirstPretty + "</td><td>" + minAway + "</td></tr>");
  });