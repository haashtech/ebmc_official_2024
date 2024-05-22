(function ($) {
  $(document).ready(function () {
    // counter area
    const ucounter = $('.counter');

    if (ucounter.length > 0) {
      ucounter.countUp();
    }

    if ($("#header").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
          $(".header-area").removeClass("sticky");
        } else {
          $(".header-area").addClass("sticky");
        }
      });
    }

    // SIGNATURE PROGRESS
    function moveProgressBar() {
      console.log("moveProgressBar");
      var progressWrap = $('.progress-wrap3');
      if (progressWrap.length > 0) {
        var getPercent = progressWrap.data('progress-percent') / 100;
        var getProgressWrapWidth = progressWrap.width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;

        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar3').stop().animate({
          left: progressTotal
        }, animationLength);
      }
    }

    // Owl Carousel initialization for various sections
    $('.testimonial-carousel-area, .testomonial2-carousel-area1, .testomonial2-carousel-area, .cta4-carousel, .testimonials9-carousel-area, .testimonials11-owl-carousel, .testimonial5-section5-area, .testimonial10-owlcarousel, .testimonial7-carousel-area, .testimonial8-carousel-area').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      items: 5,
      smartSpeed: 5000,
      autoplay: true,
      autoplayTimeout: 1500,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        }
      }
    });

    // page-progress
    var progressPath = document.querySelector(".progress-wrap path");
    if (progressPath) {
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition = "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).scroll(updateProgress);

      var offset = 50;
      var duration = 550;

      $(window).on("scroll", function () {
        if ($(this).scrollTop() > offset) {
          $(".progress-wrap").addClass("active-progress");
        } else {
          $(".progress-wrap").removeClass("active-progress");
        }
      });

      $(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, duration);
        return false;
      });
    }

    // aos
    AOS.init();
  });

  // progress bar
  $('#progressbar1').LineProgressbar();

  // progress bar
  $('#progressbar2').LineProgressbar();
})(jQuery);
