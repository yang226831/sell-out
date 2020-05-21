<template>
  <div class="home">
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <!-- 设置当前选中项（刷新时标签颜色不变）：:default-active="this.$route.path" -->
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#3F98F6"
          router
        >
          <img src="../assets/images/02-帐号列表_01.png" style="width:100%" />
          <!-- 首页  -->
          <el-menu-item index="/home">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <!-- 订单管理 -->
          <el-menu-item index="/home/bill_manage">
            <i class="iconfont icon-dingdan"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <!-- 商品管理 -->
          <el-submenu index="/home/goods">
            <template slot="title">
              <i class="iconfont icon-shangpin"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/home/goods_list">商品列表</el-menu-item>
            <el-menu-item index="/home/goods_add">添加商品</el-menu-item>
          </el-submenu>
          <!-- 店铺管理 -->
          <el-menu-item index="/home/shop">
            <i class="icon-dianpu iconfont"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>
          <!-- 账号管理 -->
          <el-submenu index="/home/admin">
            <template slot="title">
              <i class="icon-zhanghao iconfont"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/home/admin_list">账号列表</el-menu-item>
            <el-menu-item index="/home/admin_add">添加账号</el-menu-item>
            <el-menu-item index="/home/admin_chgpwd">修改密码</el-menu-item>
          </el-submenu>
          <!-- 销售统计 -->
          <el-submenu index="home/sale">
            <template slot="title">
              <i class="icon-xiaoshoutongji iconfont"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/home/sale_goods">商品统计</el-menu-item>
            <el-menu-item index="/home/sale_order">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-container>
        <el-header>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in this.$route.meta" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 右侧(用户) -->
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎你，{{userinfo.account}}
              <el-avatar :size="50" :src="avatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="#/home/admin_info">个人信息</a></el-dropdown-item>
              <!-- 跳转至退出页面，退出系统 -->
              <el-dropdown-item><a href="#/logout">退出系统</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 主要内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import avatar from "../assets/images/001.jpg";
export default {
  data() {
    let userinfo = JSON.parse(sessionStorage.getItem("userLogin"));
    return {
      avatar:userinfo.imgUrl,
      userinfo
    };
  },
  async created(){
    // 设置登录守卫，防止用户绕过登录直接访问网址，读取内容
    let id=sessionStorage.getItem('id')
    let token=sessionStorage.getItem('token')
    let d=await this.axios.get(`/sell/users.php?a=chklogin&id=${parseInt(id)}&token=${token}`)
    // 检查token和id，不符合后台数据就跳转到登录页面
    if(d.data.code>0){
      //跳转首页，且history不可返回
      this.$message.error('朋友，请登录后进入！！！！')
      this.$router.replace('/')
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
      background: #304156;
      overflow: visible !important;
      img {
        display: block;
        // vertical-align: middle;
      }
      .el-menu {
        border: none;
      }
      .el-menu-item [class^="el-icon-"] {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
      }
      .el-menu-item i {
        color: #909399;
      }
      i {
        margin-right: 5px;
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .is-vertical {
      span {
        line-height: 60px;
      }
    }
  }
  .el-main {
    background: #f0f2f5;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    span {
      vertical-align: middle;
      display: inline-block;
      height: 60px;
      img{
        height: 60px;
      }
    }
  }
}
</style>