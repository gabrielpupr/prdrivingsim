using UnityEngine;
using System.Collections;

public class trigger_console : MonoBehaviour {

	int active_frames=0;
	double speed=4.0;
	
	
	// Use this for initialization
	//void Start () {
	
	//}
	
	// Update is called once per frame
	//void Update () {
	
	//}
	
	void OnTriggerEnter(Collider p)
	{
		active_frames++;
		print("A collision with object: "+name+" has occured");
		p.audio.Play ();
        
		audio.Play ();
		//p.transform=transform.Translate(Vector3(0,0,Input.GetAxis("Vertical") * speed *Time.deltaTime));
		//p.camera.transform.position=p.camera.transform.position-Vector3.down*5000;
		while(active_frames<5000)
		{
			active_frames++;
		}
		
		//p.camera.transform.position=p.camera.transform.position-Vector3.up*4000;
		active_frames=0;
	}
	
	void OnTriggerStay(Collider p)
	{
		active_frames++;
		print("Collision with object: "+name+" has occured for: "+active_frames+" frames");
		
		
	}
	
	void OnTriggerExit(Collider p)
	{
		print("Collision with object: "+name+" has ended");
		active_frames=0;
	}
}
