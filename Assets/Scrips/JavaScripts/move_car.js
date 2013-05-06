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
var material : Renderer;
var BackLight_Right : GameObject;
var BackLight_Left : GameObject;
var TurnSignal_RL : GameObject;
var TurnSignal_RR : GameObject;
var TurnSignal_FL : GameObject;
var TurnSignal_FR : GameObject;

private var tileOffsetx : float = 0.1111111;
private var tileOffsety : float = 0.6666667;
//flags used to change sprites
private var brake_reverse_gas_Flag = "001";
private var turnLeft_turnRight_Flag = "00";
private var turnSignalLeft_turnSignalRight_Flag = "00";
private var TurnSignalLeft_Enabled : boolean = false;
private var TurnSignalRight_Enabled : boolean = false;

var TrunSignal_delay : int = 10;
private var TrunSignal_Count : int = 0;
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
	turnLeft_turnRight_Flag = "00";
		if(speed == 0.0){
			brake_reverse_gas_Flag = "100";
		}
		else{
			if(speed < 0.0){
				brake_reverse_gas_Flag = "010";
			}
			else{
				brake_reverse_gas_Flag = "001";
			}
		}
		TurnSignals_Effect();
		
        CruiseControlOnGas();
	        
        TurnOnSpeed();
        onBreak();
        onGasOrReverse();
        
        
		reset();
		SetCarSprite();
		//print("Input: Speed = " + speed);
		//print("JoyGas = " + Input.GetAxis("Joy_Gas/Reverse"));
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
			turnLeft_turnRight_Flag = "01";
			if(turnSpeed < 0.0){
				turnSpeed *= -1.0;
				
			}
		}
		else{
		if(Input.GetAxis("Turn") == -1.0 || Input.GetAxis("joy_Turn") == -1.0){
			//turn left
			turnLeft_turnRight_Flag = "10";
			if(turnSpeed > 0.0)
				turnSpeed *= -1.0;
				
			}
			
		}
	//This function is used to control the player's turns when speed is not 0.0
	// Quaternion's are used to represent rotations
	var deltaRotation : Quaternion = Quaternion.Euler(eulerAngleVelocity *turnSpeed* Time.deltaTime);	// Get rotation
    
    //print("deltaRotation = " + deltaRotation );
	if((Input.GetButton("Turn") || InputGetJoy("joy_Turn")) && (speed >= 2.0 || speed <= -2.0) ){
    		//Turn left Or Right
    		rigidbody.MoveRotation(rigidbody.rotation * deltaRotation);
    		
    }
    else{
    	turnLeft_turnRight_Flag = "00";
    }
}
function Break(){
	//This function created the effect of a car reducing speed when breaks are pressed
	brake_reverse_gas_Flag = "100";
	
	CruiseControl_Active = false; //must disable CC
	//Check for speed above 0.0
	if(speed > 0.0){
		//since speed is positive, we subtract
		speed -= accelerate*4.0;
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
			speed += accelerate*4.0;
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
				brake_reverse_gas_Flag = "010";
				
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
				if (speed >= 0.0)
					brake_reverse_gas_Flag = "100";
				else
					brake_reverse_gas_Flag = "010";
						
					transform.Translate(Vector3(0, 0,  speed* Time.deltaTime));
			}
		}
	}
	else{
		Break();
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
function SetCarSprite(){
//private var brake_reverse_gas_Flag : string;
//private var turnLeft_turnRight_Flag : string;
//private var turnSignalLeft_turnSignalRight_Flag : string;
	var xOffset : float = tileOffsetx;
	var yOffset : float = tileOffsety;
	
	switch (brake_reverse_gas_Flag){
		case "100":
			//Brake Active:
			BackLight_Right.transform.light.color = Color.red;
			BackLight_Left.transform.light.color = Color.red;
			BackLight_Right.transform.light.active = true;
			BackLight_Left.transform.light.active = true;
			 
			switch (turnLeft_turnRight_Flag){
				case "10":
					//Brake Active:
					//Turn Left Active:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Brake Active:
							//Turn Left Active:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 5.0;
							yOffset = tileOffsety * 2.0;
							break;
						case "01":
							//Brake Active:
							//Turn Left Active:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 7.0;
							yOffset = tileOffsety * 2.0;
						break;
						
						default:
							//Brake Active:
							//Turn Left Active:
							//No TrunSignal:
							xOffset = tileOffsetx * 1.0;
							yOffset = tileOffsety * 2.0;
							break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
				break;
				
				case "01":
					//Brake Active:
					
					//Turn Right Active:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Brake Active:
							//Turn Right Active:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 6.0;
							yOffset = tileOffsety * 2.0;
							break;
						case "01":
							//Brake Active:
							//Turn Right Active:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 8.0;
							yOffset = tileOffsety * 2.0;
						break;
						
						default:
							//Brake Active:
							//Turn Right Active:
							//No TrunSignal:
							xOffset = tileOffsetx * 2.0;
							yOffset = tileOffsety * 2.0;
							break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
				break;
				
				default:
					//Brake Active:
					//No Turn:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Brake Active:
							//No Turn:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 3.0;
							yOffset = tileOffsety * 2.0;
							break;
						case "01":
							//Brake Active:
							//No Turn:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 4.0;
							yOffset = tileOffsety * 2.0;
						break;
						
						default:
							//Brake Active:
							//No Turn:
							//No TrunSignal:
							xOffset = tileOffsetx * 0.0;
							yOffset = tileOffsety * 2.0;
						break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
					break;
			}//end of switch turnLeft_turnRight_Flag
			break;
			
			case "010":
			//Reverse Active:
			BackLight_Right.transform.light.color = Color.white;
			BackLight_Left.transform.light.color = Color.white;
			BackLight_Right.transform.light.active = true;
			BackLight_Left.transform.light.active = true;
			switch (turnLeft_turnRight_Flag){
				case "10":
					//Reverse Active:
					//Turn Left Active:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Reverse Active:
							//Turn Left Active:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 5.0;
							yOffset = tileOffsety * 3.0;
							break;
						case "01":
							//Reverse Active:
							//Turn Left Active:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 7.0;
							yOffset = tileOffsety * 3.0;
						break;
						
						default:
							//Reverse Active:
							//Turn Left Active:
							//No TrunSignal:
							xOffset = tileOffsetx * 1.0;
							yOffset = tileOffsety * 3.0;
							break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
				break;
				
				case "01":
					//Reverse Active:
					//Turn Right Active:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Reverse Active:
							//Turn Right Active:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 6.0;
							yOffset = tileOffsety * 3.0;
							break;
						case "01":
							//Reverse Active:
							//Turn Right Active:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 8.0;
							yOffset = tileOffsety * 3.0;
						break;
						
						default:
							//Reverse Active:
							//Turn Right Active:
							//No TrunSignal:
							xOffset = tileOffsetx * 2.0;
							yOffset = tileOffsety * 3.0;
							break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
				break;
				
				default:
					//Reverse Active:
					//No Turn:
					switch (turnSignalLeft_turnSignalRight_Flag){
						case "10":
							//Reverse Active:
							//No Turn:
							//TurnSignal Left Active:
							xOffset = tileOffsetx * 3.0;
							yOffset = tileOffsety * 3.0;
							break;
						case "01":
							//Reverse Active:
							//No Turn:
							//TurnSignal Right Active:
							xOffset = tileOffsetx * 4.0;
							yOffset = tileOffsety  * 3.0;
						break;
						
						default:
							//Reverse Active:
							//No Turn:
							//No TrunSignal:
							xOffset = tileOffsetx * 0.0;
							yOffset = tileOffsety * 3.0;
							break;
					}//end of switch turnSignalLeft_turnSignalRight_Flag
					break;
				}//end of switch turnLeft_turnRight_Flag
			break;
			default:
				//Gas Active:
				
				BackLight_Right.transform.light.active = false;
				BackLight_Left.transform.light.active = false;
				switch (turnLeft_turnRight_Flag){
					case "10":
						//Gas Active:
						//Turn Left Active:
						switch (turnSignalLeft_turnSignalRight_Flag){
							case "10":
								//Gas Active:
								//Turn Left Active:
								//TurnSignal Left Active:
								xOffset = tileOffsetx * 5.0;
								yOffset = tileOffsety;
								break;
							case "01":
								//Gas Active:
								//Turn Left Active:
								//TurnSignal Right Active:
								xOffset = tileOffsetx * 7.0;
								yOffset = tileOffsety;
							break;
							
							default:
								//Gas Active:
								//Turn Left Active:
								//No TrunSignal:
								xOffset = tileOffsetx;
								yOffset = tileOffsety;
								break;
						}//end of switch turnSignalLeft_turnSignalRight_Flag
					break;
					
					case "01":
						//Gas Active:
						//Turn Right Active:
						switch (turnSignalLeft_turnSignalRight_Flag){
							case "10":
								//Gas Active:
								//Turn Right Active:
								//TurnSignal Left Active:
								xOffset = tileOffsetx * 6.0;
								yOffset = tileOffsety;
								break;
							case "01":
								//Gas Active:
								//Turn Right Active:
								//TurnSignal Right Active:
								xOffset = tileOffsetx * 8.0;
								yOffset = tileOffsety;
							break;
							
							default:
								//Gas Active:
								//Turn Right Active:
								//No TrunSignal:
								xOffset = tileOffsetx * 2.0;
								//print("xOffset = " + xOffset);
								yOffset = tileOffsety;
								break;
						}//end of switch turnSignalLeft_turnSignalRight_Flag
					break;
					
					default:
						//Gas Active:
						//No Turn:
						switch (turnSignalLeft_turnSignalRight_Flag){
							case "10":
								//Gas Active:
								//No Turn:
								//TurnSignal Left Active:
								xOffset = tileOffsetx * 3.0;
								yOffset = tileOffsety;
								break;
							case "01":
								//Gas Active:
								//No Turn:
								//TurnSignal Right Active:
								xOffset = tileOffsetx * 4.0;
								yOffset = tileOffsety;
							break;
							
							default:
								//Gas Active:
								//No Turn:
								//No TrunSignal:
								xOffset = tileOffsetx * 0.0;
								yOffset = tileOffsety;
								break;
						}//end of switch turnSignalLeft_turnSignalRight_Flag
						break;
					}//end of switch turnLeft_turnRight_Flag
					break;
			}//end of switch brake_reverse_gas_Flag
			

			material.material.mainTextureOffset = new Vector2(xOffset,yOffset);	
}
function TurnSignals_Effect(){
	//TurnSignals
	if(Input.GetButtonUp("TurnSignals")){
		if(Input.GetAxis("TurnSignals") > 0.0){
			//Right TurnSignals
			turnSignalLeft_turnSignalRight_Flag = "01";
			if(TurnSignalRight_Enabled){
				TurnSignalRight_Enabled = false;
				TurnSignal_RR.transform.active = false;
				TurnSignal_FR.transform.active = false;	
			}
			else{
				TurnSignalRight_Enabled = true;
				TurnSignal_RR.transform.active = true;
				TurnSignal_FR.transform.active = true; 
			}
			TurnSignalLeft_Enabled = false;
			TurnSignal_RL.transform.active = false; 
			TurnSignal_FL.transform.active = false;
		}
		else{
			//Left TurnSignals
			turnSignalLeft_turnSignalRight_Flag = "10";
			if(TurnSignalLeft_Enabled){
				TurnSignalLeft_Enabled = false;
				TurnSignal_RL.transform.active = false; 
				TurnSignal_FL.transform.active = false; 
			}
			else{
				TurnSignalLeft_Enabled = true;
				TurnSignal_RL.transform.active = true; 
				TurnSignal_FL.transform.active = true; 
			}
			TurnSignalRight_Enabled = false;
			TurnSignal_RR.transform.active = false;
			TurnSignal_FR.transform.active = false;
		}
	}
	
	if(!TurnSignalRight_Enabled && !TurnSignalLeft_Enabled){
		turnSignalLeft_turnSignalRight_Flag = "00";
		TurnSignal_RR.transform.active = false;
		TurnSignal_FR.transform.active = false;
		TurnSignal_RL.transform.active = false; 
		TurnSignal_FL.transform.active = false; 
	}
	else{
		if(TurnSignalRight_Enabled && !TurnSignalLeft_Enabled){
			if(TrunSignal_Count <= TrunSignal_delay){
				//Right TurnSignals
				if(turnSignalLeft_turnSignalRight_Flag == "01" && (TrunSignal_Count/TrunSignal_delay) == 1){
					//TurnSignals Off
					TurnSignal_RR.transform.active = false;
					TurnSignal_FR.transform.active = false; 
					TurnSignal_RL.transform.active = false; 
					TurnSignal_FL.transform.active = false;
					turnSignalLeft_turnSignalRight_Flag = "00";
					
					//Reset count:
					TrunSignal_Count = 0;
				}
				else{
					if(turnSignalLeft_turnSignalRight_Flag == "00" && (TrunSignal_Count/TrunSignal_delay) == 1){
						//TurnSignals On
						turnSignalLeft_turnSignalRight_Flag = "01";
						TurnSignal_RR.transform.active = true;
						TurnSignal_FR.transform.active = true;
						TurnSignal_RL.transform.active = false; 
						TurnSignal_FL.transform.active = false; 
						//Reset count:
						TrunSignal_Count = 0;
					}
				}
				TrunSignal_Count++;
			}
			
		}
		else{
			if(!TurnSignalRight_Enabled && TurnSignalLeft_Enabled)
				if(TrunSignal_Count <= TrunSignal_delay){
				//Left TurnSignals
				if(turnSignalLeft_turnSignalRight_Flag == "10" && (TrunSignal_Count/TrunSignal_delay) == 1){
					//TurnSignals Off
					TurnSignal_RL.transform.active = false; 
					TurnSignal_FL.transform.active = false; 
					TurnSignal_RR.transform.active = false;
					TurnSignal_FR.transform.active = false;
					turnSignalLeft_turnSignalRight_Flag = "00";
					//Reset count:
					TrunSignal_Count = 0;
				}
				else{
					if(turnSignalLeft_turnSignalRight_Flag == "00" && (TrunSignal_Count/TrunSignal_delay) == 1){
						//TurnSignals On
						TurnSignal_RL.transform.active = true; 
						TurnSignal_FL.transform.active = true;
						TurnSignal_RR.transform.active = false;
						TurnSignal_FR.transform.active = false;
						turnSignalLeft_turnSignalRight_Flag = "10";
						//Reset count:
						TrunSignal_Count = 0;
					}
				}
				TrunSignal_Count++;
			}
				
				
		}
	}
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
