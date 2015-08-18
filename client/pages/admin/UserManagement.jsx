/*
* @Author: CC
* @Date:   2015-08-13 18:23:03
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 14:00:29
*/

import React from 'react/addons'
import Reflux from 'reflux'
import { Table, message, Popconfirm, Tooltip } from 'antd'
import { Tag } from 'antd/lib/tag'
import Admin from '../../components/Admin.jsx'
import UserAction from '../../actions/UserAction'
import UserStore from '../../stores/UserStore'

class UserManagement extends React.Component {
  get columns() {
    return [
      { title: '用户名', dataIndex: 'username' },
      { title: '角色', dataIndex: 'role' },
      { title: '状态', dataIndex: 'status', render: this.renderStatus.bind(this) },
      { title: this.renderActionTitle(), dataIndex: '_id', render: this.renderActions.bind(this) }
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      userStore: UserStore.state
    }
  }

  userStoreChanged(state) {
    if (state.errors) message.error(state.errors)
    if (state.success) message.success(state.success)
    this.setState({userStore: state})
  }

  componentWillMount() {
    this.unsubscribe = UserStore.listen(this.userStoreChanged.bind(this))
    UserAction.load()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.userStore.users} pagination={this.state.userStore.pagination}/>
    )
  }

  renderStatus(status, row) {
    if (status === 1) return <span style={{color: 'green'}}>
      <i className="anticon anticon-unlock"></i>
      <span> 正常</span>
    </span>
    return <span style={{color: 'red'}}>
      <i className="anticon anticon-lock"></i>
      <span> 锁定</span>
    </span>
  }

  renderActionTitle() {
    return <Tooltip title="创建新用户">
      <button className="ant-btn ant-btn-circle ant-btn-primary" onClick={router.transitionTo.bind(this, 'create-user')}>
        <i className="anticon anticon-plus"></i>
      </button>
    </Tooltip>
  }

  renderActions(id, row) {
    if (row.username === 'admin') return

    return <span>
      <a href="javascript:;" onClick={UserAction.updateStatus.bind(null, row)}>更改状态</a>
      <span className="ant-divider"></span>
      <Popconfirm title="将密码重置为123456？" onConfirm={UserAction.resetPassword.bind(null, row)}>
        <a href="javascript:;" style={{color: 'orange'}}>重设密码</a>
      </Popconfirm>
      <span className="ant-divider"></span>
      <Popconfirm title="删除用户?" onConfirm={UserAction.remove.bind(null, row)}>
        <a href="javascript:;" style={{color: 'red'}}>删除</a>
      </Popconfirm>
    </span>
  }
}
export default Admin(UserManagement)