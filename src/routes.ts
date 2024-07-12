class Routes {
  private get auth() {
    return '/auth' as const
  }

  public get login() {
    return this.auth + '/login'
  }

  public get register() {
    return this.auth + '/register'
  }
}

const ROUTES = new Routes()
export default ROUTES
