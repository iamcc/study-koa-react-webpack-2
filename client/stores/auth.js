/*
* @Author: CC
* @Date:   2015-08-11 18:17:56
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:11:12
*/

import Reflux from 'reflux'
import AuthAction from '../actions/auth'
import AuthService from '../services/auth'

const TOKEN_KEY = 'token'

export default Reflux.createStore({
  listenables: AuthAction,

  init() {
    this.state = {
      loggedIn: false,
      token: '',
      user: false,
      errors: {},
      loading: false
    }
    this.state.token = getToken()
    try {
      this.state.user = this.state.token && JSON.parse(atob(this.state.token.split('.')[1]))
      this.state.loggedIn = !!this.state.user
    } catch(e) {
      this.reset()
      console.error(e)
    }
  },

  onLogin(user) {
    this.reset()
    this.loading = true
    this.changed()

    AuthService.login(user, (err, res) => {
      if (err) return this.onLoginFailed(res.body || res.text)
      this.onLoginCompleted(res.body)
    })
  },

  onLoginCompleted(data) {
    this.reset()
    this.state.token = data.token
    this.state.user = data.user
    this.state.loggedIn = true
    this.changed()
    setToken(data.token)
  },

  onLoginFailed(err) {
    this.reset()
    this.state.errors = err
    this.changed()
    setToken('')
  },

  onLogout() {
    this.reset()
    this.changed()
  },

  getState() {
    return this.state
  },

  changed() {
    this.trigger(this.state)
  },

  reset() {
    this.state = {
      loggedIn: false,
      token: '',
      user: false,
      errors: {},
      loading: false,
    }
    setToken(this.state.token)
  }
})

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}