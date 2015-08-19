/*
* @Author: CC
* @Date:   2015-08-19 12:40:40
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 18:47:14
*/

import React from 'react'
import Router from 'react-router'
import { message, Modal } from 'antd'
import Auth from '../../components/Auth.jsx'
import SupplierAction from '../../actions/supplier'
import SupplierStore from '../../stores/supplier'

export default class NewSupplierModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      supplierState: SupplierStore.state,
      visible: false,
      supplier: null,
    }
  }

  supplierStoreChanged(supplierState) {
    this.setState({supplierState})

    if (!supplierState.error && this.state.visible) {
      this.form.reset()
      this.setState({visible: false})
      message.success('success')
      SupplierAction.load()
    }
    if (typeof supplierState.error === 'object') for (const k in supplierState.error) this.form[k].focus()
  }

  componentWillMount() {
    this.unsubscribe = SupplierStore.listen(this.supplierStoreChanged.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const sState = this.state.supplierState
    const footer = [
      <button type="submit"
              className={"ant-btn ant-btn-primary" + (sState.loading ? ' disabled' : '')}
              onClick={this.handleSubmit.bind(this)}>
        <span>保存 </span>
        {sState.loading
          ? <i className="anticon anticon-loading"></i>
          : ''}
      </button>,
      <button type="button" className="ant-btn" onClick={this.handleCancel.bind(this)}>
        <span>取消</span>
      </button>
    ]

    return (
      <Modal
        title={this.state.supplier ? "编辑供应商" : "新建供应商"}
        visible={this.state.visible}
        footer={footer}
        onCancel={this.handleCancel.bind(this)}>

        <form className="ant-form-horizontal" onSubmit={this.handleSubmit.bind(this)} ref="form">
          <div className={"ant-form-item" + (sState.error.code ? ' has-error' : '')}>
            <label className="col-6" required>编码:</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="code" disabled={this.state.supplier ? 'disabled' : ''}/>
              <p className="ant-form-explain">{sState.error.code}</p>
            </div>
          </div>

          <div className={"ant-form-item" + (sState.error.name ? ' has-error' : '')}>
            <label className="col-6" required>名称:</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="name"/>
              <p className="ant-form-explain">{sState.error.name}</p>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-6">联系人:</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="contactName"/>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-6">联系电话:</label>
            <div className="col-18">
              <input type="text" className="ant-input" name="contactPhone"/>
            </div>
          </div>

          <input type="submit" style={{display: 'none'}}/>
        </form>
      </Modal>
    )
  }

  show(supplier) {
    this.setState({visible: true, supplier})
    setTimeout(() => {
      this.form = this.refs.form.getDOMNode()
      this.form.reset()
      this.form.code.focus()

      if (supplier) {
        this.form.name.focus()
        this.form.code.value = supplier.code
        this.form.name.value = supplier.name
        this.form.contactName.value = supplier.contact.name
        this.form.contactPhone.value = supplier.contact.phone
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const action = this.state.supplier
      ? SupplierAction.update
      : SupplierAction.create

    action({
      _id: this.state.supplier && this.state.supplier._id,
      code: this.form.code.value.trim(),
      name: this.form.name.value.trim(),
      contact: {
        name: this.form.contactName.value.trim(),
        phone: this.form.contactPhone.value.trim(),
      }
    })
  }

  handleCancel() {
    this.state.supplierState.error = false
    this.state.visible = false
    this.setState(this.state)
  }
}