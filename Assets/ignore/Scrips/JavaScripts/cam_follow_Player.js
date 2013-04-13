#pragma strict

var myPos : Vector3;

var myPlay : Transform;

 

function Update()

{

   transform.position = myPlay.position + myPos;


}