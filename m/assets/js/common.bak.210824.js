'use strict';
$(document).ready(function () {
  $('.mypage-nav').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    //depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      //console.log('callback function');
    },
  });

  headerScroll_front();
  startPoP();
  filter_front.init();
  qnaFun.init();
  dockBar.init();
  //searchMobile.init();
  cartPrice.init();
  prodViewOption.init();
  //scrollSt();
  ratings.init();

  //$('.img-zoom').zoom({ on: 'grab' });
});

$(document).on('mouseover', function () {
  magnificPop.init();
});

$(window).on('scroll', function () {
  headerScroll_front();
  goTop_scroll();
});

/* filter */
var filter_front = {
  init: function () {
    this.Action();
  },
  Action: function () {
    var filterBtn = $('.filter-btn'),
      filterPop = $('.filter-pop'),
      filterCloseBtn = $('.filter-close-btn'),
      filterApplyBtn = $('.filter-apply-btn'),
      filterlistDp1 = $('.filter-list > li > a'),
      filterlistDp2 = $('.filter-list > li > ul');

    filterBtn.on('click', function () {
      $(this).addClass('on');
      filterPop.show();
      $('html, body').addClass('y-hidden');
    });

    filterCloseBtn.on('click', function () {
      filterBtn.removeClass('on');
      filterPop.hide();
      $('html, body').removeClass('y-hidden');
    });

    filterApplyBtn.on('click', function () {
      filterBtn.removeClass('on');
      filterPop.hide();
      $('html, body').removeClass('y-hidden');
    });

    filterlistDp1.on('click', function () {
      filterlistDp2.css('display', 'none');
      $(this).next('ul').css('display', 'block');
    });
  },
};

/* popup */
var magnificPop = {
  init: function () {
    this.pop_01(); //ajax 팝업
  },

  pop_01: function () {
    $('.popup-link').magnificPopup(
      {
        type: 'ajax',
        closeOnBgClick: false,
      },
      500
    );
  },
};
function closePopup() {
  $.magnificPopup.close();
}

/* dock bar */
var dockBar = {
  init: function () {
    var $navBtn = $('.nav-mobile-btn'),
      $navClose = $('.nav-mobile__close'),
      $nav = $('.nav-mobile'),
      $html = $('html, body');

    var toggleNav = function () {
      //$navBg.fadeToggle(200,"linear");
      $nav.toggleClass('active');
      $navBtn.toggleClass('active');
      $html.toggleClass('y-hidden');
    };

    var $searchBtn = $('.search-mobile-btn'),
      $searchClose = $('.search-mobile__close'),
      $searchBg = $('.search-mobile__bg'),
      $search = $('.search-mobile');

    var toggleSearch = function () {
      $searchBg.fadeToggle(200, 'linear');
      $search.toggleClass('active');
      $searchBtn.toggleClass('active');
    };

    $navBtn.on('click', function () {
      toggleNav();

      if ($search.hasClass('active')) {
        toggleSearch();
      }
    });

    $navClose.on('click', function () {
      toggleNav();
    });

    $searchBtn.on('click', function () {
      toggleSearch();
      if ($nav.hasClass('active')) {
        toggleNav();
      }
    });
    $searchBg.on('click', function () {
      toggleSearch();
    });
    $searchClose.on('click', function () {
      toggleSearch();
    });

    //this.nav_mobile_btn();
    this.nav_mobile_active();
    this.nav_mobile_down();
    this.nav_mobile_action();
  },

  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on, .nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('__down');
      } else {
        $(this).removeClass('__down');
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $('.nav-mobile .depth-1'),
      $depth2 = $('.nav-mobile .depth-2'),
      $depth2_list = $('.nav-mobile .nav-list--depth2'),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $('.nav-mobile .nav-list--depth3');

    $depth1.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth2.find('.link').removeClass('active');
          $depth1.children('.link').removeClass('active');
          $(this).addClass('active');
          $depth3_list.hide();
          $depth2.find('.link').removeClass('active');
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find('.link').removeClass('active');
          $(this).next().slideUp(200);
          $depth1.children('.link').removeClass('active');
        }
        return false;
      } else {
      }
    });
  },
};

