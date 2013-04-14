#pragma strict
//var x : double = 3;
//var y : double = 10;
//var z : double = 0;

var myPos : Vector3;
var distance : double;
var myPlay : Transform;


function Update()

{
	transform.position = myPlay.position + myPos;
}
//var rotationDamping : double;
//var heightDamping : double;
//function LateUpdate () {
//var wantedRotationAngle :double;
//var wantedHeight : double;
//var currentRotationAngle :double;
//var currentHeight :double;
//var currentRotation :Quaternion;
//var height : double;
//height = myPos.y;
//    // Early out if we don't have a target
//
//    if (!myPlay)
//
//        return;
//
//    
//
//    // Calculate the current rotation angles
//
//    wantedRotationAngle = myPlay.eulerAngles.y;
//
//    wantedHeight = myPlay.position.y + height;
//
//        
//
//    currentRotationAngle = transform.eulerAngles.y;
//
//    currentHeight = transform.position.y;
//
//    
//
//    // Damp the rotation around the y-axis
//
//    currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
//
// 
//
//    // Damp the height
//
//    currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
//
// 
//
//    // Convert the angle into a rotation
//
//    currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
//
//    
//
//    // Set the position of the camera on the x-z plane to:
//    // distance meters behind the myPlay
//
//    transform.position = myPlay.position;
//
//    transform.position -= currentRotation * Vector3.forward * distance;
//
// 
//
//    // Set the height of the camera
//
//    transform.position.y = currentHeight;
//
//    
//
//    // Always look at the myPlay
//
//    transform.LookAt (myPlay);
//
//
//
//}