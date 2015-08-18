/*
* @Author: CC
* @Date:   2015-08-13 18:04:53
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 13:58:10
*/

import React from 'react/addons'
import { Tabs } from 'antd'
import Admin from '../../components/Admin.jsx'
import UserManagement from './UserManagement.jsx'
import StockManagement from './StockManagement.jsx'

class Manage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="user" onChange={this.onTabChange.bind(this)}>
        <Tabs.TabPane tab="用户管理" key="user">
          <UserManagement/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="库存管理" key="stock">
          <StockManagement/>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  onTabChange(key) {
    console.log(key)
  }
}
export default Admin(Manage)