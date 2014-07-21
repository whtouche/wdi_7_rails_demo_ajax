$(document).ready(function(){

  var getArticles = function(){
    debugger;
    $.ajax({
      url: "http://localhost:3000/articles",
      type: "GET",
      dataType: 'json',
      success: articlesCallbackHandler
    });
    event.preventDefault();
  },
  // Callback/Handler that is invoked when the Ajax
  // request is done.
  articlesCallbackHandler = function(articles) {
    var articlesHTML = '';

    // Build the HTML for each Article
    for(var i = 0; i < articles.length; i++){
      articlesHTML += '<li id=article_' + articles[i].id + '>' + articles[i].title;
      articlesHTML += '<div>' + articles[i].body + '</div>';
      articlesHTML += '</li>';
    };

    // Clear the list of articles
    $('#articles').empty();
    // Fill in the Article list

    $('#articles').append(articlesHTML);
  };

  // Set up click handler for getting articles.
  $('#get-articles').on('click', getArticles);

  debugger;
  // Simulate a user click event.
   $('#get-articles').trigger('click');

}); // end ready
