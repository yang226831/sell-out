<template>
  <div class="admin_add">
    <el-card class="box-card">
      <!-- 表头信息 -->
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <!-- 表单 -->
      <div class="text item" id="addForm">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="pass">
            <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="ruleForm.userGroup">
              <el-option value="超级管理员"></el-option>
              <el-option value="至尊管理员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //表单：设置数据验证函数(自定义验证)
    //用户组验证
    var checkAge = (rule, value, callback) => {
      // console.log(value);
      if (value.length < 0) {
        return callback(new Error("用户组不能为空"));
      } else {
        callback();
      }
    };
    // 账号验证
    var validatePass = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (value.length < 2) {
          callback(new Error("用户名小于2位"));
        } else {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) callback(new Error("密码少于6位!"));
      }
      callback();
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        userGroup: "超级管理员"
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userGroup: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 验证表单，并发送axios（登录请求）
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        //表单验证成功（为true），发送axios请求
        if (valid) {
          var that = this;
          // 获取添加数据
          let obj = {
            account: this.ruleForm.pass,
            password: this.ruleForm.checkPass,
            userGroup: this.ruleForm.userGroup
          };

          // axios发送请求,async配合await拉平promise对象 (减少.then的代码量)
          let d = await this.axios.post("/sell/users.php?a=add", this.qs.stringify(obj));
          // 发送成功，弹出提示消息（后台验证）;
          if (d.data.code === 0) {
            this.$message({
              type: "success",
              message: d.data.msg
            });
            this.$router.push("/home/admin_list");
          } else {
            // 发送失败，弹出提示消息（后台验证）
            this.$message.error(d.data.msg);
          }
          // ajax发送请求
          // let { pass, checkPass, userGroup } = this.ruleForm;
          // var xhr = new XMLHttpRequest();
          // xhr.open("post", "http://work.08321.org/sell/users.php?a=add")
          // xhr.setRequestHeader(
          //   "Content-Type",
          //   "application/x-www-form-urlencoded"
          // );
          // // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
          // xhr.send(
          //   `account=${pass}&password=${checkPass}&userGroup=${userGroup}`
          // );
          // xhr.onreadystatechange = function() {
          //   if (xhr.readyState === 4 && xhr.status === 200) {
          //     var data = xhr.responseText;
          //     data = JSON.parse(data);
          //     console.log(data);
          //     if (data.code === 0) {
          //       that.$message({
          //         message: "恭喜你，" + data.msg,
          //         type: "success"
          //       });
          //       that.$router.push('/home/admin_list')
          //     } else {
          //       that.$message.error(data.msg);
          //     }
          //   }
          // };
        } else {
          // 表单验证失败
          console.log("error submit!!");
          return false;
        }
      });
    },

    //重置表单输入内容
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
  padding-bottom: 10px;
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
</style>