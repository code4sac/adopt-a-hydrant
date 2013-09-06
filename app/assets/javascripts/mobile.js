$(function() {
  if($(window).width() <= 767) {
    // Mobile Site scroll screen to hide address bar
    setTimeout(function() {
      scrollTo(0, 1);
    }, 0);

    function mobilePage(){

      // mobile page events and ajax calls
      
      var page = $('#page-contents'),
          formWrapper = $('.content-wrapper'),
          pageHeader = page.find('h4'),
          mobilePage = $('#mobile-page'),
          mapContainer = $('.map-container'),
          events;

      events = {
        signIn: function(){
          events.hideNav();
          $.ajax({
            type: 'GET',
            url: '/mobile/sign_in',
            success: function(data) {
              page.show().html(data);
              $('#combo-form').data({'state': 'user_sign_in', 'mobile': true});
            } 
          });  
        },
        signUp: function(){
          events.hideNav();
          $.ajax({
            type: 'GET',
            url: '/mobile/sign_up',
            success: function(data) {
              page.show().html(data);
              $('#combo-form').data({'state': 'user_sign_in', 'mobile': true});
            } 
          });
        },
        forgotPass: function(){
          $('#combo-form').data({'state': 'user_forgot_password', 'mobile': true});
          $('#user_sign_in_fields').show().slideUp();
          
          $('#user_forgot_password_fields').slideDown(function () {    
            $('#user_remembered_password_link').click(function () {
                $('#combo-form').data('state', 'user_sign_in');
                $('#user_forgot_password_fields').slideUp();
                $('#user_sign_in_fields').slideDown(function(){});
            });
          });
        },
        editProfile: function(){
          $.ajax({
            type: 'GET',
            url: '/mobile/edit_profile',
            success: function (data) {
              page.show().html(data)
              // $('.form-wrapper').html(data);
              // page.find('h4').text('Edit Profile')
            }
          });
        },
        about: function(){
          events.hideNav();
          $.ajax({
            type: 'GET',
            url: '/mobile/page',
            success: function (data) {
              page.show().html(data)
            }
          });
        },
        hideNav: function(){
          $('.map-container, #mobile-page').removeClass('slide');
        },
        hidePage: function(){
          $('#page-contents').hide();
        }
      }

      return events;

    }

    function mobileNavBar(){

      // mobile navigation show/hide events

      var nav = $('#mobile-nav'),
          map = $('.map-container'),
          page = $('.map-container, #mobile-page'),
          events;

      events = {
        showNav: function(){
            nav.addClass('slide-nav')
            page.addClass('slide')   
        },
        hideNav: function(){
            nav.removeClass('slide-nav')
            page.removeClass('slide')
            map.css('z-index','-1') 
        },
      }

      return events;
    }

    // initialize mobile page and mobile navigation events

    var mobilePage = mobilePage();
    var mobileNavBar = mobileNavBar();

    // show/hide mobile navigation

    $('#nav-button').click(function(){
        var map = $('.map-container'),
            page = $('#page-contents');

        if (map.hasClass('slide') == false){
          mobileNavBar.showNav();
          map.on('click',  mobileNavBar.hideNav );
          page.on('click',  mobileNavBar.hideNav );
        } else if (map.hasClass('slide') == true) {
          mobileNavBar.hideNav()
          map.off('click')
          page.off('click')
        }
        
    });

    // flash notifications

    $(document).on('flash', function(){
      $('.alert').addClass('mobile-flash').appendTo($('body'))
      
      setTimeout(function(){
        $('.alert').slideUp(75).fadeOut();
        $('body').trigger('click.alert.data-api');
      }, 3500)
    })

    // mobile navigation on click events

    $('#mobile-nav').on('click', '.sign-up', function(){
        mobilePage.signUp()
        mobileNavBar.hideNav()
    })

    $('#mobile-nav').on('click', '.sign-in', function(){
        mobilePage.signIn()
        mobileNavBar.hideNav()
    })

    $('#mobile-page').on('click', '#user_forgot_password_link', function(){
        mobilePage.forgotPass()
    })

    $('#mobile-nav').on('click', '#sign_out_link', function(){
        // also triggers original event in main.js.erb
        mobileNavBar.hideNav()
    })

    $('#mobile-nav').on('click', '.edit-profile', function(){
        // also triggers original event in main.js.erb
        mobileNavBar.hideNav()
        mobilePage.editProfile()
    })

    $(document).on('click', '.find-hydrants', function(){
        mobilePage.hidePage()
        mobileNavBar.hideNav()
        $('.map-container').css('z-index','1')
    })

    $('#mobile-nav').on('click', '.about', function(){
        mobileNavBar.hideNav()
        mobilePage.about()
    })

  } // end if window size

});


