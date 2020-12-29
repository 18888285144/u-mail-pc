<template>
  <div>
    管理员管理
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>

    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { reqCateList } from "../../utils/http";
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
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqCateList({ istree: true }).then((res) => {
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