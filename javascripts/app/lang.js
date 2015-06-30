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
!function(t){"use strict";function e(t,e){if(t.text()){var o="h1";"H2"==t.prop("tagName")?o+=",h2":"H3"==t.prop("tagName")&&(o+=",h2,h3");var n=t.nextUntil(o);t.attr("c_name")&&!t.attr(e+"_name")?(t.hide(),void 0!=r&&t.prev().hide(),n.hide()):(t.show(),n.show()),t.text(t.attr(e+"_name"))}}function o(o){o&&""!==o&&o!==r&&($(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+o+"']").addClass("active"),"shell"!=o&&$(".prototype_start").nextUntil(".prototype_end").show(),$("h1,h2,h3:not('.subsection')").each(function(){var t=$(this);setTimeout(function(){e(t,o)},0)}),setTimeout(function(){"shell"==o&&$(".prototype_start").nextUntil(".prototype_end").hide(),$(".prototype_start").hide(),$(".subsection").each(function(){var t=$(this).nextUntil("h1,h2,"+$(this).prop("tagName").toLowerCase()+".subsection"),e=t.is(":visible");e?($(this).show(),$(this).attr(o+"_name",$(this).text())):($(this).hide(),$(this).removeAttr(o+"_name"))});for(var e=0;e<a.length;e++)$(".highlight."+a[e]).hide();$(".highlight."+o).show(),t.makeToc(o),setTimeout(function(){t.toc.calculateHeights()},0),r=o,$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)},0))}function n(t){if(history){var e=window.location.hash;e&&(e=e.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+e),localStorage.setItem("language",t)}}function i(t){var e=(t[0],localStorage.getItem("language"));a=t,""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),a)?(o(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):o(null!==e&&-1!=jQuery.inArray(e,a)?e:a[0])}var a=[],r=void 0;t.setupLanguages=i,t.activateLanguage=o,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return n(t),o(t),!1}),window.onpopstate=function(){o(window.location.search.substr(1))}})}(window);