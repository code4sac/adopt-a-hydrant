$(function() {
  if($(window).width() <= 767) {
    // Mobile Site scroll screen to hide address bar
    setTimeout(function() {
      scrollTo(0, 1);
    }, 0);



    function mobilePage(){

      // mobile page events and dom data for sidebar
      // hides unnecessary form inputs from full size sidebar
      // and shows it in #mobile-page div to simulate seperate pages
      
      var page = $('#mobile-page'),
          formWrapper = $('.form-wrapper'),
          pageHeader = page.find('h4'),
          events;

      // click events for mobile nav

      events = {
        signIn: function(){
          $.ajax({
            type: 'GET',
            url: '/sidebar/combo_form',
            success: function(data) {
              formWrapper.html(data);
              page.show()
              $('#combo-form').data({'state': 'user_sign_in', 'mobile': true});
              $('#user_sign_in_fields').show()
              $('#user_forgot_password_fields').hide()
              $('#user_sign_up_fields').hide()
              pageHeader.text('Sign In')
            } 
          });
        },
        signUp: function(){
          $.ajax({
            type: 'GET',
            url: '/sidebar/combo_form',
            success: function(data) {
              formWrapper.html(data);
              page.show()
              $('#combo-form').data({'state': 'user_sign_in', 'mobile': true});
              $('#user_sign_in_fields').hide()
              $('#user_forgot_password_fields').hide()
              $('#user_sign_up_fields').show()
              pageHeader.text('Sign Up') 
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
            url: '/users/edit',
            error: function (jqXHR) {
              $(link).removeClass('disabled');
            },
            success: function (data) {
              formWrapper.html(data);
              page.show()
              pageHeader.text('Edit Profile')
            }
          });
        },
        hidePage: function(){
          page.hide()
        },
        showPage: function(){
          page.show()
        }
      }

      return events;

    }

    function mobileNavBar(){

      // mobile navigation show/hide events

      var nav = $('#mobile-nav'),
          navButton = $('#nav-button'),
          map = $('.map-container'),
          screenWidth = $(document).width(),
          animationSpeed = 100,
          navSpeed,
          pageSpeed,
          navWidth,
          events;

      // sets amount to animate nav based on screen size

      if (screenWidth < 767 && screenWidth > 480)
      navWidth = '50%';
      else if (screenWidth <= 480)
      navWidth = screenWidth - 50;
      
      nav.css('width', navWidth)

      events = {
        showNav: function(){
          navButton.addClass('nav-active')
          $('body').css('overflow-x','hidden')
          $('.selected-nav-item').removeClass('selected-nav-item')
          // $('.map-container, #mobile-head, #mobile-page, #mobile-notification').animate({'left': navWidth }, 240, 'easeOutExpo')
          $('.map-container, #mobile-head, #mobile-page, #mobile-notification').animate({'left': navWidth }, {
            duration: 240, 
            easing: 'easeOutExpo',
            progress: function(){
              nav.css('left', (map.offset().left - nav.width() - 1))
            },
          })

          $('#mobile-head').css('border-top-left-radius','6px')
        },
        hideNav: function(){
          navButton.removeClass('nav-active')
          
          $('.map-container, #mobile-head, #mobile-page, #mobile-notification').animate({'left': '0' }, {
            duration: 320, 
            easing: 'easeInOutCirc',
            progress: function(){
              nav.css('left', (map.position().left - nav.width() - 1))
            },
            complete: function(){
              //nav.css('left', nav.width()*-1)
              $('#mobile-head').css('border-top-left-radius','0px')
              $('body').css('overflow-x','auto')
            }
          })
          
          
        },
      }

      return events;
    }

    // initialize mobile page and mobile navigation events

    var mobilePage = mobilePage();
    var mobileNavBar = mobileNavBar();

    // show/hide mobile navigation

    $('#nav-button').click(function(){
        var nav = $('#mobile-nav'),
            navButton = $('#nav-button'),
            map = $('.map-container');

        if (navButton.hasClass('nav-active') == false){
          mobileNavBar.showNav()
          map.on('click',  mobileNavBar.hideNav )
        } else if (navButton.hasClass('nav-active') == true) {
          mobileNavBar.hideNav()
          map.off('click')
        }

    });

    // flash notifications

    $(document).on('flash', function(){
      $('.alert').addClass('mobile-flash').appendTo($('body'))
      
      setTimeout(function(){
        $('.alert').slideUp(75).fadeOut()
        $('body').trigger('click.alert.data-api')
      }, 3500)
    })

    // mobile navigation on click events

    $('#mobile-nav').on('click', '.sign-up', function(){
        mobilePage.signUp()
        mobileNavBar.hideNav()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '.sign-in', function(){
        mobilePage.signIn()
        mobileNavBar.hideNav()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-page').on('click', '#user_forgot_password_link', function(){
        mobilePage.forgotPass()
    })

    $('#mobile-nav').on('click', '#sign_out_link', function(){
        // also triggers original event in main.js.erb
        mobileNavBar.hideNav()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '#edit_profile_link', function(){
        // also triggers original event in main.js.erb
        mobileNavBar.hideNav()
        mobilePage.editProfile()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '.find-hydrants', function(){
        mobileNavBar.hideNav()
        mobilePage.hidePage()
        $(this).addClass('selected-nav-item')
    })

    // Click Event to Close footer
    $('#close-footer').click(function() {
      mobileFooter.close();
    }); // end Close

//     // Click event for login
//     $('#mobile-login').click(function() {
//       mobileFooter.open('Login', function() {
//         $.ajax({
//           type: 'GET',
//           url: '/sidebar/combo_form',
//           success: function(data) {
//             $('#foot_container').html(data);
//             mobilePage.signIn()
//           }
//         });
//       });
//     }); // end open


//       // Click event for logout
//     $('#mobile-logout').live('click', function() {
//       var link = $(this);
//       $(link).addClass('disabled');
//       $.ajax({
//         type: 'DELETE',
//         url: '/users/sign_out.json',
//           error: function(jqXHR) {
//             $(link).removeClass('disabled');
//           },
//           success: function(data) {
//             mobileFooter.changeTitle('Logged out');
//           }
//       });
      
//       return false;
//     });

//     // End Logout
//     $('#combo-form').live('submit', function() {
//       mobileFooter.close();
//     });
  } // end if window size

});

// var footTitle = 'Adopt-a-thing';

// var foot_container = $('<div>', {
//   id: 'foot_container',
//   height: '100%'
// });

// var mobileFooter = {
//   open: function(title, callback) {
//     this.changeTitle(title);
//     $(foot_container).appendTo('#mobile-foot');
//     $('#mobile-foot').animate({
//       height: '350px',
//     }, 300, 'linear', function() {
//       $('#mobile-foot-head-title').empty();
//       $('#mobile-foot-head-title').html('Login');
//       $(foot_container).appendTo('#mobile-foot');
//       callback.call();
//     });
//   },
//   close: function() {
//     this.changeTitle(footTitle);
//     $(foot_container).remove();
//     $('#mobile-foot').animate({
//       height: '22px',
//     }, 300, 'linear', function() {
//       $('#mobile-foot-head-title').empty();
//       $('#mobile-foot-head-title').html('Adopt-a-Thing');
//     });
//   },
//   changeTitle: function(title) {
//     $('#mobile-foot-head-title').empty();
//     $('#mobile-foot-head-title').html(title);
//   }
// } // end mobileFooter
