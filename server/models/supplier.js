/*
* @Author: CC
* @Date:   2015-08-19 10:33:26
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 18:38:50
*/
'use strict'

const mongoose = require('mongoose')
const SupplierSchema = new mongoose.Schema({
  code: String,
  name: String,
  contact: {
    name: String,
    phone: String
  }
})

SupplierSchema.pre('save', function (next) {
  let error = {}

  if (!this.code) error.code = '编码不能空'
  if (!this.name) error.name = '名称不能空'

  if (!!Object.keys(error).length) {
    const err = new Error('ValidationError')
    err.error = error
    return next(err)
  }

  if (this.isNew) {
    this.model('Supplier').findOne({code: this.code}, function (err, data) {
      /* istanbul ignore if */
      if (err) return next(err)
      if (!!data) {
        const err = new Error('ValidationError')
        err.error = { code: '编码已经存在' }
        next(err)
      }

      next()
    })
  } else {
    next()
  }
})

// SupplierSchema.statics.findByCode = function *(code) {
//   return this.findOne({code}).exec()
// }

module.exports = mongoose.model('Supplier', SupplierSchema)