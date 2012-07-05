ArcGeometry = function(radius, angle, width, height, mirrorY)
{
	THREE.Geometry.call( this );
	var resY = 1; 
	var res = 10; //Segment resolution; 
	var circleLength = 2 * Math.PI * radius; // Circle Length; 
	var resDeltaAngle = width/circleLength * 360 /res; //resolution of each segment;
	var startAngle = (angle - width/2/circleLength*360);  
	
	if(mirrorY == undefined || !mirrorY)
		mirrorY = 1;
	else 
		mirrorY = -1;
		
	if(startAngle < 0)
		startAngle += 360; 

	var uvs = [];
	var tempVertices = [];
	var i, h;
	var lines = [];
	for(h = 0; h <= resY; h++)
	{
		
		var points = [];
		var verticesRow = [];
		var uvsRow = [];
		var v = h/resY; 
		
		var posY;
		if(h == 0) 
			posY = height/2 * mirrorY;
		else
			posY = -height/2 * mirrorY;
		for(i = 0; i<= res; i++)
		{
			var u = i /res;
			var radian = (startAngle + i * resDeltaAngle)/180 * Math.PI;
			var posX = Math.cos(radian) * radius;
			var posZ = -Math.sin(radian) * radius;
			var position = new THREE.Vector3(posX, posY, posZ);
			this.vertices.push(new THREE.Vertex(position));
			verticesRow.push(this.vertices.length - 1);
			uvsRow.push(new THREE.UV(u,v));
			points.push(position);
		}
		lines.push(points);
		tempVertices.push(verticesRow);
		uvs.push(uvsRow);
	}
	
	//Build the binding line.
	this.boundingGeometry = new THREE.Geometry();
	
	var toReverse = false;
	for(h = 0; h<= resY; h++)
		{
		var nodes = lines[h];
		if(toReverse)
			{
				for(i = res; i>= 0; i--)
				{
					var node = nodes[i]; //A single position of the current geometry;
					this.boundingGeometry.vertices.push(new THREE.Vertex(node));
				}
			}
		else
			{
			for(i = 0; i<= res; i++)
				{
					var node = nodes[i]; //A single position of the current geometry;
					this.boundingGeometry.vertices.push(new THREE.Vertex(node));
				}
			}
		toReverse =! toReverse;
		}
	this.boundingGeometry.vertices.push(new THREE.Vertex(lines[0][0]));
	//Bounding Geometry of this arc segment.

	for(y= 0; y < resY; y++)
	{
		for(x = 0; x < res; x++)
		{
			var v1 = tempVertices[y][x];
			var v2 = tempVertices[ y + 1 ][ x ];
			var v3 = tempVertices[ y + 1 ][ x + 1 ];
			var v4 = tempVertices[ y ][ x + 1 ];
			
			var n1 = this.vertices[ v1 ].position.clone().setY( 0 ).normalize();
			var n2 = this.vertices[ v2 ].position.clone().setY( 0 ).normalize();
			var n3 = this.vertices[ v3 ].position.clone().setY( 0 ).normalize();
			var n4 = this.vertices[ v4 ].position.clone().setY( 0 ).normalize();
			
			var uv1 = uvs[ y ][ x ].clone();
			var uv2 = uvs[ y + 1 ][ x ].clone();
			var uv3 = uvs[ y + 1 ][ x + 1 ].clone();
			var uv4 = uvs[ y ][ x + 1 ].clone();
			

			this.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );
		}
	}
	
	this.computeCentroids();
	this.computeFaceNormals();
	
};

ArcGeometry.prototype = new THREE.Geometry();
ArcGeometry.prototype.constructor = ArcGeometry;

