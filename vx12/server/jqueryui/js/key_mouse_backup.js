/*

The MIT License (MIT)
Copyright (c) 2011 Derek Ingrouville, Julien Lord, Muthucumaru Maheswaran

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
*/

var _fitScreen = false;
var _Attached  = false;
var _screenLayer = false;
var keyCount = new Array();
var count=0;



// custom global variables

function keyEvent(e) {
      unblur();
      var eventObj = window.event ? window.event : e;
      var unicode = eventObj.charCode? eventObj.charCode : eventObj.keyCode;
      var actualKey = String.fromCharCode(unicode);
      var flag=true;
      if(actualKey == 'p')
      {
        ws_server = "ws://localhost:7070/1_Handler";
      document.getElementById("app").href="1/custom.css";
      }
      else if(actualKey == 'w')
      {
        ws_server = "ws://localhost:7070/2_Handler";
          document.getElementById("app").href="2/custom.css";
      } 
      
       
        if(document.getElementById(actualKey))
        {
          removeDiv(actualKey);
          flag=false;
        }
      else
        flag=true;
      implement(actualKey);
      if(flag)
      {
        loadCanvas(actualKey);
         // createDiv(actualKey);
     }
     
};

document.onkeypress = keyEvent ;

function createDiv(actualKey)
{
  mainDiv = document.getElementsByClassName("ui-widget-content draggable")[0];
  var div = document.createElement("div");
  div.id = actualKey;
  div.style.width = "640px";
  div.style.height = "480px";
  div.style.background = "transparent";
  div.style.color = "white";
  div.style.top = '10px';
  div.style.left = '10px';
  div.innerHTML = actualKey;      
  mainDiv.appendChild(div);
}

function loadCanvas(key) {
    // div = document.getElementById(id);
    // div = document.getElementById("ui");
    createDiv(key);
    //   var canvas = document.createElement("canvas");
    // div = document.getElementById(key);
    //     keyCount.push(key+"rt");
    //     canvas.id     = keyCount[count];
    //     count = count+1;
    //  canvas.style.top="10px";
    //  canvas.style.left="10px";
    //     canvas.style.border   = "solid 1px #000000";
    //     canvas.style.position = "absolute";
    //     div.appendChild(canvas);
    //     var parent = canvas.parentNode;

    /*** Calling the Three.js functions for adding effects to the canvas ***/
    
   init(key);
   animate();
 //  color();
}
      

/**********************************************
*  Three.js functions for creating 3D effects
***********************************************/

function init(key) 
{
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = 1280/*window.innerWidth*/, SCREEN_HEIGHT = 720/*window.innerHeight*/;
  console.log("Window width is " + SCREEN_WIDTH + "Window height is " + SCREEN_HEIGHT);
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,200,400);
  camera.lookAt(scene.position);  
  // RENDERER
  if ( Detector.webgl )
    renderer = new THREE.WebGLRenderer( {antialias:true, alpha:true} );
  else
    renderer = new THREE.CanvasRenderer(); 
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var canvas = renderer.domElement;
  canvas.id = key + "rt";
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';
  renderer.setClearColor( 0x000000, 0 ); // the defaults
  container = document.getElementById( key );
  //renderer.setSize(container.style.width, container.style.height);
  container.appendChild( renderer.domElement );
  // EVENTS
  THREEx.WindowResize(renderer, camera);
  THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
  // CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );
  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,250,0);
  scene.add(light);

  // material
      var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/images.jpg')
      });
      scene.add()


  ////////////
  // CUSTOM //
  ////////////


  this.engine = new ParticleEngine();
  engine.setValues( Examples.starfield );
  engine.initialize();

  var smartdiv = document.getElementById("smartbox");
  smartdiv.style.cursor = 'pointer';
  smartdiv.onmouseover = function(){
    //smartdiv.src = 'images/lampOn.jpg';
    restartEngine( Examples.startunnel );
  };
  // smartdiv.onmouseclick = function(){
  //   restartEngine( Examples.startunnel );
  // }
  smartdiv.onmouseout = function(){
   // smartdiv.style.backgroundColor = 'yellow';
    //smartdiv.src = 'images/lampOff.jpg';
    restartEngine( Examples.fireflies  );
  };
  // smartdiv.onmouseclick = function(){
  //   restartEngine(Examples.startunnel);
  // };
  // GUI for experimenting with parameters

  gui = new dat.GUI();  
  parameters = 
  {
    fountain:   function() { restartEngine( Examples.fountain   ); },
    startunnel: function() { restartEngine( Examples.startunnel ); },   
    starfield:  function() { restartEngine( Examples.starfield  ); },   
    fireflies:  function() { restartEngine( Examples.fireflies  ); },   
    clouds:     function() { restartEngine( Examples.clouds     ); },   
    smoke:      function() { restartEngine( Examples.smoke      ); },   
    fireball:   function() { restartEngine( Examples.fireball   ); },   
    candle:     function() { restartEngine( Examples.candle     ); },   
    rain:       function() { restartEngine( Examples.rain       ); },   
    snow:       function() { restartEngine( Examples.snow       ); },   
    firework:   function() { restartEngine( Examples.firework   ); }    
  };

  gui.add( parameters, 'fountain'   ).name("Star Fountain");
  gui.add( parameters, 'startunnel' ).name("Star Tunnel");
  gui.add( parameters, 'starfield'  ).name("Star Field");
  gui.add( parameters, 'fireflies'  ).name("Fireflies");
  gui.add( parameters, 'clouds'     ).name("Clouds");
  gui.add( parameters, 'smoke'      ).name("Smoke");
  gui.add( parameters, 'fireball'   ).name("Fireball");
  gui.add( parameters, 'candle'     ).name("Candle");
  gui.add( parameters, 'rain'       ).name("Rain");
  gui.add( parameters, 'snow'       ).name("Snow");
  gui.add( parameters, 'firework'   ).name("Firework");

  gui.open(); 
}

