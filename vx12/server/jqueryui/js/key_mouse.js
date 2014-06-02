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
var ws = new Array();
var verified = true;

// custom global variables

function loadInterface() {
  if (verified)
  {   
    $('#system-fb-login-btn').slideUp(1000);
    document.getElementById('system-default-login-btn').value = 'Verified';
    setTimeout(function(){$('.login').fadeOut(2000);}, 2000);    
    setTimeout(function(){keyEvent();}, 5000);    
  } else {
    document.getElementById('system-default-login-btn').value = 'Incorrect Info';
    setTimeout(function(){document.getElementById('system-default-login-btn').value = 'Try Again';}, 1500);
  }
}

function keyEvent() {
      unblur();
    	if (getAppHandler('robot_1') != null)
      {
        ws_server[0] = "ws://localhost:7070" + getAppHandler('robot_1');
      }
      else
      {
        ws_server[0] = "ws://localhost:7070/1_Handler";
      }
      if (getAppHandler('lamp_1') != null)
      {
        ws_server[1] = "ws://localhost:7070" + getAppHandler('lamp_1');
      }
      else
      {
        ws_server[1] = "ws://localhost:7070/2_Handler";
      }
      if (getAppHandler('lamp_2') != null)
      {
        ws_server[2] = "ws://localhost:7070" + getAppHandler('lamp_2');
      }
      else
      {
        ws_server[2] = "ws://localhost:7070/3_Handler";
      }
      
			//document.getElementById("app").href="1/custom.css";
    	// }
    	// else if(actualKey == 'w')
    	// {
    	// 	ws_server = "ws://localhost:7070/2_Handler";
    	//     document.getElementById("app").href="2/custom.css";
    	// }	
      
      //implement();
      loadCanvas();
      removeDiv();
};

function createDiv()
{
  mainDiv = document.getElementsByClassName("ui-widget-content")[0];
  var div = document.createElement("div");
  div.id = 'trans';
  div.style.width = "640px";
  div.style.height = "480px";
  div.style.background = "transparent";
  div.style.color = "white";
  div.style.top = '10px';
 // div.style.position = 'absolute';
  div.style.left = '10px';
  
  if (facebook_login) 
  {
    FB.api('/me', function(response) {
      $('#welcome-text').text('Welcome, ' + JSON.parse(JSON.stringify(response)).first_name + '.');
    });    
  }
  else
  {
    $('#welcome-text').text('Welcome, ' + document.getElementById('system-login-username').value + '.');
  }
  $('#welcome-message').fadeIn(2000);
  setTimeout(function(){$('#welcome-message').fadeOut(1500);}, 3500);
  mainDiv.appendChild(div);
}

function loadCanvas() {
   createDiv();
    /*** Calling the Three.js functions for adding effects to the canvas ***/    
  //  init();
	// animate();
 
}
      

/**********************************************
*  Three.js functions for creating 3D effects
***********************************************/

