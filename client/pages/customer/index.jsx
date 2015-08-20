/*
* @Author: CC
* @Date:   2015-08-19 09:24:18
* @Last Modified by:   CC
* @Last Modified time: 2015-08-20 12:05:52
*/

import React from 'react'
import { message, Table, Tooltip, Popconfirm } from 'antd'
import Auth from '../../components/Auth.jsx'
import CustomerAction from '../../actions/customer'
import CustomerStore from '../../stores/customer'
import NewCustomerModal from './NewModal.jsx'

export default Auth(class CustomerIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      customerState: CustomerStore.state
    }
  }

  customerStoreChanged(customerState) {
    this.setState({customerState})

    if (typeof customerState.error === 'string') message.error(customerState.error)
  }

  componentWillMount() {
    this.unsubscribe = CustomerStore.listen(this.customerStoreChanged.bind(this))
  }

  componentDidMount() {
    CustomerAction.load()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const cState = this.state.customerState
    return (
      <div>
        <Table columns={this.columns} dataSource={cState.data} pagination={cState.pagination}/>
        <NewCustomerModal ref="modal"/>
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
    return <Tooltip title="新建客户">
      <button className="ant-btn ant-btn-circle ant-btn-primary" onClick={this.showModal.bind(this, {})}>
        <i className="anticon anticon-plus"></i>
      </button>
    </Tooltip>
  }

  renderActionButton(val, row) {
    return <div>
      <a href="javascript:;" onClick={this.showModal.bind(this, row)}>编辑</a>
      <div className="ant-divider"></div>
      <Popconfirm title="确定删除？" onConfirm={CustomerAction.remove.bind(null, row._id)}>
        <a href="javascript:;" style={{color: 'red'}}>删除</a>
      </Popconfirm>
    </div>
  }

  showModal(customer) {
    this.refs.modal.show(customer)
  }
})