<template>
  <div>
    list
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>

      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编 辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoleDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点了删除按钮
        reqRoleDel({ id: id }).then((res) => {
          if (res.data.code === 200) {
            successalert(res.data.msg);
            this.$emit("init");
          }
        });
      });
    },
    //点击了编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>