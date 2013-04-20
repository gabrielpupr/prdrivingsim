/* *************** ^ *************** ^ *************** ^ ***************
 Puerto Rico Driving Game Simulation (NAME PENDING)
 Coding by: Edaleen Cruz, Gabriel Nieves and Francisco Ramos
 Mentor: Arturo Geigel
 
 MoveCar.js
 Description- Coding for the character movement.  Player has the following 
 			  actions:
 				Move left or right
 				Move forward or backwards
 				Turn left or right
 				Accelerate
 				Brakes
 * *************** ^ *************** ^ *************** ^ ***************/

#pragma strict


// ----- VARIABLES -----
var Max_speed	: float = 25.0;

var gravity		: float = 20.0;			// Gravity
var accelerate  : float = 0.05;			// Acceleration
var decelerate	: float = 1.0;			// Deceleration

var eulerAngleVelocityR : Vector3 = Vector3 (0, 100, 0);		// Holds the Euler Angle Velocity Clockwise
var eulerAngleVelocityL : Vector3 = Vector3 (0, -100, 0);		// Holds the Euler Angle Velocity Counter-clockwise

var gasPressed : boolean = false;
var CruiseControl_Active : boolean = false;
var speed 		: float = 0.0;			// Speed	
function Update() {
	    																						// Quaternions are used to represent rotations
		var deltaRotationR : Quaternion = Quaternion.Euler(eulerAngleVelocityR * Time.deltaTime);			// Right rotation
		var deltaRotationL : Quaternion = Quaternion.Euler(eulerAngleVelocityL * Time.deltaTime);			// Left rotation
        var last_input_Axes : float = 0.0;
        
        
        
    	if(Input.GetButton("Gas/Reverse")){
    	
	    	if(Input.GetButtonDown("CruiseControl")){
	        	if(CruiseControl_Active == true)
	        		CruiseControl_Active = false;
	    		else
	    			if(CruiseControl_Active == false)
	        			CruiseControl_Active = true;
	        	
	        }
	    	if(Input.GetButton("Turn")){
	        	if(Input.GetAxis("Turn") > -0.1)
	        		//Turn Right:
	        		rigidbody.MoveRotation(rigidbody.rotation * deltaRotationR);
	        	else
	        		//Turn left
	        		rigidbody.MoveRotation(rigidbody.rotation * deltaRotationL);
	        		
	        }
    		if(Input.GetAxis("Gas/Reverse") > -0.1){
        		gasPressed = true;
        		if(speed <= Max_speed && !CruiseControl_Active)
        			speed += accelerate;
        			
        		print("Input: Speed = " + speed);
    			last_input_Axes = Input.GetAxis("Vertical");
        		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed* Time.deltaTime));	
        	}
    	}
    	if(speed >= 0.0 && !(Input.GetButton("Gas/Reverse")) && gasPressed == true){
			speed -= 0.01;
			transform.Translate(Vector3(0, 0, last_input_Axes * speed* Time.deltaTime));
		}
		else
			gasPressed = false;
//        if(Input.GetButton("RightTurn"))																	// checks if the Right Turn button is pressed
//        
//        		rigidbody.MoveRotation(rigidbody.rotation * deltaRotationR);									// turns clockwise
//        	
//        	if(Input.GetButton("LeftTurn"))																		// checks if the Left Turn button is pressed
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
    	if(Input.GetKeyDown("r")){
    		transform.position = Vector3(-51.62577, 0.2191796, -2.009748);
    		transform.rotation = Quaternion.Euler(0.0, 90.0, 0.0);
    		speed = 0;
    	}
}    	
    	
    	//Proof of concept 
    	
    	function SlowDownHole()
    	{
    	   
//    	   speed= 4.0;
    	  // transform.Translate(Vector3(0,0,Input.GetAxis("Vertical")*speed*Time.deltaTime));
    	 }
//    function isRightTurn(){
//    	if(Input.GetButton("RightTurn") || Input.GetAxis("joy_RightTurn"))
//    	
//    }	 
    	 
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
