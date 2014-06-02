 /******************RobotBody ws based events ************************************/

function robotBody(ws)
  {


      /********** Controls for the Body *********************/
      /**  Note: Index: 1, Direction - Forward: 1, Backward: -1, Stop: 0   **/

      var fwBody = document.getElementById('fwBody');
      fwBody.style.color = 'black';
      fwBody.onmouseover = function(){
        fwBody.style.opacity = 0.5;
        
      }
      fwBody.onmousedown = function(){
          if(fwBody.style.color == 'black')
          {
            ws.send("moveMotor,1,1\n");
            fwBody.style.zIndex = 1;
            fwBody.style.color = 'blue';
            bwBody.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,1,0\n");
            fwBody.style.zIndex = 1;
            fwBody.style.color = 'black'; 
          }
          playBeep();
      };
      fwBody.onmouseout = function(){
          fwBody.style.opacity = 1;
      } ;



      var bwBody = document.getElementById('bwBody');
      bwBody.style.color = 'black';
      bwBody.onmouseover = function(){
        bwBody.style.opacity = 0.5;
        
      }
      bwBody.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(bwBody.style.color == 'black')
          {
            ws.send("moveMotor,1,-1\n");
            bwBody.style.zIndex = 1;
            bwBody.style.color = 'blue';
            fwBody.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,1,0\n");
            bwBody.style.zIndex = 1;
            bwBody.style.color = 'black'; 
          }
          playBeep();
      };
      bwBody.onmouseout = function(){
          bwBody.style.opacity = 1;
      } ;


      var speedBody = document.getElementById('speedBody');
      speedBody.onmouseover = function(){
        speedBody.style.opacity = 0.5;
        
      }
      speedBody.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          ws.send("setMotorSpeed,1,100\n");
          speedBody.style.zIndex = 1;
          speedBody.style.color = 'blue';
          playBeep();
      };
      speedBody.onmouseout = function(){
          speedBody.style.opacity = 1;
          speedBody.style.color = 'black';
      } ;


  }
