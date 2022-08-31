/***
  MASSTIGE SCRIPT LIBRARY

  Tab Active Script
  By Masstige Publishing Team
  
  Version : 1.0.3
  Last updated : 2020-09-02
  Git : https://github.com/masstige-publishing/library
***/

$(document).ready(function(){
  var $tab = $('[data-tab]');

  $tab.each(function(){
    var state = $(this).data('tab'),
        cssActive = $(this).data('tab-css'),
        $tabItem = $(this).find('[data-tab-item]'),
        $tabContent = $(this).find('[data-tab-content]'),
        activeClass = $(this).data('tab-active') === "" ? "on" : $(this).data('tab-active'),
        activeIndex = $(this).data('tab-index') === "" ? 0 : $(this).data('tab-index');

    if ( state !== false ) {
      $tabItem.eq(activeIndex).addClass(activeClass);
      $tabContent.eq(activeIndex).addClass(activeClass);

      if ( cssActive !== false ) {
        $tabContent.css({
          "height":"0",
          "visibility":"hidden",
          "overflow":"hidden"
        });
        
        $tabContent.eq(activeIndex).css({
          "height":"auto",
          "visibility":"visible",
          "overflow":"visible"
        });
      }

      $tabItem.on('click', function(e){
        if ( $tabItem.prop('tagName') === "A" ) {
          if ( $tabItem.attr('href') !== undefined ) {
            e.preventDefault();
          }
        }

        if ( $(this).data('tab-item') !== undefined && $(this).data('tab-item') !== "" ) {
          activeIndex = $(this).data('tab-item');
        } else {
          activeIndex = $(this).index();
        }


        if ( cssActive !== false ) {
          $tabContent.css({
            "height":"0",
            "visibility":"hidden",
            "overflow":"hidden"
          });

          $tabContent.eq(activeIndex).css({
            "height":"auto",
            "visibility":"visible",
            "overflow":"visible"
          });
        }

        $(this).addClass(activeClass).siblings().removeClass(activeClass);
        $tabContent.removeClass(activeClass);
        $tabContent.eq(activeIndex).addClass(activeClass);
      });
    }
  });
});