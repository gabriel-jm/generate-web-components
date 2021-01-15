interface GlobalConfigs {
  [key: string]: any
  currentUser: { name: string } | null
  logIn(): true | undefined
  logOut(): void
}

export const globalConfigs = <GlobalConfigs> {
  currentUser: null
}
