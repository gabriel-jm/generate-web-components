export default {
  go(path: string) {
    history.pushState(null, '', path)
    window.dispatchEvent(new Event('popstate'))
  }
}
