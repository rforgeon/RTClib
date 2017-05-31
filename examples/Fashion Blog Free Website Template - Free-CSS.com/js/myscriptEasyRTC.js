

//sessionStorage.removeItem('shopyparty_room');

(function()
{
  //check URL param and set sessionStorage if it exists
  if (catchParam('shopyparty_room') != false){
    sessionStorage.setItem('shopyparty_room', catchParam('shopyparty_room'));
  }
  //check sessionStorage for a room
  if( window.sessionStorage )
  {
    if( !sessionStorage.getItem('shopyparty_room') )
    {
      window.onload = function(){
        openIdleScreen();
        if (!sessionStorage.getItem('notified')){
          addNotificationIdle();
        }
      }
    }
    else
    window.onload = function(){
      var room = sessionStorage.getItem('shopyparty_room')
      console.log('shopyparty_room', room)
      startEnterScreen(room);
      addCloseBtn();
      var closeBtn = document.getElementById('closeiFrame');
      closeBtn.addEventListener('click', toggleIdleOn);
    }
  }
})();

function addNotificationIdle(){
  //on new session add notification
  setTimeout(
   function() {
     //add notification
     var notificationChild = document.createElement('div');

     var idleScreenDiv = document.getElementById('idleScreen');

     var notificationString = '<div class="notificationiFrame unset" id="notificationiFrame">'
     +'</div>';

     notificationChild.innerHTML = notificationString;
     //notificationChild = notificationChild.firstChild;
     idleScreenDiv.appendChild(notificationChild);

     //play ding
     var audio = new Audio('https://www.freesound.org/data/previews/91/91926_7037-lq.mp3');
     audio.play();

     sessionStorage.setItem('notified', true);

   }, 3000);

}


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
  var room = sessionStorage.getItem('shopyparty_room')
  toggleHome(false,startEnterScreen(room));
}

function toggleHomeOn(){
  toggleHome(true,iframeClose());
}

function toggleIdleOff(){
  toggleHome(true, idleClose());
}
function toggleIdleOn(){
  openIdleScreen();
  iframeClose();
  sessionStorage.removeItem('shopyparty_room');
  var room = sessionStorage.getItem('shopyparty_room')
  console.log('shopyparty_room', room)
  window.location.href = (location.host + location.pathname)
}
function toggleIdleOnNoReload(){
  openIdleScreen();
  iframeClose();
  sessionStorage.removeItem('shopyparty_room');
  var room = sessionStorage.getItem('shopyparty_room')
  console.log('shopyparty_room', room)
}

//catch room URLparam
function catchParam(param){
  var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
          // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
          // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }();
  //if the string isn't empty, return the requested param
  if (QueryString.shopyparty_room != undefined){
    return QueryString.shopyparty_room
  }
  return false;
}

function addRTCScript(){
  var my_awesome_script = document.createElement('script');

  my_awesome_script.setAttribute('src','https://simplewebrtc.com/latest-v2.js');

  document.body.appendChild(my_awesome_script);

}

//change homeButton to x
function homeClose(){
  //if(document.getElementById('floatHome')!= undefined){

    var homeFloat = document.getElementById('floatHome');

    homeFloat.remove();
  //}

  addCloseBtn();

  var closeBtn = document.getElementById('closeiFrame');
  closeBtn.addEventListener('click', toggleIdleOn);

}

function iframeClose(){
    if (document.getElementById('floatHome') != null)
    {
      document.getElementById('floatHome').remove();
    }
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
    if (document.getElementsByClassName('videoContainer') != null){
      var videoContainers = document.getElementsByClassName('videoContainer');
      for(var i = 0; i < videoContainers.length; i++ ){
        videoContainers[i].parentNode.removeChild(videoContainers[i]);
        console.log('VIDEOCONTAINERS[I]', videoContainers[i])
      }
    }
}

function idleClose(){
    if (document.getElementById('idleScreen') != null)
    {
      document.getElementById('idleScreen').remove();
    }
}

