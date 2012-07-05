ZugoTable = function(btmLoc, color,  face, scene)
{
	var tableSize = new THREE.Vector3(140, 100, 70);
	var innerSize = new THREE.Vector3(80, 60, 2);
	var tableEdgeOffset = 20; 
	var tableEdgeHeight = 5; 
	
	var tableDirection = new THREE.Vector3();
	var innerImageZ = 1; 
	
	//Bottom cubebox;
	var btmCube = new THREE.CubeGeometry(tableSize.x, tableSize.y, tableSize.z); 
	var material = new THREE.MeshPhongMaterial({color:color, ambient:0xeeeeee, shiness:50, shading:THREE.SmoothShading});
	var btmMesh = new THREE.Mesh(btmCube, material); 
	btmMesh.position = new THREE.Vector3(btmLoc.x , btmLoc.y + tableSize.y/2, btmLoc.z);
	
	//inner Geometry
	var innerGeometry = new THREE.CubeGeometry(innerSize.x, innerSize.y, innerSize.z); 
	var colorMaterial = new THREE.MeshPhongMaterial({color: color, ambient: 0xffffff, specular: 0x999999, shininess:50, shading:THREE.SmoothShading});
	
	//var textureLoader = THREE.ImageUtils.loadTexture(textureLoc); 
	var textureMaterial =  THREE.MeshPhongMaterial({map:Lib.Logo(), color:0x777777, ambient:0xffffff, shading:THREE.SmoothShading, shininess:50, transparent:true});
	var materials = [];
	
	for(var i = 0; i < innerGeometry.faces.length; i++)
	{
		if(face == i)
		{
			materials.push(textureMaterial);
		}
		else
			materials.push(colorMaterial); 
	}
	for(i = 0; i < innerGeometry.faces.length; i++)
	{
		innerGeometry.faces[i].materialIndex = i; 
	}
	
	innerGeometry.materials = materials;
	
	var innerMesh = new THREE.Mesh(innerGeometry, new THREE.MeshFaceMaterial());
	var offset = Lib.CalculateOffset(tableSize, innerSize , face);
	
	innerMesh.position = Lib.VectorOffset(btmMesh.position, offset);
	
	//Edge.
	var topSize = new THREE.Vector3(tableSize.x+tableEdgeOffset, tableEdgeHeight, tableSize.z+ tableEdgeOffset);
	var edgeGeometry = new THREE.CubeGeometry(topSize.x, topSize.y, topSize.z);
	var edgePosition = new THREE.Vector3(btmLoc.x, btmLoc.y + tableEdgeHeight/2+ tableSize.y, btmLoc.z);
	var edgeMesh = new THREE.Mesh(edgeGeometry, material);
	edgeMesh.position = edgePosition; 
	scene.add(edgeMesh); 
	scene.add(btmMesh);
	scene.add(innerMesh); 
	
	Lib.MeshMirrorClone(edgeGeometry, material, edgeMesh.position, scene);
	Lib.MeshMirrorClone(btmCube, material, btmMesh.position, scene);
	Lib.MeshMirrorClone(innerGeometry, new THREE.MeshFaceMaterial(), innerMesh.position, scene);
	
	this.topPosition = new THREE.Vector3(btmLoc.x, tableEdgeHeight + tableSize.y + btmLoc.y, btmLoc.z);
};