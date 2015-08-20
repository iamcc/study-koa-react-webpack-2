/*
* @Author: CC
* @Date:   2015-08-19 12:07:44
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 19:56:02
*/
const should = require('should')
const config = require('../../../server/config')
const jwt = require('koa-jwt')
const CustomerModel = require('../../../server/models/customer')

describe('test customer api', function () {
  before(function (done) {
    this.$ = require('supertest')(require('../../../server').callback())
    this.fakeToken = 'Bearer ' + jwt.sign({}, config.jwtSecret)
    done()
  })

  describe('GET /api/customer', function () {
    it('will get 200', function (done) {
      this.$
        .get('/api/customer')
        .set('Authorization', this.fakeToken)
        .expect(200)
        .end(function (err, res) {
          res.body.should.have.a.property('data')
          res.body.should.have.a.property('total')
          done(err)
        })
    })
  })

  describe('POST /api/customer', function () {
    it('will get 200', function (done) {
      this.newCode = String(Math.random()).slice(-6)
      this.$
        .post('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({code: this.newCode, name: this.newCode})
        .expect(200, done)
    })

    it('will get 400 编码不能空', function (done) {
      this.$
        .post('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({})
        .expect(400)
        .expect(/编码不能空/, done)
    })

    it('will get 400 编码已经存在', function (done) {
      this.$
        .post('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({code: this.newCode, name: this.newCode})
        .expect(400)
        .expect(/编码已经存在/, done)
    })

    it('will get 400 名称不能空', function (done) {
      this.$
        .post('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({code: this.newCode})
        .expect(400)
        .expect(/名称不能空/, done)
    })
  })

  describe('PUT /api/customer', function () {
    before(function (done) {
      CustomerModel.create({
        code: 'test_put',
        name: 'test_put'
      }, function (err, data) {
        this.newSupplier = data
        done(err)
      }.bind(this))
    })

    it('will get 404 记录不存在 without id', function (done) {
      this.$
        .put('/api/customer')
        .set('Authorization', this.fakeToken)
        .send()
        .expect(404)
        .expect(/记录不存在/, done)
    })

    it('will get 404 without invalid id', function (done) {
      this.$
        .put('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({_id: '123'})
        .expect(404)
        .expect(/记录不存在/, done)
    })

    it('will get 200', function (done) {
      this.$
        .put('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({_id: this.newSupplier._id, code: 'test_put_modified', name: 'test_put_modified'})
        .expect(200)
        .end(function (err, res) {
          res.body.code.should.be.eql('test_put')
          res.body.name.should.be.eql('test_put_modified')
          done(err)
        })
    })
  })

  describe('DELETE /api/customer', function () {
    before(function (done) {
      CustomerModel.create({
        code: 'test_delete',
        name: 'test_delete'
      }, function (err, data) {
        this.newSupplier = data
        done(err)
      }.bind(this))
    })

    it('will get 404 记录不存在 without id', function (done) {
      this.$
        .del('/api/customer')
        .set('Authorization', this.fakeToken)
        .send()
        .expect(404)
        .expect(/记录不存在/, done)
    })

    it('will get 404 记录不存在 with invalid id', function (done) {
      this.$
        .del('/api/customer')
        .set('Authorization', this.fakeToken)
        .send({_id: '123'})
        .expect(404)
        .expect(/记录不存在/, done)
    })

    it('will get 200', function (done) {
      this.$
        .del('/api/customer?id=' + this.newSupplier._id)
        .set('Authorization', this.fakeToken)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)

          CustomerModel.findById(this.newSupplier._id, function (err, res) {
            should.not.exist(res)
            done(err)
          })
        }.bind(this))
    })
  })
})