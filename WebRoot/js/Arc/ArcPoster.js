ArcPoster = function(information, length, width, radius, bottom, angle, scene, reflections)
{
	
	var self = this; 
	
	self.height = Math.random() * 100; 
	if(self.height < 50)
		self.height = 50;
	if(self.height > 100)
		self.height = 100; 
	
	//size, position, rotation; 
	var offsetAngle = 10;
	angle += offsetAngle; 
	var size = new THREE.Vector3(width, self.height, length);
	var centerY = bottom + self.height/2; 
	var location = Lib.ArcCenter(radius, angle, centerY); 
	var radian= angle/180 * Math.PI + Math.PI/2;  
	var rotation = new THREE.Vector3(0,radian, 0);
	
	//Cube Mesh
	var cubeGeometry = new THREE.CubeGeometry(width, self.height, length); 
	var colorMaterial = new THREE.MeshBasicMaterial({ambient: 0xffffff, vertexColors: THREE.VertexColors});
	var imageMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(information.previewImage)});
	
	ZugoBoundingMesh.call(self,  information , size, location, rotation, scene);
	
	var materials = []; 
	
 	var faceABCD = "abcd";
	var color, f, p, n, vertexIndex;
    var tempHeight = self.height; 
    
	function geometryMaterial(geometry)
	{
    	for ( i = 0; i < geometry.faces.length; i ++ ) 
    	{

    		f  = geometry.faces[ i ];
    	
    		n = ( f instanceof THREE.Face3 ) ? 3 : 4;

    		for( var j = 0; j < n; j++ ) {

    			vertexIndex = f[ faceABCD.charAt( j ) ];

    			p = geometry.vertices[ vertexIndex ].position;

    			color = new THREE.Color( 0xffffff );
    			var temp =(p.y+tempHeight/2)/tempHeight; 
    			if(temp > 0.9) temp = 0.9;
    			color.setHSV(0,0,temp);
    			f.vertexColors[ j ] = color;
    		}
    	}
	}
	
	geometryMaterial(cubeGeometry);
	
	for(var i = 0; i < 6; i++)
	{
		if(i == Lib.Faces.xn){ //The fifth face is the Z-negative face. 
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
	
	self.doubleSided = true; 
	
	scene.add(self);
	
	Lib.MeshMirrorClone2(self, scene, true, [bottom]);
}; 

ArcPoster.prototype = new ZugoBoundingMesh();
ArcPoster.prototype.constructor = ArcPoster;
ArcPoster.prototype.supr = ZugoBoundingMesh.prototype; 



