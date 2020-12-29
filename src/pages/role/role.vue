<template>
  <div>
    角色管理
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqRoleMenu } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        //定义弹框状态
        isshow: false,
        //定义是添加弹出
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqRoleMenu().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>