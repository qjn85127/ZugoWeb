SceneConfiguration = function()
{
	this.domElement = document.createElement('div');
	this.domElement.className = 'cfg-main'; 
	
	var lightIntensityBar = new ValueBar("light Intensity : "); 
	lightIntensityBar.setValue(0.5);
	
	var stateSwitch = new SwitchButton(["Full Screen Mode", "Fixed Size Mode"]);  

	var closeBtn = new CloseButton();
	closeBtn.setText("Controls");

	var visible = false;
	var self = this; 
	
	var children = []; 
	
	children.push(lightIntensityBar);
	children.push(stateSwitch);
	
	self.domElement.appendChild(closeBtn.domElement);
	
	this.setSource = function(src, functionName, index)
	{
		children[index].setSource(src,functionName);
	}; 
	
	function closeButtonClicked(event)
	{
		visible = !visible;
		if(visible)
			{
				closeBtn.setText("Hide");
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.appendChild(children[i].domElement); 
				}
			}
		else
			{
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.removeChild(children[i].domElement);
				}
				closeBtn.setText("Controls");
			}
	} 
	
	closeBtn.domElement.addEventListener('mousedown', closeButtonClicked, false);

	//this.domElement.appendChild(lightIntensityBar.domElement);
	
};

ProductListPanel = function(view){
	this.domElement = document.createElement('div'); 
	this.domElement.className = 'productPanel-main'; 
	var self = this; 
	
	var visible = false; 
	var children = []; 
	var closeBtn = new CloseButton(); 
		closeBtn.setText("Products");
	
	this.regist = function(angle, title){
		var button = new Button(title, angle); 
		button.domElement.addEventListener('mousedown', function(){
			view.setAutoMode(angle); 
		}, false); 
		children.push(button.domElement);
	}; 
	
	self.domElement.appendChild(closeBtn.domElement);
	
	function closeButtonClicked(event)
	{
		visible = !visible;
		if(visible)
			{
				closeBtn.setText("Hide");
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.appendChild(children[i]); 
				}
			}
		else
			{
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.removeChild(children[i]);
				}
				closeBtn.setText("Products");
			}
	} 
	
	closeBtn.domElement.addEventListener('mousedown', closeButtonClicked, false);
	
}; 

ServerChatPanel = function()
{
	this.domElement = document.createElement('div');
	this.domElement.className = 'chatServer-main'; 
	
	var closeBtn = new CloseButton(); 
	var chatPanel = new ChatPanel();
	var visible = false; 
	var self = this; 
	
	var children = []; 
	
	self.domElement.appendChild(closeBtn.domElement); 
	children.push(chatPanel.domElement);
	
	function  closeButtonClicked(event)
	{
		visible = !visible;
		if(visible)
			{
				self.domElement.removeChild(closeBtn.domElement);
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.appendChild(children[i]); 
				}
				self.domElement.appendChild(closeBtn.domElement);
				closeBtn.setText("Hide");
			}
		else
			{
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.removeChild(children[i]);
				}
				closeBtn.setText("Talk with zugo staff");
			}
	}
	
	closeBtn.domElement.addEventListener('mousedown', closeButtonClicked, false);
	
}; 

