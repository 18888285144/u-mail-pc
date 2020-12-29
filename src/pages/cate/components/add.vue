<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      {{ user }}
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" v-if="user.pid !== 0">
          <div class="my-img">
            <div class="add">+</div>
            <img v-if="urlImg" class="imgUrl" :src="urlImg" alt="" />
            <input
              v-if="info.isshow"
              class="input"
              type="file"
              @change="changeImg"
            />
          </div>
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
import { reqCateAdd, reqCateDetail, reqCateUpdate } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert.js";
export default {
  props: ["info", "list"],
  data() {
    return {
      // 定义图片地址
      urlImg: "",

      //定义添加的数据
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    changeImg(e) {
      let file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }

      let extname = file.name.slice(file.name.lastIndexOf("."));

      let arr = [".png", ".gif", ".jpg", ".jpeg"];

      if (!arr.some((item) => item === extname)) {
        successalert("请上传照片");
        return;
      }

      this.urlImg = URL.createObjectURL(file);

      this.user.img = file;
    },

    //定义变量数据清空
    empty() {
      this.user =  {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      this.urlImg = "";
    },
    //点击取消，弹框消失
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },

    add() {
      console.log(this.user);
      reqCateAdd(this.user).then((res) => {
        if ((res.data.code = 200)) {
          successalert(res.data.msg);
          this.user = res.data.list;
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },

    getOne(id) {
      reqCateDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },

    update() {
      reqCateUpdate(this.user).then((res) => {
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

<style scoped>
.my-img {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  position: relative;
}
.my-img .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-img .imgUrl {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.my-img .input {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
