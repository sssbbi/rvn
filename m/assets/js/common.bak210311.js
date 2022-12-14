(function ($) {
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

    nav_front.init();
    headerScroll_front();
    startPoP();
    filter_front.init();
    qnaFun.init(); //qna
    //scrollSt();
  });

  $(document).on('mouseover', function () {
    magnificPop.init();
  });

  $(window).on('scroll', function () {
    headerScroll_front();
  });

  /* nav */
  var nav_front = {
    init: function () {
      this.pcAction();
    },
    pcAction: function () {
      var navdp1 = $('.header .nav .depth-1'),
        navdp1link = $('.header .nav .depth-1 > .link'),
        navdp2bx = $('.header .nav .nav-list--depth2');
      //navBg = $('.header .nav-bg')
      // navdp2Height = navdp2bx.height(),
      // maxHeight = 0;

      // navdp2bx.each(function () {
      //   if ($(this).outerHeight() > 0) {
      //     maxHeight = $(this).outerHeight();
      //   }
      // });
      // navBg.height(maxHeight);
      // navdp2bx.height(maxHeight);

      // navBg.css('height', navdp2Height);
      // console.log(navdp2Height);

      navdp1.on('mouseenter', function () {
        navdp1link.removeClass('active');
        $(this).children('a').addClass('active');
        navdp2bx.hide();
        if ($(this).children('ul').length > 0) {
          //navBg.show();
          $(this).children('ul').css('display', 'flex');
        }
      });

      navdp1.on('mouseleave', function () {
        navdp1link.removeClass('active');
        //navBg.hide();
        navdp2bx.hide();
      });
    },
  };

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
      });

      filterCloseBtn.on('click', function () {
        filterBtn.removeClass('on');
        filterPop.hide();
      });

      filterApplyBtn.on('click', function () {
        filterBtn.removeClass('on');
        filterPop.hide();
      });

      filterlistDp1.on('mouseenter', function () {
        filterlistDp2.css('display', 'none');
        $(this).next('ul').css('display', 'flex');
      });
    },
  };

  /* popup */
  var magnificPop = {
    init: function () {
      this.pop_01(); //ajax ??????
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

  /* header scroll */
  function headerScroll_front() {
    if ($(window).scrollTop() > 1) {
      $('.header').addClass('fix');
    } else {
      $('.header').removeClass('fix');
    }
  }

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

  /*????????????*/
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
  var mainBanner = new Swiper('.main-banner-slider', {
    slidesPerView: 1,
    speed: 700,
    pagination: {
      el: '.main-banner .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.main-banner .swiper-button--next',
      prevEl: '.main-banner .swiper-button--prev',
    },
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    loop: false,
  });

  /* type b slider */
  var sliderB = new Swiper('.type-b-slider', {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
  });
  var sliderB = new Swiper('.type-b-slider--video', {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoHeight: true,
    pagination: {
      el: '.type-b-slider--video .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    // navigation: {
    //   nextEl: '.type-f-slider--video .swiper-button--next',
    //   prevEl: '.type-f-slider--video .swiper-button--prev',
    // },
  });

  /* type c slider */
  var sliderC = new Swiper('.type-c-slider', {
    slidesPerView: 1.9,
    speed: 700,
    centeredSlides: true,
    spaceBetween: 30,
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

  /* type f slider */
  var sliderF = new Swiper('.type-f-slider', {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
  });
  var sliderF = new Swiper('.type-f-slider--video', {
    slidesPerView: 1,
    speed: 700,
    loop: false,
    autoHeight: true,
    pagination: {
      el: '.type-f-slider--video .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    // navigation: {
    //   nextEl: '.type-f-slider--video .swiper-button--next',
    //   prevEl: '.type-f-slider--video .swiper-button--prev',
    // },
  });

  /* product banner */
  var prodBanner = new Swiper('.product-banner-slider', {
    slidesPerView: 1,
    speed: 700,
    pagination: {
      el: '.product-banner .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.product-banner .swiper-button--next',
      prevEl: '.product-banner .swiper-button--prev',
    },
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
    loop: true,
  });

  /* product view img slider */
  $('.product-img .img').slick({
    asNavFor: '.product-img .thumb-img',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  });
  $('.product-img .thumb-img').slick({
    asNavFor: '.product-img .img',
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrow: true,
    prevArrow: "<button type='button' class='slick-arrow slick-prev xi-angle-up'></button>",
    nextArrow: "<button type='button' class='slick-arrow slick-next xi-angle-down'></button>",
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
  });

  $('.other-product--color .slick').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    appendDots: '.other-product--color',
    arrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  $('.other-product--coordi .slick').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    appendDots: '.other-product--coordi',
    arrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  $('.other-product--related .slick').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    appendDots: '.other-product--related',
    arrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
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
    navigation: {
      nextEl: '.sketch-book .swiper-button--next',
      prevEl: '.sketch-book .swiper-button--prev',
    },
    autoplay: {
      delay: 3000,
    },
    autoHeight: true,
  });

  /* about timeline slider */
  $('.timeline-txt-slider .slick').slick({
    asNavFor: '.timeline-img-slider .slick',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    prevArrow: '.pager .slick-button--prev',
    nextArrow: '.pager .slick-button--next',
    //infinite: false,
  });
  $('.timeline-img-slider .slick').slick({
    asNavFor: '.timeline-txt-slider .slick',
    //slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: false,
    arrow: false,
    variableWidth: true,
    //infinite: false,
  });
  var show = $('.timeline-txt-slider .slick-slide').length;
  $('.timeline-txt-slider .pager .total').text(show);
  $('.timeline-txt-slider .slick-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.timeline-txt-slider .pager .now').text(i);
  });

  // top button
  $('.go-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 700);
  });

  /* ?????? ??????????????? ??? qna */
  $('.qna-title')
    .not('.check-pw')
    .on('click', function () {
      $(this).next('.qna-content').stop().slideToggle(200);
    });

  $(document).on('click', '.qna-write-btn', function () {
    if ($('.qna-write-bx').css('display') == 'none') {
      $(this).text('????????????');
      $('.qna-write-bx').show();
    } else {
      $(this).text('??????');
      $('.qna-write-bx').hide();
    }
  });

  /* ???????????? ?????? ??? ???????????? ?????? open/hide */
  $('.terms-chk__head .icon').on('click', function () {
    $(this).parents('.terms-chk').find('.terms-chk__body').stop().slideToggle(300);
    $(this).toggleClass('active');
  });

  $('.terms-txt-open').on('click', function () {
    if ($(this).parents('.terms-tr').find('.terms-txt').css('display') == 'none') {
      $(this).text('??????');
      $(this).parents('.terms-tr').find('.terms-txt').stop().slideDown(250);
    } else {
      $(this).text('??????');
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

  /* header search */
})(jQuery);
