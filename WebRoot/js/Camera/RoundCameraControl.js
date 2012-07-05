RoundCameraControl = function(camera,domElement)
{
	var radius = 3000; 
	
	var maxRadius = 4500; 
	var minRadius = 2500; 
	var movementSpeed = 10;
	var rotationSpeed = 1;
	
	var self = this; 
	
	var targetAngle = 0; 
	var clockwise = false ;
	var locked = false;
	
	this.camera = camera; 
	this.domElement = (domElement != undefined)? domElement : document;
	
	this.angle = 0; 

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	
	if (this.domElement == document) 
	{
	        this.viewHalfX = window.innerWidth / 2;
	        this.viewHalfY = window.innerHeight / 2;
	} 
	else 
	{
	        this.viewHalfX = this.domElement.offsetWidth / 2;
	        this.viewHalfY = this.domElement.offsetHeight / 2;
	        this.domElement.setAttribute('tabindex', -1);
	}
	
	//events
    function bind(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }


	this.onMouseDown = function(event) {
	    if (this.domElement != document) {
	            this.domElement.focus();
	        }
	    };
	    
	this.onKeyDown = function(event) {
	    	
	        switch (event.keyCode) {
	            case 87:
	                //w
	                this.moveForward = true;
	                break;
	            case 65:
	                //A
	                this.moveLeft = true;
	                break;
	            case 83:
	                //S
	                this.moveBackward = true;
	                break;
	            case 68:
	                //D
	                this.moveRight = true;
	                break;
	            default:
	                break;
	        }
	        
	};
	    
	this.onKeyUp = function(event) 
	{
	        switch (event.keyCode) 
	        {
	            case 87:
	                /*W*/
	                this.moveForward = false;
	                break;
	            case 65:
	                /*A*/
	                this.moveLeft = false;
	                break;
	            case 83:
	                /*S*/
	                this.moveBackward = false;
	                break;
	            case 68:
	                /*D*/
	                this.moveRight = false;
	                break;
	            default:
	                break;
	        }

	};
	
	this.domElement.addEventListener('keydown', bind(this, this.onKeyDown), false);
	this.domElement.addEventListener('keyup', bind(this, this.onKeyUp), false);
	this.domElement.addEventListener('mouseDown', this.onMouseDown, false);
	this.domElement.addEventListener('contextmenu', function (event) 
			    { 
			    	event.preventDefault(); 
			    }, false);
	
	this.setAutoMode = function(target)
	{
		 
		targetAngle = target; 
		var deltaAngle =  targetAngle - self.angle; 
		var isLargeAngle = ((Math.abs(deltaAngle) - 180) > 0); 
		var isPositiveAngle = deltaAngle > 0;
		
		if(!isLargeAngle && isPositiveAngle) 
			clockwise = false; 
		else if(isLargeAngle && isPositiveAngle) 
			clockwise  = true;
		else if(!isLargeAngle && !isPositiveAngle) 
			clockwise  = true;
		else if(isLargeAngle && !isPositiveAngle) 
			clockwise  = false;
		
		locked = true; 
	};

	this.update = function(delta)
	{
		if(!locked) 
		{
			 if(this.moveForward){
				 radius -= movementSpeed;
				 if(radius < minRadius)
					 radius = minRadius;
			 }
			 else if(this.moveBackward){
				 radius += movementSpeed;
				 if(radius > maxRadius)
					 radius = maxRadius;
			 }
			 else if(this.moveRight)
			 {
				 this.angle += rotationSpeed ; 
				 this.angle = this.angle % 360;
			 }
			 else if(this.moveLeft)
			 {
				 this.angle -= rotationSpeed; 
				 if(this.angle < 0)
					 this.angle += 360;
			 }
		}
		if(locked)
		{
			var deltaAngle = Math.abs(targetAngle - self.angle);
			if(deltaAngle > 180)
				deltaAngle = 360 - deltaAngle; 
			if(clockwise){
				if(deltaAngle > 2){
					self.angle -= 2; 
					self.angle = (self.angle + 360) % 360; 
				} 
				else
				{
					self.angle = targetAngle; 
					locked = false; 
				}
			}
			else{
				if(deltaAngle > 2)
				{
					 self.angle += 2; 
					 self.angle = (self.angle + 360) % 360; 
				}
				else
				{
					self.angle = targetAngle; 
					locked = false ;
				}
			}
		}
		
		this.camera.position = Lib.ArcCenter(radius, this.angle, SceneBuilder.CameraHeight);
	    var targetLocation = new THREE.Vector3(0, SceneBuilder.CameraHeight, 0);
		this.camera.lookAt(targetLocation);
	};
	

	
};
	
	
	