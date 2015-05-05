window.addEventListener('load', galleryClasses);
//window.addEventListener('load', lightbox);
window.addEventListener('load', addLightbox);
//create thumbnail vars to run openLightbox
var thumbs = document.getElementById('thumbnails');
var div = thumbs.querySelectorAll('.gallery-container');
//run openLightbox click function
for(var i=0;i<div.length;i++){
    div[i].addEventListener('click', openLightbox, false);
}

//function to find style of element
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

//make gallery responsive with grid
function galleryClasses() {
	if (window.matchMedia("(min-width: 500px)").matches) {
		var image = document.getElementsByClassName('gallery-container');
		for(var i = 0; i < image.length; i++) {
				var imageParent = image[i].parentNode;
				imageParent.className = 'grid-6';
		}
	}

	if (window.matchMedia("(min-width: 940px)").matches) {
		var image = document.getElementsByClassName('gallery-container');
		for(var i = 0; i < image.length; i++) {
				var imageParent = image[i].parentNode;
				imageParent.className = 'grid-4';
		}
	}

	if (window.matchMedia("(min-width: 1300px)").matches) {
		var image = document.getElementsByClassName('gallery-container');
		for(var i = 0; i < image.length; i++) {
				var imageParent = image[i].parentNode;
				imageParent.className = 'grid-3';
		}
	}
}

//Add lightbox divs
function addLightbox() {
	var body = document.body;
	var lightbox = document.createElement('div');
	lightbox.id = 'lightbox-background';
	lightbox.innerHTML = '<div id="lightbox-container" data-test="lightbox-container"><div id="close">CLOSE</div><div id="left">PREVIOUS</div><div id="right">NEXT</div></div>';
	body.appendChild(lightbox);
	//lightbox.dataset.test = "lightbox-background";	
}

//open lightbox
function openLightbox() {
	//give clicked image thumb id of active
	this.parentNode.id = 'active';
	var active = document.getElementById('active')
	//src var from div data-src
    var src = this.getAttribute("data-src");
    //set lighbox vars
    var lb = document.getElementById('lightbox-background');
    var lbCont = document.getElementById('lightbox-container');
    //create image
    var lbImg = new Image();
    lbImg.src = src;
    lbImg.id = 'lightbox-image';
    //add image to lightbox
    lbCont.appendChild(lbImg);
    //show lightbox
    lb.style.display = 'table';

    var buttonPos = function() {
		//style close, left and right buttons
		var close = document.getElementById('close');
		var left = document.getElementById('left');
		var right = document.getElementById('right');
		//get width and height of image
		var imgWidth = lbImg.width;
		var imgWidth = imgWidth / 2;
		//get position of image
	    var pos = lbImg.getBoundingClientRect();
	    //set position of buttons
	    var closeStyle = close.style;
	    var leftStyle = left.style;
	    var rightStyle = right.style;
	    var nudge = getStyle(close, "font-size");
	    var nudge = parseInt(nudge, 10);
	    var margin = 7;
	    closeStyle.top = pos.top - nudge - margin + 'px';
	    closeStyle.right = pos.left + 'px';
	    leftStyle.left = pos.left + 'px';
	    leftStyle.top = rightStyle.top = pos.bottom + margin + 'px';
	    rightStyle.right = pos.left + 'px';
    }

    //run lightbox functions
    //position buttons
    lbImg.addEventListener('load', buttonPos);
    //close image using close button
    var close = document.getElementById('close');
    close.addEventListener('click', closeLightbox);
    //close image using background
    var lb = document.getElementById('lightbox-background');
	lb.addEventListener('click', closeLightbox);
    //previous image
    var left = document.getElementById('left');
    left.addEventListener('click', prevImage);
    //next image
    var right = document.getElementById('right');
    right.addEventListener('click', nextImage);

	//Stop bubbling so the buttons dont close lightbox
	close.onclick = function(e) {
		e.stopPropagation();
	}
	left.onclick = function(e) {
		e.stopPropagation();
	}
	right.onclick = function(e) {
		e.stopPropagation();
	}
	var img = 	document.querySelector('img');
	img.onclick = function(e) {
		e.stopPropagation();
	}
}

