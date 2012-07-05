InformationDisplay = function(objectAngle, information, centerY, radius, scene)
{
	var size = 50; 
	var descriptionTextHeight = 30; 
	var titleHeight = 10;
	
	//var desc = new TextGroup(information.descriptions, descriptionTextHeight, objectAngle, radius, scene); 
	//desc.targetCenterY = centerY; 
	
	var gap = 5; 
	
	//var title = new TextGroup([information.title], titleHeight, objectAngle, radius, scene); 
	//title.targetCenterY = desc.targetCenterY + desc.height/2 + gap + title.height /2; 
	
	var arcPlanes = new ArcPlaneGroup(information.actionSource, size, objectAngle, radius, scene);
	arcPlanes.targerCenterY = centerY; 
	
	this.update = function(cameraAngle)
	{
		arcPlanes.update(cameraAngle);
	};
};
