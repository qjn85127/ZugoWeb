ArcPlaneGroup = function(actionList, size, objectAngle, radius, scene)
{
	//Local variables 
	var lines = actionList.length; 
	var gap = size/2; 
	var planes = [];
	
	//Define speeds; 
	var minSpeed = 10; 
	var maxSpeed = 30; 
	var speed = maxSpeed;
	var accelaration =0.5; 
	var currentPosition = new THREE.Vector3();
	
	//angles.
	var offsetAngle = -10; 
	var cameraDetectionOffset = 22.5;
	
	var moveUp = true; 
	
	//public variables
	this.targerCenterY = 0; 
	this.height = (actionList.length -1)* size * 1.5 + size; 
	
	var position = Lib.ArcCenter( radius, objectAngle+ offsetAngle,0);
	var radian = (objectAngle+offsetAngle+90)/180 * Math.PI;
	setPosition(position);
	for(var i = 0 ; i < actionList.length ; i++)
	{
		var radian = (objectAngle + offsetAngle + 90)/180 * Math.PI; 
		var plane = new ArcPlane(actionList[i], size, radian, scene); 
		var offsetY = i * (size + gap)+size/2 - this.height; 
		plane.offset = new THREE.Vector3(0,offsetY, 0); 
		plane.setVisible(false);
		planes.push(plane);
	}
	
	function setPosition(position)
	{
		for(var n = 0; n < planes.length; n++){
			planes[n].setPosition(position); 
		}
		currentPosition = position; 
	}
	
	function setVisible(visible)
	{
		for(var n = 0; n < planes.length; n++){
			planes[n].setVisible(visible); 
		}
	}
	
	function checkTransformRange(cameraAngle)
	{
		var differ = Math.abs(cameraAngle - objectAngle); 
		if(differ <= cameraDetectionOffset || differ >= 360 - cameraDetectionOffset)
		{
			moveUp = true;
			setVisible(true);
		}
		else 
			moveUp= false;
	}
	
	this.update = function(cameraAngle)
	{
		checkTransformRange(cameraAngle);
		if(moveUp)
		{
			if(currentPosition.y < this.targetCenterY)
			{
					currentPosition.y += speed;
					setPosition(currentPosition);
					if(speed > minSpeed)
						speed -= accelaration;
			}
		}
		else
		{
			if(currentPosition.y > 0)
			{
					setPosition(currentPosition);
					currentPosition.y -= speed; 
					if(currentPosition.y <= 0)
						setVisible(false);
					if(speed < maxSpeed)
						speed += accelaration;
			}
		}
	};

	
	
};