/* 검색 */
// var searchMobile = {
//   init: function () {
//     this.search_mobile_btn();
//   },
//   search_mobile_btn: function () {
//     var $searchBtn = $('.search-mobile-btn'),
//       $searchClose = $('.search-mobile__close'),
//       $searchBg = $('.search-mobile__bg'),
//       $search = $('.search-mobile');
//     var toggleSearch = function () {
//       $searchBg.fadeToggle(200,"linear");
//       $search.toggleClass('active');
//       $searchBtn.toggleClass('active');
//     };
//     $searchBtn.on('click', function () {
//       toggleSearch();
//     });
//     $searchBg.on('click', function () {
//       toggleSearch();
//     });
//     $searchClose.on('click', function () {
//       toggleSearch();
//     });
//   },
// };

/* 쇼핑백 */
var cartPrice = {
  init: function () {
    this.cart_price_btn();
  },
  cart_price_btn: function () {
    var $cartClose = $('.shopping-bag-price__close'),
      $cartCont = $('.shopping-bag-price__detail');
    var toggleCart = function () {
      $cartCont.stop(false, true).slideToggle(200);
      $cartClose.toggleClass('active');
    };
    $cartClose.on('click', function () {
      $(this).toggleClass('active');
      $(this).next().toggleClass('active');
      // if ( $(this).hasClass('active')) {
      //   $(this).removeClass('active');
      //   $(this).next().stop(false, true).slideUp(0);
      // } else {
      //   $(this).addClass('active');
      //   $(this).next().stop(false, true).slideDown(300);
      // }
    });
  },
};

/* 상품 상세 옵션 */
var prodViewOption = {
  init: function () {
    this.prod_option_btn();
  },
  prod_option_btn: function () {
    var $prodOptionClose = $('.product-option__close'),
      $prodOptionCont = $('.product-option__detail');

    $prodOptionClose.on('click', function () {
      $(this).toggleClass('active');
      $(this).next().toggleClass('active');
      // if ( $(this).hasClass('active')) {
      //   $(this).removeClass('active');
      //   $(this).next().stop(false, true).slideUp(0);
      // } else {
      //   $(this).addClass('active');
      //   $(this).next().stop(false, true).slideDown(300);
      // }
    });
  },
};

function headerScroll_front() {
  if ($(window).scrollTop() > 100) {
    $('.header').addClass('scroll');
  } else {
    $('.header').removeClass('scroll');
  }

  if ($('.header').hasClass('scroll') && $('.header').hasClass('up') == false) {
    //$('.nav-mobile').removeClass('top-h');
    //$('.nav-mobile').addClass('top-0');
    if ($('body').hasClass('product')) {
      $('body.product .product-nav').removeClass('top-h');
      $('body.product .product-nav').addClass('top-0');
    }
  } else if ($('.header').hasClass('up')) {
    //$('.nav-mobile').removeClass('top-0');
    //$('.nav-mobile').addClass('top-h');
    if ($('body').hasClass('product')) {
      $('body.product .product-nav').removeClass('top-0');
      $('body.product .product-nav').addClass('top-h');
    }
  }
}

var lastScrollTop = 0;
$(window).scroll(function (event) {
  var st = $(this).scrollTop();
  if ($('body').hasClass('product-view') == false) {
    if (st < lastScrollTop) {
      $('.header').addClass('up');
    } else {
      $('.header').removeClass('up');
    }
    lastScrollTop = st;
  }
});

/* wow */
var wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 150,
  mobile: true,
  live: true,
  // callback: function (box) {},
  // scrollContainer: null,
});
wow.init();

var wowrap = $('.wowrap');
$(wowrap).each(function () {
  $(this)
    .find('.wow')
    .each(function (index) {
      var eq = index / 8 + 's';
      $(this).attr('data-wow-delay', eq);
    });
  $(this)
    .find('.animated')
    .each(function (index) {
      var eq = index * 250;
      $(this).attr('data-id', 'delay-' + eq);
    });
});

/*메인팝업*/
function startPoP() {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
    });
  }
}

/* file upload */
function file_upload() {
  var tmp = $(this).val();
  $(this).siblings('p').text(tmp);
  $(this).siblings('p').addClass('on');
}
$('.file_box > input').change(file_upload);

/* custom scrollbar */
function scrollSt() {
  var scrollst = $('.scrollSt');
  scrollst.mCustomScrollbar({
    theme: 'minimal',
  });
}

