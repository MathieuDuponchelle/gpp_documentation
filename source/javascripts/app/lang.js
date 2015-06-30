/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function (global) {
  'use strict';

  var languages = [];
  var currentLanguage = undefined;


  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function hide_if_irrelevant(element, language) {
	  if (element.text()) {
		  var selector = "h1";
		  if (element.prop('tagName') == "H2") {
			  selector += ",h2";
		  } else if (element.prop('tagName') == "H3") {
			  selector += ",h2,h3";
		  }
		  var body = element.nextUntil(selector);
		  if (element.attr("c_name") && !(element.attr(language + "_name"))) {
			  element.hide();
			  if (currentLanguage != undefined) {
				  element.prev().hide();
			  }
			  body.hide();
		  } else {
			  element.show();
			  body.show();
		  }
		  element.text(element.attr(language + "_name"));
	  }
  }

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;
    if (language === currentLanguage) return;

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-name='" + language + "']").addClass('active');

    if (language != "shell")
        $(".prototype_start").nextUntil(".prototype_end").show();

    $("h1,h2,h3:not('.subsection')").each (function(index) {
	    var self = $(this);
	    setTimeout (function () {
		hide_if_irrelevant (self, language);
	    }, 0);
    });

    setTimeout (function () {
	    if (language == "shell")
		    $(".prototype_start").nextUntil(".prototype_end").hide();

	    $(".prototype_start").hide();

	    $(".subsection").each (function(index) {
		    var body = $(this).nextUntil("h1,h2," + $(this).prop('tagName').toLowerCase() + ".subsection");
		    var body_visible = body.is(":visible");
		    if (body_visible) {
			    $(this).show();
			    $(this).attr(language + "_name", $(this).text());
		    } else {
			    $(this).hide();
			    $(this).removeAttr(language + "_name");
		    }
	    });

	    for (var i=0; i < languages.length; i++) {
		    $(".highlight." + languages[i]).hide();
	    }
	    $(".highlight." + language).show();

	    global.makeToc(language);
	    setTimeout (function () {
	    	global.toc.calculateHeights();
	    }, 0);

	    currentLanguage = language;
	    // scroll to the new location of the position
	    if ($(window.location.hash).get(0)) {
		    $(window.location.hash).get(0).scrollIntoView(true);
	    }
    }, 0);
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + language + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }

  function setupLanguages(l) {
    var currentLanguage = l[0];
    var defaultLanguage = localStorage.getItem("language");

    languages = l;

    if ((location.search.substr(1) !== "") && (jQuery.inArray(location.search.substr(1), languages)) != -1) {
      // the language is in the URL, so use that language!
      activateLanguage(location.search.substr(1));

      localStorage.setItem("language", location.search.substr(1));
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".lang-selector a").on("click", function() {
      var language = $(this).data("language-name");
      pushURL(language);
      activateLanguage(language);
      return false;
    });
    window.onpopstate = function(event) {
      activateLanguage(window.location.search.substr(1));
    };
  });
})(window);
