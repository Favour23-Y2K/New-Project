(function($) {
  // Wait until the window is fully loaded, then initialize the custom scrollbar
  $(window).on("load", function() {
    initScrollbar();
  });

  // Function to initialize the custom scrollbar using the mCustomScrollbar plugin
  function initScrollbar() {
    // Destroy any existing scrollbar instance and reinitialize it with minimal theme
    $("body").mCustomScrollbar("destroy").mCustomScrollbar({
      theme: "minimal"
    });
  }

  // SIDE NAV
  // Function to open the side navigation by translating its X position to 0
  function openNav() {
    $("#sidenav").css("transform", "translateX(0)");
    // Show the overlay when the side navigation is open
    $("#overlay").show();
  }

  // Function to close the side navigation by translating its X position to -100% (off-screen)
  function closeNav() {
    $("#sidenav").css("transform", "translateX(-100%)");
    // Hide the overlay when the side navigation is closed
    $("#overlay").hide();
  }

  // Close the side navigation if the user clicks outside of it
  $(document).on('click', function(event) {
    // If the click target is not the side navigation and does not have the 'openbtn' class, close the side nav
    if (!$("#sidenav").is(event.target) && !$(event.target).hasClass('openbtn')) {
      closeNav();
    }
  });

  // BOTTOM NAV
  $(document).ready(function() {
    // Function to initialize Masonry layout
    function initializeMasonry() {
      // Initialize Masonry on elements with class 'grid', set item selector, column width, and enable percent positioning
      var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
      // When images have loaded, trigger the Masonry layout again
      $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
      });
    }

    // Function to load a new page and reinitialize Masonry and the scrollbar
    function loadPage(page) {
      // Load the content of the page into the main element
      $('main').load(page, function() {
        // Reinitialize Masonry and custom scrollbar after the new content is loaded
        initializeMasonry();
        initScrollbar();
      });
    }

    // Get the last opened page from local storage, or default to 'home.html'
    var lastPage = localStorage.getItem('currentPage') || 'home.html';
    // Load the last opened page
    loadPage(lastPage);

    // Handle clicks on bottom navigation links
    $("#bottom-nav>ul>.page-item>a").on('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      var page = $(this).data('page'); // Get the page data from the clicked link
      localStorage.setItem('currentPage', page); // Save the selected page to local storage
      loadPage(page); // Load the selected page
    });

    // Limit the number of file uploads to a maximum of 4
    $('#imageupload').on('change', function() {
      if (this.files.length > 4) {
        alert('You can only upload a maximum of 4 files.'); // Alert the user
        $(this).val(''); // Clear the file input if the limit is exceeded
      }
    });
  });
})(jQuery);
