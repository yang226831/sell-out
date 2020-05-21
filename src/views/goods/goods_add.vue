<template>
  <div class="goods_add">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" style="width:205px;"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="手办" value="手办"></el-option>
              <el-option label="周边" value="周边"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品特色">
            <el-checkbox-group v-model="form.type" style="width:500px">
              <el-checkbox label="新品上市" name="type"></el-checkbox>
              <el-checkbox label="第二单半价" name="type"></el-checkbox>
              <el-checkbox label="主打产品" name="type"></el-checkbox>
              <el-checkbox label="火爆产品" name="type"></el-checkbox>
              <el-checkbox label="祖传手艺" name="type"></el-checkbox>
              <el-checkbox label="源自四川" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://work.08321.org/sell/goods.php?a=uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="form.spaec">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商品规格">
            <el-radio-group v-model="form.resource">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="包装费">
            <el-input-number v-model="form.num" :min="1" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number v-model="form.num1" :min="1" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 10,
      num: 1,
      form: {
        name: "",
        region: "手办",
        date1: "",
        date2: "",
        type: [],
        resource: "单规格",
        spaec: "促销",
        desc: "",
        imageUrl: "",
        num: 0,
        num1: 20
      }
    };
  },
  methods: {
    //上传图片方法
    handleAvatarSuccess(res) {
      this.form.imageUrl='http://work.08321.org/'+res.data;
      this.$message({type:'success',message:'商品图片添加成功'})
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加商品
    async onSubmit() {
      let obj = {
        goodsname: this.form.name,
        goodscategory: this.form.region,
        goodsfeature: this.form.type.join(","),
        imgUrl: this.form.imageUrl,
        isPromotion: this.form.spaec,
        standard: this.form.resource,
        packprice: this.form.num,
        price: this.form.num1,
        goodsdesc: this.form.desc
      };
      // console.log(obj);
      let d=await this.axios.post('/sell/goods.php?a=add',this.qs.stringify(obj))
      if(d.data.code===0){
        this.$message({type:'success',message:'商品添加成功'})
        this.$router.push('/home/goods_list')
      }
    }
  }
};
</script>

<style>
.goods_add .el-image {
  width: 200px;
  height: 200px;
  background-color: transparent;
  border: 1px dashed #e8e8e8;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods_add .el-image i {
  font-size: 50px;
  color: #9198a1;
}
.goods_add .el-input-group__prepend,
.goods_add .el-input-group__append {
  padding: 0 10px;
  font-size: 20px;
  cursor: pointer;
}
.goods_add .el-input-group--append .el-input__inner {
  text-align: center;
}
.goods_add .el-input-group__append {
  padding: 0 13px;
}

.goods_add .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.goods_add .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.goods_add .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.goods_add .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>