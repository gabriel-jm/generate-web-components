import { User } from './services/user-service.js'

// interface GlobalConfigs {
//   [key: string]: any
//   currentUser: null | Omit<User, 'password'>
//   logIn(): true | undefined
//   logOut(): void
//   on(eventName: string, callback: Function): void
// }

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
    events.userChange.forEach(fn => fn())
    this.#user = data
  }

  on(eventName: EventsNames, callback: Function) {
    if(!(eventName in events)) {
      throw new Error('Invalid event name')
    }

    events[eventName].push(callback)
  }

  logIn() {
    events.logIn.forEach(fn => fn())
  }

  logOut() {
    events.logOut.forEach(fn => fn())
  }

}

export const globalConfigs = new GlobalState()
