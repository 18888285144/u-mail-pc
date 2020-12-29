import {
  reqSpecsList,reqspecsCount
} from "../../utils/http"
let state = {
  //初始化列表数据
  list: [],
  //分页
  total: "",
  //一页的数量
  size: "",
  //当前的页码
  page: 1
}
let mutations = {
  // 修改列表数据
  changeList(state, arr) {
    state.list = arr
  },
  changeTotal(state, num) {
    state.total = num
  },
  changePage(state, arr) {
    state.page = arr
  }
}
let getters = {
  //导出列表数据
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  page(state) {
    return state.page
  }
}
let actions = {
  //ajax请求列表数据
  reqList(context) {
    reqSpecsList({
      page: 1,
      size: 10
    }).then((res) => {
      if (res.data.code === 200) {
        let list = res.data.list
        list.forEach(item => {
          item.attrs = JSON.parse(item.attrs)
        });
        // 提醒state修改list
        context.commit('changeList', list)
      }
    })
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
  //命名空间
  namespaced: true
}
