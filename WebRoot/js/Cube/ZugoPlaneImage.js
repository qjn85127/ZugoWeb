ZugoPlaneImage  = function(location, width, height, rotate, texture)
{ 
	var posterPlane = new THREE.PlaneGeometry(width, height);
	var imgTexture = THREE.ImageUtils.loadTexture(texture);
	var material = new THREE.MeshPhongMaterial({ map: imgTexture, color: 0x777777, ambient: 0xffffff, specular: 0x999999, shininess: 15, shading: THREE.SmoothShading });
	THREE.Mesh.call(this, posterPlane, this.material);
	this.position = location;
	this.rotation = rotate; 
};

ZugoPlaneImage.prototype = new THREE.Mesh();
ZugoPlaneImage.prototype.constructor = ZugoPlaneImage;
ZugoPlaneImage.prototype.supr = THREE.Mesh.prototype;







