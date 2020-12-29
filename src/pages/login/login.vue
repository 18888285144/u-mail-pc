<template>
  <div class="wrap">
    <div class="box">
      <el-input placeholder="请输入内容" v-model="user.name" clearable>
      </el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        v-model="user.password"
        show-password
      ></el-input>
      <el-button class="button" type="primary" plain @click="login"
        >主要按钮</el-button
      >
    </div>
  </div>
</template>

<script>
// import { reqLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // reqLogin().then((res) => {
      // this.$router.push("/")
      // });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.wrap .box {
  width: 400px;
  background: #ffffff;
  padding: 40px;
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5%;
}
.wrap .box .input {
  margin-top: 20px;
}
.wrap .box .button {
  margin-top: 20px;
  margin-left: 30%;
}
</style>