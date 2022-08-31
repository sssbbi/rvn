/*
    Version 1

    resizingCheck({
      mobile: function(){
        console.log('mobile');
      },
      pc: function(){
        console.log('pc');
      }
    }, 1024);

    function resizingCheck(object, value){
      var mobileCheck = true,
      pcCheck = true,
      breakpoint = value;

      $(window).on('resize', function(){
        if ( $(this).width() <= breakpoint ) {
          if ( mobileCheck === true ) {
            object.mobile();

            mobileCheck = false;
            pcCheck = true;
          }
        } else {
          if ( pcCheck === true ) {
            object.pc();

            pcCheck = false;
            mobileCheck = true;
          }
        }
      });
    }

  */



  /*
    Version 2

    onResizing(function(){
      console.log('mobile');
    }, function(){
      console.log('pc');
    }, 1024);

    function onResizing(mobile, pc, breakpoint) {
      $(window).on('resize', function(){
        if ( $(this).width() < breakpoint ) {
          mobile();
        } else {
          pc();
        }
      });
    }

  */



  /*
    Version 3

    
    resizingCheck({
    breakpoints: {
      768: function(){
        console.log('768');
      },
      1024: function(){
        console.log('1024');
      },
      1200: function(){
        console.log('1200');
      }
    }
  });

  function resizingCheck(object){
    var resizeCheck = true,
        breakpoints = object,
        matchPoints = [],
        maximum = 0;

    $(window).on('resize', function(){
      if ( resizeCheck === true ) {
        resizeCheck = false;

        setTimeout(function(){
          for ( var i in breakpoints ) {
            var keyValues = Object.keys(breakpoints[i]);

            for ( var j=0; j<keyValues.length; j++ ) {
              var breakpoint = window.matchMedia('(min-width:'+ keyValues[j] +'px)');
              
              if ( breakpoint.matches === true ) {
                matchPoints[j] = parseInt(keyValues[j]);
              }
            }

            maximum = Math.max.apply(null, matchPoints);
            // for ( var j=0; j<keyValues.length; j++ ) {
            //   var breakpoint = window.matchMedia('(min-width:'+ keyValues[j] +'px)');
              
            //   if ( breakpoint.matches === true ) {
            //     matchPoints.push(parseInt(keyValues[j]));

            //     console.log(matchPoints);
            //   }
            // }
          }

          var values = Object.values(breakpoints);

          values[0][maximum]();

          resizeCheck = true;
        },500);
      }
    });
  }
  
  */