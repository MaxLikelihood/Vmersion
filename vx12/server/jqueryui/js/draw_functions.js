

function drawing_fn(cmd, currentCanvas)
{
	switch(cmd.name)
		{
			case "ARC":
                $.p(currentCanvas).arc(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3], cmd.args[4], cmd.args[5]);
            break;
            case "ELIP":
              $.p(currentCanvas).ellipse(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
            break;
            case "LI2D":
                $.p(currentCanvas).line(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
            break;
            case "PO2D":
                $.p(currentCanvas).point(cmd.args[0], cmd.args[1]);
            break;
            case "QUAD":
                $.p(currentCanvas).quad(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3], cmd.args[4], cmd.args[5], cmd.args[6], cmd.args[7]);
            break;
            case "RECT":
                $.p(currentCanvas).rect(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
            break;
            case "TRI":
                $.p(currentCanvas).triangle(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3], cmd.args[4], cmd.args[5]);
            break;
            case "BG":
                $.p(currentCanvas).background(cmd.args[0], cmd.args[1], cmd.args[2]);
            break;
             case "STROKE_PALLET":
                var palletID = "#" + cmd.args[0];
                if ($(palletID).length == 0) {
                    $.p(currentCanvas).stroke(0);                    
                }
                else {
                    $.p(currentCanvas).stroke(parseInt( $(palletID).val().replace("#", "0xFF") ));
                }
            break; 
            case "FILL_PALLET":
                // fill_pallet(cmd, currentCanvas);
                var palletID = "#" + cmd.args[0];
                if ($(palletID).length == 0) {
                    $.p(currentCanvas).fill(0);                    
                }
                else {
                    $.p(currentCanvas).fill(parseInt( $(palletID).val().replace("#", "0xFF") ));
                }
                case "ELIP_MODE":
                $.p(currentCanvas).ellipseMode(cmd.args[0]);
            break;
            case "RECT_MODE":
                $.p(currentCanvas).rectMode(cmd.args[0]);
            break;
            case "ST_CAP":
                $.p(currentCanvas).strokeCap(cmd.args[0]);
            break;
            case "ST_JOIN":
                $.p(currentCanvas).strokeJoin(cmd.args[0]);
            break;
            case "BEGIN_SHAPE":
                $.p(currentCanvas).beginShape(cmd.args[0]);
            break;
            case "END_SHAPE":
                $.p(currentCanvas).endShape(cmd.args[0]);
            break;
            case "VERTEX":
                $.p(currentCanvas).vertex(cmd.args[0], cmd.args[1]);
            break;
            case "LOAD_FONT":
                var f = $.p(currentCanvas).loadFont(cmd.args[0], cmd.args[1]);
                _loaded_fonts[cmd.args[0]] = f;
                $.p(currentCanvas).textFont(f);
            break;
            case "TXT_FONT":
                var f = _loaded_fonts[cmd.args[0]];
                if (f == null) {
                    f = $.p(currentCanvas).loadFont(cmd.args[0], cmd.args[1]);
                }
                $.p(currentCanvas).textFont(f);
            break;
            case "PUSH_MAT":
                $.p(currentCanvas).pushMatrix();
            break;
            case "POP_MAT":
                $.p(currentCanvas).popMatrix();
            break;
            case "TRANSL_2i":
            case "TRANSL_2f":
                $.p(currentCanvas).translate(cmd.args[0], cmd.args[1]);
            break;
            case "ROTATE":
                $.p(currentCanvas).rotate(cmd.args[0]);
            break;
            case "CREATE_TOOLBAR":
                var a = $(document.createElement("div"));
                $(".ui-widget-content").prepend(
                a.attr("id", "toolbar")
                );
                break;
            case "CREATE_PALLET":
                var a = $(document.createElement("input"));
                $("div#toolbar").append(
                    a.attr("type", "hidden")
                    .attr("id", cmd.args[0]) //pallet name
                    .attr("class", "color-picker")
                    .attr("value", cmd.args[1]) //default color
                );
                $(".color-picker").miniColors()
                break;
            case "ADD_BUTTON":
                var a = $(document.createElement("input"));
                $("div#toolbar").append(
                    a.attr("type", "radio")
                    .attr("id", cmd.args[0])
                    .attr("name", "radio")
                    .click(function () {sendButtonClicked(ws, cmd.args[0])})
                );
                a = $(document.createElement("label"));
                $("div#toolbar").append(
                    a.attr("for", cmd.args[0])
                    .text(cmd.args[1])
                );

                $("div#toolbar > :first").attr("checked", "checked");
                $("div#toolbar").buttonset();
                break;
            case "VIDEOTAG":
                var a = $(document.createElement("video"));
                $(".ui-widget-content").prepend(
                    a.attr({id: "livevideo", autoplay: "true"})
                .css("position", "absolute")
                .css("left", "10px")
                .css("top", "10px")
                );
                var a = $(document.createElement("source"));
                $("#livevideo").append(
                    a.attr({type: cmd.args[1], src: cmd.args[0]})
                );

                $("#root").css("position", "absolute")
                      .css("left", "10px")
                      .css("top", "10px")
                      .css("border", "0px");
                $("#root").parent().height(cmd.args[3]+20).width(cmd.args[2]+20);
                $.p(currentCanvas).background(0, 0);
                $.p(currentCanvas).size(cmd.args[2], cmd.args[3]);
                break;
            case "TXT":
                $.p(currentCanvas).text(cmd.args[0], cmd.args[1], cmd.args[2]);
                break;
         
            case "CM_D":
            case "CM_F":
                /* NB there's now redundancy since we don't need to cast arguments anymore */
                $.p(currentCanvas).colorMode(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
                break;
            case "ST_D": 
            case "ST_F":
                $.p(currentCanvas).stroke(cmd.args[0], cmd.args[1], cmd.args[2]);
                break;
            case "FI_D":
            case "FI_F":
                $.p(currentCanvas).fill(cmd.args[0], cmd.args[1], cmd.args[2]);
                break;
            case "STW":
                $.p(currentCanvas).strokeWeight(cmd.args[0]);
                break;
            case "NOST":
                $.p(currentCanvas).noStroke();
                break;
            case "NOFI":
                $.p(currentCanvas).noFill();
                break;
            case "PUSH_STYLE":
                $.p(currentCanvas).pushStyle();
                break;
            case "POP_STYLE":
                $.p(currentCanvas).popStyle();
                break;
            case "ATTACH_LAYER":
                var rootPos = $("#root").position();
                var elementCreator = $(document.createElement("canvas"));
                $("#root").after(
                    elementCreator.attr("id", "layer")
                    //.attr("data-processing-sources", "/%(appid)s/test.pde")
                    .css("border", "solid 0px #FF0000")
                    .css("position", "absolute")
                    .css("left", rootPos.left)
                    .css("top", rootPos.top)
                    .css("z-index", "1")
                );

                var canvasLayer = document.getElementById("layer");
                q = new Processing(canvasLayer);
                q.noLoop();
                q.size($("#root").width(), $("#root").height());
                q.background(0,0);
                q.mousePressed = p.mousePressed;
                q.mouseReleased = p.mouseReleased;
                q.mouseDragged = p.mouseDragged;
                q.mouseMoved = p.mouseMoved;
                
                $("#root").css("z-index", "2");
                
                _layerAttached = true;
                
                break;
            case "SIZE":
                var width = cmd.args[0], height = cmd.args[1];
                p.size(width, height);
                $(canvas).parent().width(width);
                $(canvas).parent().height(height);
                
                if (_Attached) {
                    q.size(width, height);
                }
                break;
            case "SWITCH_SCREEN":
                if (cmd.args[0] == "root") {
                currentCanvas = "root";
                    $("#").css("z-index", "1");
                    _screen = false;
                }
                else {
                currentCanvas = "";
                    $("#").css("z-index", "3");
                    _screen = true;
                }
                break;
            case "FIT_SCREEN":
                _fitScreen = true;
                var width = $(window).width, height = $(window).height;
                $.p(currentCanvas).size(width, height);
                $(canvas).parent().width(width);
                $(canvas).parent().height(height);
                
                if (_Attached) {
                    q.size(width, height);
                }
                break;
            
            case "CLEAR":
                $.p(currentCanvas).background(0, 0);
                break;
            case "REG_CB":
                for(i in cmd.args) {
                var event = cmd.args[i];
                    if (event in _cb) {
                        _cb[event] = true;
                        if ( event === 'DROP' ) {
                            canvas.addEventListener('dragover', dropHelper, false);
                            canvas.addEventListener('drop', dropListener, false);
                        }
                    }
                }
                break;
            case "CB_KEY_T":
                if (cmd.args[0] === "ALL") {
                    _cb['KEYST'] = true;
                } else {
                    _cb['KEYST'] = cmd.args;
                }
                break;
            case "CB_KEY_T_STOP":
                if (cmd.args.length > 1)
                    _keys['TYP'] = cmd.args;
                else
                    _keys['TYP'] = cmd.args[0];
                break;
            case "CB_KEY_P":
                if (cmd.args[0] === "ALL") {
                    _cb['KEYSP'] = true;
                } else {
                    _cb['KEYSP'] = cmd.args;
                }
                break;
            case "CB_KEY_P_STOP":
                if (cmd.args.length > 1)    
                    _keys['PRE'] = cmd.args;
                else
                    _keys['PRE'] = cmd.args[0];
                break;
            case "CB_KEY_R":
                if (cmd.args[0] === "ALL") {
                    _cb['KEYSR'] = true;
                } else {
                    _cb['KEYSR'] = cmd.args;
                }
                break;
            case "VAR":
                setRemoteVariable(cmd.args[0], cmd.args[1]);
                break;
            case "NEW_TXT_AREA":
                /* Create a floating TextArea. Position is relative to the main display. */
                /* Add the new TextArea to the list of defined TextAreas before returning. */
                var root = $("#root");
                var str = "<textarea id='"+cmd.args[0]+"'";
                str += (cmd.args[5] == 1) ? " readonly/>" : "/>";
                $(root).parent().append(str);
                var txt_area = $("#"+cmd.args[0]);
                var o = new Object;
                o.left = $(root).offset().left + cmd.args[1];
                o.top = $(root).offset().top + cmd.args[2]; 
                $(txt_area).offset(o);
                $(txt_area).width(cmd.args[3]);
                $(txt_area).height(cmd.args[4]);
                _text_areas[cmd.args[0]] = txt_area;
                // $(txt_area).keypress( $.p(currentCanvas).keyPressed() );
                // $(txt_area).keyup( $.p(currentCanvas).keyReleased() );
                break;
            case "CREATE_BUTTON":
                var button = $(document.createElement("button"));
                $("div.ui-widget-content").append(
                    button.attr("id", cmd.args[0])
                    .attr("text", cmd.args[1])
                );
            case "TXT_AREA_CSS":
                var id     = cmd.args[0];
                var n    = cmd.args[1];
                var v    = cmd.args[2];
                if (id in _text_areas) {
                    var txt_area = _text_areas[id];
                    $(txt_area).css(n, v);
                }
                break;
            case "OVERWRITE":
                if (cmd.args[0] in _text_areas) {
                    $("#"+cmd.args[0]).text(cmd.args[1]);
                }
                break;
            case "APPEND":
                if (cmd.args[0] in _text_areas) {
                    var t = $("#"+cmd.args[0]).text();
                    $("#"+cmd.args[0]).text(t + cmd.args[1]);
                }
                break;
            default:
                $.p(currentCanvas).println("Received an unknown command:: " + cmd.name + " " + cmd.args);
				break;
		}
}






// function sendClick(ws, x, y, b) {
    //     if (!_cb['CLICK']) {
    //         return false;
    //     }
    //     var str = "EVENT CLICK " + x + " " + y + " " + b + "\n";
    //     ws.send(str);
        
    // }
    // function sendMouseDown(ws, x, y, b) {
    //     if (!_cb['MDOWN']) {
    //         return false;
    //     }
    //     var str = "EVENT MDOWN " + x + " " + y + " " + b + "\n";
    //     ws.send(str);
    // }
    // function sendMouseDrag(ws, x, y, dx, dy, b) {
    //     if (!_cb['MDRAG']) {
    //         return false;
    //     }
    //     var str = "EVENT MDRAG " + x + " " + y + " " + dx + " " + dy + " " + b + "\n";
    //     ws.send(str);
    // }
    // function sendMouseDragOut(ws, x, y, dx, dy, b) {
    //     /* cancel the drag regardless of sending the message back */
    //     p.__mousePressed = false;
    //     p.mouseReleased();
    //     if (_Attached) {
       //  q__mousePressed = false;
       //  q.mouseReleased();
    //     }
    //     if (!_cb['MDRAGOUT']) {
    //         return false;
    //     }
    //     var str = "EVENT MDRAGOUT " + x + " " + y + " " + dx + " " + dy + " " + b + "\n"
    //     ws.send(str)
    // }
    // function sendMouseMove(ws, x, y, dx, dy) {
    //     if (!_cb['MMOVE']) {
    //         return false;
    //     }
    //     var str = "EVENT MMOVE " + x + " " + y + " " + dx + " " + dy + "\n";
    //     ws.send(str);
    // }
    // function sendKeyTyped(ws, keycode) {
    //     if (_cb['KEYST'] === false) return false;
    //     if (_cb['KEYST'] === true || _cb['KEYST'].indexOf(keycode) != -1) {
    //         var str = "EVENT KEYTYPED " + keycode + "\n";
    //         ws.send(str);
    //     }
    // }
    // function sendKeyPressed(ws, keycode) {
    //     if (_cb['KEYSP'] === false) return false;
    //     if (_cb['KEYSP'] === true || _cb['KEYSP'].indexOf(keycode) != -1) {
    //         var str = "EVENT KEYPRESSED " + keycode + "\n";
    //         ws.send(str);
    //     }
    // }
    // function sendKeyReleased(ws, keycode) {
    //     if (_cb['KEYSR'] === false) return false;
    //     if (_cb['KEYSR'] === true || _cb['KEYSR'].indexOf(keycode) != -1 ) {
    //         var str = "EVENT KEYRELEASED " + keycode + "\n";
    //         ws.send(str);
    //     }
    // }
    // function sendButtonClicked(ws, buttonId) {
    //     if (!_cb['BCLICK']) {
    //         return false;
    //     }
    //     var str = "EVENT BCLICK " + buttonId + "\n";
    //     ws.send(str);
    // }
    // function sendResize(ws, width, height) {
    //     if (!_cb['RESIZE']) {
    //         return false;
    //     }
    //     var str = "EVENT RESIZE " + width + " " + height + "\n";
    //     ws.send(str);
    // }
    // function dropHelper(e) {
    //     if (!_cb['DROP']) {
    //         return false;
    //     }
    //     e.stopPropagation();
    //     e.preventDefault();
    // }
    // function dropListener(e) {
    //     if (!_cb['DROP']) {
    //         return false;
    //     }
    //     e.stopPropagation();
    //     e.preventDefault();
        
    //     var files = e.dataTransfer.files;
        
        
    //     for(var i=0,f; f = files[i]; i++) {
    //         var reader = new FileReader();
    //         /* Code based on www.html5rocks.com tutorial */
    //         function errorHandler(e) {
    //             switch(e.target.error.code) {
    //               case e.target.error.NOT_FOUND_ERR:
    //                 alert("File not found.");
    //                 break;
    //               case e.target.error.NOT_READABLE_ERR:
    //                   alert("File is not readable.");
    //                   break;
    //               case e.target.error.ABORT_ERR:
    //                   break;
    //               default:
    //                   alert("Unknown error occurred.");
    //             };
    //         }
    //         /* TODO Use this if we create a loading bar widget */
    //         function updateProgress(e) {
    //             if (e.lengthComputable) {
    //                 var percentLoaded = Math.round((e.loaded / e.total) * 100);
    //                 if (percentLoaded < 100) {
    //                     //Do something?
    //                 }        
    //              }
    //         }    
            
            
    //         reader.onloadstart = (function(file) {
    //           return function(e) {
    //             /* Send the INIT message */
    //             var str = ""
    //             var fname = file.name.replace(/ /g, "_"); //swap spaces for underscores
    //             if (file.type.match('text.*')) {
    //                 str = "EVENT DROP INIT " + fname + " " + file.type + " " + file.size + "\n";
    //             } else {
    //                 str = "EVENT DROP64 INIT " + fname + " " + file.type + " " + file.size + "\n";
    //             }                    
    //             ws.send(str);
    //           };
    //         })(f);
    //         reader.onprogress = updateProgress;
    //         reader.onabort = function(e) {
    //             /*TODO create an ABORT event on hlib? */
    //             alert("File read cancelled.");
    //         };
    //         reader.onerror = errorHandler;
            
    //         /* File transfer for binary file types is done in Base64 encoding     */
    //         /* File type is a BEST GUESS approach. It might not be right.         */
    //         /* Expect that at the application side and be ready to decode as    */
    //         /* needed. The event fired is different, so files can be treated     */
    //         /* differently easily. This is a temporary workaround until sending    */
    //         /* binary files ius fixed in Chrome (probably v15 or 16)            */
    //         reader.onload = (function(file) {
    //           return function(e) {
    //             if (e.target.readyState == FileReader.DONE) {
    //                 /* The file is loaded entirely in local storage */
    //                 var chunk_size = 1048576; /* 1 Meg chunk size */
    //                 var chunk_counter = 0;
    //                 var fname = file.name.replace(/ /g, "_"); //swap spaces for underscores
    //                 if (file.type.match('text.*')) {
    //                     /* Text files don't need encoding. */
    //                     var payload = e.target.result;
    //                     for (var start = 0; start < payload.length; start += chunk_size+1) {
    //                         var chunk = payload.substr(start, chunk_size);
    //                         var str = "EVENT DROP CHUNK " + fname + " " + file.type + " " + file.size + " " + chunk.length + " " + chunk_counter + "\n";
    //                         ws.send(str);
    //                         ws.send(chunk);
    //                         chunk_counter++
    //                     }
    //                     /* Send the END message */
    //                     var str = "EVENT DROP END " + fname + " " + file.type + " " + file.size + "\n";
    //                     ws.send(str);
    //                 } else {
    //                     /* Doesn't seem like a text file. Base64 encode it */
    //                     var payload = Base64.encode(e.target.result);
    //                     for (var start = 0; start < payload.length; start += chunk_size+1) {
    //                         var chunk = payload.substr(start, chunk_size);
    //                         var str = "EVENT DROP64 CHUNK " + fname + " " + file.type + " " + file.size + " " + payload.length + " " + chunk.length + " " + chunk_counter + "\n";
    //                         ws.send(str);
    //                         ws.send(chunk);
    //                         chunk_counter++
    //                     }
    //                     /* Send the END message */
    //                     var str = "EVENT DROP64 END " + fname + " " + file.type + " " + file.size + " " + payload.length + "\n";
    //                     ws.send(str);
    //                 }
    //             }
    //           };                
    //         })(f);
    //         /* NB:: w3c spec says readAsArrayBuffer is the way to go and readAsBinaryString is deprecated. */
    //         /* BUT!
    //          * Chrome 14 doesn't yet support sending ArrayBuffers as websocket data. This means we're sticking to 
    //          * binaryString for now. It also means that file transfers only work with text data for now. */    
    //         //reader.readAsArrayBuffer(f);
    //         reader.readAsBinaryString(f);
    //     }
    // }



    /* Used in conjunction, this delays the resize event firing to prevent multiple events */
    /* adapted from: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed */
    // $(window).resize( function() {
    //     waitForFinalEvent(function(){
    //         sendResize(ws, $(window).width(), $(window).height());
    //         if (_fitScreen === true) {
    //             var width = $(window).width, height = $(window).height;
    //             p.size(width, height);
    //             q.size(width, height);
    //             $(canvas).parent().width(width);
    //             $(canvas).parent().height(height);
    //         }
    //     }, 500, "winResize");
        
    // });
    // var waitForFinalEvent = (function () {
    //   var timers = {};
    //   return function (callback, ms, uniqueId) {
    //     if (!uniqueId) {
    //       uniqueId = "Don't call this twice without a uniqueId";
    //     }
    //     if (timers[uniqueId]) {
    //       clearTimeout (timers[uniqueId]);
    //     }
    //     timers[uniqueId] = setTimeout(callback, ms);
    //   };
    // })();
    
    // var press = function(e) {
    //     /* TODO: Is more information sending needed/relevant? */
    //     /* If we ever want to tramsmit the actual character, use String.fromCharCode(k) */
    //     var k = e.which || e.keyCode;
    //     // NB changes \r to \n to
    //     if (k==13) k = 10;
    //     sendKeyTyped(ws, k);
    //     if (  _keys['TYP'] === "ALL" || _keys['TYP'].indexOf(k) != -1) {
    //         e.stopPropagation();
    //         e.preventDefault();
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    
    // var down = function(e) {
    //     /* TODO: Is more information sending needed/relevant? */
    //     var k = e.which || e.keyCode;
    //     sendKeyPressed(ws, k);
    //     if ( _keys['PRE'] === "ALL" || _keys['PRE'].indexOf(k) != -1 ) {
    //         e.stopPropagation();
    //         e.preventDefault();
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    
    // var release = function(e) {
    //     /* TODO: Is more information sending needed/relevant? */
    //     var k = e.which || e.keyCode;
    //     sendKeyReleased(ws, k);
    //     return true;
    // }
    
    // parent.addEventListener('keydown', down, false);
    // parent.addEventListener('keypress', press, false);
    // parent.addEventListener('keyup', release, false);
    


