/*
* Navigation Active Plugin version 1.1
* By Masstige
* */

(function($) {
  $.fn.navActive = function(options) {
    var settings = $.extend({
        active: "on", // class name
        depth1: ".depth-1", // depth1 classname
        depth2: ".depth-2", // depth2 classname
        depth3: ".depth-3" // depth3 classname
      }, options);

    var LOCATION = $(location), // URL
        PATHNAME = LOCATION.attr('pathname'), // pathname
        CURRENT_ARRAY = PATHNAME.split('/'), // pathname array
        DEPTH1_INDEX = (CURRENT_ARRAY.length-CURRENT_ARRAY.length)===0?CURRENT_ARRAY.length-CURRENT_ARRAY.length:undefined,
        DEPTH2_INDEX = (CURRENT_ARRAY.length-1)!==0?CURRENT_ARRAY.length-(CURRENT_ARRAY.length-1):undefined,
        DEPTH3_INDEX = (CURRENT_ARRAY.length-2)!==0?CURRENT_ARRAY.length-(CURRENT_ARRAY.length-2):undefined;

    if ( CURRENT_ARRAY[0] === "" || CURRENT_ARRAY[0] === ".." ) {
      CURRENT_ARRAY.splice(0,1);
    }

    var $DEPTH1 = $(this).find(settings.depth1), // depth1 element
        $DEPTH2 = $(this).find(settings.depth2), // depth2 element
        $DEPTH3 = $(this).find(settings.depth3), // depth3 element
        ACTIVE_CLASS = settings.active,
        $DEPTH1_LINK = $DEPTH1.children('a'), // depth1 anchor
        $DEPTH2_LINK = $DEPTH2.children('a'); // depth2 anchor
        $DEPTH3_LINK = $DEPTH3.children('a'); // depth2 anchor

    var CURRENT = { // current depth1, depth2, depth3, ...
      DEPTH1: CURRENT_ARRAY[DEPTH1_INDEX],
      DEPTH2: DEPTH2_INDEX!==undefined?CURRENT_ARRAY[DEPTH2_INDEX]:undefined,
      DEPTH3: DEPTH3_INDEX!==undefined?CURRENT_ARRAY[DEPTH3_INDEX]:undefined
    }

    if ( CURRENT.DEPTH2 !== undefined && CURRENT.DEPTH2.split('.')[1] !== undefined ) {
      CURRENT.DEPTH2 = CURRENT.DEPTH2.split('.')[0];
    }

    if ( CURRENT.DEPTH2.split('-')[1] !== undefined ) {
      CURRENT.DEPTH2 = CURRENT.DEPTH2.split('-')[0];
    }

    if ( CURRENT.DEPTH3 !== undefined && CURRENT.DEPTH3.split('.')[1] !== undefined ) {
      CURRENT.DEPTH3 = CURRENT.DEPTH3.split('.')[0];
    }

    if ( CURRENT.DEPTH3 !== undefined && CURRENT.DEPTH3.split('-')[1] !== undefined ) {
      CURRENT.DEPTH3 = CURRENT.DEPTH3.split('-')[0];
    }

    if ( CURRENT.DEPTH2.split('__')[1] !== undefined ) {
      CURRENT.DEPTH2 = CURRENT.DEPTH2.split('__')[0];
      CURRENT.DEPTH3 = CURRENT_ARRAY[DEPTH2_INDEX].split('__')[1];

      if ( CURRENT.DEPTH3.split('.')[1] !== undefined ) {
        CURRENT.DEPTH3 = CURRENT.DEPTH3.split('.')[0];
      }

      if ( CURRENT.DEPTH3.split('-')[1] !== undefined ) {
        CURRENT.DEPTH3 = CURRENT.DEPTH3.split('-')[0];
      }
    }

    var ANCHOR = {
      DEPTH1: "",
      DEPTH2: "",
      DEPTH3: ""
    }

    /* depth 1 check */
    if ( DEPTH1_INDEX !== undefined ) { // validate check
      $DEPTH1_LINK.each(function(){
        var $this = $(this),
            ANCHOR_HREF = $this.attr('href'),
            ANCHOR_ARRAY = ANCHOR_HREF.split('/'),
            ANCHOR_DEPTH1_INDEX = (ANCHOR_ARRAY.length-ANCHOR_ARRAY.length)===0?ANCHOR_ARRAY.length-ANCHOR_ARRAY.length:undefined;

        if ( ANCHOR_ARRAY[0] === "" || ANCHOR_ARRAY[0] === ".." ) { // blank & '..' checking
          ANCHOR_ARRAY.splice(0,1);
        }

        ANCHOR.DEPTH1 = ANCHOR_ARRAY[ANCHOR_DEPTH1_INDEX];

        if ( CURRENT.DEPTH1 === ANCHOR.DEPTH1 ) { // add class
          $this.addClass(ACTIVE_CLASS);
        }
      });
    }

    /* depth 2 check */
    if ( CURRENT.DEPTH2 !== undefined ) { // validate check
      $DEPTH2_LINK.each(function(){
        var $this = $(this),
            ANCHOR_HREF = $this.attr('href'),
            ANCHOR_ARRAY = ANCHOR_HREF.split('/'),
            ANCHOR_DEPTH2_INDEX = (ANCHOR_ARRAY.length-1)!==0?ANCHOR_ARRAY.length-(ANCHOR_ARRAY.length-1):undefined;

        if ( ANCHOR_ARRAY[0] === "" || ANCHOR_ARRAY[0] === ".." ) { // blank & '..' checking
          ANCHOR_ARRAY.splice(0,1);
        }

        ANCHOR.DEPTH2 = ANCHOR_ARRAY[ANCHOR_DEPTH2_INDEX];

        if ( ANCHOR.DEPTH2.split('__')[1] !== undefined ) {
          ANCHOR.DEPTH2 = ANCHOR.DEPTH2.split('__')[0];
        }

        if ( ANCHOR.DEPTH2.split('.')[1] !== undefined ) {
          ANCHOR.DEPTH2 = ANCHOR.DEPTH2.split('.')[0];
        }

        if ( CURRENT.DEPTH2 === ANCHOR.DEPTH2 ) { // add class
          $this.addClass(ACTIVE_CLASS);
        }
      });
    }

    /* depth 3 check */
    if ( CURRENT.DEPTH3 !== undefined ) { // validate check
      $DEPTH3_LINK.each(function(){
        var $this = $(this),
            ANCHOR_HREF = $this.attr('href'),
            ANCHOR_ARRAY = ANCHOR_HREF.split('/'),
            ANCHOR_DEPTH2_INDEX = (ANCHOR_ARRAY.length-1)!==0?ANCHOR_ARRAY.length-(ANCHOR_ARRAY.length-1):undefined,
            ANCHOR_DEPTH3_INDEX = (ANCHOR_ARRAY.length-2)!==0?ANCHOR_ARRAY.length-(ANCHOR_ARRAY.length-2):undefined;

        if ( ANCHOR_ARRAY[0] === "" || ANCHOR_ARRAY[0] === ".." ) { // blank & '..' checking
          ANCHOR_ARRAY.splice(0,1);
        }

        ANCHOR.DEPTH2 = ANCHOR_ARRAY[ANCHOR_DEPTH2_INDEX];

        if ( ANCHOR.DEPTH2.split('-')[1] !== undefined ) {
          ANCHOR.DEPTH2 = ANCHOR.DEPTH2.split('-')[0];
        }

        if ( ANCHOR.DEPTH2.split('__')[1] !== undefined ) {
          ANCHOR.DEPTH3 = ANCHOR_ARRAY[ANCHOR_DEPTH2_INDEX].split('__')[1];
        } else {
          ANCHOR.DEPTH3 = ANCHOR_ARRAY[ANCHOR_DEPTH3_INDEX];
        }

        if ( ANCHOR.DEPTH3.split('-')[1] !== undefined ) {
          ANCHOR.DEPTH3 = ANCHOR.DEPTH3.split('-')[0];
        }

        if ( ANCHOR.DEPTH3.split('.')[1] !== undefined ) {
          ANCHOR.DEPTH3 = ANCHOR.DEPTH3.split('.')[0];
        }

        if ( CURRENT.DEPTH3 === ANCHOR.DEPTH3 ) { // add class
          $this.addClass(ACTIVE_CLASS);
        }
      });
    }
  }
}(jQuery));

$(document).ready(function(){
  $('.nav').navActive();
});
