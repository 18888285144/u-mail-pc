<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="info.isshow"
    >
      <div>user:{{ user }}</div>
      <div>attrsArr:{{ attrsArr }}</div>
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button
              class="line-btn"
              type="primary"
              v-if="index == 0"
              @click="xinzheng"
              >新增规格属性</el-button
            >
            <el-button
              class="line-btn"
              type="danger"
              v-else
              @click="delAttrs(index)"
              >删除</el-button
            >
          </div>
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
import { mapActions, mapGetters } from "vuex";
import { successalert } from "../../../utils/alert";
import {
  reqSpecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
export default {
  //接受父组件的数据
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    //取消的方法
    cancel() {
      this.info.isshow = false;
    },
    //新增一条属性
    xinzheng() {
      this.attrsArr.push({ value: "" });
    },
    //删除一条属性
    delAttrs(index) {
      this.attrsArr.splice(index, 1);
    },
    //清空数据的方法
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    //添加的方法
    add() {
      //先将attrsArr装换为字符串，赋值给attrs
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));

      reqSpecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.empty();
          successalert(res.data.msg);
          this.reqList();
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqspecsDetail({ id: id }).then((res) => {
        this.user = res.data.list[0];
        this.user.attrs = JSON.parse(this.user.attrs);
        this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
      });
    },
    //点击了修改
    update() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
        }
      });
    },
  },
};
</script>

<style scoped>
.line {
  display: flex;
}
.line .line-btn {
  width: auto;
}
.line .line-ipt {
  flex: 1;
}
</style>