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

  public static get home() {
    return '/app' as const
  }

  public static project(projectId?: number) {
    return `${this.home}/project/${projectId || ':projectId'}` as const
  }
}
