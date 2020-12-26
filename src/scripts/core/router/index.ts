import routes from '../../components/routes.js'

export default {

  addPopStateEvent(eventHandler: EventListener) {
    window.addEventListener('popstate', eventHandler)
  },
  
  handleUrl() {
    const { pathname } = window.location

    return pathname in routes
      ? routes[pathname]
      : routes.notFound
  },

  go(path: string) {
    history.pushState(null, '', path)
    window.dispatchEvent(new Event('popstate'))
  }
}
