'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
      console.log(`${$(this).val()}`);
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.article-body *:nth-of-type(n+2)').hide();
  var thisShown = false;
  if(thisShown === false){
    $('#articles').on('click', 'a.read-on', function(show){
      show.preventDefault();
      $(this).parent().find('*').show();
      $(this).removeClass().addClass('show-less').html('&larr; Show less').click(function(){
        $('.article-body *:nth-of-type(n+2)').hide();
        console.log(thisShown);
      });
    });
    thisShown = true;
    if(thisShown === true){
      $('#articles').on('click', 'a.show-less', function(show){
        show.preventDefault();
        console.log('wat');
        $(this).removeClass().addClass('read-on').html('Read on &rarr;');
        thisShown = false;
      });
    }
  }
};

$('#about-nav').click(function(){
  $('#filters').fadeOut(500);
  $('article').fadeOut(500);
  $('about').fadeIn(1000);
});

$('#home-nav').click(function(){
  $('#filters').fadeIn(1000);
  $('article').fadeIn(1000);
  $('about').fadeOut(500);
});

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
