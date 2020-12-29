<template>
  <div>
    list
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="roleid" label="用户编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="用户名" sortable width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色"> </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启 用</el-button
          >
          <el-button type="primary" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="primary" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqManageDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(uid) {
      reqManageDel({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(uid) {
      this.$emit("edit", uid);
      console.log(uid);
    },
  },

  mounted() {},
};
</script>

<style>
</style>