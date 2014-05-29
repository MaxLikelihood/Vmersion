  /*****************Robotic Arm control**********************/
  function robotHead(ws)
  {
      
      /********** Controls for the LED *********************/
      var cam1 = document.getElementById('camera1');
      cam1.onmouseover = function(){
        cam1.style.opacity = 0.5;
        
      }
      cam1.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          ws.send("LEDSwitch\n");
          cam1.style.zIndex = 1;
          cam1.style.color = 'blue';
      };
      cam1.onmouseout = function(){
          cam1.style.opacity = 1;
          cam1.style.color = 'black';
      } ;


      /********** Controls for the head *********************/
      /**  Note: Index: 2, Direction - Forward: 1, Backward: -1, Stop: 0   **/

      var fwHead = document.getElementById('fwHead');
      fwHead.style.color = 'black';
      fwHead.onmouseover = function(){
        fwHead.style.opacity = 0.5;
        
      }
      fwHead.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(fwHead.style.color == 'black')
          {
            ws.send("moveMotor,2,1\n");
            fwHead.style.zIndex = 1;
            fwHead.style.color = 'blue';
            bwHead.style.color = 'black';
          }
          else /*if(fwHead.style.color == 'blue')*/
          {
            ws.send("moveMotor,2,0\n");
            fwHead.style.zIndex = 1;
            fwHead.style.color = 'black'; 
          }
      };
      fwHead.onmouseout = function(){
          fwHead.style.opacity = 1;
         // fwHead.style.color = 'black';
      } ;



      var bwHead = document.getElementById('bwHead');
      bwHead.style.color = 'black';
      bwHead.onmouseover = function(){
        bwHead.style.opacity = 0.5;
        
      }
      bwHead.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(bwHead.style.color == 'black')
          {
            ws.send("moveMotor,2,-1\n");
            bwHead.style.zIndex = 1;
            bwHead.style.color = 'blue';
            fwHead.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,2,0\n");
            bwHead.style.zIndex = 1;
            bwHead.style.color = 'black'; 
          }
      };
      bwHead.onmouseout = function(){
          bwHead.style.opacity = 1;
      } ;


      var speedHead = document.getElementById('speedHead');
      speedHead.onmouseover = function(){
        speedHead.style.opacity = 0.5;
        
      }
      speedHead.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          ws.send("setMotorSpeed,2,100\n");
          speedHead.style.zIndex = 1;
          speedHead.style.color = 'blue';
      };
      speedHead.onmouseout = function(){
          speedHead.style.opacity = 1;
          speedHead.style.color = 'black';
      } ;


  }
