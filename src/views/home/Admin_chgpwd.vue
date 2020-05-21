<template>
  <div class="admin_add">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 页头 -->
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <div id="addForm">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="oldPwd">
              <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码小于6位"));
        } else {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        //新密码格式验证
        pass: [{ validator: validatePass, trigger: "blur" }],
        //新密码确认验证
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async valid => {
        // if (valid) {
        //   //获取原密码，与输入的原密码进行验证
        //   let oldPassword=sessionStorage.getItem('pwd')
        //   //设置请求数据
        //   let obj={
        //     id:parseInt(sessionStorage.getItem('id')),
        //     token:sessionStorage.getItem('token'),
        //     //原密码
        //     oldPassword:oldPassword,
        //     newPassword:this.ruleForm.pass
        //   }
        //  if(obj.oldPassword===this.ruleForm.oldPwd){
        //     let d=await this.axios.post('/sell/users.php?a=chgpwd', this.qs.stringify(obj))
        //     console.log(d);
        //     if(d.data.code===0){
        //       sessionStorage.setItem('pwd',obj.newPassword)
        //       this.$message({type:'success',message:d.data.msg})
        //     }
        //  }else{
        //    this.$message.error('原密码输入错误')
        //    return;
        //  }

        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
        if (valid) {
          //设置请求数据
          let obj = {
            id: parseInt(sessionStorage.getItem("id")),
            token: sessionStorage.getItem("token"),
            //原密码
            oldPassword:this.ruleForm.oldPwd,
            newPassword: this.ruleForm.pass
          };

          let d = await this.axios.post(
            "/sell/users.php?a=chgpwd",
            this.qs.stringify(obj)
          );
          console.log(d);
          if (d.data.code === 0) {
            this.$message({ type: "success", message: d.data.msg });
            this.$router.push('/logout')
          }else{
            this.$message.error(d.data.msg)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style >
#addForm {
  background: #fff;
}
#addForm > .el-form {
  padding-top: 20px;
  padding-bottom: 1px;
}
#addForm > .el-form input {
  width: 250px;
}
#addForm > .el-form .el-select input {
  width: 100%;
}
#addForm > .el-form .el-input {
  width: 250px;
}
.el-page-header__left {
  display: none;
}
.el-page-header {
  background: #fff;
  /* padding-bottom: 20px; */
  border-bottom: 1px solid #f5f6fa;
  line-height: 50px;
  text-indent: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  display: none;
}
</style>