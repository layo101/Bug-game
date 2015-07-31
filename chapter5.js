//set main namespace
goog.provide('chapter5');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');


// entrypoint
chapter5.start = function(){

	var director = new lime.Director(document.body,480,320);
	director.makeMobileWebAppCapable();
	director.setDisplayFPS(false);
	
	var scene1 = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
	
	//grass
	var grass_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,-1)
		.addColorStop(0, '#7CCD7C').addColorStop(0.5, '#00FF00');
	
	var grass = new lime.Sprite().setSize(800, 640).setPosition(0,0).
		setAnchorPoint(0,0).setFill(grass_gradient);
	//bug count
	var num_bugs_caught = 0;
	var bug_count = new lime.Label().setText('Bug count: '+num_bugs_caught).setFontFamily('Arial')
		.setFontColor('#000000').setFontSize(20).setPosition(100,300);
	//box
	var box = new lime.Sprite().setAnchorPoint(0,0).setPosition(390, 230).setFill('open-cardboard.png');
	
	//number of bugs created
	var num_bugs = goog.math.randomInt(10)+1;
	var bugsArray = [];
	
	for(i=0; i<=num_bugs; i++)
	{
		var x = goog.math.uniformRandom(20, 440);
		var y = goog.math.uniformRandom(50, 200);
		
		bug = new lime.Sprite().setAnchorPoint(0,0).setPosition(390,230).setFill('beetle.png').setPosition(x,y).setSize(40,37);
		goog.events.listen(bug,['mousedown', 'touchstart'], function(e){
			var drag = e.startDrag();
			e.event.stopPropagation();
			drag.addDropTarget(box);
			current_bug = this;
			goog.events.listen(drag, lime.events.Drag.Event.DROP, function(e){
				current_bug.setFill('');
				delete current_bug;
				
				//update the bug count
				num_bugs_caught++
				bug_count.setText('Bug count: ' +num_bugs_caught);
			});
		});
		
		bugsArray.push(bug);
	}
	
	scene1.appendChild(grass);
	scene1.appendChild(box);
	scene1.appendChild(bug_count);
	
	for(i in bugsArray)
	{
		scene1.appendChild(bugsArray[i]);
	}
	director.replaceScene(scene1);

}


