(function() {

  function setLocalStorageItem(name, content) {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem(name, content);
    } else {
      alert("Could not save social profile");
    }
  }


  if (window.location.hash) {
    var fragment = window.location.hash.substring(1);
    var decodedFragment = JSON.parse(Base64.decode(fragment));

    console.log(JSON.stringify(decodedFragment).length);

    //document.write(decodedFragment);

    console.log(decodedFragment);


    if(decodedFragment.secretProfile) {
      //console.log(JSON.stringify(decodedFragment.secretProfile).length);
      //setCookie('_staticman', JSON.stringify(decodedFragment.secretProfile), 1);
      setLocalStorageItem('_staticman', JSON.stringify(decodedFragment.secretProfile));
    }

    if(decodedFragment.publicProfile) {
      //setCookie('staticman', JSON.stringify(decodedFragment.publicProfile), 1);
      setLocalStorageItem('staticman', JSON.stringify(decodedFragment.publicProfile));
    }

  }
})();