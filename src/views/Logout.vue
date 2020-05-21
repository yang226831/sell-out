<template>
  <div>
    <h1>退出系统</h1>
  </div>
</template>

<script>
export default {
  // 退出系统
  mounted() {
    // 清空存储（退出系统），并跳转到首页
    sessionStorage.clear();
    this.$router.replace("/");
  }
};
</script>