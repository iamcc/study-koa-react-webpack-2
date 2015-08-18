/*
* @Author: CC
* @Date:   2015-08-12 19:31:34
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 13:55:08
*/

import React from 'react'
import { Link } from 'react-router'
import { Menu, Dropdown } from 'antd'
import AuthAction from '../actions/AuthAction'
import Auth from '../components/Auth.jsx'

export default Auth(class Sidebar extends React.Component {
  render() {
    const onMenuClick = (key) => {
      switch(key) {
        case 'modify-password':
        case 'manage':
          router.transitionTo(key)
          break
        case 'logout':
          AuthAction.logout()
          break
      }
    }
    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="modify-password">
          <a href="javascript:;">修改密码</a>
        </Menu.Item>
        {this.props.user.role === 'admin'
          ? <Menu.Item key="manage">
              <a href="javascript:;">管理</a>
            </Menu.Item>
          : <div></div>}
        <Menu.Divider/>
        <Menu.Item key="logout">
          <a href="javascript:;">登出</a>
        </Menu.Item>
      </Menu>
    )
    const user = this.props.user

    return (
      <aside id="sidebar">
        <div id="account">
          <span id="username">{user.username}</span>
          <div className="spacer"></div>
          <Dropdown overlay={menu}>
            <i className="anticon anticon-down"></i>
          </Dropdown>
        </div>
        <ul id="menu">
          <li>
            <Link to="/order">订单</Link>
          </li>
          <li>
            <Link to="/stock">库存</Link>
          </li>
          <li>
            <Link to="/supplier">供应商</Link>
          </li>
        </ul>
      </aside>
    )
  }
})