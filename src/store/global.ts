import { User } from './services/user-service.js'

type Events = {
  logIn: Function[]
  logOut: Function[]
  userChange: Function[]
}

type EventsNames = keyof Events

const events: Events = {
  logIn: [],
  logOut: [],
  userChange: []
}

class GlobalState {
  #user = null as null | Omit<User, 'password'>

  get currentUser(): null | Omit<User, 'password'> {
    return this.#user
  }

  set currentUser(data: null | Omit<User, 'password'>) {
    this.#user = data
    events.userChange.forEach(fn => fn())
  }

  on(eventName: EventsNames, callback: Function) {
    if(!(eventName in events)) {
      throw new Error('Invalid event name')
    }

    events[eventName].push(callback)
  }

  logIn(user?: Omit<User, 'password'>) {
    if(user) {
      this.#user = user
    }

    events.logIn.forEach(fn => fn())
  }

  logOut() {
    events.logOut.forEach(fn => fn())
  }

}

export const globalConfigs = new GlobalState()
