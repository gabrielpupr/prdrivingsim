/* *************** ^ *************** ^ *************** ^ ***************
 Puerto Rico Driving Game Simulation (NAME PENDING)
 Coding by: Edaleen Cruz, Gabriel Nieves and Francisco Ramos
 Mentor: Arturo Geigel
 
 MoveCar.js
 Description- Coding for the character movement.  Player has the following 
 			  actions:
 				Move forward or backwards
 				Turn left or right
 				Accelerate
 				Auto Decelerate 
 				Brakes
 				Cruise Control
 				Reset to default values
 				
 Last changes made by: Gabriel E. Nieves
 Last changes on: 4/20/2013
 * ***************^ *************** ^ *************** ^ ***************/

#pragma strict


// ----- VARIABLES -----
var Max_speed	: float = 25.0;
var Max_Reverse_speed	: float = 5.0;
var gravity		: float = 20.0;			// Gravity
var accelerate  : float = 0.05;			// Acceleration
var reduceBy : float = 7.0;	

private var eulerAngleVelocity : Vector3 = Vector3 (0, 100, 0);		// Holds the Euler Angle Velocity
var turnSpeed : float = 1.0;
var CruiseControl_Active : boolean = false;
var speed 		: float = 0.0;			// Speed	

function Update() {


        CruiseControlOnGas();
	        
        TurnOnSpeed();
        onBreak();
        onGasOrReverse();
        
        
		reset();
		print("Input: Speed = " + speed);
		print("JoyGas = " + Input.GetAxis("Joy_Gas/Reverse"));
//print("JoyTurn = " + Input.GetAxis("joy_Turn"));
}    	
	

function reset(){
	//NOTE: This function should be deactivated once game is in production...
	//This function will reset the car's position, speed, est.
	//Comes in handy when testing ;)
	 if(Input.GetKeyDown("r")){
		transform.position = Vector3(-51.62577, 0.2191796, -2.009748);
		transform.rotation = Quaternion.Euler(0.0, 90.0, 0.0);
		speed = 0.0;
		CruiseControl_Active = false;
	}
 }
function  CruiseControlOnGas(){
 //this function freezes the current speed by changing the flag's states:
 //the CruiseControl_Active is used under onGasOrReverse()_
	 if(speed != 0.0){	//check if button is pressed
	 	if(Input.GetButtonUp("CruiseControl")){	//check if button is pressed
        	if(CruiseControl_Active == true)	
        		CruiseControl_Active = false;
    		else
    			if(CruiseControl_Active == false)
        			CruiseControl_Active = true;
        	
        }
     }
     if(CruiseControl_Active){
     	transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
     }
 }
