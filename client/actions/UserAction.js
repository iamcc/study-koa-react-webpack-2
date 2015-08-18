/*
* @Author: CC
* @Date:   2015-08-13 11:36:25
* @Last Modified by:   CC
* @Last Modified time: 2015-08-18 13:41:48
*/

import Reflux from 'reflux'
import UserService from '../services/UserService'

export default Reflux.createActions({
  load: { asyncResult: true },
  updateStatus: {},
  resetPassword: {},
  remove: {}
})