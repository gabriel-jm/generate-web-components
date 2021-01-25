interface GlobalConfigs {
  [key: string]: any
  currentUser: { name: string, username: string } | null
  logIn(): true | undefined
  logOut(): void
}

export const globalConfigs = <GlobalConfigs> {
  currentUser: null
}
