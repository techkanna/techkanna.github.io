if ('serviceWorker' in navigator) {
  function windowOnload() {
    navigator.serviceWorker
      .register('./assets/js/sw-pages.js')
      .then(reg => console.log('registered'))
      .catch(err => console.log(`err: ${err}`));
  }
  window.addEventListener('load', windowOnload);
}