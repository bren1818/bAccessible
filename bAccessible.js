(function( $ ) {
	/* bAccessible - By Brendon Irwin 2013     */
	/* Feel free to use, or buy me a coffee    */
	/* https://twitter.com/bren1818            */
	$.fn.bAccessible = function(options) 
	{
		var settings = $.extend({
			showContrastControls : true,
			showFontControls: true,
			fontSizeSmall : 14,
			fontSizeDefault: 16,
			fontSizeLarge : 18,
			appendMode : 'prepend', //prepend,append,insertAfter, insertBefore
			wrapControls : true,
			defaultSizeIfUndefined : 'default', //large || largest
			defaultContrastIfUndefined : 'default', //low_contrast || high_contrast
			cookieLifeSpanDays : 1,
			letterSymbol : 'A'
		},options);
		
		
		/*Create Cookie */
		function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}

		/*Read Cookie */
		function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}

		/*Delete Cookie*/
		function eraseCookie(name) {
			createCookie(name,"",-1);
		}

		var id = this;
		
		var HTML = "";
		/*Show Wrapper*/
		HTML += ((settings.wrapControls == true) ? '<div id="siteAccessibilityContols" class="siteSection"><div class="siteContent">' : '');
		/*Show Contrast Controls*/
		HTML += ((settings.showContrastControls == true) ? '<div id="contrastControl"><div class="contrastBox AccessibilityControlBox" id="default_contrast">' + settings.letterSymbol +'</div><div class="contrastBox AccessibilityControlBox" id="low_contrast">' + settings.letterSymbol +'</div><div class="contrastBox AccessibilityControlBox" id="high_contrast">' + settings.letterSymbol +'</div></div>' : '');
		/*Show Font controls */
		HTML+= ((settings.showFontControls == true) ? '<div id="fontControl"><div class="fontBox AccessibilityControlBox" id="default_font" style="font-size: '+ settings.fontSizeSmall +'px">' + settings.letterSymbol +'</div><div class="fontBox AccessibilityControlBox" id="large_font" style="font-size: '+  settings.fontSizeDefault+'px">' + settings.letterSymbol +'</div><div class="fontBox AccessibilityControlBox" id="largest_font" style="font-size: '+ settings.fontSizeLarge +'px">' + settings.letterSymbol +'</div></div>' : '');
		/*End Wrapper*/	
		HTML += ((settings.wrapControls == true) ? '</div></div>' : '');
			
		switch(	settings.appendMode )
		{
			case 'append':
				$(id).append(HTML);
				break;
			case 'insertAfter':
				HTML.insertAfter( $(id) );
				break;
			case 'insertBefore':
				HTML.insertBefore( $(id) );
				break;
			case 'prepend':
			default:
				$(id).prepend(HTML);
		}
				
		/*read in and set state of font*/
		if( readCookie('font') != '')
		{
			if( readCookie('font') == 'default' )
			{
				$('body.font_default').addClass('font_default');	
				$('#default_font').addClass('activefont');
			}
			else if( readCookie('font') == 'large' )
			{
				$('body').addClass('font_large');
				$('#large_font').addClass('activefont');
			}
			else if( readCookie('font') == 'largest' )
			{
				$('body').addClass('font_largest');
				$('#largest_font').addClass('activefont');		
			}
		}else{
			createCookie("font", "default" , settings.cookieLifeSpanDays);
		}
		
		/*Read in and set state of contrast*/
		if( readCookie('contrast') != '')
		{
			if( readCookie('contrast') == 'default' )
			{
				$('body').addClass('contrast_default');	
				$('#default_contrast').addClass('activecontrast');
			}
			else if( readCookie('contrast') == 'low_contrast' )
			{
				$('body').addClass('contrast_low');	
				$('#low_contrast').addClass('activecontrast');
			}
			else if( readCookie('contrast') == 'high_contrast' )
			{
				$('body').addClass('contrast_high');	
				$('#high_contrast').addClass('activecontrast');
			}
		}else{
			createCookie("contrast", settings.defaultContrastIfUndefined , settings.cookieLifeSpanDays);
		}
		
		/*remove all contrast settings*/
		function removeContrastSetting(){
			$('.activecontrast').removeClass('activecontrast');
			$('body').removeClass('contrast_default contrast_low contrast_high'); 
		}
		
		/*remove all font settings*/
		function removeFontSetting(){
			$('.activefont').removeClass('activefont');
			$('body').removeClass('font_default font_large font_largest');
		}
		
		/*Map click events for contrast buttons*/
		$('#default_contrast').click(function(){ createCookie("contrast", "contrast_default" , settings.cookieLifeSpanDays); removeContrastSetting(); $(this).addClass('activecontrast'); $('body').addClass('contrast_default');	});
		$('#low_contrast').click(function(){ createCookie("contrast", "low_contrast" , settings.cookieLifeSpanDays); removeContrastSetting(); $(this).addClass('activecontrast'); $('body').addClass('contrast_low'); });
		$('#high_contrast').click(function(){ createCookie("contrast", "high_contrast" , settings.cookieLifeSpanDays); removeContrastSetting(); $(this).addClass('activecontrast'); $('body').addClass('contrast_high'); });
		
		/*Map click events for font buttons*/
		$('#default_font').click(function(){  createCookie("font", "default" , settings.cookieLifeSpanDays); removeFontSetting(); $(this).addClass('activefont'); $('body').addClass('font_default'); });
		$('#large_font').click(function(){  createCookie("font", "large" , settings.cookieLifeSpanDays); removeFontSetting(); $(this).addClass('activefont'); $('body').addClass('font_large');  });
		$('#largest_font').click(function(){  createCookie("font", "largest" , settings.cookieLifeSpanDays); removeFontSetting(); $(this).addClass('activefont'); $('body').addClass('font_largest');  });	

	};
})(jQuery);	