/*
* @Author: CC
* @Date:   2015-08-13 11:36:25
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:12:16
*/

import Reflux from 'reflux'
import UserService from '../services/user'

export default Reflux.createActions({
  load: { asyncResult: true },
  updateStatus: {},
  resetPassword: {},
  remove: {}
})