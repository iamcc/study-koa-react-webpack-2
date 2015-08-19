/*
* @Author: CC
* @Date:   2015-08-19 09:51:30
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 17:39:45
*/

import $ from 'superagent'
import token from './token'

export default {
  load,
  create,
  update,
  remove
}

function load(params, callback) {
  $.get('/api/supplier').use(token).query(params).end(callback)
}

function create(params, callback) {
  $.post('/api/supplier').use(token).send(params).end(callback)
}

function update(params, callback) {
  $.put('/api/supplier').use(token).send(params).end(callback)
}

function remove(id, callback) {
  $.del('/api/supplier').use(token).query({id}).end(callback)
}