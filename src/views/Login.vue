<template>
  <div class="login">
    <el-form
      status-icon
      ref="loginForm"
      class="demo-ruleForm"
      :rules="rules"
      :model="form"
      size="saml"
    >
      <h1>系统登录</h1>
      <el-form-item prop="username">
        <el-input
          type="text"
          autocomplete="off"
          placeholder="用户名"
          v-model="form.username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input placeholder="密码" v-model="form.pwd" show-password prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // this.$refs["loginForm"].validate(async valid => {
      //   if (valid) {
      //     //验证成功，发送登录请求
      //     let obj = {
      //       account: this.form.username,
      //       password: this.form.pwd
      //     };
      //     let d = await this.axios.post( "/sell/users.php?a=login",  this.qs.stringify(obj));
      //     console.log(d);
      //     // 登录成功，弹出成功消息，并跳转
      //     if (d.data.code === 0) {
      //       this.$message({
      //         message: "恭喜你，登录成功",
      //         type: "success"
      //       });
      //       // 存储临时数据
      //       sessionStorage.setItem('id',d.data.data.id)
      //       sessionStorage.setItem('token',d.data.token)
      //       sessionStorage.setItem('userLogin',JSON.stringify(d.data.data))
      //       // 跳转到主页
      //       this.$router.push('/home')
      //     } 
      //     // 登录失败，弹出失败消息
      //     else {
      //      this.$message.error(d.data.msg);;
      //     return false;}
      //   } 
      // });
      // 表单验证
      this.$refs.loginForm.validate(async valid=>{
        // 验证成功
        if(valid){
          // 发送登录请求
          let obj={
            account:this.form.username,
            password:this.form.pwd
          }
          let d=await this.axios.post('/sell/users.php?a=login', this.qs.stringify(obj))
          console.log(d);
          
          if(d.data.code===0){
            this.$message({
              type:'success',
              message:d.data.msg
            })
            
            sessionStorage.setItem('id',d.data.data.id)
            sessionStorage.setItem('token',d.data.token)
            sessionStorage.setItem('userLogin',JSON.stringify(d.data.data))
            // sessionStorage.setItem('pwd',d.data.data.password)

            this.$router.push('/home')
          }else{
            // 登录失败
            this.$message.error(d.data.msg)
          }
        }else{
          console.log('验证失败');
          return;
        }
      })
    }
  }
};
</script>

<style >
.login {
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login h1 {
  text-align: center;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}
.login .el-form {
  width: 300px;
}
.login .el-form input {
  background: #2d3a4b;
  color: #fff;
}
.login .el-form i {
  color: #fff;
}
</style>