function TurnOnSpeed(){
		if(Input.GetAxis("Turn") == 1.0 || Input.GetAxis("joy_Turn") == 1.0){
			//turn right
			if(turnSpeed < 0.0)
				turnSpeed *= -1.0;
			
		}
		else{
		if(Input.GetAxis("Turn") == -1.0 || Input.GetAxis("joy_Turn") == -1.0){
			//turn left
			if(turnSpeed > 0.0)
				turnSpeed *= -1.0;
			}
		}
	//This function is used to control the player's turns when speed is not 0.0
	// Quaternion's are used to represent rotations
	var deltaRotation : Quaternion = Quaternion.Euler(eulerAngleVelocity *turnSpeed* Time.deltaTime);	// Get rotation
    
    print("deltaRotation = " + deltaRotation );
	if((Input.GetButton("Turn") || InputGetJoy("joy_Turn")) && (speed >= 2.0 || speed <= -2.0) ){
    		//Turn left Or Right
    		rigidbody.MoveRotation(rigidbody.rotation * deltaRotation);
    		
    }
}
function Break(){
	//This function created the effect of a car reducing speed when breaks are pressed
	
	CruiseControl_Active = false; //must disable CC
	//Check for speed above 0.0
	if(speed > 0.0){
		//since speed is positive, we subtract
		speed -= accelerate*3.0;
		//If we pass speed = 0.0 then force it to 0.0
		if(speed < 0.0)
			speed = 0.0;
		//apply...
		transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
	}
	else{
		//No?!, then let's check if they are below 0.0
		if(speed < 0.0){
			//true, then add speed... 
			//Note: this means the car is going in reverse...
			speed += accelerate*3.0;
			//If we pass speed = 0.0 then force it to 0.0
    		if(speed > 0.0)
    			speed = 0.0;
			//apply...
			transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
		}
	}
}	 
function AutoReduceOnGasRelease(){
	//This function creates the effect of someone releasing the gas pedel
	
	if(!CruiseControl_Active && !(Input.GetButton("Gas/Reverse")) && !(InputGetJoy("Joy_Gas/Reverse"))){
		//check if +speed:
		if(speed > 0.0 ){
			//true, then car is moving forward!
			//lets slowly reduce the speed...  
			speed -= accelerate/reduceBy;
			//If we pass speed = 0.0 then force it to 0.0
			if(speed < 0.0)
				speed = 0.0;
			//apply...
			transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
		}
		else{
			//No?! Then check is it is less than 0.0
			if(speed < 0.0 ){
				//true, then car is moving in reverse!
				//lets slowly reduce the speed...  	
				speed += accelerate/reduceBy;
				//If we pass speed = 0.0 then force it to 0.0
	    		if(speed > 0.0)
	    			speed = 0.0;
	    		//apply...
				transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
			}
		}
	}
}
function onGasOrReverse(){
	//I guess we could call this function the transmission...
	//This function controls the car's speed and direction, 
	//while also creating an effect of a car accelerating.
	//also before you can reverse we need to control how the 
	//car will show the effect, therefore the car will reduce 
	//speeds at a rate slower than the break.
	
	//check if Gas or Reverse:
	if(!(Input.GetButton("Break") || Input.GetAxis("Joy_Break") == 1.0)){
		if(Input.GetButton("Gas/Reverse") || InputGetJoy("Joy_Gas/Reverse")){
			if((Input.GetAxis("Gas/Reverse") || Input.GetAxis("Joy_Gas/Reverse")) > -1.0){
				//Gas, then start accelerating effect:
		    		if(speed <= Max_speed && !CruiseControl_Active)
		    			speed += accelerate;
		    		//Avoid doubleling speed when CC is enabled...
		    		if(!CruiseControl_Active)	
						transform.Translate(Vector3(0, 0, speed* Time.deltaTime));
			}
			else{
				//Reverse!
				CruiseControl_Active = false; //release CC
				//check speed if more then the max
				if(speed > (-1*Max_Reverse_speed))
					speed -= accelerate*2.0;
				transform.Translate(Vector3(0, 0,  speed* Time.deltaTime));
			}
		}
	}
}	
function onBreak(){
	//Simply break:
	if((Input.GetButton("Break") || Input.GetAxis("Joy_Break") == 1.0) && 
	(!Input.GetButton("Gas/Reverse") &&  !InputGetJoy("Gas/Reverse"))){
		Break();
	}
	else{
		//Reduce Speed:
    	AutoReduceOnGasRelease();
	}
}
function InputGetJoy(str){
	var check : boolean = false;
	if(Input.GetAxis(str) == 1.0 || Input.GetAxis(str) == -1.0)
		check = true;
	return check;
}
//-------------------------------------------old code ---- removed 4/19/2013 --- START ------------//
//var decelerate	: float = 1.0;			// Deceleration
//        if(Input.GetButton("RightTurn"))																	
//        
//        		rigidbody.MoveRotation(rigidbody.rotation * deltaRotationR);									// turns clockwise
//        	
//        	if(Input.GetButton("LeftTurn"))																		
//        		rigidbody.MoveRotation(rigidbody.rotation * deltaRotationL);									// turns counter-clockwise
		
		//The following was commented by Gabriel - I believe there is nolonger a need for this since it
		//the car slide unreal...
//        if(Input.GetAxis("Horizontal") && (!Input.GetButton("Gas")) && (!Input.GetButton("Brake")))			// checks correct input, no break, no gas, just side
//        {
//        	transform.Translate(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, 0));       // moves from side to side.
//    	}
//    	
//    	if(Input.GetAxis("Vertical") && (!Input.GetButton("Gas")) && (!Input.GetButton("Brake")))           // checks input, no break, no gas, just front and back
//    	{
//        	transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// moves forward or backwards
//    	} 
//    	
//    	if(Input.GetAxis("Vertical") && Input.GetButton("Gas") && (!Input.GetButton("Brake")))				// checks for gas
//    	{
//    		speed += accelerate;																			// increases speed
//    		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// performs the transformation
//    	}
//    	
//    	if(Input.GetAxis("Vertical") && (!Input.GetButton("Gas")) && Input.GetButton("Brake"))				// checks if the brake is pressed
//    	{
//    		speed -= decelerate;																			// decreases speed
//    		if(speed < 0)																					// checks if the speed is at negative
//    			speed = 0;																					// if speed is lower than 0, set speed to 0
//    		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// TRANSFORMATION... POW.
//    	}
    	//this spawn car to a default location... useful for testing...
    	//    	//Proof of concept 
//    	
//    	function SlowDownHole()
//    	{
//    	   
//    	   speed= 4.0;
//    	  transform.Translate(Vector3(0,0,Input.GetAxis("Vertical")*speed*Time.deltaTime));
//    	 }
//-------------------------------------------old code ---- removed 4/19/2013 --- END -------------//
//        if (controller.isGrounded) {
//        
//            // We are grounded, so recalculate
//            // move direction directly from axes
//            moveDirection = Vector3(Input.GetAxis("Horizontal"), 0,
//                                    Input.GetAxis("Vertical"));
//            moveDirection = transform.TransformDirection(moveDirection);
//            moveDirection *= speed;
//            
//            if (Input.GetButton ("Jump")) {
//                moveDirection.y = jumpSpeed;
//            }
//            
//        }
//        // Apply gravity
//        moveDirection.y -= gravity * Time.deltaTime;
        
        // Move the controller
        //controller.Move(moveDirection * Time.deltaTime);
