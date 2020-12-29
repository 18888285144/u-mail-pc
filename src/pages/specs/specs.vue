<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
  <script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  components: { vList, vAdd },
  data() {
    return {
      //定义弹窗变量是否打开
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
    },
    //编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },
};
</script>

  <style scoped>
</style>