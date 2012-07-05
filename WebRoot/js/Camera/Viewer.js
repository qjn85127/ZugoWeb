 //View represents the first person camera.
Viewer = function(scene)
{
	 this.clock = new THREE.Clock();
	 this.camera = new THREE.PerspectiveCamera(50, SceneBuilder.Width / SceneBuilder.Height, 1, 10000);
	 this.domElement = document;
	  
     scene.add(this.camera);
     this.controls = new RoundCameraControl(this.camera,document);
     this.controls.movementSpeed = 1;
     this.controls.lookSpeed = 0.125;
     this.controls.lookVertical = true;
     
     this.viewRay = function(mouseX, mouseY, projector)
     {
     	var vector = new THREE.Vector3(mouseX, mouseY, 1);
     	projector.unprojectVector(vector, this.camera);
        var ray = new THREE.Ray(this.camera.position, vector.subSelf(this.camera.position).normalize());
        return ray;
     };
     
     this.setAutoMode = function(target)
     {
    	 this.controls.setAutoMode(target); 
     };
    
     this.render = function()
     {
     	this.controls.update(this.clock.getDelta());
     };
};









