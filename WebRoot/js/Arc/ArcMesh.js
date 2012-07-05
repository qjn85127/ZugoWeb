ArcMesh = function(radius, angle, width, height, centerY, information, materials, scene, mirrorY , EnableInteractive)
{
	var self = this; 
	var arcGeometry = new ArcGeometry(radius, angle, width, height, mirrorY);
	
	if(mirrorY)
		centerY = mirrorY * 2 - centerY;
	
	var materialCollection ;
	if(materials)
		materialCollection = materials; 
	else
		materialCollection  = [];
	
	texture  = THREE.ImageUtils.loadTexture(information.previewImage);
	
	var textureMaterial = new THREE.MeshPhongMaterial({map:texture, ambient: 0xffffff, specular: 0x999999, shininess: 15, shading: THREE.SmoothShading});
	
	ArcBounding.call(self, angle, arcGeometry.boundingGeometry, centerY, information, scene);
	
	THREE.Mesh.call(self, arcGeometry,textureMaterial); 
	
	self.doubleSided = true;
	
	scene.add(self);
	
	if(materialCollection.length > 0)
	{
	
		var colorMesh = THREE.SceneUtils.createMultiMaterialObject(arcGeometry, materials);
		
		colorMesh.position.y = centerY ;
    
		colorMesh.doubleSided = true;
		
		scene.add(colorMesh);
	
	}
	
	this.position.y = centerY; 
	this.radius = radius;
	this.angle = angle;

	var informDisplay; 
	var interactive = EnableInteractive; 

	
	this.update = function(cameraAngle)
	{
		/*
		var cameraDetectionOffset = 22.5;
		var differ = Math.abs(cameraAngle - angle); 
		if(differ <= cameraDetectionOffset || differ >= 360 - cameraDetectionOffset)
		{
			if(interactive)
			{
				if(informDisplay == undefined)
					informDisplay = new InformationDisplay(angle, information, centerY, radius + 50, scene);
			}
		}
		
		if(informDisplay != undefined)
			informDisplay.update(cameraAngle);
		*/
	};
	
};

ArcMesh.prototype = new ArcBounding();
ArcMesh.prototype.constructor = ArcMesh;
ArcMesh.prototype.supr = ArcBounding.prototype;

ArcMesh.MatrixCopy = function(radius, angles ,width, height, centerY, information, materials, scene, mirrorYs, EnableInteractive)
{
	var meshes = [];
	if(angles == undefined)
		angles = [];
	if(mirrorYs == undefined)
		mirrorYs = []; 
	for(i = 0; i< angles.length; i++)
	{
		var mesh = new ArcMesh(radius, angles[i], width, height, centerY, information, materials, scene, false, EnableInteractive);
		meshes.push(mesh);
		for(h = 0; h < mirrorYs.length; h++)
		{
			mesh = new ArcMesh(radius, angles[i], width, height, centerY, information, materials, scene, mirrorYs[h], false);
			mesh.isInteractive = false; 
		}
	}
	return meshes;
};