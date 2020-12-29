<template>
  <div>
    管理员管理
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-add :info="info" @init="init" ref="add"></v-add>

    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { reqManageList, reqManageCount } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },

      list: [],

      //自定义每页的个数
      pageSize: 2,
      // 总页面
      total: 0,
      // 当前页
      page: 1,
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      this.gettotal();
      reqManageList({ page: this.page, size: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(uid) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(uid);
    },
    gettotal() {
      reqManageCount().then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.total = res.data.list[0].total;
        }
      });
    },
    changePage(e) {
      this.page = e;
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>