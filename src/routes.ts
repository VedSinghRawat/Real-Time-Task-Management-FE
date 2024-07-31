export default class Routes {
  private static get auth() {
    return '/auth' as const
  }

  public static get login() {
    return `${this.auth}/login` as const
  }

  public static get register() {
    return `${this.auth}/register` as const
  }
}
