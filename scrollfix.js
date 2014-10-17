/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 * 
 * Fixes and Improvement (need jQuery)
 * ScrollFix v0.2 
 * http://vulpes.agency/
 * Danilo Celestino de Castro
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


/*
* Just put this class in your CSS
* ---------------------
	.scroll {
	 	overflow: auto;
		-webkit-overflow-scrolling: touch;	
	}
*
*/

var ScrollFix = function (elem) {
	// Variables to track inputs
	var startY, startTopScroll;
	elem = elem || document.querySelector(elem);

	// If there is no element, then do nothing	
	if (!elem) { return; }
	
	// Prevent propagation from the parents
	elem.addEventListener('touchmove', function (event) {
		event.stopPropagation();
		// Check has no scroll
		if (elem.scrollHeight <= elem.clientHeight) {
			event.preventDefault();
			return false;
		}
	});
	
	// Hide the keyboard when scrolling
	elem.addEventListener('scroll', function (event, target) {
		$("*:focus").blur();
	});

	// Handle the start of interactions
	elem.addEventListener('touchstart', function (event) {
		startY = event.touches[0].pageY;
		startTopScroll = elem.scrollTop;

		if (startTopScroll <= 0) {
			elem.scrollTop = 1;
			window.scrollTo(0, 0);
		}
		if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
			elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}
	}, false);
};

if (navigator.userAgent.match(/(iPhone)|(iPad)|(iPod)/)) {
	// Also hide the keyboard when try to scroll outsite the element
	document.addEventListener('touchmove', function (event) {
		event.preventDefault();
		$("*:focus").blur();
	}, false);
	$(function () {
		$(".scroll").each(function (e, i) {
			$(this).attr('style', 'overflow: auto; -webkit-overflow-scrolling: touch;');
			ScrollFix($(this)[0]);
		});
	});
}
