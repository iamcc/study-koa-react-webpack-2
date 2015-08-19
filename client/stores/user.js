/*
* @Author: CC
* @Date:   2015-08-18 10:45:30
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:53:44
*/

import Reflux from 'reflux'
import UserAction from '../actions/user'
import UserService from '../services/user'
import util from './util'

export default Reflux.createStore({
  listenables: UserAction,

  init() {
    this.state = {
      data: [],
      pagination: {
        pageSize: 1,
        onChange: page => {
          this.onLoad({page})
        }
      },
      error: false,
      success: false
    }
  },

  onLoad(params) {
    util.loadPage(params, this.state, UserService, this.changed)
  },

  onUpdateStatus(row) {
    const status = row.status === 1 ? 0 : 1

    this.state.errors = false
    this.state.success = false

    UserService.updateStatus({
      id: row._id,
      status: status
    }, (err, res) => {
      if (err) this.state.errors = res.text
      else row.status = status
      this.changed()
    })
  },

  onResetPassword(row) {
    this.state.errors = false
    this.state.success = false

    UserService.resetPassword(row._id, (err, res) => {
      if (err) this.state.errors = res.text
      else this.state.success = 'success'
      this.changed()
    })
  },

  onRemove(row) {
    this.state.errors = false
    this.state.success = false

    UserService.remove(row._id, (err, res) => {
      if (err) this.state.errors = err.response.text
      else this.state.users = this.state.users.filter(row2 => {
        return row._id !== row2._id
      })
      this.changed()
    })
  },

  changed() {
    this.trigger(this.state)
  }
})