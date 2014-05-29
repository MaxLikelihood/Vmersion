 /******************RobotBase ws based events ************************************/

function robotHand(ws)
  {


      /********** Controls for the Hand *********************/
      /**  Note: Index: 3, Direction - Forward: 1, Backward: -1, Stop: 0   **/

      var fwHand = document.getElementById('fwHand');
      fwHand.style.color = 'black';
      fwHand.onmouseover = function(){
        fwHand.style.opacity = 0.5;
        
      }
      fwHand.onmousedown = function(){
          if(fwHand.style.color == 'black')
          {
            ws.send("moveMotor,3,1\n");
            fwHand.style.zIndex = 1;
            fwHand.style.color = 'blue';
            bwHand.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,3,0\n");
            fwHand.style.zIndex = 1;
            fwHand.style.color = 'black'; 
          }
      };
      fwHand.onmouseout = function(){
          fwHand.style.opacity = 1;
      } ;



      var bwHand = document.getElementById('bwHand');
      bwHand.style.color = 'black';
      bwHand.onmouseover = function(){
        bwHand.style.opacity = 0.5;
        
      }
      bwHand.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          if(bwHand.style.color == 'black')
          {
            ws.send("moveMotor,3,-1\n");
            bwHand.style.zIndex = 1;
            bwHand.style.color = 'blue';
            fwHand.style.color = 'black';
          }
          else 
          {
            ws.send("moveMotor,3,0\n");
            bwHand.style.zIndex = 1;
            bwHand.style.color = 'black'; 
          }
      };
      bwHand.onmouseout = function(){
          bwHand.style.opacity = 1;
      } ;


      var speedHand = document.getElementById('speedHand');
      speedHand.onmouseover = function(){
        speedHand.style.opacity = 0.5;
        
      }
      speedHand.onmousedown = function(){
          //cam1.style.backgroundColor = 'blue';
          ws.send("setMotorSpeed,3,100\n");
          speedHand.style.zIndex = 1;
          speedHand.style.color = 'blue';
      };
      speedHand.onmouseout = function(){
          speedHand.style.opacity = 1;
          speedHand.style.color = 'black';
      } ;


  }