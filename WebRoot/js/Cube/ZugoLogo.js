/*	
 * location	: the absolute position of mesh. 
 * outSize 	: the size of the outside mesh. 
 * face		: the face which the logo is facing, (Lib.Faces)
 * innerSize: the inner box size.
 * innerMeshOffset: 
 * */
ZugoLogo = function(location, outSize, innerSize, face, color, scene)
{
	//Create a out geometry mesh 
	var outCube = new THREE.CubeGeometry(outSize.x, outSize.y, outSize.z);
	var outMaterial = new THREE.MeshPhongMaterial({color: color, ambient: 0xffffff, shininess:50, shading:THREE.SmoothShading});
	var outMesh = new THREE.Mesh(outCube, outMaterial);
	
	outMesh.position = location; 
	
	Lib.MeshMirrorClone(outCube, outMaterial, location, scene);
	
	//Create inner bounding geometry.

	var innerCube = new THREE.CubeGeometry(innerSize.x, innerSize.y, innerSize.z);
	var materials = []; 
	var colorMaterial = new THREE.MeshPhongMaterial({color: color, ambient: 0xffffff, specular: 0x999999, shininess:50, shading:THREE.SmoothShading});
	

	var textureMaterial = new THREE.MeshPhongMaterial({map:Lib.Logo(), color:0x777777, ambient:0xffffff, shading:THREE.SmoothShading, shininess:50});
	for(var i = 0; i < 6; i++)
	{
		if(i == face)
		{
			materials.push(textureMaterial);
		}
		else
		{
			materials.push(colorMaterial);
		}
	}
	
	for(i = 0; i < 6; i++)
	{
		innerCube.faces[i].materialIndex = i;
	}
	innerCube.materials = materials;
	
	var innerMesh = new THREE.Mesh(innerCube, new THREE.MeshFaceMaterial());
	
	var offset = Lib.CalculateOffset(outSize, innerSize, face);
	innerMesh.position = Lib.VectorOffset(location, offset);
	
  Lib.MeshMirrorClone(innerCube, new THREE.MeshFaceMaterial(), innerMesh.position, scene); 
	
	
	scene.add(innerMesh);
	scene.add(outMesh); 
};


