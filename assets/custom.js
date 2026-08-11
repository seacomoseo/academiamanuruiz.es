import { scrollShot } from './scroll-shot.js'

// SUSCRIPTION
const popup = document.getElementById('promocion')
if (popup) {
  // Popup when scroll a little from the top of the page
  scrollShot({
    rootMargin: '20% 0% -120%',
    query: 'body',
    doStart: e => {
      // If the form has never been submitted
      if (!window.localStorage['submitedformulario-contacto']) {
        const now = new Date().getTime()
        const oneWeek = 7 * 24 * 60 * 60 * 1000
        const moreThatOneWeek = now - new Date(window.localStorage.suscriptionDateClose || 0).getTime() >= oneWeek
        // If more than a week has passed since the last opening
        if (moreThatOneWeek) {
          window.localStorage.suscriptionDateClose = new Date().toISOString()
          window.location.hash = 'promocion'
        }
      }
    }
  })
}
