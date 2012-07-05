ZugoJsonModel = function(modelPath, targetLink, location, size, scene)
{ 
	var self = this; 
	var loader = new THREE.JSONLoader(true);
	ZugoBoundingMesh.call(self, size, targetLink, location, scene);
	loader.load(modelPath, initGeometry, Lib.ModelFolder);
	function initGeometry(geometry)
	{
		var material = new THREE.MeshFaceMaterial();
		THREE.Mesh.call(self, geometry, material);
		self.position = ZugoJsonModel.LocationConvert(location, size); 
        scene.add(self);
	}
};

ZugoJsonModel.LocationConvert = function(position,size)
{
	var result = new THREE.Vector3();
	result.x = position.x;
	result.y = position.y - size.y/2;
	result.z = position.z; 
	return result;
};

ZugoJsonModel.prototype = new ZugoBoundingMesh(); 
ZugoJsonModel.prototype.constructor = ZugoJsonModel;
ZugoJsonModel.prototype.supr = ZugoBoundingMesh.prototype;