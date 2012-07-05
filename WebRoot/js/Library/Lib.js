Lib = function(){};

Lib.ModelFolder = "models/.";

Lib.Faces = {"xp":0, "yp":1, "xn":2, "yn":3, "zp":4, "zn":5};

Lib.UrlTypes = {"pages":0, "video":1, "posters":3};

Lib.Logo = function()
{
	var textureLoc = "models/logo.png";
	var imgTexture = new THREE.ImageUtils.loadTexture(textureLoc);
	return imgTexture;  
}; 

Lib.VectorOffset = function(loc1, loc2)
{
	var vector = new THREE.Vector3();
	vector.x = loc1.x + loc2.x;
	vector.y = loc1.y + loc2.y;
	vector.z = loc1.z + loc2.z; 
	return vector; 
};

Lib.RightWallX = 350; 
Lib.RightWallReflection = true;  
Lib.MeshMirrorClone = function(geometry,material,position,scene, singleSide)
{
	
	if(Lib.RightWallReflection && singleSide == undefined)
	{
		var meshRightReflect = new THREE.Mesh(geometry, material);
		meshRightReflect.position = new THREE.Vector3(Lib.RightWallX * 2 -position.x, position.y, position.z);
		scene.add(meshRightReflect); 
	}
	var meshDownReflect = new THREE.Mesh(geometry, material);
	meshDownReflect.position = new THREE.Vector3(position.x, -position.y, position.z);
	scene.add(meshDownReflect);
};

Lib.MeshMirrorClone2 = function(mesh,scene,singleSide, yArrays)
{
	var position = mesh.position; 
	var rotation = mesh.rotation; 
	if(singleSide == undefined)
	{
		singaleSide = true;  
	}
	if(yArrays == undefined)
		yArrays = [0];
	if(Lib.RightWallReflection && !singleSide)
	{
		var meshRightReflect = THREE.SceneUtils.cloneObject(mesh);
		meshRightReflect.position = new THREE.Vector3(Lib.RightWallX * 2 -position.x, position.y, position.z);
		meshRightReflect.rotation = rotation; 
		scene.add(meshRightReflect); 
	}
	for(i = 0; i< yArrays.length;i++)
	{
		var meshDownReflect = THREE.SceneUtils.cloneObject(mesh);
		meshDownReflect.scale.set(1,-1,1);
		meshDownReflect.position = new THREE.Vector3(position.x, 2*yArrays[i]-position.y, position.z);
		meshDownReflect.rotation = rotation; 
		scene.add(meshDownReflect);
	}

};


Lib.CalculateOffset = function(outerSize, innerSize, face)
{
	switch(face)
	{
		case 0:
			return new THREE.Vector3(outerSize.x/2+1,0,0);
		case 1: 
			return new THREE.Vector3(0,outerSize.y/2+1,0);
		case 2: 
			return new THREE.Vector3(innerSize.x/2 - 1, 0, 0);
		case 3:
			return new THREE.Vector3(0, innerSize.y/2 -1, 0);
		case 4: 
			return new THREE.Vector3(0,0,outerSize.z/2 + 1);
		case 5:
			return new THREE.Vector3(0,0,innerSize.z/2 - 1);
		default :
			return new THREE.Vector3(0,0,0);
	}
};

Lib.ParseParameter = function(paraName, url)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]"); 
	var regexS = "[\\?&]"+paraName+"=([^&#^;]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( url);  
	if( results == null )    
		return "";  
	else    
		return results[1].replace("%20", " ");
};

Lib.ArcCenter = function(radius, angle, centerY)
{
	radian = angle * Math.PI / 180; 
	x = Math.cos(radian) * radius; 
	y = centerY; 
	z = - Math.sin(radian) * radius; 
	return new THREE.Vector3(x,y,z);
};