$(function () {
  $('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
  });
});

// faq
var qnaFun = {
  init: function () {
    this.q();
  },
  q: function () {
    var qna = $('.qna'),
      header = qna.find('.qna-header'),
      header_a = qna.find('.qna-header a'),
      body = qna.find('.qna-body'),
      faq_chk = '';
    body.hide();

    header.on('click', function (event) {
      event.preventDefault();

      if ($(this).hasClass('select') == true) {
        $(this).removeClass('select');
        $(this).next().stop().hide();
      } else {
        $(body).stop().hide();
        $(header).removeClass('select');
        $(this).next().stop().show();
        $(this).addClass('select');
      }
    });
  },
};

/* main banner */
var mainBanner1 = new Swiper('.main-banner .txt-slider', {
  slidesPerView: 1,
  speed: 700,
  autoplay: {
    delay: 3000,
  },
  //autoHeight: true,
  loop: false,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
});
var mainBanner2 = new Swiper('.main-banner .img-slider', {
  slidesPerView: 1,
  speed: 700,
  pagination: {
    el: '.img-slider .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  autoHeight: true,
  loop: false,
  thumbs: {
    swiper: mainBanner1,
  },
});

/* type b slider */
// var sliderB = new Swiper('.type-b-slider', {
//   slidesPerView: 1,
//   speed: 700,
//   loop: false,
//   autoplay: {
//     delay: 3000,
//   },
//   autoHeight: true,
//   pagination: {
//     el: '.type-b-slider .swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
// });

$('.type-b-slider').each(function (index, element) {
  var $this = $(this);
  $this.addClass('type-b-slider--' + index);

  var swiper = new Swiper('.type-b-slider--' + index, {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    pagination: {
      el: $('.type-b-slider--' + index).find('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
  });
});

$('.type-b-slider--video').each(function (index, element) {
  var $this = $(this);
  $this.addClass('type-b-slider--video--' + index);

  var swiper = new Swiper('.type-b-slider--video--' + index, {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoHeight: true,
    pagination: {
      el: $('.type-b-slider--video--' + index).find('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
  });
});

$('.type-c-slider').each(function (index, element) {
  var $this = $(this);
  $this.addClass('type-c-slider--' + index);

  var swiper = new Swiper('.type-c-slider--' + index, {
    slidesPerView: 1.2,
    speed: 700,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    //width: '990',
    // pagination: {
    //   el: '.main-banner .swiper-pagination',
    //   type: 'bullets',
    //   clickable: true,
    // },
    // navigation: {
    //   nextEl: '.main-banner .swiper-button--next',
    //   prevEl: '.main-banner .swiper-button--prev',
    // },
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
  });
});

$('.type-f-slider').each(function (index, element) {
  var $this = $(this);
  $this.addClass('type-f-slider--' + index);

  var swiper = new Swiper('.type-f-slider--' + index, {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    pagination: {
      el: $('.type-f-slider--' + index).find('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
  });
});

$('.type-f-slider--video').each(function (index, element) {
  var $this = $(this);
  $this.addClass('type-f-slider--video--' + index);

  var swiper = new Swiper('.type-f-slider--video--' + index, {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoHeight: true,
    pagination: {
      el: $('.type-f-slider--video--' + index).find('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
  });
});

/* product banner */
var productBanner1 = new Swiper('.product-banner .product-txt-slider', {
  slidesPerView: 1,
  speed: 700,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  //autoHeight: true,
  loop: false,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
});
var productBanner2 = new Swiper('.product-banner .product-img-slider', {
  slidesPerView: 1,
  speed: 700,
  pagination: {
    el: '.product-img-slider .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: false,
  thumbs: {
    swiper: productBanner1,
  },
});

// var prodBanner = new Swiper('.product-banner-slider', {
//   slidesPerView: 1,
//   speed: 700,
//   pagination: {
//     el: '.product-banner .swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.product-banner .swiper-button--next',
//     prevEl: '.product-banner .swiper-button--prev',
//   },
//   autoplay: {
//     delay: 3000,
//   },
//   autoHeight: true,
//   loop: true,
// });


var prodViewSlider = new Swiper('.product-view-img', {
  slidesPerView: 1,
  speed: 700,
  pagination: {
    el: '.product-view-img .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: false,
  // },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  //allowTouchMove:false,
  autoHeight: true,
  loop: true,
  //edgeSwipeThreshold: 100,
  //pauseOnMouseEnter: true,
});


/* product view img slider 
$('.product-view-img .slick').slick({
  //asNavFor: '.product-img .thumb-img',
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: true,
  swipe: true,
  autoplay: false,
  touchMove: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  speed: 1000,
  fade: true,
  dots: true,
  //fade: true,
});*/

// $('.product-img .thumb-img').slick({
//   asNavFor: '.product-view-img .slick',
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   dots: false,
//   arrow: true,
//   prevArrow: "<button type='button' class='slick-arrow slick-prev xi-angle-up'></button>",
//   nextArrow: "<button type='button' class='slick-arrow slick-next xi-angle-down'></button>",
//   focusOnSelect: true,
//   vertical: true,
//   verticalSwiping: true,
// });

var exhibitSlider = new Swiper('.product-exhibit__slider', {
  slidesPerView: 2.5,
  spaceBetween: 20,
  speed: 700,
  autoHeight: true,
  loop: false,
});

var otherProd1 = new Swiper('.other-product--color .swiper-container', {
  slidesPerView: 4,
  spaceBetween: 10,
  speed: 700,
  pagination: {
    el: '.other-product--color .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: true,
});

var otherProd2 = new Swiper('.other-product--coordi .swiper-container', {
  slidesPerView: 2.5,
  spaceBetween: 20,
  speed: 700,
  pagination: {
    el: '.other-product--coordi .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: true,
});

var otherProd3 = new Swiper('.other-product--related .swiper-container', {
  slidesPerView: 2.5,
  spaceBetween: 20,
  speed: 700,
  pagination: {
    el: '.other-product--related .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: false,
});

/* about - sketch-book */
var mainBanner = new Swiper('.sketch-book-slider', {
  slidesPerView: 1,
  speed: 700,
  pagination: {
    el: '.sketch-book .swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  autoHeight: true,
});

/* about timeline slider */
// $('.timeline-txt-slider .slick').slick({
//   asNavFor: '.timeline-img-slider .slick',
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: true,
//   fade: true,
//   prevArrow: '.pager .slick-button--prev',
//   nextArrow: '.pager .slick-button--next',
// });
// $('.timeline-img-slider .slick').slick({
//   asNavFor: '.timeline-txt-slider .slick',
//   //slidesToShow: 1.1,
//   slidesToScroll: 1,
//   dots: false,
//   arrow: false,
//   variableWidth: true,
// });
// var show = $('.timeline-txt-slider .slick-slide').length;
// $('.timeline-txt-slider .pager .total').text(show);
// $('.timeline-txt-slider .slick-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
//   var i = (currentSlide ? currentSlide : 0) + 1;
//   $('.timeline-txt-slider .pager .now').text(i);
// });

var timelineSlider1 = new Swiper('.timeline-img-slider .swiper-container', {
  slidesPerView: 1,
  speed: 700,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: true,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
});
var timelineSlider2 = new Swiper('.timeline-txt-slider .swiper-container', {
  slidesPerView: 1,
  speed: 700,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
  loop: true,
  thumbs: {
    swiper: timelineSlider1,
  },
  navigation: {
    nextEl: '.timeline-txt-slider .swiper-button--next',
    prevEl: '.timeline-txt-slider .swiper-button--prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

var show = $('.timeline-txt-slider .swiper-slide').not('.swiper-slide-duplicate').length;
$('.timeline-txt-slider .pager .total').text(show);

timelineSlider2.on('slideChangeTransitionEnd', function () {
  var i = timelineSlider2.realIndex + 1;
  $('.timeline-txt-slider .pager .now').text(i);
});

/* 제품 상세페이지 내 qna */
$('.qna-title')
  .not('.check-pw')
  .on('click', function () {
    $(this).next('.qna-content').stop().slideToggle(200);
  });

$(document).on('click', '.qna-write-btn', function () {
  $('.qna-write-bx').show();
  $('html, body').addClass('y-hidden');
});

$(document).on('click', '.qna-write-bx__close', function () {
  $('.qna-write-bx').hide();
  $('html, body').removeClass('y-hidden');
});

$('.qna-table__title')
  .not('.check-pw')
  .on('click', function () {
    $(this).next('.qna-table__content').stop().slideToggle(200);
  });

/* 본인인증 팝업 내 이용약관 보기 open/hide */
$('.terms-chk__head .icon').on('click', function () {
  $(this).parents('.terms-chk').find('.terms-chk__body').stop().slideToggle(300);
  $(this).toggleClass('active');
});

$('.terms-txt-open').on('click', function () {
  if ($(this).parents('.terms-tr').find('.terms-txt').css('display') == 'none') {
    $(this).text('닫기');
    $(this).parents('.terms-tr').find('.terms-txt').stop().slideDown(250);
  } else {
    $(this).text('보기');
    $(this).parents('.terms-tr').find('.terms-txt').stop().slideUp(250);
  }
});

$('.util__search').on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $('.header-search').hide();
  } else {
    $(this).addClass('active');
    $('.header-search').fadeIn(200);
  }
});

$(document).ready(function () {
  if ($('body').hasClass('mypage')) {
    var $mypNav = $('.mypage-nav-list');
    var navLeft = $mypNav.scrollLeft();
    var navLinkLeft = $('.mypage-nav-list a.on').offset().left; //on 된 항목 위치 찾기
    var navWidth = $('.mypage-nav-list'); //ul 사이즈 재기
    var totalWidth = 0;
    for (var i = 0; i < navWidth.length; i++) {
      totalWidth += navWidth[i].offsetWidth;
    }

    $mypNav.animate({ scrollLeft: navLinkLeft - 100 }, 1);

    $('.tab-scroll-btn').on('click', function () {
      $(this).siblings('.mypage-nav-list').animate({ scrollLeft: '1000px' }, 300);
    });
  }
});

$('.tab-scroll-btn').on('click', function () {
  $(this).parents('.tab-area').find('.tab').animate({ scrollLeft: '1000px' }, 300);
});

var ratings = {
  init: function () {
    this.active();
  },
  active: function () {
    var $ratings = $('.ratings').not('.readonly'),
      selectedIndex = undefined;

    $ratings.find('.star').on({
      // mouseover: function () {
      //   var $this = $(this),
      //     point = $(this).attr('data-value'),
      //     $txt = $(this).parent().siblings('.ratings__text');

      //   $ratings.find('.star').removeClass('on');
      //   $this.addClass('on').prevAll().addClass('on');
      // },
      // mouseleave: function () {
      //   $ratings.find('.star').removeClass('on');

      //   if (selectedIndex != undefined) {
      //     $ratings.find('.star').eq(selectedIndex).addClass('on').prevAll().addClass('on');
      //   }
      // },
      click: function () {
        var $this = $(this),
          $input = $('#ratings-score'),
          $txt = $(this).parents().find('.ratings__text');

        $this.siblings().removeClass('on');
        $this.addClass('on').prevAll().addClass('on');
        selectedIndex = $this.index();
        $input.val($this.attr('data-value'));

        if ($this.attr('data-value') == 1) {
          $txt.text('1점');
        } else if ($this.attr('data-value') == 2) {
          $txt.text('2점');
        } else if ($this.attr('data-value') == 3) {
          $txt.text('3점');
        } else if ($this.attr('data-value') == 4) {
          $txt.text('4점');
        } else if ($this.attr('data-value') == 5) {
          $txt.text('5점');
        }
      },
    });
  },
};

// top button
function goTop_scroll() {
  if ($(window).scrollTop() > 1) {
    $('.go-top').addClass('show');
  } else {
    $('.go-top').removeClass('show');
  }
}
$('.go-top').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 700);
});

$('.swiper-pagination').each(function () {
  if ($(this).children().length < 2) {
    $(this).hide();
  }
});
/*
$('.review-toggle-btn, .review-head__text').on('click', function(){
  $(this).parents('.review-list__item').toggleClass('active');
  // $(this).parents('.review-list__item').find('.review-toggle-btn').toggleClass('active');
  // $(this).parents('.review-list__item').children('.review-list__body').stop(false, true).slideToggle(0);
});
*/

// $('.like-counting').on('click', function(){
//   $(this).children('.like-counting__icon').toggleClass('on');
// });
