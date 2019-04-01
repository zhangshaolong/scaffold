export default class CustomModule {
  init () {
    this.container
    this.tpl
    this.props
    this.data
    this.render
    this.update
    let data = {
      ee: 'hahaah哈哈'
    }
    for(let key in this.data) {
      data[key] = this.data[key]
    }
    this.container.innerHTML = this.tpl(data)

    return this
  }
}