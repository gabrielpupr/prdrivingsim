#pragma strict

var myGameObject : GameObject;
var pos : Vector3;
function Start () {
	
	
	
	//placeGameObject();
	PlaceRandomGameObjects();
	//var rot :  Quaternion = Quaternion.identity; // Quaternion.identity essentially means "no rotation"
	//Instantiate(myGameObject, pos, rot); // The Instantiate command takes a GameObject, a Vector3 for position and a Quaternion for rotation.
}

function Update () {

}
function placeGameObject(){
	//var pos : Vector3; // this is where the Game Object will appear when it's instantiated
	var rot :  Quaternion = Quaternion.identity; // Quaternion.identity essentially means "no rotation"
	Instantiate(myGameObject, pos, rot); // The Instantiate command takes a GameObject, a Vector3 for position and a Quaternion for rotation.
}
function PlaceRandomGameObjects(){
 // Let's store some minimum and maximum possible x,y and z values
     // to position our cubes:
     var minX : int = -20;
     var maxX : int = 100;
     var minY : int = -5;
     var maxY : int = 5;
     var minZ : int = -2;
     var maxZ : int = 2;
     // (you can fiddle with these numbers to change the range of possible spawn positions)
 
     var totalCubes : int = 5; // Change this to whatever number of cubes you'd like to have on-screen
 
     var rot : Quaternion = Quaternion.identity;
 	var i : int;
 	var myArrayList = new ArrayList();
 	var timeOut : int = 0;  
     for(i=0; i<totalCubes; i++)
     {
        // Use Random.Range to grab randomized x,y and z values within our min/max ranges:
        var randomX : int = Random.Range(minX, maxX);
        var randomY : int = 0.01;//Random.Range(minY, maxY);
        var randomZ : int = Random.Range(minZ, maxZ);
 		var pos2 : Vector3 = new Vector3(randomX, randomY, randomZ);
 		while(myArrayList.Contains(pos2) && timeOut <= 10){
 			randomX = Random.Range(minX, maxX);
        	//randomY = 0.001;//Random.Range(minY, maxY);
        	randomZ = Random.Range(minZ, maxZ);
 			pos2 = new Vector3(randomX, randomY, randomZ);
 			timeOut++;
 		}
 		
 		if(!myArrayList.Contains(pos2) && timeOut <= 10){
 			myArrayList.Add(pos2);
 			Instantiate(myGameObject, pos2, rot); // Put a new cube on the screen using a randomized position   
        }
        
        timeOut = 0;
     }
}