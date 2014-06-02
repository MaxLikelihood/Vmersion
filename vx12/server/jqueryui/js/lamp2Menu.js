function lamp2Menu(ws)
{
  console.log("lamp2Menu called");
	var stop = document.getElementById('switch2');
	stop.style.color = 'black';
    stop.onmouseover = function(){
      //cam1.style.backgroundColor = 'blue';
      stop.style.opacity = 0.5;
    }
    stop.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(stop.style.color == 'black')
          {
            ws.send("on\n");
            stop.style.zIndex = 1;
            stop.style.color = 'blue';
          }
          else 
          {
            ws.send("off\n");
            stop.style.zIndex = 1;
            stop.style.color = 'black'; 
          }
      }
    stop.onmouseout = function(){
      stop.style.opacity = 1;
    }


    var pallet = document.getElementById('pallet2');
    pallet.style.color = 'black';
    pallet.onmouseover = function(){
      pallet.style.opacity = 0.5;
    };
        pallet.onmousedown = function(){
          var canvas = document.getElementById('colorCanvas2');
          var tablet = document.getElementById("tablet2");
          if(pallet.style.color == 'black')
          {

            //color(ws);
            pallet.style.zIndex = 1;
            pallet.style.color = 'blue';
            
            var colorImageObj = new Image();
            colorImageObj.src = 'images/color-picker.png';
            colorImageObj.onload = function() {
            var width = colorImageObj.width;
            var height = colorImageObj.height;
            canvas.style.visibility = "visible";
            tablet.style.visibility = "visible";
            var context = canvas.getContext("2d");
            context.drawImage(colorImageObj, 0, 0, 113, 132);

                   /*******Perspective****************/
        
               //      for (var i = 0; i <= height / 2; ++i) {
                // //         context.setTransform(1, -0.4 * i / height, 0, 1, 0, 60);
               //           context.drawImage(colorImageObj, 0, height / 2 - i, width, 2, 0, height / 2 - i, width, 2);
                // //         context.setTransform(1, 0.4 * i / height, 0, 1, 0, 60);
               //          context.drawImage(colorImageObj, 0, height / 2 + i, width, 2, 0, height / 2 + i, width, 2);
                //  }
             colorPickerInit(colorImageObj, 'colorCanvas2', ws);
            };

          }
          else 
          {
            pallet.style.zIndex = 1;
            canvas.style.visibility = "hidden";
            tablet.style.visibility = "hidden";
            pallet.style.color = 'black'; 
            
          }
      }
    pallet.onmouseout = function(){
      pallet.style.opacity = 1;
    };



}