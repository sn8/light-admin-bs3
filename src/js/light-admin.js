$(function() {
  $('body').fadeIn(100);
  $('body').removeClass('hidden');

  /* Metis Menu */
  $('#side-menu').metisMenu();

  /* Sidebar */
  $('.toggle-sidebar').on('click', function() {
    toggleSidebar();
  });

  const current = location.pathname.match(/([a-zA-Z0-9\s_\\.\-\(\):])+.html$/i);
  $('#side-menu a').each(function() {
    if (current && $(this).attr('href').indexOf(current[0]) == 0) {
      const parent = $(this).parent();
      const subNav = parent.parent();
      parent.addClass('active');

      if (!subNav.is("#side-menu")) {
        if (window.innerWidth > 768) {
          subNav.collapse('show');
        }
        subNav.parent().addClass('active');
      }
    }
  });

  $('#side-menu > li > a').on('click', function() {
    if ($('body').hasClass('sidebar-collapsed')) {
      if ($(this).parent().has('ul.nav')) {
        toggleSidebar();
      }
    }
  });

  /* Topbar */
  $('.search-nav input').on({
    focusin: function() {
      if (window.innerWidth < 768) {
        $('.search-nav').css({'width': window.innerWidth - 100});
        $('.icons-nav').hide();
        $('.profile-nav').hide();
      }
    },
    focusout: function() {
      if (window.innerWidth < 768) {
        $('.search-nav').css({'width': 'auto'});
        $('.icons-nav').show();
        $('.profile-nav').show();
      }
    }
  });

  $('.toggle-filled-topbar').on('click', function() {
    $('#topbar').toggleClass('navbar-filled');
  });

  $('.toggle-white-header').on('click', function() {
    $('#topbar').toggleClass('navbar-white-header');
  });

  /* Resize */
  const chat = $('#chat');
  $(window).bind("load resize", function() {
    if (window.innerWidth < 768 && !$('body').hasClass('sidebar-collapsed')) {
      toggleSidebar();
    }

    const searchInput = $('.search-nav input');
    if (searchInput.is(":focus")) {
      searchInput.blur();
    }
  });

  /* OverlayScrollbars & Scroll-to-top button */
  if ($('body').hasClass('with-overlay-scrollbars')) {
    $('.overlay-scrollbar').overlayScrollbars({ });
    var bodyScrollbar = $('body').overlayScrollbars({
      callbacks: {
        onScroll: function () {
          if (this.scroll().y.position > 150) {
            $('.scroll-to-top').fadeIn(500);
          } else {
            $('.scroll-to-top').fadeOut(500);
          }
        }
      }
    }).overlayScrollbars();

    $('.scroll-to-top').on('touchstart mouseup', function (e) {
      bodyScrollbar.scroll({ y: 0 }, 500);
      e.preventDefault();
    });    
  } else {
    /* Scroll-to-top button without OverlayScrollbars */
    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
        $('.scroll-to-top').fadeIn(500);
      } else {
        $('.scroll-to-top').fadeOut(500);
      }
    });

    $('.scroll-to-top').on('touchstart mouseup', function (e) {
      $('body,html').animate({ scrollTop: 0 }, 500);
      e.preventDefault();
    });
  }

  /* Chat */
  const chatPanelBody = chat.find('.chat-panel-body').overlayScrollbars({ }).overlayScrollbars();
  chat.find('.contacts-list').overlayScrollbars({ }).overlayScrollbars();

  $('.toggle-chat').on('click', function() {
    chat.fadeToggle(300);
    chatPanelBody.scroll({ y: "100%" }, 0);
  });

  chat.find('.open-contact-list').on('click', function() {
    openContactsList();
  });

  chat.find('.contacts-list a').on('click', function() {
    if (window.innerWidth < 768) {
      openChatWindow();
    }
  });

  $(window).bind("resize", function() {
    const chatHidden = chat.find('.chat-window').hasClass('hidden');
    if (window.innerWidth > 768) {
      openChatWindow(true);
    } else if (window.innerWidth < 769 && !chatHidden) {
      chat.find('.contacts-list').hide();
    }
  });

  /* Non-closing dropdown */
  $('ul.non-closing-dropdown').on('click', function(e) {
    e.stopPropagation();
  });

  /* Modals fix */
  $('.modal-dialog').parent().on('show.bs.modal', function(e){
    $(e.relatedTarget.attributes['data-target'].value).appendTo('body');
  });

  /* Misc */
  $('.select-all-checkboxes').change(function() {
    const checkboxes = $(this).closest('table').find(':checkbox').not($(this));
    checkboxes.prop('checked', $(this).is(':checked'));
  });
});

/* Global Variables & Functions */
window.chartColors = {
  red: 'rgb(255, 98, 100)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(84, 192, 136)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var toggleSidebar = function () {
  $('body').toggleClass('sidebar-collapsed').promise().done(function() {
    if ($(this).hasClass('sidebar-collapsed')) {
      $('#side-menu li').children("ul").collapse("hide");
    }
  });
};

var openContactsList = function() {
  const chat = $('#chat');
  chat.find('.chat-window').addClass('hidden');
  chat.find('.contacts-list').show();
};

var openChatWindow = function(showAll = false) {
  const chat = $('#chat');
  if (!showAll) {
    chat.find('.contacts-list').hide();
  } else {
    chat.find('.contacts-list').show();
  }
  chat.find('.chat-window').removeClass('hidden');
};

var notify = function (options) {
  let defaultOptions = {
    icon: 'ti-info-alt',
    title: 'Lorem ipsum',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur recusandae a mollitia magni in.',
    type: 'info',
    placementFrom: 'top',
    placementAlign: 'right',
    animateEnter: 'animated fadeInDown',
    animateExit: 'animated fadeOutUp'
  };

  options = { ...defaultOptions, ...options };

  $.notify({
    icon: options.icon,
    title: options.title,
    message: options.message
  }, {
    type: options.type,
    placement: {
      from: options.placementFrom,
      align: options.placementAlign
    },
    animate: {
      enter: options.animateEnter,
      exit: options.animateExit
    },
    template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert">' +
    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
    '<div class="icon"><i data-notify="icon"></i></div>' +
    '<div class="message">' +
    '<div class="title" data-notify="title">{1}</div>' +
    '<span data-notify="message">{2}</span>' +
    '</div>' +
    '<div class="progress" data-notify="progressbar">' +
    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    '</div>' +
    '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>'
  });
};