ZugoRoundScene = function()
{
	 	var container;
	    var scene, projector, renderer, view;
	    var mesh, pointLight;
	    var clock = new THREE.Clock();

	    var radius = 500;
	    var theta = 0;
	    var duration = 100;
	    var keyframes = 15; 
	    var color, colors = [];
	    var mouse = { x: 0, y: 0 };
	    var INTERSECTED;
		var posters = [];

	    var informPanel , posters;
	    var informHandler  = new InforHandler();
	    	
	    var fullScreenMode = false; 
	    
	    //texts
	    var textTitles ;
	    var descTitles = []; 
	    
	    var self = this; 
	    
	    var container =  document.createElement('div');
	    
	    //scene
	    scene = new THREE.Scene();
		//scene.fog = new THREE.FogExp2( 0xffffff, 0.0003 );
		//scene.fog.color.setHSV( 0.1, 0.10, 1 );
	    
	    //Render : 
	    createRender();
	    
	    //window resize function; 
	    window.onresize = onResize; 
	    
	    this.changeMode = function(value)
	    {
	    	if(value != fullScreenMode)
	    	{
	    		fullScreenMode = value;
	    		onResize(); 
	    	}
	    	else 
	    		fullScreenMode = value;
	    };

	    function onResize()
	    {
	    	if(fullScreenMode)
	    	{
	    		var width = window.innerWidth - 50; 
	    		var height = window.innerHeight - 50; 
	    		renderer.setSize(width, height); 
	    		renderer.domElement.style.top = "25px"; 
	    	}
	    	else
	    	{
		        renderer.setSize(SceneBuilder.Width, SceneBuilder.Height);
		    	renderer.domElement.style.top = "25px"; 
	    	}
	    }
	    
	    //Camera View
	    view = new Viewer(scene);
	    
	    var productionPanel = new ProductListPanel(view);
	    container.appendChild(productionPanel.domElement);
	    
	    var cfg = new SceneConfiguration();
	    cfg.setSource(self, "changeMode", 1);
	    container.appendChild(cfg.domElement);
	    
	    var chat = new ServerChatPanel();
	    container.appendChild(chat.domElement);
	    
	    var zugoPanel = new ZugoPanel();
	    container.appendChild(zugoPanel.domElement); 
	    
	    container.appendChild(informHandler.domElement);
	    
	    projector = new THREE.Projector();
	    
	    initGeometry();
	    initLight();
	
	    //initStatsInform();
	    
	    document.addEventListener('mousemove', onDocumentMouseMove, false);
	    document.addEventListener('mouseup', onDocumentMouseUp, false);
 
        
	    animate(); 
	    
	    this.Container = container;  
	    
	    //Methods  , Local functions
	    
	    var textMesh;
	    
	    function initGeometry()
	    {
	    	var res = 100;
	    	//Table Cylinders, tables, edges, rounding circles. 
	    	var tableHeight = 400; 
	    	var tableRadius = 2000 ;
	    	var tableCenterY = 200;
	    	
	       	var faceABCD = "abcd";
	    	var color, f, p, n, vertexIndex;
	    	
	    	var tableMesh = new CylinderMesh(tableCenterY, tableHeight, tableRadius, new THREE.MeshPhongMaterial({color:0xffffff, ambient: 0xffffff, transparent:true}), scene, [0]);
	    	var tableMiddleGeoUp = new CylinderMesh(tableCenterY + 30, 30, tableRadius + 1, new THREE.MeshPhongMaterial({color:0x0000cc, ambient: 0x0000cc,transparent:true}), scene, [0]);
	    	var tableMiddleGeoDown = new CylinderMesh(tableCenterY - 30, 30, tableRadius + 1, new THREE.MeshPhongMaterial({color:0x0000cc, ambient: 0x0000cc,transparent:true}), scene, [0]);

	    	var tableCylinderEdge = new CylinderMesh(tableMesh.top, 30, tableRadius + 50, new THREE.MeshPhongMaterial({color:0x33333, ambient: 0x333333, transparent:true}), scene, [0]);
	    	var tableCylinderEdgeTranspanrency = new CylinderMesh(tableCylinderEdge.top, 2, tableCylinderEdge.radius, new THREE.MeshPhongMaterial({color:0x33333, ambient: 0x333333, opacity:0.9}),scene);
	    
	     	//Middle cylinder
	     	var middleHeight = 1000;
	    	var middleCenterY = tableMesh.top+middleHeight/2; 
	    	var middleRadius = 1500; 
	    
	    	function geometryMaterial(geometry)
	    	{
		    	for ( i = 0; i < geometry.faces.length; i ++ ) 
		    	{
	
		    		f  = geometry.faces[ i ];
		    	
		    		n = ( f instanceof THREE.Face3 ) ? 3 : 4;
	
		    		for( var j = 0; j < n; j++ ) 
		    		{
		    			vertexIndex = f[ faceABCD.charAt( j ) ];
	
		    			p = geometry.vertices[ vertexIndex ].position;
	
		    			color = new THREE.Color( 0xffffff );
		    			var temp = Math.abs((middleHeight - p.y))/middleHeight; 
		    			if(temp > 0.9) temp = 0.9;
		    			color.setHSV(0,0,temp);
		    			f.vertexColors[ j ] = color;
		    		}
		    	}
	    	}
	    	
	    	var middleMaterial =  new THREE.MeshPhongMaterial({color:0xffffff, ambient: 0xcccccc, transparent: false,  vertexColors: THREE.VertexColors});
	    	var middleCylinder = new CylinderMesh(middleCenterY, middleHeight, middleRadius, middleMaterial, scene, [0, tableMesh.top], geometryMaterial);

	    	//Top cylinder
	    	var topHeight = 200;
	    	var topCenterY = middleCylinder.top + topHeight/2; 
	    	var topRadius = 1800;
	    	
	    	var topCylinder = new CylinderMesh(topCenterY, topHeight, topRadius, new THREE.MeshBasicMaterial({color:0xeeeeee, ambient:0xffffff, transpanrent: false}), scene, [0, tableCylinderEdgeTranspanrency.top]);
	    	var topReflect = new CylinderMesh(topCylinder.bottom, 1, topRadius, new THREE.MeshBasicMaterial({color:0xaaaaaa, ambient:0x333333, transpanrent: false}), scene, [0, tableCylinderEdgeTranspanrency.top]);
	    	    
	    	ArcMesh.MatrixCopy(topRadius+1, [0,45,90,135,180,225,270,315], 300, 200, topCenterY, InforResource.Zugo(), [ new THREE.MeshBasicMaterial({color:0xeeeeee})], scene);
	    	
	    	//Add Plane
	    	var planeSimple = new THREE.PlaneGeometry( 2000, 3000 );
			var planeTesselated = new THREE.PlaneGeometry( 100, 300, 25, 40 );
			var matSolid = new THREE.MeshPhongMaterial( { color :0x666666 , ambient : 0x666666, opacity : 0.9, transparent : true} );
			matSolid.color.setRGB(0.1,0.1,0.1);

			
			floor = new THREE.Mesh( planeSimple, matSolid);
			floor.position.y = -10;
			floor.rotation.x = -Math.PI/2;
			floor.scale.set( 25, 25, 25 );
			scene.add( floor );

	        //Posters	, texts 
			var width = 400;
			var height = 560;
			var arcPosterWidth = 170; 
			var acrPosterHeight = 200; 
			var actionSize = 50; 
			//textTitles = new TextDisplay(middleCenterY, middleRadius + 50, scene);
			
			var curInfor = InforResource.Prior();
	        var poster = ArcMesh.MatrixCopy(middleRadius+2, [315], width, height, middleCenterY,curInfor , [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(315, curInfor.title);
	    	productionPanel.regist(315, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.Prior_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 315 , scene);
	    	var acrDescription = new ArcPlane(InforResource.Prior(), actionSize, actionSize, 315, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	curInfor = InforResource.MinusK();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [0], width, height, middleCenterY, curInfor , [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(0, curInfor.title);
	    	productionPanel.regist(0, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.MinusK_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 0, scene);
	    	var acrDescription = new ArcPlane(InforResource.MinusK(), actionSize, actionSize, 0, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	curInfor = InforResource.Gentec();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [45], width, height, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(45, curInfor.title);
	    	productionPanel.regist(45, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.Gentec_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 45, scene);
	    	var acrDescription = new ArcPlane(InforResource.Gentec(), actionSize, actionSize, 45, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	curInfor = InforResource.GentecEO();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [90], width, height, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(90, curInfor.title);
	    	productionPanel.regist(90, curInfor.title);
	       	var arcPoster = new ArcPoster(ActionResource.Gentec_EO_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 90, scene);
	       	var acrDescription = new ArcPlane(InforResource.GentecEO(), actionSize, actionSize, 90, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	       	
	    	curInfor = InforResource.Hinds();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [135], width, height, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(135, curInfor.title);
	    	productionPanel.regist(135, curInfor.title);
	       	var arcPoster = new ArcPoster(ActionResource.Hinds_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 135, scene);
	       	var acrDescription = new ArcPlane(InforResource.Hinds(), actionSize, actionSize, 135, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	       	
	    	curInfor = InforResource.LitronNano();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [180], height, width, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(180);
	    	productionPanel.regist(180, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.LitronNano_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 180, scene);
	    	var tv = new ArcTV(ActionResource.LitronNano_Movie(), new THREE.Vector3(300, 200, 20), tableCylinderEdge.top, middleRadius + 300, 180, scene,  [tableMesh.top, 0]);
	     	var acrDescription = new ArcPlane(InforResource.LitronNano(), actionSize, actionSize, 180, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	curInfor = InforResource.Zaber(); 
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [225], width, height, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(225, curInfor.title);
	    	productionPanel.regist(225, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.Zaber_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 225, scene);
	     	var acrDescription = new ArcPlane(InforResource.Zaber(), actionSize, actionSize, 225, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	curInfor = InforResource.Andor();
	        poster = ArcMesh.MatrixCopy(middleRadius+2, [270], width, height, middleCenterY, curInfor, [], scene, [tableMesh.top, 0],true);
	    	posters.push(poster[0]);
	    	//textTitles.regist(270, curInfor.title);
	    	productionPanel.regist(270, curInfor.title);
	    	var arcPoster = new ArcPoster(ActionResource.Andor_Poster(), arcPosterWidth, acrPosterHeight, middleRadius + 300, tableCylinderEdge.top, 270, scene);
	     	var acrDescription = new ArcPlane(InforResource.Andor(), actionSize, actionSize, 135, middleCenterY - 100, middleRadius + 50, scene); 
	    	descTitles.push(acrDescription);
	    	
	    	//Lights
	      	pointLight = new THREE.PointLight(0x0000ff, 5, 800);
	      	pointLight.position.y = middleCenterY;
      		scene.add(pointLight);
      		cfg.setSource(pointLight, "intensity", 0);
	    };
	    
	    function calculatePointLightPosition()
	    {
	    	var angle = view.controls.angle;
	    	angle = Math.floor((angle+22.5)/45) * 45;
	    	var position = pointLight.position;
	    	pointLight.position = Lib.ArcCenter(1550, angle , position.y);
	    }

	    function initLight()
	    {
	        var ambientLight = new THREE.AmbientLight(0xffffff);
	        ambientLight.position.set(0, 0, 0);
	        scene.add(ambientLight);
	    }
	    
	    function  createRender() // Canvas 
	    {
	        renderer = new THREE.WebGLRenderer({antialias: true, maxLights: 4});
	        renderer.sortObjects = false;
	       
	        //renderer.setSize(window.innerWidth, window.innerHeight); Modified;
	        renderer.domElement.className = "scene-Canvas";
	        renderer.domElement.style.top = "25px"; 
	        renderer.setSize(SceneBuilder.Width, SceneBuilder.Height);
	        container.appendChild(renderer.domElement);
	    }
	  
	    function onDocumentMouseMove(event)
	    {
	    	if( document.getElementById("testPanel") != null)
	    	{
	    	   return; 
	    	}
	
	    	var renderWidth = renderer.domElement.offsetWidth; 
	    	var renderHeight = renderer.domElement.offsetHeight;
	    	mouse.x = ((event.clientX - renderer.domElement.offsetLeft)/renderWidth) * 2 - 1; 
	    	mouse.y = -((event.clientY - renderer.domElement.offsetTop)/renderHeight) * 2 + 1; 
	      
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
	    		INTERSECTED.inform.perform(event.clientX,event.clientY);
	    		//var title = INTERSECTED.inform.title; 
	    		//var desc  = INTERSECTED.inform.description;
	    		//informPanel = new DescriptionPanel(title, desc, event.clientX,event.clientY);
	    		//document.body.appendChild(informPanel.domElement);		
	    	}
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
	    	var rayAngle = view.controls.angle;
	    	
	    	for(var i = 0 ; i < descTitles.length; i++)
	    		{
	    		   descTitles[i].checkAngle(rayAngle);
	    		}
	    	
	    	for(var i = 0; i < posters.length;i++)
	    	{
	    			posters[i].update(rayAngle);
	    	}
	    	//textTitles.onChecking(rayAngle);
	    	//textMesh.update(rayAngle);
	    	/*
	    	this.lights[0].position = Lib.ArcCenter(1550, rayAngle - 22.5, 1000);
	    	this.lights[1].position = Lib.ArcCenter(1550, rayAngle + 22.5, 1000);
	    	*/
	    	calculatePointLightPosition();
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

		

