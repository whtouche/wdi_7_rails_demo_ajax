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
  },
  articleHTML = function(article){
    var html = '<li id=article_' + article.id + '>';
    html += article.title;
    html += '<div>' + article.body + '</div>';
    html += '</li>';
    return html;
  },
  getArticle = function(article){
    // Add the article to the article list                                   
    $('#articles').append(articleHTML(article));
  },
  createArticleCallbackHandler = function(event){
    // New article form                                                      
    var $form = $(event.target),
    $title = $form.find("input[name='title']"),
    $body = $form.find("input[name='body']"),
    // Get the form action                                                   
    action = $form.attr('action'),
    requestObj = {article:  {title: $title.val(), body: $body.val()}};

    event.preventDefault();
      
    // Create and send a POST request                                        
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/articles', 
      data: requestObj,
      dataType: 'json'
    }).done(getArticle);

    // Clear the form
    $title.val("");
    $body.val("");    
  };

  // Set up click handler for getting articles.
  $('#get-articles').on('click', getArticles);

  // Set up click handler for form submit                                    
  $('#new-article').on('submit', createArticleCallbackHandler);

  // Simulate a user click event.
   $('#get-articles').trigger('click');

}); // end ready
