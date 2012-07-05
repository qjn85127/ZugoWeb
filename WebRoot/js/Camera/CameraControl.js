FirstPersonCamera = function (object, domElement) {
    this.object = object;
    this.domElement = (domElement !== undefined) ? domElement : document;
    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;
    this.noFly = false;
    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0;

    this.rotateLeft = false;
    this.rotateRight = false;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;


    this.mouseX = 0;
    this.mouseY = 0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.freeze = false;

    this.mouseDragOn = false;

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

    this.onMouseDown = function (event) {
        if (this.domElement != document) {
            this.domElement.focus();
        }

    };

    this.onKeyDown = function (event) {
    	
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
            case 81:
                //Q
                this.rotateLeft = true;
                break;
            case 69:
                //E
                this.rotateRight = true;
                break;
            default:
                break;
        }
        
    };

    this.onKeyUp = function (event) {

        switch (event.keyCode) {
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
            case 81:
                //Q
                this.rotateLeft = false;
                break;
            case 69:
                //E
                this.rotateRight = false;
                break;
            default:
                break;
        }

    };

    this.update = function (delta) {
        var actualMoveSpeed = delta * this.movementSpeed;
        if (this.moveForward || (this.autoForward && !this.moveBackward))
            this.object.translateZ(-(actualMoveSpeed));
        if (this.moveBackward)
            this.object.translateZ(actualMoveSpeed);
        if (this.moveLeft)
            this.object.translateX(-actualMoveSpeed);
        if (this.moveRight)
            this.object.translateX(actualMoveSpeed);
        if (this.moveUp)
            this.object.translateY(actualMoveSpeed);
        if (this.moveDown)
            this.object.translateY(-actualMoveSpeed);

        var actualLookSpeed = delta * this.lookSpeed;

        if (!this.activeLook) {
            actualLookSpeed = 0;
        }

        if (this.rotateLeft) {
            this.lon -= actualLookSpeed * 1000;
        }
        if (this.rotateRight) {
            this.lon += actualLookSpeed * 1000;
        }

        if (this.lookVertical)
            this.lat -= this.mouseY * actualLookSpeed;

        this.lat = SceneBuilder.LookDownAngle;// Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;

        var targetPosition = new THREE.Vector3();
        var position = this.object.position;

        targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPosition.y = position.y + 100 * Math.cos(this.phi);
        targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        var verticalLookRatio = 1;

        if (this.constrainVertical) {

            verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);

        }

        if (this.rotateLeft) {
            this.lon -= actualLookSpeed * 1000;
        }
        if (this.rotateRight) {
            this.lon += actualLookSpeed * 1000;
        }

        if (this.lookVertical)
            this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;

        this.theta = this.lon * Math.PI / 180;

        if (this.constrainVertical) {

            this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);

        }

        targetPosition = new THREE.Vector3();
        position = this.object.position;
/*
        targetPosition.x = position.x; //+ 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPosition.y = position.y; //+ 100 * Math.cos(this.phi);
        targetPosition.z = position.z - 100; //* Math.sin(this.phi) * Math.sin(this.theta);
*/
        targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPosition.y = position.y + 100 * Math.cos(this.phi);
        targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        
        this.object.lookAt(targetPosition);

    };

    this.domElement.addEventListener('contextmenu', function (event) 
    { 
    	event.preventDefault(); 
    }, false);

    this.domElement.addEventListener('keydown', bind(this, this.onKeyDown), false);
    this.domElement.addEventListener('keyup', bind(this, this.onKeyUp), false);

    function bind(scope, fn) {
        return function () {
        	
            fn.apply(scope, arguments);
        };
    }


};