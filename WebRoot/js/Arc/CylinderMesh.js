CylinderMesh = function(centerY, height,  radius, material, scene, mirrorYs, geometryMaterialCallback)
{
	 var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 100, 1);
	 
	 var mesh = new THREE.Mesh(cylinderGeometry, material);
	 
	 mesh.position.y = centerY; 
	 
	 scene.add(mesh);
	 
	 if(mirrorYs == undefined)
	 {
		mirrorYs = [];
	 }
	 
	 if(geometryMaterialCallback != undefined)
	 {
		 geometryMaterialCallback(cylinderGeometry);
		 material.vertexColors = THREE.VertexColors;
	 }
	 
 
	 for(i = 0; i < mirrorYs.length; i++)
	 {
		 var mirrorMesh = new THREE.Mesh(cylinderGeometry, material);
		 mirrorMesh.position.y = 2 * mirrorYs[i] - centerY; 
		 scene.add(mirrorMesh);
	 }
	 
	 this.top = centerY + height/2; 
	 this.bottom = centerY - height/2;
	 this.radius = radius;
};





