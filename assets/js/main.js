(function($) {
  $(window).on("load", function() {
    initScrollbar();
  });

  function initScrollbar() {
    $("body").mCustomScrollbar("destroy").mCustomScrollbar({
      theme: "minimal"
    });
  }

  // SIDE NAV
  function openNav() {
    $("#sidenav").css("transform", "translateX(0)");
    $("#overlay").show();
  }

  function closeNav() {
    $("#sidenav").css("transform", "translateX(-100%)");
    $("#overlay").hide();
  }

  $(document).on('click', function(event) {
    if (!$("#sidenav").is(event.target) && !$(event.target).hasClass('openbtn')) {
      closeNav();
    }
  });

  // BOTTOM NAV
  $(document).ready(function() {
    function initializeMasonry() {
      var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
      $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
      });
    }

    function loadPage(page) {
      $('main').load(page, function() {
        initializeMasonry();
        initScrollbar();
      });
    }

    var lastPage = localStorage.getItem('currentPage') || 'home.html';
    loadPage(lastPage);

    $("#bottom-nav>ul>.page-item>a").on('click', function(e) {
      e.preventDefault();
      var page = $(this).data('page');
      localStorage.setItem('currentPage', page);
      loadPage(page);
    });

    $('#imageupload').on('change', function() {
      if (this.files.length > 4) {
        alert('You can only upload a maximum of 4 files.');
        $(this).val('');
      }
    });
  });
})(jQuery);
