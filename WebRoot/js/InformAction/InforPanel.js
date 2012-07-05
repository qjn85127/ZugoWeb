InforPanel = function(information, x, y)
{
	var info = information;
	this.isValid = true; 
	this.container = document.createElement('div');
	this.container.className = 'information-Border'; 
	this.container.id = 'testPanel';
	
	var imgTitle = document.createElement('img');
	imgTitle.className = 'information-Image';
	
	
    var closeButton = document.createElement('img');
    closeButton.src = "Resource/close.gif";
    closeButton.className = 'panel-Close'; 
    closeButton.addEventListener('mouseup', panelClose, false);
  
	var title = document.createElement('span');
	title.className = "information-Title";

    var description = document.createElement('span');
    description.className = 'information-Description'; 
    
    var actionDiv = document.createElement('div');

    var self = this; 
    
    show(info, x, y);

    this.container.appendChild(imgTitle);
	this.container.appendChild(closeButton);
	this.container.appendChild(title);
	this.container.appendChild(description);
	this.container.appendChild(actionDiv);  
    
    function show(info, x, y )
    {
    	setInfo(info);
    	setPosition(self,x,y);
    };
    
    function setInfo(info)
    {
    	if(information == undefined)
    		return;
    	imgTitle.src = info.titleImage;
    	title.innerHTML = info.title; 
    	description.innerHTML = info.description;
    	var i = 0;
    	for(i=0; i<info.actionSource.length; i++)
    		{
    			var action = info.actionSource[i];
    			/*
		    	var actionLink = document.createElement('a');
		    	var actionImage = document.createElement('img'); 
		    	actionLink.className = 'information-ActionLink'; 
		    	actionLink.title = action.description;
		    	actionLink.href = action.link;
		    	actionLink.target = "_blank"; 
		    	actionImage.src = action.image;
		    	actionLink.appendChild(actionImage);
		    	actionDiv.appendChild(actionLink);
		    	actionLink.addEventListener('mouseup', onActionMouseUp, false);
    			*/
    			var panel = new ActionPanel(action);
    			actionDiv.appendChild(panel.container);
    			panel.container.addEventListener('mouseup', onActionMouseUp, false);
    		}
    };
     
    function setPosition(self, x,y)
    {
    	self.container.style.left = x+5+ "px";
    	self.container.style.top = y+25+"px";
    };
    
    function panelClose(event)
    {
    	self.container.parentNode.removeChild(self.container);
    };
    
    function onActionMouseUp(event)
    {
    	self.container.parentNode.removeChild(self.container);
    }
    
};











