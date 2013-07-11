$(function() {
  if($(window).width() <= 767) {
    // Mobile Site scroll screen to hide address bar
    setTimeout(function() {
      scrollTo(0, 1);
    }, 0);


    // Click Event to Close footer
    $('#close-footer').click(function() {
      mobileFooter.close();
    }); // end Close

    // Click event for login
    $('#mobile-login').click(function() {
      mobileFooter.open('Login', function() {
        $.ajax({
          type: 'GET',
          url: '/sidebar/combo_form',
          success: function(data) {
            $('#foot_container').html(data);
          }
        });
      });
    }); // end open


    // Click event for logout
     $('#mobile-logout').live('click', function() {
        var link = $(this);
        $(link).addClass('disabled');
        $.ajax({
          type: 'DELETE',
          url: '/users/sign_out.json',
            error: function(jqXHR) {
$(link).removeClass('disabled');
},
success: function(data) {
  mobileFooter.changeTitle('Logged out');
}
});
return false;
});
    // End Logout
    $('#combo-form').live('submit', function() {
      mobileFooter.close();
    });
  } // end if window size
});

var footTitle = 'Adopt-a-thing';

var foot_container = $('<div>', {
  id: 'foot_container',
  height: '100%'
});

var mobileFooter = {
  open: function(title, callback) {
    this.changeTitle(title);
    $(foot_container).appendTo('#mobile-foot');
    $('#mobile-foot').animate({
      height: '350px',
    }, 300, 'linear', function() {
      $('#mobile-foot-head-title').empty();
      $('#mobile-foot-head-title').html('Login');
      $(foot_container).appendTo('#mobile-foot');
      callback.call();
    });
  },
  close: function() {
    this.changeTitle(footTitle);
    $(foot_container).remove();
    $('#mobile-foot').animate({
      height: '22px',
    }, 300, 'linear', function() {
      $('#mobile-foot-head-title').empty();
      $('#mobile-foot-head-title').html('Adopt-a-Thing');
    });
  },
  changeTitle: function(title) {
    $('#mobile-foot-head-title').empty();
    $('#mobile-foot-head-title').html(title);
  }
} // end mobileFooter
