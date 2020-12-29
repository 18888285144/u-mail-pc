<template>
  <div>
    add
    <el-dialog
      :title="info.isadd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqListMenu,
  reqAddRole,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //初始化列表菜单数据
      menuList: [],
      user: {
        rolemame: "",
        menus: "",
        status: 1,
      },
    };
  },
  //进来弹框列表菜单数据赋值给树形图
  mounted() {
    reqListMenu().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
  methods: {
    // 设置勾选的值
    setCheckedKeys(data) {
      this.$refs.tree.setCheckedKeys(JSON.parse(data));
    },
    //获取选中的值
    getCheckedKeys() {
      return JSON.stringify(this.$refs.tree.getCheckedKeys());
    },
    //清空数据操作
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //树形控件清空数据
      // this.$refs.tree.setCheckedKeys([]);
      this.setCheckedKeys("[]");
    },

    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },

    add() {
      reqAddRole(this.user).then((res) => {
        //user中的rolename和statue是和表单相关的，所以这两个值不用操作，但是menus和树形控件是个之前的菜单页面的数据相关的需要将树形控件menuList上的值赋值给menus，然后再发请求
        this.user.menus = this.getCheckedKeys()
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.user = res.data.list;
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },

    getOne(id) {
      reqRoleDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          console.log(this.user);
          //如果menus为空的话
          if (this.user.menus === "") {
            this.user.menus = "[]";
          }
          this.setCheckedKeys(this.user.menus);
        }
      });
    },

    update() {
      // 修改的时候重新获取一下选中的数据
      this.user.menus = this.getCheckedKeys();
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>