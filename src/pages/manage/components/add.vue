<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      {{ user }}
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
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
  reqManageAdd,
  reqRoleMenu,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      //定义添加的数据
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      //定义来自角色列表的数据
      roleList: [],
    };
  },
  methods: {
    //定义变量数据清空
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //点击取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    add() {
      reqManageAdd(this.user).then((res) => {
        if ((res.data.code = 200)) {
          successalert(res.data.msg);
          this.user = res.data.list;
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    getOne(uid) {
      reqManageDetail({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //密码置空
          this.user.password = "";
        }
      });
    },
    update() {
      reqManageUpdate(this.user).then((res) => {
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
  mounted() {
    reqRoleMenu().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>