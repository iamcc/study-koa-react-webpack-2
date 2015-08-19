/*
* @Author: CC
* @Date:   2015-08-13 18:04:53
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 09:20:51
*/

import React from 'react/addons'
import { Tabs } from 'antd'
import Admin from '../../components/Admin.jsx'
import UserManagement from './UserManagement.jsx'
import CostManagement from './CostManagement.jsx'

class Manage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="user" onChange={this.onTabChange.bind(this)}>
        <Tabs.TabPane tab="用户管理" key="user">
          <UserManagement/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="成本管理" key="stock">
          <CostManagement/>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  onTabChange(key) {
    console.log(key)
  }
}
export default Admin(Manage)