DescriptionPanel = function(title, text, x, y)
{
	this.domElement = document.createElement('div');
	this.domElement.className = 'descPanel-main';
	
	var self = this; 
	
	var titleElement = document.createElement('span'); 
		titleElement.className = 'descPanel-title'; 
	 
		
	var descElement = document.createElement('div'); 
		descElement.className =  'descPanel-Text'; 
	
	this.isValid = false; 

	function closeButtonClicked(event)
	{
		self.close();
	}
	
	var closeBtn = new CloseButton(); 
	closeBtn.setText("Close"); 
	closeBtn.domElement.addEventListener('mousedown', closeButtonClicked, false);
	
	this.domElement.appendChild(titleElement); 
	this.domElement.appendChild(document.createElement('br'));
	this.domElement.appendChild(descElement);
	
	this.domElement.appendChild(closeBtn.domElement);
	document.addEventListener('keydown', closeButtonClicked, false);
	
	
	show(title, text, x, y);
	
	function setInformation(title, text)
	{
		titleElement.innerHTML = title; 
		descElement.innerHTML = text; 
	}
	
	function setPosition(x,y)
	{
		self.domElement.style.left = x+ 5 + "px";
		self.domElement.style.top = y+ 5 + "px";
	}
	
	function show(title, text, x, y)
	{
		setInformation(title, text); 
		setPosition(x,y); 
	}
	
	this.close = function()
	{
		self.domElement.parentNode.removeChild(self.domElement); 
	};
	
};

ZugoPanel = function()
{
	this.domElement = document.createElement('div');
	this.domElement.className = "zugoPanel-main";
	
	var img = document.createElement('a');
	var innerImg = document.createElement('img');
		innerImg.src = "Resource/Scene/logo.png";
		innerImg.className = "zugoPanel-img"; 
		img.appendChild(innerImg);
		img.href = "http://www.zugophotonics.com"; 
	
	
	var rightPanel = document.createElement('div'); 
		
	var link = document.createElement('p');
		link.href = "http://www.zugophotonics.com";
		link.innerHTML = "<strong>www.zugophotonics.com</strong>"; 
		link.className = 'zugoPanel-link';
		link.addEventListener("mouseup",  function(event){window.open(link.href);}, false);
		
	var email = document.createElement('span'); 
		email.innerHTML = "enquiry@zugophotonics.com"; 
		email.className = 'zugoPanel-email';
		
	var locations1 = document.createElement('p');  
		locations1.innerHTML = "SINGAPORE - KUALALUMPUR - BANGKOK - HANOI";
		locations1.className = 'zugoPanel-address';
		
	var locations2 = document.createElement('p');
		locations2.innerHTML = "SHENZHEN - SHANGHAI - BEIJING - CHENGDU";
		locations2.className = 'zugoPanel-address';
		
		rightPanel.appendChild(link);
		rightPanel.appendChild(email);
		rightPanel.appendChild(locations1);
		rightPanel.appendChild(locations2);
		
	var closeBtn = new CloseButton();
		closeBtn.setText("About Zugo Photonics");
		
	this.domElement.appendChild(closeBtn.domElement);
		 
	var children = [];
	children.push(img); 
	children.push(rightPanel);
	
	var visible = false;
	var self = this; 
	
	function closeButtonClicked(event)
	{
		visible = !visible;
		if(visible)
			{
			
				closeBtn.setText("Hide");
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.appendChild(children[i]); 
				}
				
			}
		else
			{
				for(var i = 0; i < children.length; i++)
				{
					self.domElement.removeChild(children[i]);
				}
				closeBtn.setText("About Zugo Photonics");
			}
	} 
	
	closeBtn.domElement.addEventListener('mousedown', closeButtonClicked, false);
	
};

ChatPanel = function()
{
	//Create chatting panel; 
	this.domElement =  document.createElement('div'); 
	
    var textArea = document.createElement('textArea');
    	textArea.className = "chatServer-history";
    	textArea.value = "Server is offline";
    	textArea.disabled = true; 
    	
    var sendBar = document.createElement('p');
    	sendBar.className = 'cfg-block';
    	
    var textBar = document.createElement('input');
    	textBar.type = "text";
    	textBar.className = 'charServer-sendText'; 
    	textBar.value = 'Server is offline...'; 
    	textBar.disabled = true;
    	
    var sendButton = document.createElement('input');
    	sendButton.type = "button";
    	sendButton.value = "Send"; 
    	sendButton.className = 'chatServer-sendButton '; 
        
    	sendButton.disabled = true; 
    	
    	sendBar.appendChild(textBar); 
    	sendBar.appendChild(sendButton); 
    	
    this.domElement.appendChild(textArea);
    this.domElement.appendChild(sendBar); 
    	
};

