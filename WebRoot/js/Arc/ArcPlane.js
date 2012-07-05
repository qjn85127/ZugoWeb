ArcPlane = function(information, width, height, angle, centerY,  radius, scene)
{
	var self = this; 
	var offsetAngle = 10;
	angle+=offsetAngle;
	var raidian = (angle/180 + 0.5)* Math.PI;
	var position = Lib.ArcCenter(radius, angle, centerY);
	var size = new THREE.Vector3(width, height, 10);
	var rotation = new THREE.Vector3(0, raidian, 0);
	
	ZugoBoundingMesh.call(self, information, size, position, rotation, scene); 
	
	
	var planeGeometry = new THREE.PlaneGeometry(width, height);
	var texture = THREE.ImageUtils.loadTexture(information.titleImage);
	var planeMaterial = new THREE.MeshBasicMaterial({map:texture});
	
	THREE.Mesh.call(self, planeGeometry, planeMaterial);
	this.doubleSided = true; 
	this.position = position; 
	this.rotation = rotation; 
	
	scene.add(self); 
	
	this.checkAngle = function(rayAngle)
	{
		if(Math.abs(angle - offsetAngle - rayAngle) <= 20)
			self.visible = true;
		else 
			self.visible = false;
	};
	
};

ArcPlane.prototype = new ZugoBoundingMesh(); 
ArcPlane.prototype.constructor = ArcPlane; 
ArcPlane.prototype.supr = ZugoBoundingMesh.prototype; 

