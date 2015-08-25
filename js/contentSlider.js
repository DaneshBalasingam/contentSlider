(function($) {
	'use strict';
	
	$.fn.contentSlider = function (options) {
		
		var interval = '';
		
		var panel_width = $('#carousel').width();

		options = $.extend({
			'autoScrolling': true
		}, options);
		
		autoScroll();
		
	
		$("#left").click(goToNext);
		$("#right").click(goToPrev);
		
		
		$(".dot").on('click', function(){

			slideToImage($(this));
		
		});
		
		function autoScroll(){
		
			if (options.autoScrolling) {
				interval = setInterval(goToNext, 10000);
			}
		
		}
			
		
		function syncDots(clicked) {

			$('.dot').removeClass('active');
			var curr_panel = '';
			
			$('.panel').each(function(){
				if ($(this).hasClass('current')) {
					curr_panel = $(this);
				}
			});
			
			if(clicked.attr('data-slide-to') == curr_panel.attr('data-item')) {
				clicked.addClass('active');
			}

		}
		
		function SyncDots2(curr_panel){
		
			$('.dot').removeClass('active');
			$('.dot').each(function(){
				if ($(this).attr('data-slide-to') == curr_panel.attr('data-item')) {
					$(this).addClass('active');
				}
			});
		
		}
		
		function slideToImage(clicked) {
		
			clearInterval(interval);
			
			autoScroll();
			
			var selected = clicked.attr('data-slide-to');
			
			var oCurItem = $('#panels div.current');

			if ( oCurItem.attr('data-item') < selected) {
			
				var oNxtItem = $('.panel').eq(selected);
				
				oNxtItem.addClass('next');
			
				oCurItem.animate({ left: -panel_width }, 500, function() {
					oCurItem.removeClass('current');
					oCurItem.attr( "style", "" );
				});
								
								
				oNxtItem.animate({ left: 0 }, 500, function() {
					oNxtItem.removeClass('next');
					oNxtItem.addClass('current');
					oNxtItem.attr( "style", "" );
					syncDots(clicked);
				});	
			
			} else if (  oCurItem.attr('data-item') > selected ) {
			
				var oPrevItem = $('.panel').eq(selected);
				
				oPrevItem.addClass('previous');
			
				oCurItem.animate({ left: panel_width }, 500, function() {
					oCurItem.removeClass('current');
					oCurItem.attr( "style", "" );
				});
								
								
				oPrevItem.animate({ left: 0 }, 500, function() {
					oPrevItem.removeClass('previous');
					oPrevItem.addClass('current'); 
					oPrevItem.attr( "style", "" );
					syncDots(clicked);
				});
			
			}
			
			
			
		}
		
		function goToNext() {
			
			clearInterval(interval);
			
			autoScroll();
			
            var oCurItem = $('#panels div.current');
            var oNxtItem = oCurItem.next();

            if (oNxtItem.length == 0)
                oNxtItem = $('#panels div:first');

            oNxtItem.addClass('next');
			
            oCurItem.animate({ left: -panel_width }, 500, function() {
				oCurItem.removeClass('current');
				oCurItem.attr( "style", "" );
			});
								
								
			oNxtItem.animate({ left: 0 }, 500, function() {
				oNxtItem.removeClass('next');
				oNxtItem.addClass('current');
				oNxtItem.attr( "style", "" );
				SyncDots2(oNxtItem);
				
			});	
			
        }
		
		function goToPrev() {
			
			clearInterval(interval);
			
			autoScroll();
			
			
            var oCurItem = $('#panels div.current');
            var oPrevItem = oCurItem.prev();

            if (oPrevItem.length == 0)
                oPrevItem = $('#panels div:last');

            oPrevItem.addClass('previous');
			
			oCurItem.animate({ left: panel_width }, 500, function() {
				oCurItem.removeClass('current');
				oCurItem.attr( "style", "" );
			});
								
								
			oPrevItem.animate({ left: 0 }, 500, function() {
				oPrevItem.removeClass('previous');
				oPrevItem.addClass('current'); 
				oPrevItem.attr( "style", "" );
				SyncDots2(oPrevItem);
			});	
	
		}
	};
	
})(jQuery);