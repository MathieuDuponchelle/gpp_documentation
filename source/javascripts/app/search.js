(function (global) {
  'use strict';

  var $global = $(global);
  var content, darkBox, searchResults;

  lunr.tokenizer = function (obj) {
	  if (!arguments.length || obj == null || obj == undefined) return []
		  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

			  var str = obj.toString().replace(/^\s+/, '')

				  for (var i = str.length - 1; i >= 0; i--) {
					  if (/\S/.test(str.charAt(i))) {
						  str = str.substring(0, i + 1)
							  break
					  }
				  }

	  return str
		  .split(/(?:\s+|\-)|[A-Z]|_|:|\./)
		  .filter(function (token) {
			  return !!token
		  })
	  .map(function (token) {
		  return token.toLowerCase()
	  })
  }

  var index = new lunr.Index();

  index.ref('id');
  index.field('klass', { boost: 10 });
  index.field('other');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
	  $('h1, h2, h3').each(function() {
		  var title = $(this).text();
		  if (!($(this).attr("c_name"))) {
			  return;
		  }

		  var split = title.split(/\.|:/);
		  if (split.length == 1) {
			  return
		  } else if (split.length == 2) {
			  index.add({
				  id: $(this).prop('id'),
				  klass: title,
				  other: title
			  });
		  } else {
			  index.add({
				  id: $(this).prop('id'),
				  klass: "noklassmydear",
				  other: title
			  });
		  }
	  });
  }

  function bind() {
    content = $('.content');
    darkBox = $('.dark-box');
    searchResults = $('.search-results');

    $('#input-search').on('keyup', search);
  }

  function search(event) {
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        searchResults.empty();
        $.each(results, function (index, result) {
          var elem = document.getElementById(result.ref);
          searchResults.append("<li><a href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
        });
      } else {
        searchResults.html('<li></li>');
	$('.search-results li').text('No Results Found for "' + this.value + '"');
      }
    } else {
      searchResults.removeClass('visible');
    }
  }

})(window);