function init() 
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

  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';
  renderer.setClearColor( 0x000000, 0 ); // the defaults
  var canvas = renderer.domElement;
  canvas.id = 'three';
  container = document.getElementById( 'trans' );

  //renderer.setSize(container.style.width, container.style.height);
  container.appendChild( canvas );

  // var ctx = canvas.getContext('2d');
  // ctx.fillText("Welcome" + textval, 10, 50);

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
  engine.setValues( Examples.startunnel );
  engine.initialize();

 
  
  // GUI for experimenting with parameters

  gui = new dat.GUI();  
  parameters = 
  {
    fountain:   function() { restartEngine( Examples.fountain  ); },
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

  //   function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  //   function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  //   function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  //   function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


  //   var scheme = null;
  // // $(document).ready(function(){
  //     function color(ws){
  //     $("#hue-slider").slider({
  //       min: 0,
  //       max: 360,
  //       slide: function(e, ui) {
  //         // ui.value has the number
  //         setHue(ui.value, ws);
  //         console.log("Slider changed and ws: " + ws);
  //       }
  //     });
      
  //     $('#hex').change(function(){
  //       setHex( $('#hex').val() );

  //     });


      
  //     $('#set-hex').click(function(){
  //       setHex( $('#hex').val() );
  //     });
      
      
  //     scheme = new ColorScheme;
  //     setHue(0, ws);
  //     generateColors();
      
  //     // $('#add-complement').click(addComplement);
  //   }//);
    
  //   function generateColors() {
  //     $('#colors').html('');
  //     var colors = scheme.colors();
  //     for (var i in colors) {
  //       var c = colors[i];
  //       var newDiv = '<div class="color" style="background-color: #' + c + '"></div>';
  //       $('#colors').append(newDiv);
  //     }
  //   }
    
  //   function setHue(hue, ws) {
  //     scheme.from_hue(hue);
      
  //     var bg = scheme.colors()[0];
  //     $('#hue-box').css('background-color', '#' + bg);
      
  //     $('#hex').val( bg );
  //     $('#red').val( hexToR(bg) );
  //     $('#green').val( hexToG(bg) );
  //     $('#blue').val( hexToB(bg) );
  //     //console.warn("setHue Invoked");
  //     //ws.send("test msg\n");
  //     ws.send('ledColor' + ','+ hexToR(bg) + ',' + hexToG(bg) + ',' + hexToB(bg) + '\n');
  //     // restartEngine( Examples.fountain(bg) );
  //     $('#hex-box').css('background-color', '#' + bg);
      
  //     generateColors();
  //   }
    
  //   function setHex(hex) {
  //     // Strip possible leading hash
  //     hex = hex.replace('#', '');
      
  //     console.log(hex);
  //     scheme.from_hex(hex);
      
  //     var bg = scheme.colors()[0];
  //     $('#hue-box').css('background-color', '#' + bg);
  //     $('#hex-box').css('background-color', '#' + hex);
      
  //     generateColors();
  //   }
    
    
    
  //   function setWebSafe(websafe) {
  //     scheme.web_safe(websafe);
  //     generateColors();
  //   }
    
  //   function randomHue() {
  //     var h = Math.round(Math.random() * 360);
  //     scheme.from_hue(h);
  //     generateColors();
  //   }

    /****************Color Pallete ends *********************/


   /***********Robert's Color Pallet code********************/

   function sendColor(ws, red, green, blue) {
      console.log("Web socket in sendColor " +ws);
      ws.send('ledColor' + ','+ red + ',' + green + ',' + blue + '\n');
    }

    function getMousePos(colorCanvas, evt) {
        var rect = colorCanvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

      // function drawColorSquare(colorCanvas, color, colorImageObj) {
      //   var colorSquareSize = 100;
      //   var padding = 10;
      //   var colorContext = colorCanvas.getContext('2d');
      //   var squareX = (colorCanvas.width - colorSquareSize + colorImageObj.width) / 2;
      //   var squareY = (colorCanvas.height - colorSquareSize) / 2;

      //   colorContext.beginPath();
      //   colorContext.fillStyle = color;
      //   colorContext.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
      //   colorContext.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
      // }

      function selectColor(mouseDown, evt, ws){
         var color_canvas = document.getElementById('colorCanvas');
         var mousePos = getMousePos(color_canvas, evt);
          var color = undefined;

          if(mouseDown && mousePos !== null && mousePos.x <  color_canvas.width 
            && mousePos.y < color_canvas.height) {
            var imageData = color_canvas.getContext('2d').getImageData(0, 0, color_canvas.width, color_canvas.width);
            var data = imageData.data;
            var x = mousePos.x;
            var y = mousePos.y;
            var pixel = ((color_canvas.width * y) + x) * 4
            var alpha = data[pixel + 3];
            
            if (alpha > 0) {
              console.log('alpha called');
              var red = data[pixel];
              var green = data[pixel+ 1];
              var blue = data[pixel + 2];
              var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
              // drawColorSquare(color_canvas, color, colorImageObj);
              sendColor(ws, red, green, blue);
           }
            
          }
      }
      
      function colorPickerInit(colorImageObj, ws){
        var padding = 0;
        var color_canvas = document.getElementById('colorCanvas');
        var colorContext = color_canvas.getContext('2d');
        var mouseDown = false;
        console.log("Web socket in Colorpickerinit " +ws);
        colorContext.strokeStyle = '#444';
        colorContext.lineWidth = 2;

        color_canvas.addEventListener('mousedown', function(ev) {
          mouseDown = true;
          selectColor(mouseDown, ev, ws);
        }, false);

        color_canvas.addEventListener('mouseup', function() {
          mouseDown = false;
        }, false);

        color_canvas.addEventListener('mousemove', function(evt) {
          selectColor(mouseDown, evt, ws);
         
        }, false);


        // colorContext.drawImage(colorImageObj, padding, padding);
        // drawColorSquare(color_canvas, 'white', colorImageObj);
      }

  
   /***************Robert's code ends************************/



 

 
   



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


function removeDiv()
{
  var div = document.getElementsByClassName('login')[0];
  div.remove();
 // document.getElementsByTagName('body')[0].removeChild(div);
 //div.style.display = 'none';
}  
       
// $(document).ready(function() {

/*********************************************************************************************** 
Initialising the web socket communication and handling all the messages passed from the C side 
***********************************************************************************************/
  	
function implement(){
  console.log("Implement key called");
  	
  var currentCanvas = 'three';
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
   
  //var ws;  
  ws[0] = new WebSocket(ws_server[0]);
  ws[1] = new WebSocket(ws_server[1]);
  var canvas = document.getElementById("root");
  var parent = canvas.parentNode;

  // attaching the Processing engine to the canvas
  try
  {
    p = new Processing(canvas);
    p.noLoop();
    p.background(0,0);
  
    ws[0].onmessage = function(evt) {
        handleEvent("("+evt.data+")", p);
    };
    
    /*****************************************************************************************
    ws[0]onopen() function starts, most ws.send manipulations and functions are here
    *****************************************************************************************/

    ws[1].onopen = function(evt){

    


    }

    



    ws[0].onopen = function(evt) {
        var str = "EVENT SETUP " + document.width + " " + document.height + "\n";
        ws[0].send(str);

      
      //  var colorImageObj = new Image();
      //       colorImageObj.src = 'images/color-picker.png';
      //       colorImageObj.onload = function() {
      //       var width = colorImageObj.width;
      //       var height = colorImageObj.height;
      //       var context = document.getElementById('colorCanvas').getContext("2d");
      //       context.drawImage(colorImageObj, 0, 0, 113, 132);

      //       /*******Perspective****************/

      //   //      for (var i = 0; i <= height / 2; ++i) {
      //   // //         context.setTransform(1, -0.4 * i / height, 0, 1, 0, 60);
      //   //           context.drawImage(colorImageObj, 0, height / 2 - i, width, 2, 0, height / 2 - i, width, 2);
      //   // //         context.setTransform(1, 0.4 * i / height, 0, 1, 0, 60);
      //   //          context.drawImage(colorImageObj, 0, height / 2 + i, width, 2, 0, height / 2 + i, width, 2);
      //   //  }
      //   colorPickerInit(colorImageObj, ws[1]);
      // };

      /*************The base*****************/

      var outB = document.getElementById('outerBase');
      var menuB = document.getElementById('menuBase');
      var Base = document.getElementById('Base');
      Base.onmouseover = function(){
        menuB.style.display = "block"; menuB.style.position = "absolute"; menuB.style.backgroundColor = 'rgba(240, 177, 82, 0.2)'; menuB.style.height= '150px'; menuB.style.width= '100px'; menuB.style.top= '72%'; menuB.style.left= '37%'; menuB.style.zIndex= '2'; menuB.style.cursor= 'pointer';
        robotBase(ws[0]);
      };
      outB.onmouseout = function(){
      menuB.style.display  = 'none';
      }

            /*************Code for color pallet web socket connection**************/  

        
   
      /*****************Lamp1*******************************/

    /***Extracting the most dominant color in the background using Color Thief*****/
    // var col = document.getElementById('col');
    // var colorThief = new ColorThief();
    // var dominantCol = colorThief.getColor(col);
    // console.log("Dominant color r,g,b values " + dominantCol);


      var outLamp1 = document.getElementById('outerLamp1');
      var menuLamp1 = document.getElementById('menuLamp1');
      var lamp1 = document.getElementById('Lamp1');
      lamp1.onmouseover = function(){
      menuLamp1.style.display = "block"; menuLamp1.style.position = "absolute"; menuLamp1.style.backgroundColor = 'rgba(240, 177, 82, 0.2)'; menuLamp1.style.height= '300px'; menuLamp1.style.width= '150px'; menuLamp1.style.top= '39%'; menuLamp1.style.left= '15%'; menuLamp1.style.zIndex= '2'; menuLamp1.style.cursor= 'pointer';
      lampMenu(ws[1]);
      
     }
    
     outLamp1.onmouseout = function(){
       menuLamp1.style.display  = 'none';
     }



      /***************The body******************/

      var outBody = document.getElementById('outerBody');
      var menuBody = document.getElementById('menuBody');
      var Body = document.getElementById('Body');
      Body.onmouseover = function(){
        menuBody.style.display = "block"; menuBody.style.position = "absolute"; menuBody.style.backgroundColor = 'rgba(240, 177, 82, 0.2)'; menuBody.style.height= '150px'; menuBody.style.width= '100px'; menuBody.style.top= '72%'; menuBody.style.left= '60%'; menuBody.style.zIndex= '2'; menuBody.style.cursor= 'pointer';
        robotBody(ws[0]);
      };
      outBody.onmouseout = function(){
      menuBody.style.display  = 'none';
      }

      
      /*****The head portion***********/
      
      var outHead = document.getElementById('outerHead');
      var menuHead = document.getElementById('menuHead');
      var lampHead = document.getElementById('lampHead');
      lampHead.onmouseover = function(){
        menuHead.style.display = "block"; menuHead.style.position = "absolute"; menuHead.style.backgroundColor = 'rgba(240, 177, 82, 0.2)'; menuHead.style.height= '150px'; menuHead.style.width= '100px'; menuHead.style.top= '38%'; menuHead.style.left= '48%'; menuHead.style.zIndex= '2'; menuHead.style.cursor= 'pointer';
        robotHead(ws[0]);
      };
      outHead.onmouseout = function(){
      menuHead.style.display  = 'none';
      }

      /***************The hand******************/

      var outHand = document.getElementById('outerHand');
      var menuHand = document.getElementById('menuHand');
      var Hand = document.getElementById('Hand');
      Hand.onmouseover = function(){
        menuHand.style.display = "block"; menuHand.style.position = "absolute"; menuHand.style.backgroundColor = 'rgba(240, 177, 82, 0.2)'; menuHand.style.height= '150px'; menuHand.style.width= '100px'; menuHand.style.top= '34%'; menuHand.style.left= '66%'; menuHand.style.zIndex= '2'; menuHand.style.cursor= 'pointer';
        robotHand(ws[0]);
      };
      outHand.onmouseout = function(){
      menuHand.style.display  = 'none';
      }


       // color(ws[0]);
        $('#conn_status').html('<b>Connected</b>');

        sendExpose(ws[0]);
    };

    /***************onopen() ends******************************************************/
    

    ws[0].onerror = function(evt) {
        $('#conn_status').html('<b>Error</b>');
    };
    ws[0].onclose = function(evt) {
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
            ws[0].send("POLL " + name + " " + _remote_vars[name] + "\n");
        } else {
            ws[0].send("POLL " + name + " NULL\n");
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
          		
            /***************The JADE/hlib magic: Reads any variable function with variable arguments, passed by the user***********************/

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

    
    
  }
  catch(err)
  {
    console.log(err);
  }
 }//);
