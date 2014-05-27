function atest(xstr, ystr) {

    var xshift = (xstr + 90) / 10;
    var yshift = (ystr + 90) / 10;
 //   var main_x = liveVar("main_x", xshift);
 //   var main_y = liveVar("main_y", yshift); 

    var main_x = liveVar("main_x", 320);
    var main_y = liveVar("main_y", 240); 
   // var main_z = liveVar("main_z", zstr + 90);
      
    var oldx = main_x.value;
    var oldy = main_y.value; 
    
   main_x.onupdate = function(){
	var diffx = (main_x.value)/10;
	var newx = oldx;
        console.log("new value of x " + diffx);
	if (oldx + diffx < 600  && oldx + diffx > 0 )
	    newx = oldx + diffx;
        xdisplay = newx.toString() + "px";
        canvas.style.left = xdisplay;
        display = '';
        //ctx.fillText(display,50,75);
	oldx = newx;
    };
    main_y.onupdate = function(){
	var diffy = -1 * (main_y.value)/10;
        console.log("new value of y " + diffy);
	var newy = oldy;
	if (oldy + diffy < 427  && oldy + diffy > 0 )
	    newy = oldy + diffy;
	ydisplay = newy.toString() + "px";
        canvas.style.top = ydisplay;
        display = xdisplay + ',' +  ydisplay;
        //ctx.fillText(display,50,75);
	base_image = new Image();
        base_image.src = 'clients/V1/mcgill.png';
        base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
     }
	oldy = newy;
   };

    mainDiv = document.getElementsByClassName("ui-widget-content draggable")[0];
    var canvas = document.createElement("canvas");


    
    canvas.id="drawMenu";
    canvas.style.top=main_y.value.toString() + "px";
    canvas.style.left=main_x.value.toString() + "px";
   // var xdisplay = main_x.value.toString() + "px";
   // var ydisplay = main_y.value.toString() + "px";
    var display = ''
    
    canvas.style.width = "116px";
    canvas.style.height = "97px";
   // canvas.style.border   = "solid 1px #000000";
    canvas.style.position = "absolute";
    ctx=canvas.getContext("2d");
     // ctx.fillRect(x,y,70,50);
    ctx.font="40px Arial";
  //  display = xdisplay + ',' +  ydisplay;
  //  ctx.fillText(display,50,75);
    base_image = new Image();
    base_image.src = 'clients/V1/mcgill.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
    }
    canvas.style.color = "black";
    mainDiv.appendChild(canvas);
    var parent = canvas.parentNode;



}
