 // SIDE NAV
 function openNav() {
    document.getElementById("sidenav").style.transform = "translateX(0)";
    document.getElementById("overlay").style.display = "block";
  }

  function closeNav() {
    document.getElementById("sidenav").style.transform = "translateX(-100%)";
    document.getElementById("overlay").style.display = "none";
  }

  document.addEventListener('click', function(event) {
    var sidenav = document.getElementById('sidenav');
    var overlay = document.getElementById('overlay');
    if (!sidenav.contains(event.target) && !event.target.matches('.openbtn')) {
      closeNav();
    }
  });

  // BOTTOM NAV
  
  $(document).ready(function() {

    // Load the last visited page from localStorage, or default to 'home.html'
    var lastPage = localStorage.getItem('currentPage') || 'home.html';
    $('main').load(lastPage);

    // Handle click events on nav links
    $("#bottom-nav>ul>.page-item>a").click(function(e) {
      e.preventDefault(); // Prevent default link behavior
    
      // Get the page to load from the data-page attribute
      var page = $(this).data('page');
    
      // Save the current page to localStorage
      localStorage.setItem('currentPage', page);
    
      // Load the content into the main element
      $('main').load(page);
    });

    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });

    $grid.imagesLoaded().progress(function() {
      $grid.masonry('layout');
    });
  });