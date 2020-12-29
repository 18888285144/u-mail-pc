import {
  reqgoodslist
} from "../../utils/http";

let state = {
  //列表
  list: [],
  //总数
  total: 0,
  //一页的数量
  size: 2,
  //当前的页码
  page: 1
}
let mutations = {
  changeList(state, arr) {
    state.list = arr;
  },
}
let getters = {
  list(state) {
    return state.list
  },
}
let actions = {
  //获取list的action
  reqList(context) {

    //发请求
    reqgoodslist({
      page: 1,
      size: 50
    }).then(res => {
      if (res.data.code) {
        //修改list
        context.commit("changeList", res.data.list)
      }
    })
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}
