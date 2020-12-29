<template>
  <div>
    add
    <el-dialog
      :title="info.isadd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 需要数据 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="100px"
          v-if="user.type == 1"
        >
          <el-select v-model="user.icon" placeholder="--请选择--">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url" placeholder="--请选择--">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="item.path"
              :label="item.name + '-/' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-tooltip>
            <el-switch
              v-model="user.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-tooltip>
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
import { reqAddMenu, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { indexRoutes } from "../../../router/index";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      //用作清空
      empty() {
        this.user = {
          pid: 0,
          title: "",
          icon: "",
          type: 1,
          url: "",
          status: 1,
        };
      },
      indexRoutes,
    };
  },
  methods: {
    //取消
    cancel() {
      this.info.isshow = false;
      this.empty();
    },
    add() {
      reqAddMenu(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
        }
      });
    },
    update() {
      reqMenuUpdate(this.user).then((res) => {
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