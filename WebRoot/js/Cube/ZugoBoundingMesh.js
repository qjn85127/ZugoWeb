ZugoBoundingMesh = function(information, size, location, rotation, scene)
{
	if(!size)
		return;
	this.inform = information;
	var boundGeometry = new THREE.CubeGeometry(size.x + ZugoBoundingMesh.Offset, size.y + ZugoBoundingMesh.Offset, size.z + ZugoBoundingMesh.Offset);
	
	var faceABCD = "abcd";
	var color, f, p, n, vertexIndex;
	for ( i = 0; i < boundGeometry.faces.length; i ++ ) {

		f  = boundGeometry.faces[ i ];

		n = ( f instanceof THREE.Face3 ) ? 3 : 4;

		for( var j = 0; j < n; j++ ) {

			vertexIndex = f[ faceABCD.charAt( j ) ];

			p = boundGeometry.vertices[ vertexIndex ].position;

			color = new THREE.Color( 0xffffff );
			var temp = (p.y+400)/550; 
			color.setHSV(temp,temp,temp);

			f.vertexColors[ j ] = color;
			
		}
	}
	
	var wireMaterial = new THREE.MeshLambertMaterial({ wireframe: true, wireframeLinewidth  : 4, vertexColors: THREE.VertexColors});
	                  
	this.outBound = new THREE.Mesh(boundGeometry, wireMaterial);
	this.outBound.position = location;
	this.outBound.rotation = rotation; 
	this.outBound.visible = false;
	scene.add(this.outBound);
	this.isInteractive = (this.inform != undefined);
};

ZugoBoundingMesh.prototype = new THREE.Mesh();
ZugoBoundingMesh.prototype.constructor = ZugoBoundingMesh; 
ZugoBoundingMesh.prototype.supr = THREE.Mesh.prototype; 

ZugoBoundingMesh.Offset = 5; 

ZugoBoundingMesh.prototype.isSelected = function(selected)
{
	if(!this.outBound)return;
	if(this.inform != undefined && selected)
		this.outBound.visible = true;
	else
		this.outBound.visible = false;
};




