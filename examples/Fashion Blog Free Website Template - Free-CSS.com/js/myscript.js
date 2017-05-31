sessionStorage.clear();

(function()
{
  if( window.sessionStorage )
  {
    if( !sessionStorage.getItem('room') )
    {
      //localStorage['room'] = true;
      window.onload = function(){
        openIdleScreen();
      }
    }
    else
      var room = sessionStorage.getItem('room')
      console.log('ROOM', room)
      openIdleScreen(room);
  }
})();

//open idle circle
// window.onload = function(){
//   openIdleScreen();
// }

function toggleHome(home, func) {

  if(home) {
    console.log(1);
    openHomeScreen();
  } else {
    console.log(2);
    homeClose();
  }

  func();
}


function toggleHomeOff(){
  var room = sessionStorage.getItem('room')
  toggleHome(false,startEnterScreen(room));
}

function toggleHomeOn(){
  toggleHome(true,iframeClose());
}

function toggleTransition(){
  console.log('toggle transition function')
  toggleHome(false,transitionToMe());
}

function toggleIdleOff(){
  toggleHome(true, idleClose());
}
function toggleIdleOn(){
  openIdleScreen();
  iframeClose();
  homeClose();
}

//change homeButton to x
function homeClose(){
  var homeFloat = document.getElementById('floatHome');

  homeFloat.remove();

  addCloseBtn();

  var closeBtn = document.getElementById('closeiFrame');
  closeBtn.addEventListener('click', toggleIdleOn);

}

function iframeClose(){
    if (document.getElementById('float') != null)
    {
      document.getElementById('float').remove();
    }
    if (document.getElementById('enterScreen') != null){
      document.getElementById('enterScreen').remove();
    }
    if (document.getElementById('closeiFrame') != null){
      document.getElementById('closeiFrame').remove();
    }
}

function idleClose(){
    if (document.getElementById('idleScreen') != null)
    {
      document.getElementById('idleScreen').remove();
    }
}

function openIdleScreen(){

  //remove close btn
  if (document.getElementById('roomNameiFrame') != undefined){
    document.getElementById('roomNameiFrame').remove();
  }
  //remove room name
  if (document.getElementById('closeiFrame') != undefined){
    document.getElementById('closeiFrame').remove();
  }
  //remove room name
  if (document.getElementById('roomCount') != undefined){
    document.getElementById('roomCount').remove();
    window.clearInterval();
  }

  var idleChild = document.createElement('div');

  var idleDivString = '<div class="idleScreen unset" id="idleScreen" >'
  +'<div class="idleText">'
  +'🛍🎉'
  +'</div>'
  +'</div>';


  console.log('DOCUMENT', document)

  console.log('DOCUMENT[0]', document[0])
  var theBody = document.getElementsByTagName('body');

  idleChild.innerHTML = idleDivString;
  idleChild = idleChild.firstChild;
  document.body.appendChild(idleChild);



  var btn = document.getElementById('idleScreen');
  btn.addEventListener('click',toggleIdleOff);
}

function openHomeScreen(){

  //remove idle screen
  if (document.getElementById('roomNameiFrame') != undefined){
    document.getElementById('roomNameiFrame').remove();
  }

  var homeChild = document.createElement('div');

  var homeDivString = '<div class="floatHome unset" id="floatHome" >'
  +'<p>Enter New or Existing Room Name</p>'
  +'<input class="roomInput unset" id="roomInput"></input>'
  +'<button class="addIFrame unset" id="addIFrame">Open</button>'
  +'</div>';

  homeChild.innerHTML = homeDivString;
  homeChild = homeChild.firstChild;
  document.body.appendChild(homeChild);

  var btn = document.getElementById('addIFrame');
  btn.addEventListener('click',toggleHomeOff);
}

function addCloseBtn(){
  console.log("close btn added")
  var closeChild = document.createElement('div');

  var closeDivString = '<div class="closeiFrame unset" id="closeiFrame">'
  +'<img style="width:81%; margin-top:1px;" src="https://cldup.com/vUGrBlYs7J.png"/>'
  +'</div>';

  closeChild.innerHTML = closeDivString;
  closeChild = closeChild.firstChild;
  document.body.appendChild(closeChild);
}

function addRoomNameDiv(name){
  var roomNameChild = document.createElement('div');

  var roomeNameString = '<div class="roomNameiFrame unset" id="roomNameiFrame" '
  +'160'
  +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
    +'<div class="roomName ">'
      +'Room: '
        +`${name}`
    +'</div>'
  +'</div>';

  roomNameChild.innerHTML = roomeNameString;
  roomNameChild = roomNameChild.firstChild;
  document.body.appendChild(roomNameChild);
}

function addRoomMemberCountDiv(){

  var memberCountChild = document.createElement('div');
  var myiframe = document.getElementById('roomIframeID');
  console.log('MYIFRAME', myiframe)
  //var innerDoc = myiframe.contentDocument || myiframe.contentWindow.document;
  //console.log('INNERDOC', innerDoc)

  var countChecker = setInterval(function() {
    // method to be executed;
    console.log("ROOM COUNT RAN")

    // $.get("http://ipinfo.io", function(response) {
    //   alert(response.ip);
    // }, "jsonp");
    //console.log("INNER DOC IN LOOP",innerDoc);

    var videoStreams = myiframe.contentWindow.document.body.getElementsByClassName("video-stream-container");
    console.log('VIDEOSTREAMS', videoStreams)

    var count = videoStreams.length;
    console.log("VIDEO COUNT STREAM", count);


    var memberCountString = '<div class="roomCount unset" id="roomCount" '
    +'160'
    +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
    +'Group: '
      +`${count}`
    +'</div>';

    memberCountChild.innerHTML = memberCountString;
    memberCountChild = memberCountChild.firstChild;
    document.body.appendChild(memberCountChild);

  }, 5000);
}


function startEnterScreen(room){
  var enterScreenChild = document.createElement('div');


  var enterScreenDivString = '<div class="enterScreen unset" id="enterScreen" >'
  +'</div>';


  enterScreenChild.innerHTML = enterScreenDivString;
  enterScreenChild = enterScreenChild.firstChild;
  document.body.appendChild(enterScreenChild);



  //insert iFrame
  var iframe = document.createElement("iframe");

  if (room == undefined){
  var inputValue = document.getElementById('roomInput').value;

    if (inputValue == ''|| inputValue == undefined){
      inputValue =  Math.floor(100000 + Math.random() * 900000);
    }

    sessionStorage.setItem('room', inputValue);

  }
  else {
    var inputValue = room;
  }

    iframe.setAttribute("src", "https://appear.in/"+inputValue);
    iframe.setAttribute("style", "border:none; width:150px; height:500px; ");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "roomIframeID");


    var enterScreen = document.getElementById('enterScreen');
    enterScreen.appendChild(iframe);

    addRoomNameDiv(inputValue);

}
