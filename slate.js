/*********************************************************************************
Save this in ~/.slate.js
 This configuration file came from http://solstice.me.
 Builds off of the configuration file written by V Verma, without which
 this project would not have been possible. Credit also goes to the Rutgers
 Hackathon Club for introducing me to Slate. Make sure to check them out:

 V Verma:
		http://vverma.net
 Rutgers Hackathon Club: 
		https://www.facebook.com/groups/ruhacking
*********************************************************************************/


// CONFIGS
var MOD_KEY =  'ctrl,cmd';

// window movement keybindings
var TOGGLE_LAYOUT   = 'space:'+MOD_KEY;
var WIN_FOCUS_UP    = 'k:'+MOD_KEY;
var WIN_FOCUS_DOWN  = 'j:'+MOD_KEY;
var WIN_FOCUS_LEFT  = 'h:'+MOD_KEY;
var WIN_FOCUS_RIGHT = 'l:'+MOD_KEY;

// FUNCTIONS

// focus above
var focus_above = slate.operation("focus", {
	"direction" : "above"
});

// focus below
var focus_below = slate.operation("focus", {
	"direction" : "below"
});

// focus left
var focus_left = slate.operation("focus", {
	"direction" : "left"
});

// focus right
var focus_right = slate.operation("focus", {
	"direction" : "right"
});

// maximize window
var window_max = slate.operation('move', {
        'x': 'screenOriginX',
        'y': 'screenOriginY',
        'width': 'screenSizeX',
        'height': 'screenSizeY',
});

var mode_index = 0;
var modes = [
	'reverse_horizontal_split',
	'horizontal_split',
	'reverse_verticle_split',
	'fullscreen',
	'verticle_split'
];

var toggle_layout = function() {

	var mode = modes[mode_index];
	mode_index = (mode_index + 1) % modes.length;

	S.log('Hiding Finder...');
	S.doOperation('hide', { 'app' : 'Finder'});

	S.log('test');
	var win_list = new Array();
	slate.eachApp(function(appObject) {
		appObject.eachWindow(function(winObject) {
			if (winObject.isMinimizedOrHidden() == false) {
				win_list.push(winObject);
			}
		});
	});
	S.log(win_list);

	if (mode == 'horizontal_split' || mode == 'reverse_horizontal_split') {
		S.log('test2');

		length = win_list.length;

		if (length > 1) {

			// split array in half		
			midpoint = Math.floor(length / 2);
			upper = win_list.splice(0, midpoint);
			lower = win_list;

			if (mode == 'reverse_horizontal_split') {

				var swag = upper;
				upper = lower;
				lower  = swag;
			}

			S.log('Printing upper:');
			S.log(upper);
			S.log('Printing lower:');
			S.log(lower);

			// calculate window attributes
			lower_width = 'screenSizeX / '+Math.ceil(lower.length);
			upper_width = 'screenSizeX / '+Math.ceil(upper.length);
			height = 'screenSizeY / 2';
			
			S.log('Printing upper_width:');
			S.log(upper_width);
			S.log('Printing lower_width:');
			S.log(lower_width);
			S.log('Printing height:');
			S.log(height);

			// adjust upper window positions
			for (var i = 0; i < upper.length; i += 1) {
				
				S.log('Printing upper['+i+']');
				S.log('Upper['+i+'] is also known as'+upper[i].app().name());
				S.log('Upper['+i+'] has a size of'+upper[i].size());
				S.log(upper[i]);

				upper[i].doOperation(slate.operation('move', {

					'x' : 'screenOriginX + '+upper_width +'*'+ i,
					'y' : 'screenOriginY',
					'width' : ''+upper_width,
					'height' : ''+height
				}));
			}

			// adjust lower window positions
			for (var j = 0; j < lower.length; j += 1) {
				
				S.log('Printing lower['+j+']');
				S.log('Lower['+j+'] is also known as'+lower[j].app().name());
				S.log('Lower['+j+'] has a size of'+lower[j].size());
				S.log(lower[j]);

				lower[j].doOperation(slate.operation('move', {

					'x' : 'screenOriginX + '+lower_width +'*'+ j,
					'y' : 'screenOriginY + screenSizeY / 2',
					'width' : ''+lower_width,
					'height' : ''+height
				}));
			}
		}	
		else {
    		win_list[0].doOperation(slate.operation('move', {
    		    'x': 'screenOriginX',
    		    'y': 'screenOriginY',
    		    'width': 'screenSizeX',
    		    'height': 'screenSizeY',
    		}));
		}
	}
	else if (mode == 'verticle_split' || mode == 'reverse_verticle_split') {
		S.log('test2 verticle');

		length = win_list.length;

		if (length > 1) {

			// split array in half		
			midpoint = Math.floor(length / 2);
			lhs = win_list.splice(0, midpoint);
			rhs = win_list;

			if (mode == 'reverse_verticle_split') {

				var swag = lhs;
				lhs = rhs;
				rhs = swag;
			}

			S.log('Printing lhs:');
			S.log(lhs);
			S.log('Printing rhs:');
			S.log(rhs);

			// calculate window attributes
			rhs_height = 'screenSizeY / '+Math.ceil(rhs.length);
			lhs_height = 'screenSizeY / '+Math.ceil(lhs.length);
			width = 'screenSizeX / 2';
			
			S.log('Printing lhs_height:');
			S.log(lhs_height);
			S.log('Printing rhs_height:');
			S.log(rhs_height);
			S.log('Printing width:');
			S.log(width);

			// adjust lhs window positions
			for (var i = 0; i < lhs.length; i += 1) {
				
				S.log('Printing lhs['+i+']');
				S.log('lhs['+i+'] is also known as'+lhs[i].app().name());
				S.log('lhs['+i+'] has a size of'+lhs[i].size());
				S.log(lhs[i]);

				lhs[i].doOperation(slate.operation('move', {

					'y' : 'screenOriginY + '+lhs_height +'*'+ i,
					'x' : 'screenOriginX',
					'height' : ''+lhs_height,
					'width' : ''+width
				}));
			}

			// adjust rhs window positions
			for (var j = 0; j < rhs.length; j += 1) {
				
				S.log('Printing rhs['+j+']');
				S.log('rhs['+j+'] is also known as'+rhs[j].app().name());
				S.log('rhs['+j+'] has a size of'+rhs[j].size());
				S.log(rhs[j]);

				rhs[j].doOperation(slate.operation('move', {

					'y' : 'screenOriginY + '+rhs_height +'*'+ j,
					'x' : 'screenOriginX + screenSizeX / 2',
					'width' : ''+width,
					'height' : ''+rhs_height
				}));
			}
		}	
		else {
    		win_list[0].doOperation(slate.operation('move', {
    		    'x': 'screenOriginX',
    		    'y': 'screenOriginY',
    		    'width': 'screenSizeX',
    		    'height': 'screenSizeY',
    		}));
		}
	}
	else if (mode == 'fullscreen') {
		window_max.run();
	}
	
}

// keybindings
S.bind(TOGGLE_LAYOUT, toggle_layout);
S.bind(WIN_FOCUS_UP, focus_above);
S.bind(WIN_FOCUS_DOWN, focus_below);
S.bind(WIN_FOCUS_LEFT, focus_left);
S.bind(WIN_FOCUS_RIGHT, focus_right);


