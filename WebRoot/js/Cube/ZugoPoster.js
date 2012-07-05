ZugoPoster = function(textureLoc, targetLink, outSize, innerSize, location, face, color, scene)
{
	var self = this; 
	
	var colorMaterial = new THREE.MeshPhongMaterial({color: color, ambient:color, shading:THREE.SmoothShading, shininess:20}); 
	
	ZugoBoundingMesh.call(self, outSize, targetLink, location, scene);
	
	var outCube = new THREE.CubeGeometry(outSize.x, outSize.y, outSize.z);
	
	THREE.Mesh.call(self, outCube, colorMaterial);

	self.position = location; 
	
	scene.add(self);
	
	Lib.MeshMirrorClone(outCube, colorMaterial, location, scene);
	
	var materials = []; 
	
	var textureImage = new THREE.ImageUtils.loadTexture(textureLoc);
	var textureMaterial = new THREE.MeshPhongMaterial({map:textureImage, color:0x777777, ambient:0xffffff, shading:THREE.SmoothShading, shininess:15});
	for(var i = 0; i < 6; i++)
	{
		if(i == face){ //The fifth face is the Z-negative face. 
			materials.push(textureMaterial); 
		}
		else{
			materials.push(colorMaterial);
		}
	}
	
	var innerCube = new THREE.CubeGeometry(innerSize.x, innerSize.y, innerSize.z);
	
	for(i = 0; i < innerCube.faces.length; i++)
	{
		innerCube.faces[i].materialIndex = i;
	}
	
	innerCube.materials = materials; 
	
	var innerMesh = new THREE.Mesh(innerCube, new THREE.MeshFaceMaterial());
	
	var offset = Lib.CalculateOffset(outSize, innerSize, face);
	innerMesh.position = Lib.VectorOffset(location, offset); 
	
	Lib.MeshMirrorClone(innerCube, new THREE.MeshFaceMaterial(), innerMesh.position, scene);
	
	scene.add(innerMesh);
	
};

ZugoPoster.prototype = new ZugoBoundingMesh();
ZugoPoster.prototype.constructor = ZugoPoster;
ZugoPoster.prototype.supr = ZugoBoundingMesh.prototype;