function openIdleScreen(){

  //remove room title
  if (document.getElementById('roomNameTitleiFrame') != undefined){
    document.getElementById('roomNameTitleiFrame').remove();
  }
  //remove room name
  if (document.getElementById('roomNameiFrame') != undefined){
    document.getElementById('roomNameiFrame').remove();
  }
  //remove close btn
  if (document.getElementById('closeiFrame') != undefined){
    document.getElementById('closeiFrame').remove();
  }
  //remove menu close btn
  if (document.getElementById('closeMenuiFrame') != undefined){
    document.getElementById('closeMenuiFrame').remove();
  }

  var idleChild = document.createElement('div');

  var idleDivString = '<div class="idleScreen unset" id="idleScreen" >'
  +'<div class="idleText">'
  +'🛍🎉'
  +'</div>'
  +'</div>';

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
  +'<p>Create a video chat room for you and your friends</p>'
  //+'<input class="roomInput unset" id="roomInput"></input>'
  +'<button class="addIFrame unset" id="addIFrame">Create</button>'
  +'</div>';

  homeChild.innerHTML = homeDivString;
  homeChild = homeChild.firstChild;
  document.body.appendChild(homeChild);

  var btn = document.getElementById('addIFrame');
  btn.addEventListener('click',toggleHomeOff);

  addCloseMenuBtn()
  var closeBtn = document.getElementById('closeMenuiFrame');
  closeBtn.addEventListener('click', toggleIdleOnNoReload);

}

function addCloseBtn(){
  var closeChild = document.createElement('div');

  var closeDivString = '<div class="closeiFrame unset" id="closeiFrame">'
  +'<img style="width:81%; margin-top:1px;" src="https://cldup.com/vUGrBlYs7J.png"/>'
  +'</div>';

  closeChild.innerHTML = closeDivString;
  closeChild = closeChild.firstChild;
  document.body.appendChild(closeChild);
}
function addCloseMenuBtn(){
  var closeMenuChild = document.createElement('div');

  var closeMenuDivString = '<div class="closeMenuiFrame unset" id="closeMenuiFrame">'
  +'<img style="width:81%; margin-top:1px;" src="https://cldup.com/vUGrBlYs7J.png"/>'
  +'</div>';

  closeMenuChild.innerHTML = closeMenuDivString;
  closeMenuChild = closeMenuChild.firstChild;
  document.body.appendChild(closeMenuChild);
}

function addRoomNameDiv(name){


  // (function (newName){
  //   $.ajax({
  //
  //     url: "https://api.rebrandly.com/v1/links",
  //     type: "post",
  //     data: JSON.stringify({
  //           "destination" : document.URL+"?room=newName"
  //         , "domain": { "fullName": "room.shopyparty.com" }
  //       , "slashtag": newName
  //       //, "title": "Rebrandly YouTube channel"
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "apikey": "9c3ffdccfed640e5abac894fc477a212"
  //     },
  //     dataType: "json",
  //     success: function (link) {
  //
  //       console.log("Long URL was "+link.destination+", short URL is "+link.shortUrl);
  //
  //       //add room link
  //       var roomNameChild = document.createElement('div');
  //
  //       var roomeNameString = '<div class="roomNameiFrame unset" id="roomNameiFrame" '
  //       +'160'
  //       +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
  //         +'<div class="roomName">'
  //           +'<div style="margin-left:43px;">'
  //             +'http://'+`${link.shortUrl}`
  //           +'</div>'
  //         +'</div>'
  //       +'</div>';
  //
  //       roomNameChild.innerHTML = roomeNameString;
  //       roomNameChild = roomNameChild.firstChild;
  //       document.body.appendChild(roomNameChild);
  //     }
  //   });
  // })(newName);

  //first add title bar
  var roomTitleChild = document.createElement('div');

  var roomeTitleString = '<div class="roomNameTitleiFrame unset" id="roomNameTitleiFrame" '
  +'160'
  +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
    +'<div class="roomTitle id="roomTitle">'
      +'<i class="fa fa-share" style="color:white; font-size:13px;" aria-hidden="true"></i>'
      +'Room'
    +'</div>'
  +'</div>';

  roomTitleChild.innerHTML = roomeTitleString;
  roomTitleChild = roomTitleChild.firstChild;
  document.body.appendChild(roomTitleChild);

  roomTitleChild.addEventListener('click', function() {

    var text = document.getElementById('js-copytextarea');
    console.log('COPYTEXTAREA', text.innerHTML)


    window.prompt("Copy to clipboard to Share: Ctrl+C, Enter", text.innerHTML);
  });

  //add room link
  var roomNameChild = document.createElement('div');

  var roomeNameString = '<div class="roomNameiFrame unset" id="roomNameiFrame" '
  +'160'
  +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
    +'<div class="roomName">'
      +'<div id="js-copytextarea" style="margin-left:43px;">'
        +document.URL
        +'?shopyparty_room='
        +name
      +'</div>'
    +'</div>'
  +'</div>';

  roomNameChild.innerHTML = roomeNameString;
  roomNameChild = roomNameChild.firstChild;
  document.body.appendChild(roomNameChild);


}

