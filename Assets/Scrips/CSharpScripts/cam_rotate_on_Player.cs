using UnityEngine;
using System.Collections;
//This script will rotate the cam when player rotates:
public class cam_rotate_on_Player : MonoBehaviour {
	
    public Transform carPosition;
    public float damper;
 
    void Update ()
    {
       Quaternion camPosition = transform.rotation;
       camPosition.eulerAngles = Vector3.Lerp(camPosition.eulerAngles, new Vector3(camPosition.eulerAngles.x, carPosition.eulerAngles.y, camPosition.eulerAngles.z), Time.deltaTime * damper);
       transform.rotation = camPosition;
    }
}
