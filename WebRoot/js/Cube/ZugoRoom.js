ZugoRoom = function(scene)
{
	
	//Reflection geometry.
	
	var plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshBasicMaterial( { color: 0x111111, opacity: 0.9, transparent: true } ) );
	plane.rotation.x = -Math.PI/2;
	plane.position = new THREE.Vector3(0,0,875);
	scene.add( plane );
	
	//Right side wall
	
	var rightWallGeometry = new THREE.CubeGeometry(500,550,500);
	var rightWallTransparentMaterial = new THREE.MeshPhongMaterial({ambient:0xEEEEEE , color:0x000000, shininess:5, shading:THREE.SmoothShading, opacity: 0.9, transparent: true});
	var rightWallBlackMaterial = new THREE.MeshBasicMaterial({color:0x0000000, transparent:true});
	var rightWallMaterials = [];
	for(i = 0; i < 6; i++)
	{
		if(i == Lib.Faces.zp)
			rightWallMaterials.push(rightWallBlackMaterial);	
		else
			rightWallMaterials.push(rightWallTransparentMaterial); 
		
		rightWallGeometry.faces[i].materialIndex = i; 
	};
	rightWallGeometry.materials = rightWallMaterials; 
	
	var rightWallMesh = new THREE.Mesh(rightWallGeometry, new THREE.MeshFaceMaterial());
	rightWallMesh.position = new THREE.Vector3(601,275,80);
	scene.add(rightWallMesh);
	
	var rightWallMirrorMesh = Lib.MeshMirrorClone(rightWallGeometry, new THREE.MeshFaceMaterial(), rightWallMesh.position, scene, false);

	//Right plane reflection geometry.
	var faceABCD = "abcd";
	var color, f, p, n, vertexIndex;
	var rightWallGeometry = new THREE.PlaneGeometry(550,500); 
	for ( i = 0; i < rightWallGeometry.faces.length; i ++ ) {

		f  = rightWallGeometry.faces[ i ];

		n = ( f instanceof THREE.Face3 ) ? 3 : 4;

		for( var j = 0; j < n; j++ ) {

			vertexIndex = f[ faceABCD.charAt( j ) ];

			p = rightWallGeometry.vertices[ vertexIndex ].position;

			color = new THREE.Color( 0xffffff );
			var temp = (p.y+400)/550; 
			color.setHSV(0,0,temp);

			f.vertexColors[ j ] = color;

		}
	}
	var rightWallPlaneMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, opacity:0.90, transparent: true});
	var rightWallPlane = new THREE.Mesh(rightWallGeometry,rightWallPlaneMaterial);
	
	rightWallPlane.position.set(350, 275, 75);
	rightWallPlane.rotation.x = -Math.PI/2;
	rightWallPlane.rotation.y = -Math.PI/2;
	scene.add(rightWallPlane);
	
	Lib.MeshMirrorClone2(rightWallPlane, scene, false);
	
	//Right Side Image 
	var planeImageGeometry = new THREE.PlaneGeometry(200,140); 
	var planeImageMaterial = new THREE.MeshLambertMaterial({map: Lib.Logo(), opacity: 1, transparent:true});
	var planeImageMesh = new THREE.Mesh(planeImageGeometry, planeImageMaterial);
    planeImageMesh.rotation = new THREE.Vector3(-Math.PI/2, -Math.PI/2, -Math.PI/2);
	planeImageMesh.position = new THREE.Vector3(348,400,100);
	scene.add(planeImageMesh);
	
	Lib.MeshMirrorClone2(planeImageMesh, scene, false);
	
	var backWallGeometry = new THREE.CubeGeometry(700,400,40);
	
	for ( i = 0; i < backWallGeometry.faces.length; i ++ ) {

		f  = backWallGeometry.faces[ i ];
		if(i != Lib.Faces.zp)
			continue;
		n = ( f instanceof THREE.Face3 ) ? 3 : 4;

		for( var j = 0; j < n; j++ ) {

			vertexIndex = f[ faceABCD.charAt( j ) ];

			p = backWallGeometry.vertices[ vertexIndex ].position;

			color = new THREE.Color( 0xffffff );
			var temp = (p.x + 650)/700; 
			if(temp<0.8) temp = 0.8;
			color.setHSV(0,0,temp);
			f.vertexColors[ j ] = color;

		}
	}
	
	var backWallMaterial = new THREE.MeshPhongMaterial({ambient:0xaaaaaa , color:0xaaaaaa, shininess:5, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors});
	var backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);
	backWallMesh.position = new THREE.Vector3(0,200,-150);
	
	
	scene.add(backWallMesh);
	
	var backwallMirrorMesh = Lib.MeshMirrorClone(backWallGeometry, backWallMaterial, backWallMesh.position, scene);
  
	/*
	var floorGeometry = new THREE.CubeGeometry(1000,10,600);
	var floorMaterial = new THREE.MeshPhongMaterial({ambient:0x111111, color:0x000099, shininess:15, shading: THREE.SmoothShading});
	var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
	floorMesh.position = new THREE.Vector3(0,-5,0);
	scene.add(floorMesh);
	*/
	
	var logoBox = new ZugoLogo(SceneBuilder.LogoBoxPositions[0], 
			SceneBuilder.LogoBoxOuterSize, SceneBuilder.LogoBoxInnerSize, Lib.Faces.zp, 0xffffff, scene);
	var logoBox1 = new ZugoLogo(SceneBuilder.LogoBoxPositions[1], 
			SceneBuilder.LogoBoxOuterSize, SceneBuilder.LogoBoxInnerSize, Lib.Faces.zp, 0xfffff, scene);
};
