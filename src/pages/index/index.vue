<template>
  <div>
    <el-container>
      <div class="wrap">
        <!-- 左侧 -->
        <el-aside>
          <el-col>
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#20222a"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/menu">菜单管理</el-menu-item>
                  <el-menu-item index="/role">角色管理</el-menu-item>
                  <el-menu-item index="/manage">管理员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">商城管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/cate">商品分类</el-menu-item>
                  <el-menu-item index="/specs">商品规格</el-menu-item>
                  <el-menu-item index="/goods">商品管理</el-menu-item>
                  <el-menu-item index="/member">会员管理</el-menu-item>
                  <el-menu-item index="/banner">轮播图管理</el-menu-item>
                  <el-menu-item index="/seckill">秒杀活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
      </div>

      <el-container>
        <!-- 中上 -->
        <el-header class="el-header">
          <h5>Header</h5>
        </el-header>

        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 中 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
  height: 100vh;
  background-color: #20222a;
}
.el-header {
  width: 100vw;
  height: 80px;
  background: #b3c0d1;
  margin-bottom: 20px;
}
</style>