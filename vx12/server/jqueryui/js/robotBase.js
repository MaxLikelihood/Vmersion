/******************RobotBase ws based events ************************************/

function robotBase(ws)
  {
      console.log('robotBase invocation');

      /********** Controls for the Base *********************/
      /**  Note: Index: 0, Direction - Forward: 1, Backward: -1, Stop: 0   **/

      var fwBase = document.getElementById('fwBase');
      fwBase.style.color = 'black';

      fwBase.onmouseover = function(){
        fwBase.style.opacity = 0.5;
        playBeep();

       }; 

      fwBase.onmousedown = function(){
          if(fwBase.style.color == 'black')
          {
            ws.send("moveMotor,0,1\n");
            fwBase.style.zIndex = 1;
            fwBase.style.color = 'blue';
            bwBase.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,0,0\n");
            fwBase.style.zIndex = 1;
            fwBase.style.color = 'black'; 
          }
          
      };
      fwBase.onmouseout = function(){
          fwBase.style.opacity = 1;
      } ;



      var bwBase = document.getElementById('bwBase');
      bwBase.style.color = 'black';
      bwBase.onmouseover = function(){
        bwBase.style.opacity = 0.5;
        
      }
      bwBase.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(bwBase.style.color == 'black')
          {
            ws.send("moveMotor,0,-1\n");
            bwBase.style.zIndex = 1;
            bwBase.style.color = 'blue';
            fwBase.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,0,0\n");
            bwBase.style.zIndex = 1;
            bwBase.style.color = 'black'; 
          }
          
      };
      bwBase.onmouseout = function(){
          bwBase.style.opacity = 1;
      } ;


      var speedBase = document.getElementById('speedBase');
      speedBase.onmouseover = function(){
        speedBase.style.opacity = 0.5;
        
      }
      speedBase.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          ws.send("setMotorSpeed,0,100\n");
          speedBase.style.zIndex = 1;
          speedBase.style.color = 'blue';
          playBeep();
      };
      speedBase.onmouseout = function(){
          speedBase.style.opacity = 1;
          speedBase.style.color = 'black';
      } ;


  }
