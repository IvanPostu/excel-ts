export class ActiveRoute {
  static get path(): string {
    return window.location.hash.slice(1)
  }

  static get param(): Array<string> {
    return ActiveRoute.path.split('/')
  }

  static navigate(path: string) {
    window.location.hash = path
  }
}
