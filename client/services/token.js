/*
* @Author: CC
* @Date:   2015-08-12 09:14:04
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:12:40
*/

export default req => {
  const token = require('../stores/auth').getState().token
  req.set('Authorization', `Bearer ${token}`)
  return req
}