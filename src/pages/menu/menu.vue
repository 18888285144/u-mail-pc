<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./compontent/list";
import vAdd from "./compontent/add";
import { reqListMenu } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      //初始化列表数据
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqListMenu().then((res) => {
        this.list = res.data.list;
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