$(function() {
  if($(window).width() <= 767) {
    // Mobile Site scroll screen to hide address bar
    setTimeout(function() {
      scrollTo(0, 1);
    }, 0);

    function mobilePage(){
      
      var sidebar = $('#sidebar'),
          signIn = $('#user_sign_in_fields'),
          signUp = $('#user_sign_up_fields'),
          forgotPass = $('#user_forgot_password_fields'),
          comboForm = $('#combo-form'),
          nav = $('#mobile-nav'),
          page = $('#mobile-page'),
          pageHeader = page.find('h4'),
          events;

      page.append( sidebar );
      comboForm.data({'mobile': true});

      page.hide()

      events = {
        signIn: function(){
          pageHeader.text('Sign In')
          page.show()
          comboForm.data({'state': 'user_sign_in', 'mobile': true});
          forgotPass.hide()
          signUp.hide()
          signIn.show()
        },
        signUp: function(){
          pageHeader.text('Sign Up')
          page.show()
          comboForm.data({'state': 'user_sign_up', 'mobile': true});
          forgotPass.hide()
          signIn.hide()
          signUp.show()
        },
        forgotPass: function(){
          comboForm.data({'state': 'user_forgot_password', 'mobile': true});
          signIn.slideUp();
          
          forgotPass.slideDown(function () {    
            $('#user_remembered_password_link').click(function () {
                comboForm.data('state', 'user_sign_in');
                forgotPass.slideUp();
                signIn.slideDown(function(){});
            });
          });
        },
        editProfile: function(){
          pageHeader.text('Edit Profile')
          page.show()
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
      var nav = $('#mobile-nav'),
          navButton = $('#nav-button'),
          map = $('.map-container'),
          screenWidth = $(document).width(),
          navWidth,
          events;

      if (screenWidth < 767 && screenWidth > 480)
      navWidth = '50%';
      else if (screenWidth < 480)
      navWidth = '90%';

      events = {
        showNav: function(){
          navButton.addClass('nav-active')
          nav.delay(10).css('width', navWidth).animate({'left':'0'}, 100, 'linear')
          $('body').css('overflow','hidden')
          $('.selected-nav-item').removeClass('selected-nav-item')
          $('.map-container, #mobile-head, #mobile-page, #mobile-notification').animate({'left': navWidth }, 100, 'linear')
          $('#mobile-head').css('border-top-left-radius','6px')
        },
        hideNav: function(){
          navButton.removeClass('nav-active')
          nav.delay(10).animate({'left':'-100%'}, 150, 'linear')
          $('.map-container, #mobile-head, #mobile-page, #mobile-notification').animate({'left':'0%'}, 150, 'linear')
          $('#mobile-head').css('border-top-left-radius','0px')
          $('body').css('overflow','auto')
          
        },
      }

      return events;
    }

    var mobilePage = mobilePage();
    var mobileNavBar = mobileNavBar();

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

    $(document).on('flash', function(){
      $('.alert').addClass('mobile-flash').appendTo($('body'))
      
      setTimeout(function(){
        $('.alert').slideUp(75).fadeOut()
        $('body').trigger('click.alert.data-api')
      }, 3500)
    })


    $('#mobile-nav').on('click', '.sign-up', function(e){
        mobilePage.signUp()
        mobileNavBar.hideNav()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '.sign-in', function(e){
        mobilePage.signIn()
        mobileNavBar.hideNav()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '#sign_out_link', function(e){
        mobileNavBar.hideNav()
        $('#combo-form').data('mobile', true)
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '#edit_profile_link', function(e){
        mobileNavBar.hideNav()
        mobilePage.editProfile()
        $(this).addClass('selected-nav-item')
    })

    $('#mobile-nav').on('click', '.find-hydrants', function(e){
        mobileNavBar.hideNav()
        mobilePage.hidePage()
        $(this).addClass('selected-nav-item')
    })

//     // Click Event to Close footer
//     $('#close-footer').click(function() {
//       mobileFooter.close();
//     }); // end Close

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
