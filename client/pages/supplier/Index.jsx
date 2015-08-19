/*
* @Author: CC
* @Date:   2015-08-12 20:00:40
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 17:14:20
*/

import React from 'react'
import { Table, Tooltip, Popconfirm, message } from 'antd'
import Auth from '../../components/Auth.jsx'
import SupplierStore from '../../stores/supplier'
import SupplierAction from '../../actions/supplier'
import NewSupplierModal from './NewModal.jsx'

export default Auth(class SupplierIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      supplierState: SupplierStore.state
    }
  }

  supplierStoreChanged(supplierState) {
    if (typeof supplierState.error === 'string') message.error(supplierState.error)

    this.setState({supplierState})
  }

  componentWillMount() {
    this.unsubscribe = SupplierStore.listen(this.supplierStoreChanged.bind(this))
  }

  componentDidMount() {
    SupplierAction.load()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const cState = this.state.supplierState

    return (<div>
        <Table columns={this.columns} dataSource={cState.data} pagination={cState.pagination}/>
        <NewSupplierModal ref="modal"/>
      </div>
    )
  }

  get columns() {
    return [
      { title: '编码', dataIndex: 'code' },
      { title: '名称', dataIndex: 'name' },
      { title: '联系人', dataIndex: 'contact', render: c => c.name },
      { title: '联系电话', dataIndex: 'contact', render: c => c.phone },
      { title: this.actionTitle, render: this.renderActionButton.bind(this) },
    ]
  }

  get actionTitle() {
    return <Tooltip title="新建供应商">
      <button className="ant-btn ant-btn-circle ant-btn-primary" onClick={this.showModal.bind(this, null)}>
        <i className="anticon anticon-plus"></i>
      </button>
    </Tooltip>
  }

  renderActionButton(val, row) {
    return <div>
      <a href="javascript:;" onClick={this.showModal.bind(this, row)}>编辑</a>
      <div className="ant-divider"></div>
      <Popconfirm title="确定删除？" onConfirm={SupplierAction.remove.bind(null, row._id)}>
        <a href="javascript:;" style={{color: 'red'}}>删除</a>
      </Popconfirm>
    </div>
  }

  showModal(supplier) {
    this.refs.modal.show(supplier)
  }
})