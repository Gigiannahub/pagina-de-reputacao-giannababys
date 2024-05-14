/**
 * main.js v1
 * Created by Ben Gillbanks <http://www.binarymoon.co.uk/>
 * Available under GPL2 license
 *
 * @package Romero
 */

; ( function( $ ) {

	function is_touch_device() {
		return ( ( 'ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 ) );
	}

	$( document ).ready( function() {

		if ( $.isFunction( $.fn.responsiveNavigation ) ) {
			$( 'ul#nav' ).responsiveNavigation( {
				breakpoint: 549
			} );
		}

		// Attachment page navigation.
		if ( $( 'body' ).hasClass( 'attachment' ) ) {

			$( document ).keydown( function( e ) {

				if ( $( 'textarea, input' ).is( ':focus' ) ) {
					return;
				}

				var url = false;

				switch ( e.which ) {
					// Left arrow key (previous attachment).
					case 37:
						url = $( '.image-previous a' ).attr( 'href' );
						break;

					// Right arrow key (next attachment).
					case 39:
						url = $( '.image-next a' ).attr( 'href' );
						break;

				}

				if ( url ) {
					window.location = url;
				}
			} );

		}

		// Add css class so that the search field can grow in size.
		$( '.masthead .search-field' ).on( 'focus', function() {
			$( '.masthead .secondary' ).addClass( 'search-active' );
		} );

		$( '.masthead .search-field' ).on( 'blur', function() {
			$( '.masthead .secondary' ).removeClass( 'search-active' );
		} );

		// Effects for form labels.
		$( '#respond input, #respond textarea' ).on( 'focus', function() {
			$( this ).parent().addClass( 'selected' );
		} ).on( 'blur', function() {
			$( this ).parent().removeClass( 'selected' );
		} );

		// Make the menu widgets appear.
		$( '#sidebar-menu-toggle' ).on( 'click', function() {

			$( '#sidebar-menu' ).slideToggle( 'fast' );

			setTimeout(
				function() {

					// Remove any media elements currently initialised.
					$( '.sidebar-menu .mejs-container' ).each(
						function( i, el ) {
							if ( mejs.players[ el.id ] ) {
								mejs.players[ el.id ].remove();
							}
						}
					);

					// Initialize overlay.
					if ( window.wp && window.wp.mediaelement ) {
						window.wp.mediaelement.initialize();
					}

					// Trigger window resize event to fix video size issues.
					if ( typeof ( Event ) === 'function' ) {
						window.dispatchEvent( new Event( 'resize' ) );
					} else {
						var event = window.document.createEvent( 'UIEvents' );
						event.initUIEvent( 'resize', true, false, window, 0 );
						window.dispatchEvent( event );
					}

				},
				250
			);

		} );

		// Prepare masonry.
		$( window ).on(
			'load',
			function() {

				if ( $.isFunction( $.fn.masonry ) ) {
					$( '.sidebar-footer .container' ).imagesLoaded( function() {
						$( '.sidebar-footer .container' ).masonry( {
							itemSelector: '.widget',
							gutter: 0,
							isOriginLeft: !$( 'body' ).is( '.rtl' )
						} );
					} );

					$( 'body.archive .testimonials' ).imagesLoaded( function() {
						$( 'body.archive .testimonials' ).masonry( {
							itemSelector: '.testimonial',
							gutter: 0,
							isOriginLeft: !$( 'body' ).is( '.rtl' )
						} );
					} );
				}

			} );

		$( '.menu-toggle' ).on( 'click', function() {
			$( this ).parent().toggleClass( 'menu-on' );
		} );

		$( '.menu' ).find( 'a' ).on( 'focus blur', function() {
			$( this ).parents().toggleClass( 'focus' );
		} );

		$( 'body' ).addClass( is_touch_device() ? 'device-touch' : 'device-click' );

	}
	);

} )( jQuery );
