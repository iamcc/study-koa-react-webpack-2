/*
* @Author: CC
* @Date:   2015-08-11 12:32:38
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 19:17:19
*/
'use strict'

module.exports = function(router) {
  require('./auth')(router)
  require('./user')(router)
  require('./supplier')(router)
  require('./customer')(router)

  return router
}