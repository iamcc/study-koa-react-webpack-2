/*
* @Author: CC
* @Date:   2015-08-19 09:34:05
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:49:25
*/

import Reflux from 'reflux'
import CustomerAction from '../actions/customer'
import CustomerService from '../services/customer'
import util from './util'

export default Reflux.createStore({
  listenables: CustomerAction,

  init() {
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      error: false
    }
  },

  onLoad(params) {
    util.loadPage(params, this.state, CustomerService, this.changed)
  },

  changed() {
    this.trigger(this.state)
  }
})