function animate() 
{
  requestAnimationFrame( animate );
  render();   
  update();
}

function restartEngine(parameters)
{
  resetCamera();

  engine.destroy();
  engine = new ParticleEngine();
  engine.setValues( parameters );
  engine.initialize();
}

function resetCamera()
{
  // CAMERA
  var SCREEN_WIDTH = 720/*window.innerWidth*/, SCREEN_HEIGHT = 1280/*window.innerHeight*/;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  //camera.up = new THREE.Vector3( 0, 0, 1 );
  camera.position.set(0,200,400);
  camera.lookAt(scene.position);  
  scene.add(camera);

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  THREEx.WindowResize(renderer, camera);
}


function update()
{
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  engine.update( dt * 0.5 );  
}


function render() 
{
  renderer.render( scene, camera );
}

/**************** Three.js functions end************************/

    

    /******************************************************** 
    *Javascript effects for Color Pallete on the video browser 
    *********************************************************/

    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


    var scheme = null;
  // $(document).ready(function(){
      function color(ws){
      $("#hue-slider").slider({
        min: 0,
        max: 360,
        slide: function(e, ui) {
          // ui.value has the number
          setHue(ui.value, ws);
          console.log("Slider changed and ws: " + ws);
        }
      });
      
      $('#hex').change(function(){
        setHex( $('#hex').val() );

      });


      
      $('#set-hex').click(function(){
        setHex( $('#hex').val() );
      });
      
      
      scheme = new ColorScheme;
      setHue(0, ws);
      generateColors();
      
      // $('#add-complement').click(addComplement);
    }//);
    
    function generateColors() {
      $('#colors').html('');
      var colors = scheme.colors();
      for (var i in colors) {
        var c = colors[i];
        var newDiv = '<div class="color" style="background-color: #' + c + '"></div>';
        $('#colors').append(newDiv);
      }
    }
    
    function setHue(hue, ws) {
      scheme.from_hue(hue);
      
      var bg = scheme.colors()[0];
      $('#hue-box').css('background-color', '#' + bg);
      
      $('#hex').val( bg );
      $('#red').val( hexToR(bg) );
      $('#green').val( hexToG(bg) );
      $('#blue').val( hexToB(bg) );
      //console.warn("setHue Invoked");
      //ws.send("test msg\n");
      ws.send('ledColor' + ','+ hexToR(bg) + ',' + hexToG(bg) + ',' + hexToB(bg) + '\n');
      $('#hex-box').css('background-color', '#' + bg);
      
      generateColors();
    }
    
    function setHex(hex) {
      // Strip possible leading hash
      hex = hex.replace('#', '');
      
      console.log(hex);
      scheme.from_hex(hex);
      
      var bg = scheme.colors()[0];
      $('#hue-box').css('background-color', '#' + bg);
      $('#hex-box').css('background-color', '#' + hex);
      
      generateColors();
    }
    
    
    
    function setWebSafe(websafe) {
      scheme.web_safe(websafe);
      generateColors();
    }
    
    function randomHue() {
      var h = Math.round(Math.random() * 360);
      scheme.from_hue(h);
      generateColors();
    }

    /****************Color Pallete ends *********************/



