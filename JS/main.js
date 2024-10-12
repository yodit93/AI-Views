(function ($) {
  "use strict";

  // Page loading
  $(window).on("load", function () {
    $(".preloader").delay(450).fadeOut("slow");
  });

  // Mobile menu
  var mobileMenu = function () {
    var menu = $("ul#mobile-menu");
    if (menu.length) {
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: "+",
        openedSymbol: "-",
      });
    }
  };

  var SubMenu = function () {
    // $(".sub-menu").hide();
    $(".menu li.menu-item-has-children").on({
      mouseenter: function () {
        $(".sub-menu:first, .children:first", this)
          .stop(true, true)
          .slideDown("fast");
      },
      mouseleave: function () {
        $(".sub-menu:first, .children:first", this)
          .stop(true, true)
          .slideUp("fast");
      },
    });
  };

  var WidgetSubMenu = function () {
    //$(".sub-menu").hide();
    $(".menu li.menu-item-has-children").on("click", function () {
      var element = $(this);
      if (element.hasClass("open")) {
        element.removeClass("open");
        element.find("li").removeClass("open");
        element.find("ul").slideUp(200);
      } else {
        element.addClass("open");
        element.children("ul").slideDown(200);
        element.siblings("li").children("ul").slideUp(200);
        element.siblings("li").removeClass("open");
        element.siblings("li").find("li").removeClass("open");
        element.siblings("li").find("ul").slideUp(200);
      }
    });
  };

  // Slick slider
  var customSlickSlider = function () {
    // Slideshow Fade
    $(".slide-fade").slick({
      infinite: true,
      dots: false,
      arrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      fade: true,
      fadeSpeed: 1500,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="elegant-icon arrow_left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="elegant-icon arrow_right"></i></button>',
      appendArrows: ".arrow-cover",
    });

    // carausel 3 columns
    $(".carausel-3-columns").slick({
      dots: false,
      infinite: true,
      speed: 1000,
      arrows: false,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      loop: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // featured slider 2
    $(".featured-slider-2-items").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: ".featured-slider-2-nav",
    });
    $(".featured-slider-2-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      asNavFor: ".featured-slider-2-items",
      dots: false,
      arrows: false,
      focusOnSelect: true,
      verticalSwiping: true,
    });
    // featured slider 3
    $(".featured-slider-3-items").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      fade: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="elegant-icon arrow_left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="elegant-icon arrow_right"></i></button>',
      appendArrows: ".slider-3-arrow-cover",
    });
  };

  var typeWriter = function () {
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = !1;
    };
    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
      var that = this;
      var delta = 200 - Math.random() * 100;
      if (this.isDeleting) {
        delta /= 2;
      }
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = !0;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = !1;
        this.loopNum++;
        delta = 500;
      }
      setTimeout(function () {
        that.tick();
      }, delta);
    };
    window.onload = function () {
      var elements = document.getElementsByClassName("typewrite");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML =
        ".typewrite > .wrap { border-right: 0.05em solid #5869DA}";
      document.body.appendChild(css);
    };
  };

  // Nice Select
  var niceSelectBox = function () {
    var nice_Select = $("select");
    if (nice_Select.length) {
      nice_Select.niceSelect();
    }
  };

  //Header sticky
  var headerSticky = function () {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $(".header-sticky").removeClass("sticky-bar");
      } else {
        $(".header-sticky").addClass("sticky-bar");
      }
    });
  };

  //magnific Popup
  var magPopup = function () {
    if ($(".play-video").length) {
      $(".play-video").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }
  };

  var chatFloating = function () {
    $("#chat-btn").click(function () {
      $("#chat-float").toggleClass("chat-form-show");
    });

    $(".close-btn").click(function () {
      $("#chat-float").toggleClass("chat-form-show");
    });

    $(".next-btn").on("click", function () {
      const currentStep = $(this).closest(".form-step");
      const nextStep = currentStep.next(".form-step");

      if (nextStep.length) {
        currentStep.hide();
        nextStep.show();
      }
    });
  };

  var customSlider = function () {
    $(".logo-carousel").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1200,
      arrows: true,
      dots: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  };

  /* WOW active */
  new WOW().init();

  //Load functions
  $(document).ready(function () {
    magPopup();
    headerSticky();
    mobileMenu();
    typeWriter();
    customSlider();
    WidgetSubMenu();
    niceSelectBox();
    chatFloating();
  });
})(jQuery);
