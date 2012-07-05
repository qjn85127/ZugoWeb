ZugoScene = function()
{
	 	var container;
	    var scene, projector, renderer,view;
	    var mesh, particle1;
	    var pointLight;
	    var pointLight2;
	    var clock = new THREE.Clock();

	    var radius = 500;
	    var theta = 0;
	    var duration = 100;
	    var keyframes = 15;
	    var color, colors = [];
	    var mouse = { x: 0, y: 0 };
	    var INTERSECTED;

	    var informPanel ;
	    var informHandler  = new InforHandler(); 
	    
	    var container =  document.createElement('div');
	    //scene
	    scene = new THREE.Scene();
	    
	    //Camera View
	    view = new View(scene);
	    
	    projector = new THREE.Projector();
	    
	    initGeometry();
	    initLight();
	    createRender();
	    
	    document.addEventListener('mousemove', onDocumentMouseMove, false);
	    document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.body.appendChild(informHandler.container);
	    animate(); 
	    
	    this.Container = container;  
	    
	    //Methods 
	    
	    function initGeometry()
	    {
		    //var modelTable = new ZugoNormalModel("models/Table.js", "", new THREE.Vector3(0,0, 0), new THREE.Vector3(100, 70, 60),scene);
			
		    //var modelTV = new Model("models/TV.js","TV Test", new THREE.Vector3(0,70,20), new THREE.Vector3(100,70,3),scene);
			//var modelTV1 = new ZugoJsonModel("models/TV.js","TV Test", new THREE.Vector3(-225,300,-130), new THREE.Vector3(100,70,3),scene);
			var room = new ZugoRoom(scene);
			//var zugoLogo = new Model("models/ZugoLogo0.js","", new THREE.Vector3(0,350,-150), new THREE.Vector3(100,100,2),scene);
			//var floor = new ZugoGround(scene);
			//var posters = new ZugoPoster(new THREE.Vector3(-150,250,-147),140,200,new THREE.Vector3(0,0,0),"models/Poster main.png", "1234",scene);
			//var posters = new ZugoPoster(new THREE.Vector3(-400,250,-147),200,140,new THREE.Vector3(0,0,0),"Resource/AndorIxon+.jpg","1234",scene);
			//var posterBackground = new ZugoPoster(new THREE.Vector3(0,250,-147.5),600,500, new THREE.Vector3(0,0,0), "",0x0000f0,"",scene);
			//var cube = new SingleFaceCube("models/Poster main.png", 0x00ff00, new THREE.Vector3(100,100,10), new THREE.Vector3(100, 100, 10),scene);
			
			//Wall Items
		    var tv  =  new ZugoPoster("Resource/Scene/Litron.jpg",InforResource.LitronNano(), new THREE.Vector3(130, 90, 4), new THREE.Vector3(120,80,3),  new THREE.Vector3(-250,275,-130), 
					Lib.Faces.zp, 0x000000, scene);
			var cube1 = new ZugoPoster("Resource/Scene/Hinds.jpg",InforResource.Hinds(), new THREE.Vector3(100, 140, 4), new THREE.Vector3(80,120,3),  new THREE.Vector3(-100,250,-130), 
					Lib.Faces.zp, 0x0000ff, scene);
			var cube2 = new ZugoPoster("Resource/Scene/Zaber.jpg",InforResource.Zaber(), new THREE.Vector3(100, 140, 4), new THREE.Vector3(80,120,3),  new THREE.Vector3(25,250,-130), 
					Lib.Faces.zp, 0x0000ff, scene);
			var cube3 = new ZugoPoster("Resource/Scene/Prior.jpg",InforResource.Prior(), new THREE.Vector3(100, 140, 4), new THREE.Vector3(80,120,3),  new THREE.Vector3(150,250,-130), 
					Lib.Faces.zp, 0x0000ff, scene);
			var cube4 = new ZugoPoster("Resource/Scene/Gentec-EO.jpg",InforResource.GentecEO(), new THREE.Vector3(100, 140, 4), new THREE.Vector3(80,120,3),  new THREE.Vector3(275,250,-130), 
					Lib.Faces.zp, 0x0000ff, scene);
		
			//Tables 
			var modelTable1 = new ZugoTable(new THREE.Vector3(0,0,100), 0xffffff, Lib.Faces.zp, scene);
			var modelTable2 = new ZugoTable(new THREE.Vector3(200,0,100),0xffffff, Lib.Faces.zp, scene);
			var modelTable3 = new ZugoTable(new THREE.Vector3(-200,0,100), 0xffffff, Lib.Faces.zp, scene);
			var minusKModel = new ZugoJsonModel("models/MinusK.js",InforResource.MinusK(),new THREE.Vector3(-200, 120, 100), new THREE.Vector3(80,22,70), scene);
	    };

	    function initLight()
	    {
	        var ambientLight = new THREE.AmbientLight(0xffffff);
	        ambientLight.position.set(0, 0, 0);
	        scene.add(ambientLight);
	    	/*
	        pointLight = new THREE.PointLight(0xff00ff, 1, 50);
	        pointLight.position.set(0, 300, 0);
	        pointLight.intensity = 2;
	        pointLight.distance = 500;
	        scene.add(pointLight);
	    	
	        pointLight2 = new THREE.PointLight(0x00ff00, 1, 50);
	        pointLight2.position.set(0, 300, 0);
	        pointLight2.intensity = 2;
	        pointLight2.distance = 500;
	        scene.add(pointLight2);
	         */
	    }
	    
	    function  createRender() // Canvas 
	    {
	        renderer = new THREE.WebGLRenderer({antialias: true});
	        renderer.sortObjects = false;
	       
	        //renderer.setSize(window.innerWidth, window.innerHeight); Modified;
	        renderer.domElement.className = "scene-Canvas";
	        renderer.setSize(SceneBuilder.Width, SceneBuilder.Height);
	        container.appendChild(renderer.domElement);
	    }
	    /*
	    function initStatsInform()
	    {
	        stats = new Stats();
	        stats.domElement.style.position = 'absolute';
	        stats.domElement.style.top = '0px';
	        container.appendChild(stats.domElement);
	    }
	    */
	    function onDocumentMouseMove(event)
	    {
	    	if( document.getElementById("testPanel") != null)
	    	{
	    	   return; 
	    	}
	    	//event.preventDefault(); Modified;
	        //mouse.x = (event.clientX / width) * 2 - 1;
	        //mouse.y = -(event.clientY / height) * 2 + 1;
	    	
	    	mouse.x = ((event.clientX - renderer.domElement.offsetLeft)/SceneBuilder.Width) * 2 - 1; 
	    	mouse.y = -((event.clientY - renderer.domElement.offsetTop)/SceneBuilder.Height) * 2 + 1; 
	      
	    	/*
	      	if(INTERSECTED != null && INTERSECTED.isInteractive)
			{
	      		informPanel.setVisible(true, INTERSECTED.inform);
	      		informPanel.setPosition(event.clientX + 5, event.clientY+5);
			}
			else
				informPanel.setVisible(false);
			*/
	    	
	    	if(INTERSECTED != null && INTERSECTED.isInteractive)
	    	{
	    		informHandler.setVisible(true, INTERSECTED.inform.title);
	    		informHandler.setPosition(event.clientX, event.clientY);
	    	}
	    	else 
	    		informHandler.setVisible(false);
	        
	    }
	    
	    function onDocumentMouseUp(event)
	    {
	    	informHandler.setVisible(false);
	    	if( document.getElementById("testPanel") != null)
	    	{
	    	   return; 
	    	}
	    	if(informPanel != undefined)
	    		{
	    		if(informPanel.isValid)
	    			{
	    				informPanel.isValid = false; 
	    				return;
	    			}
	    		}
	    	if(INTERSECTED != null && INTERSECTED.isInteractive)
	    	{
	    		if(informPanel != undefined)
	    		{
	    			var panel = document.getElementById("testPanel");
	    			if( panel != null){
	    				panel.parentElement.removeChild(panel);
	    			}
	    		}
	    		informPanel = new InforPanel(INTERSECTED.inform,event.clientX,event.clientY);
	    		document.body.appendChild(informPanel.container);	
	    	}
	    	/*
	        if(informPanel.isLocked)
	        {
	        	informPanel.setLock(false); 	
	        	return;
	        }
	    	if(INTERSECTED != null && INTERSECTED.isInteractive)
			{
	    		informPanel.setVisible(true, INTERSECTED.inform);
	    		informPanel.setPosition(event.clientX + 5, event.clientY+5);
	    		informPanel.setLock(true); 
			}
	    	else
	    	{
	    		informPanel.setLock(false);
	    		informPanel.setVisible(false);
	    	}
	    	*/
	    }
	    
	    function animate()
	    {
	    	  requestAnimationFrame(animate);
		      render();
		      //stats.update();
	    }
	    

	    function  render()
	    {
	        theta += 0.2;
	    	view.render(); 
	        //pointLight.position.x = 300 * Math.sin(theta * 10 * Math.PI / 360);
	        //pointLight2.position.z = 300 * Math.sin(theta * 10 * Math.PI / 360);

			var ray = view.viewRay(mouse.x, mouse.y, projector);
	
	        var intersects = ray.intersectObjects(scene.children);
	        var intersectedModels = new Array();

	        var k;
	        for(k=0; k<intersects.length; k++)
	        {
	        	var obj = intersects[k].object;
	        	if(obj instanceof ZugoBoundingMesh)
	        		intersectedModels.push(obj);
	        }
	     
	        if(intersectedModels.length > 0)
	         	INTERSECTED = intersectedModels[0];
	        else
	        	INTERSECTED = null; 
	 
			for(k=0; k < scene.children.length; k++)
			{
				var child = scene.children[k];
				if(child instanceof ZugoBoundingMesh)
				{
					child.isSelected(child == INTERSECTED );
				}
			}

			renderer.render(scene, view.camera);
	    }
	    

	    
};

		
