/*
* @Author: CC
* @Date:   2015-08-13 11:56:28
* @Last Modified by:   CC
* @Last Modified time: 2015-08-17 17:04:08
*/

const UserModel = require('../models/user')
const util = require('../models/util')

module.exports = function(router) {
  router.get('/api/user', handleUserList)
  router.put('/api/user', handleUpdate)
  router.del('/api/user', handleDelete)
  router.post('/api/user', handleCreate)
}

function *handleUserList(next) {
  this.assert(this.state.user.role === 'admin', 403)
  this.request.query.filter = {
    deleted: {$ne: true}
  }
  this.body = yield util.getPage(UserModel, this.request.query)
}

function *handleUpdate(next) {
  switch(this.request.query.act) {
    case 'updatePassword': return yield modifyPassword.call(this, next)
    case 'updateStatus': return yield updateStatus.call(this, next)
    case 'resetPassword': return yield resetPassword.call(this, next)
  }
}

function *handleDelete(next) {
  const id = this.request.query.id

  this.assert(this.state.user.role === 'admin', 403)
  this.assert(id, 404)

  const user = yield UserModel.findById(id)
  this.assert(user, 404)
  this.assert(user.username !== 'admin', 403)
  user.deleted = true
  yield user.save()
  this.status = 200
}

function *modifyPassword(next) {
  const body = this.request.body

  this.assert(body.oldPwd && body.oldPwd.length > 5, {oldPwd: 'at least 6 characters'}, 400)
  this.assert(body.newPwd && body.newPwd.length > 5, {oldPwd: 'at least 6 characters'}, 400)

  const user = yield UserModel.findByUsername(this.state.user.username)
  this.assert(user, 'user not exist', 404)
  this.assert(user.comparePassword(body.oldPwd), {oldPwd: 'invalid password'}, 400)

  user.password = body.newPwd
  yield user.save()

  this.status = 200
}

function *updateStatus(next) {
  const body = this.request.body
  this.assert(this.state.user.role === 'admin', 403)
  this.assert(body.id, 404)

  const user = yield UserModel.findById(body.id).exec()
  this.assert(user, 404)
  this.assert(user.username !== 'admin', 403)

  user.status = body.status
  yield user.save()
  this.status = 200
}

function *resetPassword(next) {
  const id = this.request.body.id
  this.assert(this.state.user.role === 'admin', 403)
  this.assert(id, 404)

  const user = yield UserModel.findById(id).exec()
  this.assert(user, 404)
  this.assert(user.username !== 'admin', 403)
  user.password = '123456'
  yield user.save()
  this.status = 200
}

function *handleCreate(next) {
  const body = this.request.body
  this.assert(this.state.user.role === 'admin', 403)
  this.body = yield UserModel.create(body)
}