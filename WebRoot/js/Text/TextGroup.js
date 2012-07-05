TextGroup = function(textLines, charHeight, objectAngle, radius, scene)
{
	
	var texts = [];
	var lines = textLines.length; 
	var gap = charHeight/2; 
	var angle = objectAngle;
	
	var currentPosition = new THREE.Vector3();
	
	//Define speeds; 
	var minSpeed = 10; 
	var maxSpeed = 30; 
	var speed = maxSpeed;
	var accelaration =0.5; 
	
	//constant variables;
	var offsetAngle = 10;
	var cameraDetectionOffset = 22.5;
	
	this.targetCenterY = 0; 
	var moveUp = true;
	
	this.height = (lines - 1) * (charHeight + gap) + charHeight; 
	
    var position = Lib.ArcCenter( radius, objectAngle+ offsetAngle,0);
    
    setPosition(position);

	for(var i = 0; i < textLines.length; i++)
	{
		var radian = (angle+offsetAngle+90)/180 * Math.PI;
		var txtObject =  new ZugoText(textLines[i], charHeight, radian, scene);
		var offsetY = i * (charHeight + gap) + charHeight/2 - this.height/2;  
		txtObject.offset = new THREE.Vector3(0,offsetY,0); 
		txtObject.setVisible(false); 
		texts.push(txtObject);
	}
	
	function setPosition(position)
	{
		for(var n = 0; n < texts.length; n++){
			texts[n].setPosition(position); 
		}
		currentPosition = position; 
	}
	
	function setVisible(visible)
	{
		for(var n = 0; n < texts.length; n++){
			texts[n].setVisible(visible); 
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
