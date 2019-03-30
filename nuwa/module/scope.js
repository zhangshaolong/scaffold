export default class Scope {
  constructor (options) {
    for (var key in options) {
      this[key] = options[key]
    }
  }

  child (options) {
    const SubScope = function (options) {
      for (var key in options) {
        this[key] = options[key]
      }
    }
    SubScope.prototype = this
    return new SubScope(options)
  }
}