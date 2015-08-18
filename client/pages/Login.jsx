/*
* @Author: CC
* @Date:   2015-08-11 18:05:12
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 14:01:43
*/

import React from 'react/addons'
import Reflux from 'reflux'
import { message } from 'antd'
import AuthAction from '../actions/AuthAction'
import AuthStore from '../stores/AuthStore'
import AuthService from '../services/AuthService'

export default class Login extends React.Component {
  static willTransitionTo(transition) {
    AuthStore.getState().loggedIn && transition.redirect('app')
  }

  constructor() {
    super()
    this.state = {
      authStore: AuthStore.getState(),
      style: {
        form: {
          width: '300px',
          height: '200px',
          margin: '200px auto'
        },
      },
      loading: false,
      username: '',
      password: ''
    }
  }

  authStoreChanged(auth) {
    if (auth.loggedIn) return router.transitionTo('app')
    if (auth.errors instanceof Object) {
      for(let k in auth.errors) {
        this.form[k].focus()
      }
    } else {
      message.error(auth.errors)
    }

    this.state.authStore = auth
    this.setState(this.state)
  }

  componentDidMount() {
    this.unsubscribe = AuthStore.listen(this.authStoreChanged.bind(this))
    this.form = {
      username: this.refs.username.getDOMNode(),
      password: this.refs.password.getDOMNode(),
    }
    this.form.username.focus()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.authStore.loading) return

    const state = this.state
    const errors = {}

    if (!state.username) errors.username = '用户名必填'
    if (!state.password) errors.password = '密码必填'
    if (state.password.length < 6) errors.password = '密码错误'

    if (!!errors.password) this.form.password.focus()
    if (!!errors.username) this.form.username.focus()

    if (errors.username || errors.password) return AuthAction.login.failed(errors)

    AuthAction.login({username: state.username, password: state.password})
  }

  render() {
    const errors = this.state.authStore.errors

    return (
      <form className="ant-form-horizontal" style={this.state.style.form} onSubmit={this.handleSubmit.bind(this)}>
        <div className={'ant-form-item' + (errors.username ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>用户名: </label>
          <div className="col-18">
            <input type="text" className="ant-input" ref="username" valueLink={this.linkState('username')}/>
            <p className="ant-form-explain">{errors.username}</p>
          </div>
        </div>
        <div className={'ant-form-item' + (errors.password ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>密码: </label>
          <div className="col-18">
            <input type="password" className="ant-input" ref="password" valueLink={this.linkState('password')}/>
            <p className="ant-form-explain">{errors.password}</p>
          </div>
        </div>
        <div className="ant-form-item">
          <div className="col-18 col-offset-6">
            <button type="submit" className={'ant-btn ant-btn-primary' + (this.state.loading ? ' disabled' : '')}>
              <span>登录 </span>
              {this.state.loading
                ? <i className="anticon anticon-loading"></i>
                : ''}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

require('react-mixin')(Login.prototype, React.addons.LinkedStateMixin)