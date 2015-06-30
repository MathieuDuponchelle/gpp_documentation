(function (global) {
  'use strict';

  global.makeToc = makeToc;
  global.closeToc = closeToc;

  function closeToc() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  function makeToc(language) {
    $("#toc").remove();
    $('<div id="toc"></div>').insertBefore(".toc-footer");
    global.toc = $("#toc").tocify({
      selectors: 'h1,h2[' + language + "_name] ,h3[" + language + "_name]",
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };
})(window);