//create close function
var closeLightbox = function() {
	//hide lightbox
	var lb = document.getElementById('lightbox-background');
	lb.style.display = 'none'
	//remove active id
	var active = document.getElementById('active');
	active.removeAttribute('id');
	var img = document.getElementById('lightbox-image');
	img.parentNode.removeChild(img);
}

//create previous image function
var prevImage = function() {
	//get the current thumb
	var prev = document.getElementById('active');
	//get the previous thumb
	//this one gets whitespace
	var prev = prev.previousSibling;
	//this one gets the previous active element
	var prev = prev.previousSibling;
	//remove active id from current thumb
	var active = document.getElementById('active');
	active.removeAttribute('id');
	//if you're on the first thumb
	if (prev == null) {
		//get the last thumb
		var lastImg = active.parentNode.lastChild;
		var lastImg = lastImg.previousSibling;
		//add active to the last thumb
		lastImg.id = 'active';
	} else {
    	//add active id to previous thumb
    	prev.id = 'active';
	}
	//get src of new thumb
	var newSrc = document.getElementById('active');
	var newSrc = newSrc.getElementsByClassName('gallery-container');
	var newSrc = newSrc[0].getAttribute('data-src');
	var lbImg = document.getElementById('lightbox-image');
	lbImg.src = newSrc;
}
//create next image function
var nextImage = function() {
	var next = document.getElementById('active');
	//get the next thumb
	//this one gets whitespace
	var next = next.nextSibling;
	//this one gets the element
	var next = next.nextSibling;
	//remove active id from current thumb
	var active = document.getElementById('active');
	active.removeAttribute('id');
	//if you're on the last thumb
	if (next == null) {
		//get the last thumb
		var firstImg = active.parentNode.firstChild;
		var firstImg = firstImg.nextSibling;
		//add active to the last thumb
		firstImg.id = 'active';
	} else {
    	//add active id to previous thumb
    	next.id = 'active';
	}
	//get src of new thumb
	var newSrc = document.getElementById('active');
	var newSrc = newSrc.getElementsByClassName('gallery-container');
	var newSrc = newSrc[0].getAttribute('data-src');
	var lbImg = document.getElementById('lightbox-image');
	lbImg.src = newSrc;
}

