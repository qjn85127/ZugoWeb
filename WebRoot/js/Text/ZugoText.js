ZugoText = function(txtStr, charHeight, radian, scene)
{
	var height = 2; //Z axis height. 
	var color = 0xffffff;
	var geo = new THREE.TextGeometry(txtStr, 
	{
		size: charHeight, 
		font: "optimer",
		height: height,
		bend:false,
		bevelEnabled : false
	});

	var textMesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color:color, ambient: color}));
		  
	textMesh.rotation.y = radian;
	
	scene.add(textMesh);
	
	this.offset = new THREE.Vector3(); 
	
	this.setPosition = function(position)
	{
		textMesh.position = Lib.VectorOffset(position, this.offset);
	};
	
	this.setVisible = function(visible)
	{
		 textMesh.visible = visible;
	};
	
};