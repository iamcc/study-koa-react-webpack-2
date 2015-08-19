/*
* @Author: CC
* @Date:   2015-08-19 10:43:14
* @Last Modified by:   CC
* @Last Modified time: 2015-08-19 10:47:41
*/

export default {
  loadPage
}

function loadPage(params, state, service, changed) {
  state.loading = true
  state.error = false
  changed()

  params = params || {}
  params.page = params.page || state.pagination.current || 1
  params.limit = state.pagination.pageSize

  service.load(params, (err, res) => {
    state.loading = false

    if (err) {
      state.error = res.text
    } else {
      state.data = res.body.data
      state.pagination.current = params.page
      state.pagination.total = res.body.total
    }

    changed()
  })
}