function lightbox() {
	//Add Lightbox
	var body = document.body;
	var lightbox = document.createElement('div');
	lightbox.id = 'lightbox-background';
	lightbox.innerHTML = '<div id="lightbox-container" data-test="lightbox-container"><div id="close">CLOSE</div><div id="left">PREVIOUS</div><div id="right">NEXT</div></div>';
	body.appendChild(lightbox);
	lightbox.dataset.test = "lightbox-background";


	//create thumbnail vars thumbnails
	var thumbs = document.getElementById('thumbnails');
	var div = thumbs.querySelectorAll('.gallery-container');

	//create lightbox click function
    var lightboxOpen = function() {
    	//give clicked image thumb id of active
    	this.parentNode.id = 'active';
    	var active = document.getElementById('active')
    	//src var from div data-src
        var src = this.getAttribute("data-src");
        //set lighbox vars
        var lb = document.getElementById('lightbox-background');
        var lbCont = document.getElementById('lightbox-container');
        //create image
        var lbImg = new Image();
        lbImg.src = src;
        //add image to lightbox
        lbCont.appendChild(lbImg);
        //show lightbox
        lb.style.display = 'table';

        var buttonPos = function() {
			//style close, left and right buttons
			var close = document.getElementById('close');
			var left = document.getElementById('left');
			var right = document.getElementById('right');
			//get width and height of image
			var imgWidth = lbImg.width;
			var imgWidth = imgWidth / 2;
			//get position of image
		    var pos = lbImg.getBoundingClientRect();
		    //set position of buttons
		    var closeStyle = close.style;
		    var leftStyle = left.style;
		    var rightStyle = right.style;
		    var nudge = getStyle(close, "font-size");
		    var nudge = parseInt(nudge, 10);
		    var margin = 7;
		    closeStyle.top = pos.top - nudge - margin + 'px';
		    closeStyle.right = pos.left + 'px';
		    leftStyle.left = pos.left + 'px';
		    leftStyle.top = rightStyle.top = pos.bottom + margin + 'px';
		    rightStyle.right = pos.left + 'px';
        }

        lbImg.addEventListener('load', buttonPos);

	    //create close function
		var closeImg = function() {
			//hide lightbox
			lb.style.display = 'none'
			//remove active id
        	var active = document.getElementById('active');
        	active.removeAttribute('id');
        	var img = document.querySelector('img');
        	img.parentNode.removeChild(img);
        	var x = '';		
		}

		//create previous image function
		var previousImg = function() {
			var nodeList = Array.prototype.slice.call(document.getElementById('thumbnails').children);
			var active = document.getElementById('active');
			var x = nodeList.indexOf(active);
			console.log(x);
			var prev = document.getElementById('thumbnails').children.item(x - 1);
			console.log(prev);
			//get the current thumb
			var prev = document.getElementById('active');
			//get the previous thumb
        	//this one gets whitespace
        	var prev = prev.previousSibling;
        	//this one gets the previous active element
        	var prev = prev.previousSibling;
        	//remove active id from current thumb
        	var active = document.getElementById('active');
        	active.removeAttribute('id');
        	//if you're on the first thumb
        	if (prev == null) {
        		//get the last thumb
        		var lastImg = active.parentNode.lastChild;
        		var lastImg = lastImg.previousSibling;
        		//add active to the last thumb
        		lastImg.id = 'active';
        	} else {
	        	//add active id to previous thumb
	        	prev.id = 'active';
        	}
        	//get src of new thumb
        	var newSrc = document.getElementById('active');
        	var newSrc = newSrc.getElementsByClassName('gallery-container');
        	var newSrc = newSrc[0].getAttribute('data-src');
        	lbImg.src = newSrc;
		}

		//create next image function
		var nextImg = function() {
			var next = document.getElementById('active');
			//get the next thumb
        	//this one gets whitespace
        	var next = next.nextSibling;
        	//this one gets the element
        	var next = next.nextSibling;
        	//remove active id from current thumb
        	var active = document.getElementById('active');
        	active.removeAttribute('id');
        	//if you're on the last thumb
        	if (next == null) {
        		//get the last thumb
        		var firstImg = active.parentNode.firstChild;
        		var firstImg = firstImg.nextSibling;
        		//add active to the last thumb
        		firstImg.id = 'active';
        	} else {
	        	//add active id to previous thumb
	        	next.id = 'active';
        	}
        	//get src of new thumb
        	var newSrc = document.getElementById('active');
        	var newSrc = newSrc.getElementsByClassName('gallery-container');
        	var newSrc = newSrc[0].getAttribute('data-src');
        	lbImg.src = newSrc;
		}

        //Set click events
		var close = document.getElementById('close');
	    close.addEventListener('click', closeImg);

		var left = document.getElementById('left');
	    left.addEventListener('click', previousImg);

		var right = document.getElementById('right');
	    right.addEventListener('click', nextImg);

	    lightbox.addEventListener('click', closeImg);

		//Stop bubbling
		close.onclick = function(e) {
			e.stopPropagation();
		}
		left.onclick = function(e) {
			e.stopPropagation();
		}
		right.onclick = function(e) {
			e.stopPropagation();
		}
		var img = 	document.querySelector('img');
		img.onclick = function(e) {
			e.stopPropagation();
		}

    }; 

}