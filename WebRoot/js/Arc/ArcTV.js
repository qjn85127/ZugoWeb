ArcTV = function(information, size, bottom, radius, angle, scene, reflections)
{
	var self = this; 
	
  
	var color = 0x000000; //a black TV;
	var offsetHeight = 20 ;
	var offsetAngle = -10; 
	angle += offsetAngle; 
	var centerY = bottom + size.y/2 + offsetHeight; 
	var location = Lib.ArcCenter(radius, angle, centerY); 
	var radian = angle/180 * Math.PI + Math.PI /2; 
	var rotation = new THREE.Vector3(0, radian, 0); 
	
	//CubeMesh 
	
	var cubeGeometry = new THREE.CubeGeometry(size.x, size.y, size.z);
	var colorMaterial = new THREE.MeshBasicMaterial({ambient:color, color: color}); 
	
	var btmCube = new THREE.CubeGeometry(size.z + 50, offsetHeight, size.z + 50 );
	var btmMesh = new THREE.Mesh(btmCube, colorMaterial);
		btmMesh.position = Lib.ArcCenter(radius, angle, bottom+ offsetHeight/2); 
		
	var imageMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(information.previewImage)});
	
	ZugoBoundingMesh.call(self, information, size, location, rotation, scene); 
	
	var materials = []; 
	
	for(var i = 0; i < 6; i++)
	{
		if(i == Lib.Faces.zp)
		{ 
			materials.push(imageMaterial); 
		}
		else{
			materials.push(colorMaterial);
		}
	}
	for(i = 0; i < cubeGeometry.faces.length; i++)
	{
		cubeGeometry.faces[i].materialIndex = i;
	}
	
	cubeGeometry.materials = materials;
	
	THREE.Mesh.call(self, cubeGeometry, new THREE.MeshFaceMaterial()); 
	
	self.position = location; 
	
	self.rotation = rotation; 
	btmMesh.rotation = rotation; 
	
	self.doubleSided = true;
	 
	scene.add(self); 
	scene.add(btmMesh);
	
	Lib.MeshMirrorClone2(self, scene, true, [bottom]); 
	Lib.MeshMirrorClone2(btmMesh, scene, true, [bottom]);
};

ArcTV.prototype = new ZugoBoundingMesh(); 
ArcTV.prototype.constructor = ArcTV; 
ArcTV.prototype.supr = ZugoBoundingMesh.prototype; 