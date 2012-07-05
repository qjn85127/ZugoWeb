ZugoNormalModel = function (path, link, location, size,scene) 
{
    var loader = new THREE.JSONLoader(true);
    loader.load(path, initGeometry , Lib.ModelFolder);
    this.boundingBox = null;
    var self = this;
    
    function initGeometry(geometry)
    {	
        THREE.Mesh.call(self,  geometry, new THREE.MeshFaceMaterial());    
        self.position = location; 
        scene.add(self);   
        
        var mirrorMesh = Lib.MeshMirrorClone(geometry, new THREE.MeshFaceMaterial(), location, scene);
    };
    
};

ZugoNormalModel.prototype = new THREE.Mesh();
ZugoNormalModel.prototype.constructor = ZugoNormalModel;
ZugoNormalModel.prototype.supr = THREE.Mesh.prototype;





















