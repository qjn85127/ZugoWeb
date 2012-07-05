/*
 * angle - rotation of cube to be drawn 
 * cube - CubeGeometry 
 * information - 
 * scene - 
 * */
ArcBounding = function(angle, boundGeometry, centerY, information, scene)
{
	
	if(angle == undefined) 
		return;
	this.inform = information; 
	this.bound = new THREE.Line(boundGeometry, new THREE.LineBasicMaterial({color:0x0000AA, wireframeLinewidth:3}));
	//this.bound.rotation.x = angle/180*Math.PI;  
	this.bound.visible = false; 
	this.bound.doubleSided = true; 
	this.bound.position.y = centerY; 
	scene.add(this.bound);
	this.doubleSided = true;
	this.isInteractive = true; 
	
};

ArcBounding.prototype = new THREE.Mesh();
ArcBounding.prototype.constructor = ArcBounding;
ArcBounding.prototype.supr = THREE.Mesh.prototype;

ArcBounding.prototype.isSelected = function(selected)
{
	if(!this.bound)return;
	if(selected)
	{
		this.bound.visible = selected; 
	}
	else 
	{
		this.bound.visible = false;
	}
	
};



