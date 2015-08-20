/*
* @Author: CC
* @Date:   2015-08-19 19:38:31
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 19:50:23
*/

import $ from 'superagent'
import token from './token'

export default {
  load,
  create,
  update,
  remove,
}

function load(params, callback) {
  $.get('/api/customer').use(token).query(params).end(callback)
}

function create(params, callback) {
  $.post('/api/customer').use(token).send(params).end(callback)
}

function update(params, callback) {
  $.put('/api/customer').use(token).send(params).end(callback)
}

function remove(id, callback) {
  $.del('/api/customer').use(token).query({id}).end(callback)
}