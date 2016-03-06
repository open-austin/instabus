import {observable, autorun, computed} from 'mobx'

class UiStore {
  @observable url = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')
  @computed get route() {
    return this.url[0]
  }
  @computed get params() {
    return this.url[1]
  }

  constructor() {
    window.addEventListener('hashchange', this.setLocation)
  }

  setLocation = () => {
    this.url = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')
  }
}

const store = new UiStore()
export default store