ValueBar = function(title)
{ 
	var min = 0; 
	var max = 10; 
	var barWidth = 100; 
	this.domElement = document.createElement('div'); 
	this.domElement.className = 'cfg-valueBar';
	
	var titleElement = document.createElement('span');
	titleElement.innerHTML = title; 
	titleElement.className =  'cfg-valueBar-title';
	
	var data = document.createElement('span'); 
	data.innerHTML = "1"; 
	data.className ='cfg-valueBar-text';
	
	var bar = document.createElement('div'); 
	bar.className = 'cfg-valueBar-data';
     
	var barValue = document.createElement('div'); 
	barValue.className = 'cfg-valueBar-dataValue';
	bar.appendChild(barValue);
	var self = this; 
	
	var source , propertyName; 
	this.setSource = function(src, propName)
	{
		source = src;
		propertyName = propName;
	}; 
	
	this.setValue = function(value)
	{
		if(value <= min) value = min;
		if(value > max) value = max; 
		
		barValue.style.width = value * 100 + "%"; 
		var result = Math.round(value * (max - min) + min, 2); 
		data.innerHTML = result;
		if(source != undefined)
			{
				source[propertyName] = result;
			}
	};
	
	function mouseClicked(event)
	{
		var left = self.domElement.parentElement.offsetLeft + bar.offsetLeft ;
		var testOffset = self.domElement.offsetLeft; 
		var x = event.clientX - left;
		if(x > 0)
			{
				self.setValue(x/barWidth);  
			}
	}
	
	bar.addEventListener('mousedown', mouseClicked, false); 

	this.domElement.appendChild(titleElement);
	this.domElement.appendChild(data);
	this.domElement.appendChild(bar); 
	
	
	this.setVisiblity = function(visible)
	{
		if(visible)
			self.domElement.style.visibility = "visible"; 
		else
			self.domElement.style.visibility = "hidden";
	}; 
	
}; 

Button = function(title, angle)
{
	this.domElement = document.createElement('div'); 
	this.domElement.className = 'cfg-block'; 
	
	var text = document.createElement('span'); 
	text.className = 'product-button'; 
	text.innerHTML = title;
	
	this.domElement.appendChild(text); 
	
	this.targetAngle = angle; 
}; 

SwitchButton = function(texts)
{
	this.domElement = document.createElement('div'); 
	this.domElement.className = 'cfg-switchButton';
		
	var self = this; 
	
	var state = true; 
	
	this.domElement.innerHTML = texts[0];
	
	this.getState = function() { return state; };
	
	var source ; 
	this.setSource = function(src)
	{
		source = src; 
	};
	
	function switchState(event)
	{
		state = !state; 
	 	if(state)
		{
	 		self.domElement.style.backgroundColor = "#00AEFF"; 
	 		self.domElement.style.color = "white";
	 		self.domElement.innerHTML = texts[0];
		}
	 	else
	 	{
	 		self.domElement.style.backgroundColor = "#000000";
	 		self.domElement.style.color = "white";
	 		self.domElement.innerHTML = texts[1];
	 	}
	 	if(source != undefined)
	 	{
	 		source.changeMode(state); 
	 	}
	};

	switchState(); 
	
	this.domElement.addEventListener('mouseup', switchState, false);
	
};

CloseButton = function()
{
	this.domElement = document.createElement('div'); 
	this.domElement.className = 'cfg-closeButtonBorder'; 
	var text = document.createElement('span'); 
	text.className = 'cfg-closeButton'; 
	text.innerHTML = "Close Control Panel";
	
	this.domElement.appendChild(text); 
	
	var self = this; 
	
	this.setText = function(value)
	{
		text.innerHTML = value; 
	};
	
};

