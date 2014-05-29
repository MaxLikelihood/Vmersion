function lampMenu(ws)
{
	var stop = document.getElementById('switch');
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


    var pallet = document.getElementById('pallet1');
    pallet.style.color = 'black';
    pallet.onmouseover = function(){
      pallet.style.opacity = 0.5;
    }
    pallet.onmousedown = function(){
          if(pallet.style.color == 'black')
          {
            color(ws);
            pallet.style.zIndex = 1;
            pallet.style.color = 'blue';
          }
          else 
          {
            pallet.style.zIndex = 1;
            pallet.style.color = 'black'; 
          }
      }
    stop.onmouseout = function(){
      stop.style.opacity = 1;
    }



}