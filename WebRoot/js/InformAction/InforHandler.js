InforHandler = function()
{
	this.domElement = document.createElement('div');
	this.domElement.className = 'inforhandler-Boarder';
	var p = document.createElement('span');
		p.className= 'inforhandler-Panel';
	this.domElement.appendChild(p);
	var self = this; 
	this.setVisible = function(visible, text)
	{
		if(visible)
		{
			self.domElement.style.visibility = "visible";
			p.innerHTML = text; 
		}
		else
		{
			self.domElement.style.visibility = "hidden";
		}
	};
	
	this.setPosition = function(x,y)
	{
		self.domElement.style.left = x + 15 + "px";
		self.domElement.style.top = y + "px";
	};
};
