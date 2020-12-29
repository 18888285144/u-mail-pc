<template>
  <div>
    list
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>

      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img !== 'null'"
            :src="$pre + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>

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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { reqCateDel } from "../../../utils/http";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      reqCateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },

  mounted() {},
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>