TextGeometries = function()
{
	this.textsShapes = []; 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("B")); 
	this.textsShapes.push(new TextShape("C")); 
	this.textsShapes.push(new TextShape("D")); 
	this.textsShapes.push(new TextShape("E")); 
	this.textsShapes.push(new TextShape("F")); 
	this.textsShapes.push(new TextShape("G")); 
	this.textsShapes.push(new TextShape("H")); 
	this.textsShapes.push(new TextShape("I")); 
	this.textsShapes.push(new TextShape("J")); 
	this.textsShapes.push(new TextShape("K")); 
	this.textsShapes.push(new TextShape("L")); 
	this.textsShapes.push(new TextShape("M")); 
	this.textsShapes.push(new TextShape("N")); 
	this.textsShapes.push(new TextShape("O")); 
	this.textsShapes.push(new TextShape("P")); 
	this.textsShapes.push(new TextShape("Q")); 
	this.textsShapes.push(new TextShape("R")); 
	this.textsShapes.push(new TextShape("S")); 
	this.textsShapes.push(new TextShape("T")); 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("A")); 
	this.textsShapes.push(new TextShape("A")); 
};

TextShape = function(character)
{
	var height = 2; 
	var charHeight = 30; 
	this.geometry = new THREE.TextGeometry(character,
			{
				size: charHeight, 
				font: "optimer",
				height: height,
				bend:false,
				bevelEnabled : false
			});
};

