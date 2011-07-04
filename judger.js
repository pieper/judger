$(document).ready(function(){
 judger.create('.starJudger');
});

// The widget
var judger = {
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
          
          judger.addHandlers($item);
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
        .addClass('voting')
        .insertAfter('.starJudgerCurrentRating');
      doOneUp('.voting');
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
