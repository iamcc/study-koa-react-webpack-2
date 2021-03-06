/*
* @Author: CC
* @Date:   2015-08-11 12:45:17
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 11:12:22
*/
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String, trim: true },
  role: { type: String, default: 'sales', trim: true, lowercase: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
})
UserSchema.pre('save', preSave)
UserSchema.methods = {
  comparePassword
}
UserSchema.statics = {
  findByUsername
}
UserSchema.options = {
  toJSON: {
    transform(doc, ret, opts) {
      delete ret.password
      delete ret.__v
    }
  }
}

module.exports = mongoose.model('User', UserSchema)

function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex')
}

function preSave(next) {
  let errors = {}

  if (!this.username || this.username.length < 3) errors.username = '用户名至少3位数'
  if (!this.password || this.password.length < 6) errors.password = '密码至少6位数'
  if (!~['admin', 'sales'].indexOf(this.role)) errors.role = '角色不存在'
  if (!~[0, 1].indexOf(this.status)) errors.status = '状态不存在'
  if (!!Object.keys(errors).length) {
    const err = new Error('ValidationError')
    err.error = errors
    return next(err)
  }

  if (this.isNew || this.isModified('password'))
    this.password = md5(this.password)

  if (this.isNew) {
    this.model('User').findOne({ username: this.username }, function (err, user) {
      /* istanbul ignore if */
      if (err) return next(err)

      if (!!user) {
        const err = new Error('ValidationError')
        err.error = { username: '用户名已存在' }
        next (err)
      } else {
        next()
      }
    })
  } else {
    next()
  }
}

function comparePassword(pwd) {
  return this.password === md5(pwd)
}

function findByUsername(uname) {
  return this.findOne({ username: uname }).exec()
}