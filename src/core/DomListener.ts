export class DomListener {
  private $root: Node | string

  /**
   *
   */
  constructor($root: Node | string) {
    if (!$root) {
      throw Error('No $root provided from DomListener')
    }

    this.$root = $root
  }
}
