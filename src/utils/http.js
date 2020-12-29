import Vue from "vue"
import axios from "axios"
import qs from "qs"
import {
  successalert
} from "../utils/alert"
//开发环境拦截
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境拦截
// let baneUrl = ""
// Vue.prototype.$pre = ""

//响应拦截
axios.interceptors.response.use(res => {
  console.group("本次请求的是：" + res.config.url)
  console.log(res)
  console.groupEnd()
  if (res.data.code !== 200) {
    successalert(res.data.msg)
  }
  if (res.data.list == null) {
    res.data.list = []
  }
  return res
})


//**************************菜单接口********************************************************************

//菜单添加
export let reqAddMenu = (user) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(user)
  })
}

//菜单列表
export let reqListMenu = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    params: {
      istree: true
    }
  })
}

//菜单删除
export let reqListDel = (obj) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify(obj)
  })
}

//编辑,获取一条
export let reqMenuDetail = (obj) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    params: obj
  })
}

//修改
export let reqMenuUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(user)
  })
}

//**************************角色接口********************************************************************
//角色添加
export let reqAddRole = (user) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(user)
  })
}

// 角色列表
export let reqRoleMenu = () => {
  return axios({
    url: baseUrl + "/api/rolelist"
  })
}

//菜单删除
export let reqRoleDel = (obj) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify(obj)
  })
}

//角色编辑,获取一条
export let reqRoleDetail = (obj) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    params: obj
  })
}

// //修改
export let reqRoleUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(user)
  })
}

//**************************菜单接口********************************************************************

//管理员添加
export let reqManageAdd = (user) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(user)
  })
}

// 管理员列表
export let reqManageList = (obj) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: obj
  })
}

// //管理员删除
export let reqManageDel = (user) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(user)
  })
}

//管理员编辑,获取一条
export let reqManageDetail = (user) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: user
  })
}

// //管理员修改
export let reqManageUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(user)
  })
}

//总数
export let reqManageCount = () => {
  return axios({
    url: baseUrl + "/api/usercount"
  })
}

//**************************菜单接口********************************************************************
function dataToFormData(user) {
  let data = new FormData()
  for (let i in user) {
    data.append(i, user[i])
  }
  return data
}

//商品分类添加
export let reqCateAdd = (user) => {
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: dataToFormData(user)
  })
}

// 商品分类列表
export let reqCateList = (p) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: p
  })
}

// //商品分类删除
export let reqCateDel = (user) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify(user)
  })
}

//商品分类编辑,获取一条
export let reqCateDetail = (user) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: user
  })
}

// //商品分类修改
export let reqCateUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: dataToFormData(user)
  })
}
// -------------------商品规格管理--------
//商品添加
export let reqSpecsAdd = (user) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(user)
  })
}
// 商品列表
export let reqSpecsList = (p) => {
  return axios({
    url: baseUrl + "/api/specslist",
    params: p
  })
}

//详情
export let reqspecsDetail = (user) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: user
  })
}

//修改
export let reqspecsUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(user)
  })
}

//删除
export let reqspecsDel = (user) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify(user)
  })
}

export let reqspecsCount = () => {
  return axios({
    url: baseUrl + "/api/specscount"
  })
}

/************商品管理 start**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: dataToFormData(user)
  })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (obj) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: obj
  })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: user
  })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: dataToFormData(user)
  })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify(user)
  })
}

//总数
export let reqgoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount"
  })
}






























// -------------------轮播图管理--------
// 轮播图添加
export let reqBanneradd = (obj) => {
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: dataToFormData(obj)
  })
}
// 轮播图列表
export let reqBannerlist = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get"
  })
}
// 轮播图获取
export let reqBannerinfo = (obj) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: obj
  })
}
// 轮播图修改
export let reqBanneredit = (obj) => {
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: dataToFormData(obj)
  })
}
// 轮播图删除
export let reqBannerdelete = (obj) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify(obj)
  })
}