function setCopyOnClick(){
  //copy link on click
  var copyTextareaBtn = document.getElementById("roomTitle");
  console.log('COPYTEXTAREABTN', document.getElementById("roomTitle"))


  copyTextareaBtn.addEventListener('click', function() {

    var copyTextarea = document.getElementById('js-copytextarea');
    console.log('COPYTEXTAREA', copyTextarea)


    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);


    // var copyTextarea = document.getElementById('js-copytextarea');
    // copyTextarea.select();
    //
    // try {
    //   var successful = document.execCommand('copy');
    //   var msg = successful ? 'successful' : 'unsuccessful';
    //   console.log('Copying text command was ' + msg);
    // } catch (err) {
    //   console.log('Oops, unable to copy');
    // }
  });
}

function updateRoomMemberCountDiv(){

  var remotes = document.getElementById('remoteVideos');

  var remotesCount = 1 + remotes.childElementCount;

  if (document.getElementById('roomCount') != undefined){

    console.log('REMOTESCOUNT', remotesCount)

    var roomCountDiv = document.getElementById('roomCount');
    roomCountDiv.innerHTML = remotesCount;

  }
  else{
    var memberCountChild = document.createElement('div');

    var memberCountString = '<div class="roomCount unset" id="roomCount" '
    +'160'
    +'px; height:20px; text-align: center; margin:0 auto;overflow:hidden;">'
      +remotesCount
    +'</div>';

    memberCountChild.innerHTML = memberCountString;
    memberCountChild = memberCountChild.firstChild;
    document.body.appendChild(memberCountChild);
  }

}


function startEnterScreen(room){

  if (document.getElementById('remoteVideos') != undefined){
    var remotes = document.getElementById('remoteVideos');
    var remotesCount = 1 + remotes.childElementCount;
  }else{
    var remotesCount = 0;
  }
  console.log('REMOTESCOUNT in STARTSCREEN', remotesCount)
  if (remotesCount >= 4){
    console.log('ALERT CONDITION PASSED')
    alert("The room "+room+" is full with 5 members.")
    toggleIdleOn();
    return;
  }
  else{

    var enterScreenChild = document.createElement('div');
    console.log('ENTERSCREENCHILD', enterScreenChild)


    var enterScreenDivString = '<div class="enterScreen unset" id="enterScreen" >'
    +'<video height="110px;" class="localVideo" id="localVideo"></video>'
    +'</div>';

    //add remote video div
    var remoteScreenChild = document.createElement('div');
    var remoteScreenString = '<div class="remoteVideos" id="remoteVideos"></div>';

    remoteScreenChild.innerHTML = remoteScreenString;
    remoteScreenChild = remoteScreenChild.firstChild;
    document.body.appendChild(remoteScreenChild);


    enterScreenChild.innerHTML = enterScreenDivString;
    enterScreenChild = enterScreenChild.firstChild;
    document.body.appendChild(enterScreenChild);

    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: '',
      // immediately ask for camera access
      autoRequestMedia: true
    });


    // a peer video has been added
    webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var remotes = document.getElementById('remoteVideos');
        var remotesCount = 1 + remotes.childElementCount;

        if (remotesCount >= 4){
          console.log('ALERT CONDITION PASSED')
          alert("The room "+room+" is full with 4 members.")
          toggleIdleOn();
          return;
        }

        if (remotes) {
            console.log('REMOTESCOUNT', remotesCount)
            var newBottom = (remotesCount * 18)+8;
            console.log('NEWBOTTOM', newBottom)
            var container = document.createElement('div');
            container.className = 'videoContainer';
            container.setAttribute("style", "bottom:"+newBottom+"%");
            container.id = 'container_' + webrtc.getDomId(peer);
            container.appendChild(video);

            // suppress contextmenu
            video.oncontextmenu = function () { return false; };

            remotes.appendChild(container);
            //updateRoomMemberCountDiv();
        }
    });

    // a peer video was removed
    webrtc.on('videoRemoved', function (video, peer) {
        console.log('video removed ', peer);
        var remotes = document.getElementById('remoteVideos');
        var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
        if (remotes && el) {
            remotes.removeChild(el);
        }
        //updateRoomMemberCountDiv();
    });

    if (room == undefined){

      var inputValue =  Math.floor(100000 + Math.random() * 900000);

    }else{
      var inputValue = room;
    }

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
    // you can name it anything
      webrtc.joinRoom('inputValue');
    });

    //set current room name
    sessionStorage.setItem('shopyparty_room', inputValue);

    //add room name label
    addRoomNameDiv(inputValue);


    //make share room clickable
    //setCopyOnClick();



  }//end of else


}
