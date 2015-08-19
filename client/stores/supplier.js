/*
* @Author: CC
* @Date:   2015-08-19 10:26:28
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 17:41:46
*/

import Reflux from 'reflux'
import SupplierAction from '../actions/supplier'
import SupplierService from '../services/supplier'
import util from './util'

export default Reflux.createStore({
  listenables: SupplierAction,

  init() {
    this.state = {
      data: [],
      pagination: {
        onChange: page => this.onLoad({page})
      },
      loading: false,
      error: false
    }
  },

  onLoad(params) {
    util.loadPage(params, this.state, SupplierService, this.changed)
  },

  onCreate(params) {
    this.state.loading = true
    this.state.error = {}

    if (!params.code) this.state.error.code = '编码不能空'
    if (!params.name) this.state.error.name = '名称不能空'

    this.state.loading = !Object.keys(this.state.error).length
    this.changed()

    if (!this.state.loading) return

    SupplierService.create(params, (err, res) => {
      this.state.loading = false
      this.state.error = false

      if (err) this.state.error = res.body || res.text

      this.changed()
    })
  },

  onUpdate(params) {
    this.state.loading = true
    this.state.error = {}

    if (!params.name) this.state.error.name = '名称不能空'

    this.state.loading = !Object.keys(this.state.error).length
    this.changed()

    if (!this.state.loading) return

    SupplierService.update(params, (err, res) => {
      this.state.loading = false
      this.state.error = false

      if (err) this.state.error = res.body || res.text

      this.changed()
    })
  },

  onRemove(id) {
    SupplierService.remove(id, (err, res) => {
      this.state.error = false

      if (err) this.state.error = res.text

      this.changed()
      this.onLoad()
    })
  },

  changed() {
    this.trigger(this.state)
  }
})