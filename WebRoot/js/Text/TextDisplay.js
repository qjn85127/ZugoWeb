TextDisplay = function(centerY, radius, scene)
{
	var texts = [] ;
	var charHeight = 50; 
	var offsetAngle = 10; 
	
	this.regist = function(angle, textData){
		texts.push(new TextTitle(textData, charHeight, centerY, radius, angle + offsetAngle, scene)); 
	} ;
	
	this.onChecking = function(rayAngle)
	{
		for(var i = 0 ; i < texts.length; i++)
			{
			   texts[i].checkRange(rayAngle);
			}
	};
};

TextTitle = function(textData, charHeight, centerY, radius, angle, scene)
{
	var position = Lib.ArcCenter(radius, angle, centerY); 
	var radian = angle/ 180 * Math.PI + Math.PI / 2; 
	
	this.textMesh = new ZugoText(textData, charHeight, radian, scene);
	this.textMesh.setPosition(position);
	var self = this;
	
	this.checkRange = function(rayAngle)
	{
		if(Math.abs(rayAngle - angle) <= 20)
		{
			self.textMesh.setVisible(true);
		}
		else 
			self.textMesh.setVisible(false);
	};
};