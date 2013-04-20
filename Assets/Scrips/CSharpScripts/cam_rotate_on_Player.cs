using UnityEngine;
using System.Collections;
//This script will rotate the cam when player rotates:
public class cam_rotate_on_Player : MonoBehaviour {
	
    public Transform carPosition;
    public float damper;
 	public Vector3 myPos;
    private bool at180x = false;
	private float count = 0;
	private string outputSTR = "";
	void Update ()
    {
	   Vector3 tempPos = myPos;
       Quaternion camPosition = transform.rotation;
       camPosition.eulerAngles = Vector3.Lerp(camPosition.eulerAngles, new Vector3(camPosition.eulerAngles.x, carPosition.eulerAngles.y, camPosition.eulerAngles.z), Time.deltaTime * damper);
       //camPosition.w = Mathf.Abs(camPosition.w);
		//camPosition.z = Mathf.Abs(camPosition.z);
		// camPosition.y = Mathf.Abs(camPosition.y);
		//if (camPosition.eulerAngles.z > 180.0)
		
		transform.rotation = camPosition;
//		if (transform.rotation.w <= -0.4){
//			tempPos = myPos;
//			
//			if(count  > (myPos.x * -1.0) ){ 
//				tempPos.x = count;
//				count--;
//			}	
//			transform.position = carPosition.position + tempPos;
//			
//		}else{
//			count = myPos.x;
//			transform.position = carPosition.position + myPos;
//		}
		if (camPosition.eulerAngles.y >= 180.0){
			outputSTR += "camPosition.eulerAngles.y = " + camPosition.eulerAngles.y.ToString() + "\n";
			//lets slowy reajust the cam:
			if(count >= (myPos.x * -1)){
				if(at180x == false){
					at180x = true;
					count = myPos.x;
					outputSTR += "at180 is now true count = " + count + "\n";
				}
				tempPos.x = count;
				transform.position = carPosition.position + tempPos;
				count -= (float)(1.0/50);
				outputSTR += "count has been subtracted; count = " + count + "\n";
			}
			else{
				//lets keep the cam in the new rotated position:
				tempPos.x = count;
				transform.position = carPosition.position + tempPos;
				
			}
				
		}
		else{
			at180x = false;
			//lets slowy reajust the cam:
			if(count <= (myPos.x)){
				
				tempPos.x = count;
				transform.position = carPosition.position + tempPos;
				count += (float)(1.0/50);
				outputSTR += "count has been added; count = " + count + "\n";
			}
			else{
				//lets keep the cam in the new rotated position:
				tempPos.x = count;
				transform.position = carPosition.position + tempPos;
				
			}
		 	//transform.position = carPosition.position + myPos;
			
		}
		outputSTR += "Rotation = " + transform.rotation.ToString()+ 
			"\n\tw = " + transform.eulerAngles.ToString() + 
				"\n\tx= " + transform.rotation.x.ToString() + 
				"\n\ty=" + transform.rotation.y.ToString() + 
				"\n\tz=" +transform.rotation.z.ToString() + "\n";
		//print(outputSTR);
		outputSTR = "";
    }
}
