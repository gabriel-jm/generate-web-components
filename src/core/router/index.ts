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
    if(!(/^\/.*/).test(path)) {
      throw new Error('Can\'t set a path that doesn\'t start with "/"')
    }

    if(path === location.pathname) {
      history.replaceState(null, '', path)
    } else {
      history.pushState(null, '', path)
    }

    window.dispatchEvent(new Event('popstate'))
  }
}
