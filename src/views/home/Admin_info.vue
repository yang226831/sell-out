<template>
  <div class="admin_info">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员信息</span>
      </div>
      <div class="text item">
        <p>
          <span>管理员ID：</span>
          <span>{{userinfo.id}}</span>
        </p>
        <p>
          <span>账号：</span>
          <span>{{userinfo.account}}</span>
        </p>
        <p>
          <span>用户组：</span>
          <span>{{userinfo.userGroup}}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{userinfo.ctime}}</span>
        </p>
        <p style="margin-top:20px">
          <span>管理员头像：</span>
          <span>
            <!-- action 发送请求 -->
            <el-upload
              class="avatar-uploader"
              action="http://work.08321.org/sell/goods.php?a=uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    let userinfo = JSON.parse(sessionStorage.getItem("userLogin"));
    return {
      userinfo,
      imageUrl: userinfo.imgUrl
    };
  },
  methods: {
    async handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl = "http://work.08321.org" + res.data;
      let obj = {
        id:parseInt(this.userinfo.id),
        imgUrl: this.imageUrl
      };
      let d = await this.axios.post( "/sell/users.php?a=chgImg", this.qs.stringify(obj));
      if(d.data.code===0){
        this.$message({type:'success',message:'头像修改成功'})
        this.$router.push('/')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style >
.admin_info .text > p {
  line-height: 60px;
  border-bottom: 1px solid #eaecf0;
}
.admin_info .text > p:nth-last-of-type(2) {
  border-bottom: 2px solid #eaecf0;
}
.admin_info .text > p:last-of-type {
  line-height: 100px;
  border: none;
}
.admin_info .text > p > span {
  display: inline-block;
}
.admin_info .text > p .el-avatar {
  vertical-align: middle;
}

.admin_info .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.admin_info .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.admin_info .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.admin_info .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.admin_info .el-upload {
  vertical-align: middle;
}
.admin_info .el-upload img{
  width: 100px;
  height: 100px;
}
</style>