$(document).ready(function() {
  $("#getQuote").on("click", function(){
    $.ajax({
            url: "http://api.forismatic.com/api/1.0/",
            data: {method: "getQuote",format: "jsonp",lang: "en",jsonp: "getNewQuote"},
            dataType: "jsonp",
            jsonpCallback: "getNewQuote"
    });
    var btn = $(this);
    btn.prop('disabled',true);
    window.setTimeout(function(){ 
        btn.prop('disabled', false);
    }, 500);
    /*Picking an entirely random color that is not "too bright"
    so we can still easily read the quote without the white
    background becoming annoying*/
    var color = "rgb(" + Math.floor(Math.random() * 206) + "," +
                Math.floor(Math.random() * 206) + "," +
                Math.floor(Math.random() * 206) + ")";
    $("body").css('background', color);
    $("#getQuote").css('background', color);
    $("blockquote").css('color', color);
  });
  $("#tweeter").on("click", function(){
    var quote = document.getElementById("quote").innerHTML;
    var source = document.getElementById("source").innerHTML;
    var tweet = document.getElementById("tweeter");
    tweet.href = "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
                  quote + " " + source;
  });
});
function getNewQuote(responce){
  $("blockquote p").animate({
    opacity: 0
  }, 500, function() {
    $(this).animate({
      opacity: 1
    }, 500);
    /*We trim the responce.quoteText because sometimes the quote
    would end with a space resulting in the ending quote looking ugly*/
    $('blockquote p').text('"' + responce.quoteText.trim() + '"');
  });
  $("blockquote footer").animate({
    opacity: 0
  }, 500, function() {
    $(this).animate({
      opacity: 1
    }, 500);
    if (responce.quoteAuthor) {
      $("blockquote footer").text("- " + responce.quoteAuthor.trim());
    } else {
      $("blockquote footer").text("- Unknown");
    }
  });  
}