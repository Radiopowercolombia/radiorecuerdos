(function ($) {
    "use strict";
    /*	Table OF Contents
	==========================
	0-prettyPhoto
	1-Navigation
	2-Calander
	3-Vegas Slider
	4-Jplayer
	5-Sliders
	6-Flicker
	7-Tweet
	8-Google Maps
	9-Gllery
	10-contact Form
	*/
	
	
	/*============================
	1-Navigation
	============================*/
	
	
	$(window).resize(function(){
		var $ww=$(window).width();
				
		if($ww<=993){
			$(document).on('click', '.yamm .dropdown-menu', function (e) {e.stopPropagation();});
			$('body').click(function(e){
			  if($(e.target).closest('.navbar-default').length === 0){
				$('.nav_wrapper').removeClass('active');
				$('ul.dropdown-menu').removeClass('open');
				$('.navbar-toggle').removeClass('fa-times').addClass('fa-navicon');
			  }
			});
		
			$('.navbar-toggle').click(function(e){
				e.stopImmediatePropagation();
				if($(this).hasClass('fa-navicon')){$(this).removeClass('fa-navicon').addClass('fa-times');
				}else{$(this).removeClass('fa-times').addClass('fa-navicon');}
				$('.nav_wrapper').toggleClass('active');
				$('ul.dropdown-menu').removeClass('open');
			});
		
			$('.navbar li.dropdown').click(function(){
				$('ul.dropdown-menu').removeClass('open');
				$(this).children('ul.dropdown-menu').toggleClass('open');
				$('.nav-level-down').fadeIn();
			});
			
			if($('.nav-level-down').length==0){
			$('.navbar-default').find( 'ul.dropdown-menu' ).prepend( '<li class="nav-level-down"><a class="nav-level-down" href="#" style="display: none;"><span class="fa fa-long-arrow-left"></span></a></li>' );
			}
			$('.nav-level-down a').click(function(e){
				e.preventDefault();
				e.stopImmediatePropagation();
				$('ul.dropdown-menu').removeClass('open');
				$('.nav-level-down').fadeOut();
			});
	
		}
	}).resize();
	
	
	$('.navbar-nav a').click(function(){
		$('.navbar-nav > li').removeClass('active');
		$(this).parents('.navbar-nav > li').addClass('active');
	});
	/*============================
	Vegas Slider
	============================*/
	
	if($('.vegas-slides').length){
		var vegas_BG_imgs = [],
		$vegas_img = $('.vegas-slides li img'),
		vegas_slide_length= $('.vegas-slides li').length;
		for (var i=0; i < vegas_slide_length; i++) {
			var new_vegas_img = {};
			new_vegas_img['src'] = $vegas_img.eq(i).attr('src');
			new_vegas_img['fade'] =$vegas_img.eq(i).attr('data-fade');
			vegas_BG_imgs.push(new_vegas_img);
		}
		$.vegas('slideshow', {backgrounds:vegas_BG_imgs,});
	}
	
	/*============================
	Jplayer
	============================*/
	var werock,playlistScroller;
	$('.playListTrigger > a').click(function(){
		$('#audio-player').toggleClass('open');
		return false;
	});
	if($('#audio-player').length!=0 && !($('#audio-player').hasClass('jsExecuted'))){
		$('#audio-player').addClass('jsExecuted');
		$("#player-instance").jPlayer({
			cssSelectorAncestor: "#audio-player",
		});
		if($('.playlist-files').length){
			var playlist_items = [],
			$playlist_audio=$('.playlist-files li'),
			playlist_items_length= $playlist_audio.length;
			
			for (var i=0; i < playlist_items_length; i++) {
				var  new_playlist_item = {};
				new_playlist_item['title'] = $playlist_audio.eq(i).attr('data-title');
				new_playlist_item['artist'] = $playlist_audio.eq(i).attr('data-artist');
				new_playlist_item['mp3'] = $playlist_audio.eq(i).attr('data-mp3');
				playlist_items.push(new_playlist_item);
			}
		
				werock = new jPlayerPlaylist({
				jPlayer: "#player-instance",
				enableRemoveControls:true,
				cssSelectorAncestor: "#audio-player"
			},playlist_items , {
				swfPath: "assets/jPlayer/jquery.jplayer.swf",
				supplied: "mp3",
				displayTime: 'fast',
				addTime: 'fast',
			});
		
				playlistScroller=$(".audio-track").mCustomScrollbar({
				advanced: {
					updateOnContentResize: true
				},
			});
			
			$('.audio-title').html(werock.playlist[0].title);
			$("#player-instance").bind($.jPlayer.event.play, function (event) {
				var current = werock.current,
					playlist = werock.playlist;
				jQuery.each(playlist, function (index, obj) {
					if (index == current) {
						$('.audio-title').html(obj.title);
					}
				});
			});
		}
		
		$('.jp-prev').click(function () {
			werock.previous();
			$(".audio-track").mCustomScrollbar("scrollTo", 'li.jp-playlist-current');
		});
	
		$('.jp-next').click(function () {
			$(".audio-track").mCustomScrollbar("scrollTo", 'li.jp-playlist-current');
		});
	}
	/*============================
	AjaxCall
	============================*/
	
	
		jQuery('#ajaxArea').ajaxify({requestDelay:2000,forms: false});
		
		
		$(window).on('pronto.render', function(event, eventInfo){
			werockApp();
			$('#ajaxArea').removeClass('loading');
		});
		$(window).on('pronto.request', function(event, eventInfo){
			$('#ajaxArea').addClass('loading');
		})
		
		werockApp();
		function werockApp(){
		/*============================
		1-PrettyPhoto
		============================*/
		if($("a[data-rel^='prettyPhoto']").length!=0){
			$("a[data-rel^='prettyPhoto']").prettyPhoto();
		}
	
		/*============================
		2-Calander
		============================*/
		if($('.event_calender').length!=0){
			$('.event_calender').calendarWidget({month: 11,year: 2013,});
		}
		if($('.more-events').length!=0){
			$('.more-events').click(function(){$('.events_showcase').slideToggle(800);return false;});
		}
		
		if($('#flex-home').length!=0){
			$('#flex-home').flexslider({
				animation: $('#flex-home').attr('data-animation'),
				animationSpeed:$('#flex-home').attr('data-animationSpeed'),
				slideshowSpeed: $('#flex-home').attr('data-slideshowSpeed'),
				slideshow:$('#flex-home').data('autoPlay'),
				directionNav: false,controlNav: false,direction: "horizontal",
				start: function(){
					$('#homeSliderNav').show();
					$('.rockPlayerHolder').offset().top;
				}
			});
			var $flex_home = $('#flex-home');
			$('#home-next').click(function () {$flex_home.flexslider("next");return false;});
			$('#home-prev').click(function () {$flex_home.flexslider("prev");return false;});
		}
		if($('.albums-carousel').length!=0 ){
			$('.albums-carousel').carouFredSel({
				width: "100%",
				height: 300,
				circular: false,
				infinite: false,
				auto: false,
				scroll: {items: 1,easing: "linear"},
				prev: {button: "a.prev-album",key: "left"},
				next: {button: "a.next-album",key: "right"}
			});
		}
	
		/*============================
		6-Flicker
		============================*/
	
		if($('#flicker-feed').length!=0 && !($('#flicker-feed').hasClass('jsExecuted'))){
			$('#flicker-feed').addClass('jsExecuted');
			$('#flicker-feed').jflickrfeed({
				limit: $('#flicker-feed').data('limit'),
				qstrings: {id: $('#flicker-feed').attr('data-userID')},
				itemTemplate: '<li><a href="{{image_b}}" data-rel="prettyPhoto"><img alt="{{title}}" src="{{image_s}}" /></a></li>'
			}, function () {$("a[data-rel^='prettyPhoto']").prettyPhoto();});
		}
	
	
		/*============================
		7-Tweet
		============================*/
		if ($('.latest-tweet').length!=0 && !($('.latest-tweet').hasClass('jsExecuted'))){
			$('.latest-tweet').addClass('jsExecuted');
			 $('.latest-tweet').twittie({
				 username:$('.latest-tweet').attr('data-username'),
				dateFormat: '%b. %d, %Y',template: '{{tweet}} <time class="date">{{date}}</time>',
				count: $('.latest-tweet').data('limit'),
				apiPath:"assets/php/tweet_api/tweet.php",
			});
		}
		
		/*============================
		8-Google Maps
		============================*/
	
		if ($('.xv-gmap').length!=0){
			$('.xv-gmap').each(function() {
				var $this=$(this)
				
					var selector_map =$this.attr('id'),
						mapAddress = $this.data('address'),
						mapType = $this.data('maptype'),
						zoomLvl = $this.data('zoomlvl'),
						map_theme_control = $this.data('theme'),
						map_theme;
			
					switch (map_theme_control) {
					case 'pink':
						map_theme=[{stylers:[{hue:"#e62948"},{visibility:"on"},{invert_lightness:true},{saturation:40},{lightness:10}]}]
			
						break;
					case 'red':
						map_theme=[{featureType:"water",elementType:"geometry",stylers:[{color:"#ffdfa6"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#b52127"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#c5531b"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#74001b"},{lightness:-10}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#da3c3c"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#74001b"}]},{featureType:"road.arterial",elementType:"geometry.stroke",stylers:[{color:"#da3c3c"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#990c19"}]},{elementType:"labels.text.fill",stylers:[{color:"#ffffff"}]},{elementType:"labels.text.stroke",stylers:[{color:"#74001b"},{lightness:-8}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#6a0d10"},{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{color:"#ffdfa6"},{weight:.4}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{visibility:"off"}]}]
			
						break;
					case 'blue':
						map_theme=[{stylers:[{hue:"#007fff"},{saturation:89}]},{featureType:"water",stylers:[{color:"#ffffff"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"off"}]}]
			
						break;
					case 'yellow':
						map_theme=[{featureType:"water",elementType:"geometry",stylers:[{color:"#a2daf2"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{color:"#f7f1df"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#d0e3b4"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#bde6ab"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.medical",elementType:"geometry",stylers:[{color:"#fbd3da"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffe15f"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#efd151"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"black"}]},{featureType:"transit.station.airport",elementType:"geometry.fill",stylers:[{color:"#cfb2db"}]}]
			
			
						break;
					case 'green':
						map_theme=[{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"},{color:"#aee2e0"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#abce83"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#769E72"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#7B8758"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#EBF4A4"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"simplified"},{color:"#8dab68"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#5B5B3F"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ABCE83"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#A4C67D"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#9BBF72"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#EBF4A4"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"},{color:"#87ae79"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#7f2200"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"},{visibility:"on"},{weight:4.1}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#495421"}]},{featureType:"administrative.neighborhood",elementType:"labels",stylers:[{visibility:"off"}]}]
			
						break;
					default:
						map_theme = [];
					}
					contactemaps(selector_map, mapAddress, mapType, zoomLvl, map_theme);
				
			});
		}
 	
		function contactemaps(selector_map, address, type, zoom_lvl, map_theme) {
			var map = new google.maps.Map(document.getElementById(selector_map), {
				mapTypeId: google.maps.MapTypeId.type,
				scrollwheel: false,
				draggable: false,
				zoom: zoom_lvl,
				styles: map_theme,
			});
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
					'address': address
				},
				function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						new google.maps.Marker({
							position: results[0].geometry.location,
							map: map,
							/* icon: map_pin*/
						});
						map.setCenter(results[0].geometry.location);
					}
				});
		}
	
	
		/*===========================
		9-Gllery
		============================*/
	
		function onImagesLoaded($container, callback) {
			var $images = $container.find("img");
			var imgCount = $images.length;
			if (!imgCount) {
	
				callback();
			} else {
				$("img", $container).each(function () {
					$(this).one("load error", function () {
						imgCount--;
						if (imgCount === 0) {
							callback();
						}
					});
					if (this.complete) $(this).load();
				});
			}
		}
	
		onImagesLoaded($(".photo-gallery"), function () {
			var $containerfolio = $('.photo-gallery');
			$containerfolio.show();
		});
	
		var $containerfolio = $('.photo-gallery');
		if ($containerfolio.length) {
			$containerfolio.isotope({
				layoutMode: 'fitRows',
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
		}
	
		$('.photo-filter li a').click(function () {
			$('.photo-filter li').removeClass("active");
			$(this).parent().addClass("active");
			var selector = $(this).attr('data-filter');
			$containerfolio.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});
		
		
		/*========================
		Track Player
		========================*/
		var allowMultiple=false,trackSelector;
		if($('.track_listen').length != 0){
			
			$('.track_listen span').click(function (e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				trackSelector=$(this);
					if($(this).hasClass('alreadyAdded')){
						$('.alreadyAdded-warning').slideDown();
					}
					else if(!$(this).hasClass('alreadyAdded')){
						$(this).addClass('alreadyAdded');
						werock.add({
							title:$(this).attr('data-title'),
							artist: $(this).attr('data-artist'),
							mp3: $(this).attr('data-mp3'),
						},true);
						$(this).children('i').removeClass('fa-play').addClass('fa-check');		
					}
				return false;
			});
			$('.addAgain').on('click',this,function(){
				$('.alreadyAdded-warning').slideUp();			
				  werock.add({
					  title:trackSelector.attr('data-title'),
					  artist: trackSelector.attr('data-artist'),
					  mp3: trackSelector.attr('data-mp3'),
				  },true);
				  
			});
			$('.dontAdd').on('click',this,function(){
				$('.alreadyAdded-warning').slideUp();			
				 
			});
			
		}
		
		
		/*=======================
		10-Contact Form validation
		=======================*/
		 function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		
		if($("#contactform").length!=0){
			$("#contactform").submit(function (e) {
				e.preventDefault();
				var name = $("#name").val(),
				email = $("#email").val(),
				message = $("#message").val(),
				dataString = 'name=' + name + '&email=' + email + '&message=' + message;
		
				if (name === '' || !IsEmail(email) || message === '') {
					$('#valid-issue').html('Please Provide Valid Information').slideDown();
				} else {
					$.ajax({
						type: "POST",
						url: "assets/php/submit.php",
						data: dataString,
						success: function () {
							$('#contactform').slideUp();
							$('#valid-issue').html('Your message has been sent,<BR> We will contact you back with in next 24 hours.').show();
						}
					});
				}
				return false;
			});
		}	
	}

})(jQuery);