var h = new Object();

/*****Functions for creating and sending live variables***********/
      
function liveVar(varName,value){
  var obj = new liveVarObj(varName,value);
  h[varName] = obj;
  console.log("Value is "+ obj.value);
  //obj.testupdate;
  return obj;
}
  
function liveVarObj(name, val){
  this.value = val;
  console.log(name + " Entered liveVarObj " + "with value " + this.value);
  this.onupdate = function() {};
  this.testupdate = function() {
  this.onupdate();
  console.log("Inside testupdate");
  };
}

/****Removes the div which was created on keypress**************/


function removeDiv(e)
{
  var div = document.getElementById(e);
  div.remove();
}  
       
// $(document).ready(function() {

/*********************************************************************************************** 
Initialising the web socket communication and handling all the messages passed from the C side 
***********************************************************************************************/
    
function implement(key){
  console.log("Implement key called");
    
  var currentCanvas = key + "rt";
  $.p = Processing.getInstanceById;
  var _codedKeys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 144, 155, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 157]; //pjs thing
  var _text_areas       = new Array();
  var _buttons          = new Array();
  var _remote_vars      = new Array();
  var _loaded_fonts     = new Array();
  var _pmx              = -1;
  var _pmy              = -1; 
  var _keys        = new Array();
  _keys['TYP']        = "NONE";
  _keys['PRE']        = "NONE";
    
  var _cb             = new Array();
  _cb['CLICK']         = false;
  _cb['MMOVE']         = false;
  _cb['MDRAG']         = false;
  _cb['MDRAGOUT']      = false;
  _cb['MDOWN']         = false;
  _cb['DROP']          = false;
  _cb['BCLICK']        = false;
  _cb['RESIZE']        = false;
  /* Callbacks for keys can be everything or individual keys */
  _cb['KEYST']        = false;
  _cb['KEYSP']        = false;
  _cb['KEYSR']        = false;
   
  var ws;  
  ws = new WebSocket(ws_server);
  var canvas = document.getElementById("root");
  var parent = canvas.parentNode;
  //var canvas = document.getElementById(key + "rt");
  // attaching the Processing engine to the canvas
  try
  {
    p = new Processing(canvas);
    p.noLoop();
    p.background(0,0);
  
    ws.onmessage = function(evt) {
        handleEvent("("+evt.data+")", p);
    };
    ws.onopen = function(evt) {
        var str = "EVENT SETUP " + document.width + " " + document.height + "\n";
        ws.send(str);
  
        
        color(ws);
        $('#conn_status').html('<b>Connected</b>');

        sendExpose(ws);
    };
    ws.onerror = function(evt) {
        $('#conn_status').html('<b>Error</b>');
    };
    ws.onclose = function(evt) {
        console.warn("Socket closed");
        //clearCanvas(p);
        $('#conn_status').html('<b>Closed</b>');
    };
    
    $(function() {
        $( ".draggable" ).draggable({cancel: "canvas, textarea"});
        $( "div.draggable, canvas" ).disableSelection();
    });
    function pollRemoteValue(name) {
        if (name in _remote_vars) {
            ws.send("POLL " + name + " " + _remote_vars[name] + "\n");
        } else {
            ws.send("POLL " + name + " NULL\n");
        }
    }
    function setRemoteVariable(name, newValue) {
        /* NB This will overwrite existing variables with the same name */
        _remote_vars[name] = value;
    }
    
    function handleEvent(cmd, p) {
        cmd = eval(cmd);
        switch(cmd.name) {

            case "PRELOAD":
                // $("body").prepend("<div class='preload' style='font-family:"+cmd.args[0]+";'>preloaded: "+cmd.args[0]+"</div>");
                // $(".preload").hide();
                break;
                
            case "UPDATE":
              var a=cmd.args[0];
              console.log("The variable received is "+a);
              var liv = h[a];
              console.log("The scope is "+liv);
              eval(liv);
              console.log("The variable object "+liv.value);
              liv.value = cmd.args[1];
              console.log("The variable object "+liv.value);
              liv.testupdate();
              break;
              
            case "USER_DEF":
              function testcode() {
              var n=cmd.args.length;

              var fn = cmd.args[0];
              fn=eval(fn);
          
              switch(n)
              {
                case 1:
                  fn();
                  break;
                case 2:
                  var a=cmd.args[1];
                  fn(a);
                  break;
                case 3:
                  var a=cmd.args[1];
                  var b=cmd.args[2];
                  fn(a,b);
                  break;
                case 4:
                  var a=cmd.args[1];
                  var b=cmd.args[2];
                  var c=cmd.args[3];
                  fn(a,b,c);
                  break;
                case 5:
                   var a=cmd.args[1];
                   var b=cmd.args[2];
                   var c=cmd.args[3];
                   var d=cmd.args[4];
                   fn(a,b,c,d);
                   break;
                case 6:
                   var a=cmd.args[1];
                   var b=cmd.args[2];
                   var c=cmd.args[3];
                   var d=cmd.args[4];
                   var e=cmd.args[5];
                   fn(a,b,c,d,e);
                   break;
                case 7:
                   var a=cmd.args[1];
                   var b=cmd.args[2];
                   var c=cmd.args[3];
                   var d=cmd.args[4];
                   var e=cmd.args[5];
                   var f=cmd.args[6];
                   fn(a,b,c,d,e,f);
                   break;
                case 8:
                   var a=cmd.args[1];
                   var b=cmd.args[2];
                   var c=cmd.args[3];
                   var d=cmd.args[4];
                   var e=cmd.args[5];
                   var f=cmd.args[6];
                   var g=cmd.args[7];
                   fn(a,b,c,d,e,f,g);
                   break;
                case 9:
                   var a=cmd.args[1];
                   var b=cmd.args[2];
                   var c=cmd.args[3];
                   var d=cmd.args[4];
                   var e=cmd.args[5];
                   var f=cmd.args[6];
                   var g=cmd.args[7];
                   var h=cmd.args[8];
                   fn(a,b,c,d,e,f,g,h);
                   break;
              }
        
          };
              
          // Searching the Javascript file created by the user, with the same name as the function name
        
          var fileref=document.createElement("script");
          fileref.setAttribute("type","text/javascript");
          var filepath = "clients/V1/" + cmd.args[0] + ".js";
          fileref.setAttribute("src", filepath);
          var mainDiv = document.getElementsByClassName("ui-widget-content draggable")[0];
          mainDiv.appendChild(fileref);
          fileref.addEventListener('load', testcode, false);         
          break;
        
        default:

          /************ draw_functions.js has some additional switch cases, could be removed if not needed **************/
          
          drawing_fn(cmd, currentCanvas);
          break;
        }
    }
    

    
    /* NB All these send methods could (should) be added to the WebSocket prototype and called directly instead */
    /* Leaving that as a TODO for now */
    function sendExpose(ws) {
        ws.send("EVENT EXPOSE\n")
    }
    function sendClick(ws, x, y, b) {
        if (!_cb['CLICK']) {
            return false;
        }
        var str = "EVENT CLICK " + x + " " + y + " " + b + "\n";
        ws.send(str);
        
    }
    function sendMouseDown(ws, x, y, b) {
        if (!_cb['MDOWN']) {
            return false;
        }
        var str = "EVENT MDOWN " + x + " " + y + " " + b + "\n";
        ws.send(str);
    }
    function sendMouseDrag(ws, x, y, dx, dy, b) {
        if (!_cb['MDRAG']) {
            return false;
        }
        var str = "EVENT MDRAG " + x + " " + y + " " + dx + " " + dy + " " + b + "\n";
        ws.send(str);
    }
    function sendMouseDragOut(ws, x, y, dx, dy, b) {
        /* cancel the drag regardless of sending the message back */
        p.__mousePressed = false;
        p.mouseReleased();
        if (_Attached) {
      q__mousePressed = false;
      q.mouseReleased();
        }
        if (!_cb['MDRAGOUT']) {
            return false;
        }
        var str = "EVENT MDRAGOUT " + x + " " + y + " " + dx + " " + dy + " " + b + "\n"
        ws.send(str)
    }
    function sendMouseMove(ws, x, y, dx, dy) {
        if (!_cb['MMOVE']) {
            return false;
        }
        var str = "EVENT MMOVE " + x + " " + y + " " + dx + " " + dy + "\n";
        ws.send(str);
    }
    function sendKeyTyped(ws, keycode) {
        if (_cb['KEYST'] === false) return false;
        if (_cb['KEYST'] === true || _cb['KEYST'].indexOf(keycode) != -1) {
            var str = "EVENT KEYTYPED " + keycode + "\n";
            ws.send(str);
        }
    }
    function sendKeyPressed(ws, keycode) {
        if (_cb['KEYSP'] === false) return false;
        if (_cb['KEYSP'] === true || _cb['KEYSP'].indexOf(keycode) != -1) {
            var str = "EVENT KEYPRESSED " + keycode + "\n";
            ws.send(str);
        }
    }
    function sendKeyReleased(ws, keycode) {
        if (_cb['KEYSR'] === false) return false;
        if (_cb['KEYSR'] === true || _cb['KEYSR'].indexOf(keycode) != -1 ) {
            var str = "EVENT KEYRELEASED " + keycode + "\n";
            ws.send(str);
        }
    }
    function sendButtonClicked(ws, buttonId) {
        if (!_cb['BCLICK']) {
            return false;
        }
        var str = "EVENT BCLICK " + buttonId + "\n";
        ws.send(str);
    }
    function sendResize(ws, width, height) {
        if (!_cb['RESIZE']) {
            return false;
        }
        var str = "EVENT RESIZE " + width + " " + height + "\n";
        ws.send(str);
    }
    function dropHelper(e) {
        if (!_cb['DROP']) {
            return false;
        }
        e.stopPropagation();
        e.preventDefault();
    }
    function dropListener(e) {
        if (!_cb['DROP']) {
            return false;
        }
        e.stopPropagation();
        e.preventDefault();
        
        var files = e.dataTransfer.files;
        
        
        for(var i=0,f; f = files[i]; i++) {
            var reader = new FileReader();
            /* Code based on www.html5rocks.com tutorial */
            function errorHandler(e) {
                switch(e.target.error.code) {
                  case e.target.error.NOT_FOUND_ERR:
                    alert("File not found.");
                    break;
                  case e.target.error.NOT_READABLE_ERR:
                      alert("File is not readable.");
                      break;
                  case e.target.error.ABORT_ERR:
                      break;
                  default:
                      alert("Unknown error occurred.");
                };
            }
            /* TODO Use this if we create a loading bar widget */
            function updateProgress(e) {
                if (e.lengthComputable) {
                    var percentLoaded = Math.round((e.loaded / e.total) * 100);
                    if (percentLoaded < 100) {
                        //Do something?
                    }        
                 }
            }    
            
            
            reader.onloadstart = (function(file) {
              return function(e) {
                /* Send the INIT message */
                var str = ""
                var fname = file.name.replace(/ /g, "_"); //swap spaces for underscores
                if (file.type.match('text.*')) {
                    str = "EVENT DROP INIT " + fname + " " + file.type + " " + file.size + "\n";
                } else {
                    str = "EVENT DROP64 INIT " + fname + " " + file.type + " " + file.size + "\n";
                }                    
                ws.send(str);
              };
            })(f);
            reader.onprogress = updateProgress;
            reader.onabort = function(e) {
                /*TODO create an ABORT event on hlib? */
                alert("File read cancelled.");
            };
            reader.onerror = errorHandler;
            
            /* File transfer for binary file types is done in Base64 encoding     */
            /* File type is a BEST GUESS approach. It might not be right.         */
            /* Expect that at the application side and be ready to decode as    */
            /* needed. The event fired is different, so files can be treated     */
            /* differently easily. This is a temporary workaround until sending    */
            /* binary files ius fixed in Chrome (probably v15 or 16)            */
            reader.onload = (function(file) {
              return function(e) {
                if (e.target.readyState == FileReader.DONE) {
                    /* The file is loaded entirely in local storage */
                    var chunk_size = 1048576; /* 1 Meg chunk size */
                    var chunk_counter = 0;
                    var fname = file.name.replace(/ /g, "_"); //swap spaces for underscores
                    if (file.type.match('text.*')) {
                        /* Text files don't need encoding. */
                        var payload = e.target.result;
                        for (var start = 0; start < payload.length; start += chunk_size+1) {
                            var chunk = payload.substr(start, chunk_size);
                            var str = "EVENT DROP CHUNK " + fname + " " + file.type + " " + file.size + " " + chunk.length + " " + chunk_counter + "\n";
                            ws.send(str);
                            ws.send(chunk);
                            chunk_counter++
                        }
                        /* Send the END message */
                        var str = "EVENT DROP END " + fname + " " + file.type + " " + file.size + "\n";
                        ws.send(str);
                    } else {
                        /* Doesn't seem like a text file. Base64 encode it */
                        var payload = Base64.encode(e.target.result);
                        for (var start = 0; start < payload.length; start += chunk_size+1) {
                            var chunk = payload.substr(start, chunk_size);
                            var str = "EVENT DROP64 CHUNK " + fname + " " + file.type + " " + file.size + " " + payload.length + " " + chunk.length + " " + chunk_counter + "\n";
                            ws.send(str);
                            ws.send(chunk);
                            chunk_counter++
                        }
                        /* Send the END message */
                        var str = "EVENT DROP64 END " + fname + " " + file.type + " " + file.size + " " + payload.length + "\n";
                        ws.send(str);
                    }
                }
              };                
            })(f);
            /* NB:: w3c spec says readAsArrayBuffer is the way to go and readAsBinaryString is deprecated. */
            /* BUT!
             * Chrome 14 doesn't yet support sending ArrayBuffers as websocket data. This means we're sticking to 
             * binaryString for now. It also means that file transfers only work with text data for now. */    
            //reader.readAsArrayBuffer(f);
            reader.readAsBinaryString(f);
        }
    }
    /* These should probably only be defined if callbacks exist         */
    /* Requires generating these methods on-demand on the server-side     */
    /* if and only a callback has been registered for the action.        */
    /* This would help lighten network load for sure.                    */
    p.mouseReleased = function() {
        //this.println("Released (up/click)("+this.mouseX+","+this.mouseY+"), button: " + this.mouseButton);
        sendClick(ws, this.mouseX, this.mouseY, this.mouseButton);
    };
    
    p.mousePressed = function() {
        //this.println("Pressed (down) ("+this.mouseX+","+this.mouseY+"), button: " + this.mouseButton);
        sendMouseDown(ws, this.mouseX, this.mouseY, this.mouseButton);
    };
    p.mouseDragged = function() {
        /* Disable mouseDrag inside text areas to allow selection of text. */ 
        for (i in _text_areas) {
            var area = $(_text_areas[i]);
            var x_min = $(area).position().left;
            var x_max = x_min + $(area).width();
            var y_min = $(area).position().top;
            var y_max = y_min + $(area).height();
            if (this.mouseX >= x_min && this.mouseX <= x_max && 
                this.mouseY >= y_min && this.mouseY <= y_min) {
                    return false;
                }
        }
        sendMouseDrag(ws, this.mouseX, this.mouseY, this.mouseX - this.pmouseX, this.mouseY - this.pmouseY, this.mouseButton);
        if ( this.mouseX >= this.width || this.mouseX <= 0 || this.mouseY >= this.height || this.mouseY <= 0 ) {
            sendMouseDragOut(ws, this.mouseX, this.mouseY, this.mouseX - this.pmouseX, this.mouseY - this.pmouseY, this.mouseButton);
        }
        return true;
    }
    p.mouseMoved = function() {
        sendMouseMove(ws, this.mouseX, this.mouseY, this.mouseX - this.pmouseX, this.mouseY - this.pmouseY);
    }
/
    /* Used in conjunction, this delays the resize event firing to prevent multiple events */
    /* adapted from: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed */
    $(window).resize( function() {
        waitForFinalEvent(function(){
            sendResize(ws, $(window).width(), $(window).height());
            if (_fitScreen === true) {
                var width = $(window).width, height = $(window).height;
                p.size(width, height);
                q.size(width, height);
                $(canvas).parent().width(width);
                $(canvas).parent().height(height);
            }
        }, 500, "winResize");
        
    });
    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();
    
    var press = function(e) {
        /* TODO: Is more information sending needed/relevant? */
        /* If we ever want to tramsmit the actual character, use String.fromCharCode(k) */
        var k = e.which || e.keyCode;
        // NB changes \r to \n to
        if (k==13) k = 10;
        sendKeyTyped(ws, k);
        if (  _keys['TYP'] === "ALL" || _keys['TYP'].indexOf(k) != -1) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    
    var down = function(e) {
        /* TODO: Is more information sending needed/relevant? */
        var k = e.which || e.keyCode;
        sendKeyPressed(ws, k);
        if ( _keys['PRE'] === "ALL" || _keys['PRE'].indexOf(k) != -1 ) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    
    var release = function(e) {
        /* TODO: Is more information sending needed/relevant? */
        var k = e.which || e.keyCode;
        sendKeyReleased(ws, k);
        return true;
    }
    
    parent.addEventListener('keydown', down, false);
    parent.addEventListener('keypress', press, false);
    parent.addEventListener('keyup', release, false);
    
    
  }
  catch(err)
  {
    console.log(err);
  }
 }//);
