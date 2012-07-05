ActionPanel = function(action){
	this.container = document.createElement('img');
	this.container.className = 'information-ActionLink';
	this.container.src = action.image;
	this.container.title = action.description;
	this.container.addEventListener('mouseup', mouseup, false);
	function mouseup()
	{
		window.open(action.hrefLink);
	}
};