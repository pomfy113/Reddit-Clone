$(document).ready(function() {

  $('.vote-up').submit(function (e) {
    e.preventDefault();
    var postId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: postId + '/vote-up',
      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
    $('#post-score').load(location.href + " #post-score");
  });

  $('.vote-down').submit(function (e) {
    e.preventDefault();
    var postId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: postId + '/vote-down',
      success: function(data) {
        console.log("voted down!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
    $('#post-score').load(location.href + " #post-score");
  });

});
