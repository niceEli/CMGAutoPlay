// ==UserScript==
// @name         CoolMathGames Auto /play (Free Adless Fullscreen)
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically add /play to the end of the URL on CoolMathGames game pages removing the ads and making the game fullscreen.
// @author       niceEli
// @match        https://*.coolmathgames.com/*
// @grant        none
// @licence      MIT
// ==/UserScript==

(function(){
  // Check if the current URL should be excluded from redirection
  function isExcludedUrl(url, excludedUrls) {
    for (var i = 0; i < excludedUrls.length; i++) {
      if (url.indexOf(excludedUrls[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  // Retrieve the list of excluded URLs from a remote TXT file
  function getExcludedUrls(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://niceeli.github.io/cmgExclude.txt'); // Replace with your remote TXT file URL
    xhr.onload = function() {
      if (xhr.status === 200) {
        var excludedUrls = xhr.responseText.trim().split('\n');
        callback(excludedUrls);
      }
    };
    xhr.send();
  }

  // Redirect to the "/play" URL if applicable
  function redirectToPlayUrl() {
    var excludedUrls = [];
    getExcludedUrls(function(result) {
      excludedUrls = result;
      if (
        location.href.indexOf('coolmathgames.com') > -1 &&
        location.href.indexOf('/0-') > -1 &&
        location.href.indexOf('/play') == -1 &&
        !isExcludedUrl(location.href, excludedUrls)
      ) {
        location.href += '/play';
      }
    });
  }

  redirectToPlayUrl();
})();
