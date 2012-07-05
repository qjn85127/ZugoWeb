ZugoBorder = function()
{
	this.domElement = document.createElement('div');
	this.domElement.className = "bottom-main";
	
	var leftDiv = document.createElement('div');
		leftDiv.className = 'bottom-leftDiv';
		
	var ad = document.createElement('p');
		ad.innerHTML = "Authorized Distributer"; 
		ad.className = "bottom-ad";
		
	var img = document.createElement('img');
		img.src = "Resource/Scene/logo.png"; 
		img.className = "bottom-img";

	var text = document.createElement('p');
		text.innerHTML = "Bringing New Technologies to Light"; 
		text.className = "bottom-text";
		
		leftDiv.appendChild(ad);
		leftDiv.appendChild(img);
		leftDiv.appendChild(text);
		
	var rightDiv = document.createElement('div'); 
		rightDiv.className = 'bottom-rightDiv';
	
	var website = document.createElement('p'); 
		website.innerHTML = "www.zugophotonics.com";
		website.className = "bottom-website";
		
	var email = document.createElement('p');
		email.innerHTML = "enquiry@zugophotonics.com"; 
		email.className = "bottom-email";
		
	var localA = document.createElement('p'); 
		localA.innerHTML = "SINGAPORE - KUALALUMPUR - BANGKOK - HANOI";
		localA.className = "bottom-address";
		
	var localB = document.createElement('p');
		localB.innerHTML ="SHENZHEN - SHANGHAI - BEIJING - CHENGDU";
		localB.className = "bottom-address";
		
		rightDiv.appendChild(website);
		rightDiv.appendChild(email);
		rightDiv.appendChild(localA);
		rightDiv.appendChild(localB);
		
	this.domElement.appendChild(leftDiv); 
	this.domElement.appendChild(rightDiv);
};