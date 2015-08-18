/*
* @Author: CC
* @Date:   2015-08-11 18:47:05
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 10:41:34
*/

import $ from 'superagent'
import token from './token'

export default {
  login
}

function login(user, callback) {
  return $.post('/api/auth/login').send(user).end(callback)
}