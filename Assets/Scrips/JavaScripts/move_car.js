#pragma strict

var speed 		: float = 6.0;	
var gravity		: float = 20.0;
var accelerate  : float = 0.5;

var eulerAngleVelocityR : Vector3 = Vector3 (0, 100, 0);													// Holds the Euler Angle Velocity Clockwise
var eulerAngleVelocityL : Vector3 = Vector3 (0, -100, 0);													// Holds the Euler Angle Velocity Counter-clockwise

private var moveDirection : Vector3 = Vector3.zero;

function Update() {
																											// Quaternions are used to represent rotations
		var deltaRotationR : Quaternion = Quaternion.Euler(eulerAngleVelocityR * Time.deltaTime);			// Right rotation
		var deltaRotationL : Quaternion = Quaternion.Euler(eulerAngleVelocityL * Time.deltaTime);			// Left rotation
        
        if(Input.GetButton("RightTurn"))																	// checks if the Right Turn button is pressed
        	rigidbody.MoveRotation(rigidbody.rotation * deltaRotationR);									// turns clockwise
        	
        if(Input.GetButton("LeftTurn"))																		// checks if the Left Turn button is pressed
        	rigidbody.MoveRotation(rigidbody.rotation * deltaRotationL);									// turns counter-clockwise
		
        if(Input.GetAxis("Horizontal") && (!Input.GetButton("Gas")))
        {
        	transform.Translate(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, 0));
    	}
    	if(Input.GetAxis("Vertical") && (!Input.GetButton("Gas")))
    	{
        	transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));
    	} 
    	
    	if(Input.GetAxis("Vertical") && Input.GetButton("Gas") )
    	{
    		speed += accelerate;
    		transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime));
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
        
         
    }