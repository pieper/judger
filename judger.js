$(document).ready(function(){
  starJudger.create('.starJudger');
  thumbJudger.create('.thumbJudger');

  // TODO: improve validation test
  $('.ffactor').keyup(function() {
    this.value = this.value.replace(/[^-0-3]/g,'');
    this.value = this.value.replace(/[^-0-3]*/g,'');
    this.value = this.value.replace(/[^0-3]-*/g,'');
  });
});

// The thumb widget
//  - based on the starJudger
var thumbJudger = {
  create: function(selector) {
    // loop over every element matching the selector
    $(selector).each(function() {
      var $list = $('<div></div>');
      // loop over every text input in each container
      $(this)
        .find('input:text')
        .each(function() {
          var $rating = $(this).attr('value');
          var $item = $('<a href="#" class="thumbDown"></a>')
          thumbJudger.addHandlers($item);
          $list.append($item);
          var $item = $('<a class="thumbRating"></a>').text($rating);
          $list.append($item);
          $item = $('<a href="#" class="thumbUp"></a>')
          thumbJudger.addHandlers($item);
          $list.append($item);
        });
        // Hide the original entry
        $(this).append($list).find('label').hide();
    });
  },
  addHandlers: function(item) {
    $(item).click(function(e) {
      // Handle thumb click
      var $vote = $(this);
      var $widget = $(this).parent();
      
      // Set the entry value
      var $message = ""
      var $val = parseInt($('.thumbRating').text());
      if ( $(this).hasClass('thumbUp') ) {
        $val = $val + 1;
        $message = "Yay!";
        if ( $val > 3 ) { 
          $val = 3 
          $message = "";
        }
      }
      if ( $(this).hasClass('thumbDown') ) {
        $val = $val - 1;
        $message = "Boo!";
        if ( $val < -3 ) {
          $val = -3 
          $message = "";
        }
      }
      $('.thumbRating').text($val);
        
      // add the 1up effect
      var $oneUpText = '<span>'+$message+'</span>';
      $($oneUpText)
        .addClass('judger1up')
        .insertAfter('.thumbJudgerCurrentRating');
      doOneUp('.judger1up');
      $('.thumbJudgerCurrentRating').text($message);

      // prevent default link click
      e.preventDefault();
          
    }).hover(function() {
      // Handle vote mouse over
      $(this).prevAll().andSelf().addClass('rating-over');
    }, function() {
      // Handle vote mouse out
      $(this).siblings().andSelf().removeClass('rating-over')
    });    
  }
  
}

// The star widget
//  - based on the example from jQuery: Novice to Ninja
var starJudger = {
  create: function(selector) {
    // loop over every element matching the selector
    $(selector).each(function() {
      var $list = $('<div></div>');
      // loop over every radio button in each container
      $(this)
        .find('input:radio')
        .each(function(i) {
          var rating = $(this).parent().text();
          var $item = $('<a href="#"></a>')
            .attr('title', rating)
            .addClass(i % 2 == 1 ? 'rating-right' : '')
            .text(rating);
          
          starJudger.addHandlers($item);
          $list.append($item);
          
          if($(this).is(':checked')) {
            $item.prevAll().andSelf().addClass('rating');
          }
        });
        // Hide the original radio buttons
        $(this).append($list).find('label').hide();
    });
  },
  addHandlers: function(item) {
    $(item).click(function(e) {
      // Handle judge click
      var $vote = $(this);
      var $allLinks = $(this).parent();
      
      // Set the radio button value
      $allLinks
        .parent()
        .find('input:radio[value=' + $vote.text() + ']')
        .attr('checked', true);
        
      // add the 1up effect
      var $oneUpText = '<span>'+$vote.text()+'</span>';
      $($oneUpText)
        .addClass('judger1up')
        .insertAfter('.starJudgerCurrentRating');
      doOneUp('.judger1up');
      $('.starJudgerCurrentRating').text($vote.text());

      // Set the ratings
      $allLinks.children().removeClass('rating');
      $vote.prevAll().andSelf().addClass('rating');
      
      // prevent default link click
      e.preventDefault();
          
    }).hover(function() {
      // Handle vote mouse over
      $(this).prevAll().andSelf().addClass('rating-over');
    }, function() {
      // Handle vote mouse out
      $(this).siblings().andSelf().removeClass('rating-over')
    });    
  }
  
}

function doOneUp(which) {
  $(which)
    .show()
    .animate({
      top: "-=50px",
      opacity: "toggle",
    }, 1000, function() {
      $(this).remove();
    });
}
