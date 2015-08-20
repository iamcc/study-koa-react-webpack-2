/*
* @Author: CC
* @Date:   2015-08-19 19:17:14
* @Last Modified by:   CC
* @Last Modified time: 2015-08-20 12:31:16
*/
'use strict'

const ObjectId = require('mongoose').Types.ObjectId
const CustomerModel = require('../models/customer')
const util = require('../models/util')

module.exports = function (router) {
  router.get('/api/customer', handleList)
  router.post('/api/customer', handleCreate)
  router.put('/api/customer', handleUpdate)
  router.del('/api/customer', handleRemove)
}

function *handleList(next) {
  this.body = yield util.getPage(CustomerModel, this.request.query)
}

function *handleCreate(next) {
  const body = this.request.body
  delete body._id
  this.body = yield CustomerModel.create(body)
}

function *handleUpdate(next) {
  const body = this.request.body
  this.assert(body._id && ObjectId.isValid(body._id), '记录不存在', 404)

  const customer = yield CustomerModel.findById(body._id).exec()
  this.assert(customer, '记录不存在', 404)

  delete body._id
  delete body.code

  for (let k in body) customer[k] = body[k]

  this.body = yield customer.save()
}

function *handleRemove(next) {
  const _id = this.request.query.id
  this.assert(_id && ObjectId.isValid(_id), '记录不存在', 404)

  yield CustomerModel.remove({_id})

  this.status = 200
}