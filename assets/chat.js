//make connection
var socket=io.connect("http://localhost:3000");

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('user-output');
      feedback = document.getElementById("feedback");

message.addEventListener("keypress",function(){
  socket.emit("typing",{handle: handle.textContent});
});

//listen for events
socket.on("chat",function(data){
  feedback.innerHTML = "";
  if(data.message != ""){
      output.innerHTML+="<p><strong>" + data.handle + ": </strong>"+ data.message + "</p>";
  }
});

socket.on("typing",function(data){
  feedback.innerHTML = "<p><em>" + data.handle + " is typing...</em></p>";
});
