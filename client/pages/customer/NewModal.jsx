/*
* @Author: CC
* @Date:   2015-08-19 20:12:54
* @Last Modified by:   CC
* @Last Modified time: 2015-08-20 12:33:55
*/

import React from 'react'
import { message, Modal } from 'antd'
import CustomerAction from '../../actions/customer'
import CustomerStore from '../../stores/customer'

export default class NewCustomerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customerState: CustomerStore.state,
      visible: false,
      customer: {}
    }
    this.unsubscribe = CustomerStore.listen(this.customerStoreChanged.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  customerStoreChanged(customerState) {
    this.setState({customerState})

    if (typeof customerState.error === 'object')
      for (let k in customerState.error)
        this.form[k].focus()
    if (!customerState.error && this.state.visible) {
      message.success('success')
      this.setState({visible: false})
      CustomerAction.load()
    }
  }

  render() {
    const title = this.state.customer._id ? '编辑客户' : '新建客户'
    const footer = [
      <button className="ant-btn ant-btn-primary" onClick={this.handleSubmit.bind(this)}>
        保存
      </button>,
      <button className="ant-btn" onClick={this.handleCancel.bind(this)}>取消</button>
    ]
    const error = this.state.customerState.error

    return (
      <Modal title={title} visible={this.state.visible} footer={footer} {...this.props}>
        <form className="ant-form-horizontal" onSubmit={this.handleSubmit.bind(this)} ref="form">
          <div className={"ant-form-item" + (error.code ? ' has-error' : '')}>
            <label className="col-6" required>编码</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="code" disabled={this.state.customer._id ? '1': ''}/>
              <p className="ant-form-explain">{error.code}</p>
            </div>
          </div>

          <div className={"ant-form-item" + (error.name ? ' has-error' : '')}>
            <label className="col-6" required>名称</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="name"/>
              <p className="ant-form-explain">{error.name}</p>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-6">联系人</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="contact.name"/>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-6">联系电话</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="contact.phone"/>
            </div>
          </div>

          <input type="submit" style={{display: 'none'}}/>
        </form>
      </Modal>
    )
  }

  show(customer) {
    this.state.visible = true
    this.state.customer = customer
    this.state.customerState.error = false
    this.setState(this.state)

    setTimeout(() => {
      this.form = this.refs.form.getDOMNode()
      this.form.reset()
      this.form.code.value = customer.code || ''
      this.form.name.value = customer.name || ''

      if (customer.contact) {
        this.form['contact.name'].value = customer.contact.name || ''
        this.form['contact.phone'].value = customer.contact.phone || ''
      }

      customer._id
        ? this.form.name.focus()
        : this.form.code.focus()
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const action = this.state.customer._id
      ? CustomerAction.update
      : CustomerAction.create

    action({
      _id: this.state.customer._id,
      code: this.form.code.value.trim(),
      name: this.form.name.value.trim(),
      contact: {
        name: this.form['contact.name'].value.trim(),
        phone: this.form['contact.phone'].value.trim()
      }
    })
  }

  handleCancel() {
    this.setState({visible: false})
  }
}