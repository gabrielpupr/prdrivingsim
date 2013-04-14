using UnityEngine;
using System.Collections;

public class trigger_console : MonoBehaviour {
	
	int active_frames=0;
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
		audio.Play();
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
