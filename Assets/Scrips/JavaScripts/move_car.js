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
var speed 		: float = 6.0;			// Speed
var gravity		: float = 20.0;			// Gravity
var accelerate  : float = 0.5;			// Acceleration
var decelerate	: float = 1.0;			// Deceleration

var eulerAngleVelocityR : Vector3 = Vector3 (0, 100, 0);		// Holds the Euler Angle Velocity Clockwise
var eulerAngleVelocityL : Vector3 = Vector3 (0, -100, 0);		// Holds the Euler Angle Velocity Counter-clockwise



function Update() {
																											// Quaternions are used to represent rotations
		var deltaRotationR : Quaternion = Quaternion.Euler(eulerAngleVelocityR * Time.deltaTime);			// Right rotation
		var deltaRotationL : Quaternion = Quaternion.Euler(eulerAngleVelocityL * Time.deltaTime);			// Left rotation
        
        if(Input.GetButton("RightTurn"))																	// checks if the Right Turn button is pressed
        	rigidbody.MoveRotation(rigidbody.rotation * deltaRotationR);									// turns clockwise
        	
        if(Input.GetButton("LeftTurn"))																		// checks if the Left Turn button is pressed
        	rigidbody.MoveRotation(rigidbody.rotation * deltaRotationL);									// turns counter-clockwise
		
        if(Input.GetAxis("Horizontal") && (!Input.GetButton("Gas")) && (!Input.GetButton("Brake")))			// checks correct input, no break, no gas, just side
        {
        	transform.Translate(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, 0));       // moves from side to side.
    	}
    	
    	if(Input.GetAxis("Vertical") && (!Input.GetButton("Gas")) && (!Input.GetButton("Brake")))           // checks input, no break, no gas, just front and back
    	{
        	transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// moves forward or backwards
    	} 
    	
    	if(Input.GetAxis("Vertical") && Input.GetButton("Gas") && (!Input.GetButton("Brake")))				// checks for gas
    	{
    		speed += accelerate;																			// increases speed
    		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// performs the transformation
    	}
    	
    	if(Input.GetAxis("Vertical") && (!Input.GetButton("Gas")) && Input.GetButton("Brake"))				// checks if the brake is pressed
    	{
    		speed -= decelerate;																			// decreases speed
    		if(speed < 0)																					// checks if the speed is at negative
    			speed = 0;																					// if speed is lower than 0, set speed to 0
    		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));			// TRANSFORMATION... POW.
    	}
}    	
    	
    	
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
