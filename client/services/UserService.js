/*
* @Author: CC
* @Date:   2015-08-13 11:44:20
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 13:42:20
*/

import $ from 'superagent'
import token from './token'

export default {
  modifyPassword,
  list,
  updateStatus,
  remove,
  resetPassword,
  create,
}

function modifyPassword(oldPwd, newPwd, callback) {
  $.put('/api/user?act=updatePassword').use(token).send({oldPwd, newPwd}).end(callback)
}

function list(params, callback) {
  return $.get('/api/user').use(token).query(params).end(callback)
}

function updateStatus(params, callback) {
  return $.put('/api/user?act=updateStatus').use(token).send(params).end(callback)
}

function remove(id, callback) {
  return $.del('/api/user').use(token).query({id}).end(callback)
}

function resetPassword(id, callback) {
  return $.put('/api/user?act=resetPassword').use(token).send({id}).end(callback)
}

function create(user, callback) {
  return $.post('/api/user').use(token).send(user).end(callback)
}