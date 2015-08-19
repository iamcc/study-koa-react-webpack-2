/*
* @Author: CC
* @Date:   2015-08-19 10:37:17
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 18:26:15
*/

const mongoose = require('mongoose')
const SupplierModel = require('../models/supplier')
const util = require('../models/util')

module.exports = function (router) {
  router.get('/api/supplier', handleList)
  router.post('/api/supplier', handleCreate)
  router.put('/api/supplier', handleUpdate)
  router.del('/api/supplier', handleRemove)
}

function *handleList(next) {
  this.body = yield util.getPage(SupplierModel, this.request.query)
}

function *handleCreate(next) {
  delete this.request.body._id
  this.body = yield SupplierModel.create(this.request.body)
}

function *handleUpdate(next) {
  const body = this.request.body
  this.assert(body._id && mongoose.Types.ObjectId.isValid(body._id), '记录不存在', 404)

  const supplier = yield SupplierModel.findById(body._id).exec()
  this.assert(supplier, '记录不存在', 404)

  delete body._id
  delete body.code

  for (var k in body) {
    supplier[k] = body[k]
  }
  this.body = yield supplier.save()
}

function *handleRemove(next) {
  const id = this.request.query.id

  this.assert(id && mongoose.Types.ObjectId.isValid(id), '记录不存在', 404)

  const supplier = yield SupplierModel.findById(id).exec()
  this.assert(supplier, '记录不存在', 404)
  yield supplier.remove()
  this.status = 200
}