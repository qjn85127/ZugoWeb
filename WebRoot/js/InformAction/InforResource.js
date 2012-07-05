InforResource = function()
{
	this.id = ""; 
	this.titleImage = "";
	this.title = ""; 
	this.description = "";
	this.previewImage = ""; 
	var self = this; 
	this.perform = function(x, y)
	{
		var informPanel = new DescriptionPanel(self.title, self.description, x, y);
		document.body.appendChild(informPanel.domElement);	
	}; 
};


ActionResource = function(link, image, title, target)
{
	this.id = "";
	this.link = arguments[0];
	this.image = arguments[1]; 
	this.title= arguments[2];
	this.target = arguments[3];
	this.previewImage = "";
	this.hrefLink = function(){
		return this.link + "?source=" + this.target+";?id="+this.id + ";";
	};
	var self = this; 
	this.perform = function(x,y)
	{
		window.open(self.hrefLink());
	};
};

InforResource.Poster = "Poster.html";
InforResource.Video = "Movie.html";

InforResource.GetID = function(id)
{
	switch(id)
	{
		case "Litron Nano":
			return InforResource.LitronNano(); 
		case "Prior": 
			return InforResource.Prior();
		case "Zaber":
			return InforResource.Zaber();
		case "GentecEO":
			return InforResource.GentecEO();
		case "Gentec":
			return InforResource.Gentec();
		case "MinusK":
			return InforResource.MinusK(); 
		case "Hinds":
			return InforResource.Hinds();
		case "Andor": 
			return InforResource.Andor();	
	}
	return null; 
};

InforResource.Zugo = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.title = "Zugo Photonics"; 
	res.previewImage = "Resource/Scene/logo.png";
	res.description = "Description Preview - Added to test the description functions...";
	return res; 
};

InforResource.LitronNano = function()
{
	var res = new InforResource();
	res.id = "Litron Nano"; 
	res.titleImage = "Resource/qmark.jpg";
	res.title = "Litron"; 
	res.previewImage = "Resource/Scene/Litron.jpg";
	res.description = "High energy pulse laser. Reliable for PIV, LIF, LIBS, Ti:Sa and Dye Laser applications.";
	return res;
};

ActionResource.LitronNano_Movie = function(){
	var action = new ActionResource(InforResource.Video,"Resource/play.png","Watch litron nano test video.", "NanoTest");
	action.previewImage = "Resource/Scene/Litron.jpg";
	action.id = "Litron Nano"; 
	return action; 
}; 

ActionResource.LitronNano_Poster = function(){
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take litron nano brochure",  "Litron1");
	action.id = "Litron Nano";
	action.previewImage = "Resource/Scene/Litron.jpg";
	return action; 
}; 

InforResource.Prior = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.title = "Prior"; 
	res.previewImage = "Resource/Scene/Prior.jpg";
	res.description = "<strong>High precision</strong> Microscope motion stage. For Leica, Nikon, olympus and many other microscopes.";
	return res;
};

ActionResource.Prior_Poster = function(){
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Prior Product Brochure",  "Prior");
	action.id = "Prior"; 
	action.previewImage = "Resource/Scene/Prior.jpg";
	return action; 
}; 

InforResource.Zaber = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/Zaber.jpg";
	res.title = "Zaber"; 
	res.description = "Compact motion control, Motion stage,\nRotation stage, Tilt device.";
	return res;
};

ActionResource.Zaber_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Zaber Product Brochure",  "Zaber");
	action.id = "Zaber";
	action.previewImage = "Resource/Scene/Zaber.jpg";
	return action;
};

InforResource.GentecEO = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/Gentec-EO.jpg";
	res.title = "Gentec EO"; 
	res.description = "High accuracy, damage threshold laser power meter, energy meter, beam profile.";
	return res;
};

ActionResource.Gentec_EO_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Gentec EO Brochure",  "Maestro");
	action.id = "Gentec EO";
	action.previewImage = "Resource/Scene/Gentec-EO.jpg";
	return action;
};

InforResource.Gentec = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/Gentec.jpg";
	res.title = "Gentec"; 
	res.description = "High accuracy, damage threshold laser power meter, energy meter, beam profile.";
	return res;
};

ActionResource.Gentec_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Gentec Brochure",  "Power");
	action.inform = InforResource.Gentec();
	action.previewImage = "Resource/Scene/Gentec.jpg";
	return action;
};

InforResource.MinusK = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/MinusK.jpg";
	res.title = "Minus K"; 
	res.description = "Negative Vibration Isolator - 0.5Hz natural frequency. 10 to 100 times better performance than typical air tables.";
	return res;
};

ActionResource.MinusK_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Minus K Technology Brochure",  "Minus K");
	action.previewImage = "Resource/Scene/MinusK.jpg";
	action.inform = InforResource.MinusK();
	return action;
};

InforResource.Hinds = function()
{
	var res = new InforResource();
	res.title = "Hinds Instruments"; 
	res.description = "High accuacy birefringence measurement system.";
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/Hinds.jpg";
	return res;
};

ActionResource.Hinds_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Hinds Instruments brochure",  "Hinds");
	action.inform = InforResource.MinusK();
	action.previewImage = "Resource/Scene/Gentec-EO.jpg";
	return action;
};

InforResource.Andor = function()
{
	var res = new InforResource();
	res.titleImage = "Resource/qmark.jpg";
	res.previewImage = "Resource/Scene/Andor.jpg";
	res.title = "Andor"; 
	res.description = "High accuacy birefringence measurement system.";
	return res;
};

ActionResource.Andor_Poster = function()
{
	var action = new ActionResource(InforResource.Poster, "Resource/poster.png", "Take Andor brochure",  "Andor");
	action.inform = InforResource.Andor();
	action.previewImage = "Resource/Scene/Andor.jpg";
	return action;
};




