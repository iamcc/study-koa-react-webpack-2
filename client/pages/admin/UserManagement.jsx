/*
* @Author: CC
* @Date:   2015-08-13 18:23:03
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:53:27
*/

import React from 'react/addons'
import Reflux from 'reflux'
import { Table, message, Popconfirm, Tooltip } from 'antd'
import Admin from '../../components/Admin.jsx'
import UserAction from '../../actions/user'
import UserStore from '../../stores/user'

class UserManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userState: UserStore.state
    }
  }

  userStoreChanged(userState) {
    if (userState.errors) message.error(userState.errors)
    if (userState.success) message.success(userState.success)
    this.setState({userState})
  }

  componentWillMount() {
    this.unsubscribe = UserStore.listen(this.userStoreChanged.bind(this))
    UserAction.load()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const uState = this.state.userState

    return (
      <Table columns={this.columns} dataSource={uState.data} pagination={uState.pagination}/>
    )
  }

  get columns() {
    return [
      { title: '用户名', dataIndex: 'username' },
      { title: '角色', dataIndex: 'role' },
      { title: '状态', dataIndex: 'status', render: this.renderStatus.bind(this) },
      { title: this.renderActionTitle(), dataIndex: '_id', render: this.renderActions.bind(this) }
    ]
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