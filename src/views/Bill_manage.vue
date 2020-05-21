<template>
  <div class="bill_manage">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.user" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.user" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.region" placeholder="订单状态">
          <el-option label="待受理" value="shanghai"></el-option>
          <el-option label="已受理" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="block">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <span class="demonstration">时间范围</span>
        <el-date-picker
          v-model="value2"
          range-separator="至"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']"
        ></el-date-picker>
        <el-form-item style="margin-left:10px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //日期选择器数据
      value2: "",
      // range:'至',
      formInline: {
        user: "",
        region: "已受理"
      }
    };
  },
  methods: {
    //查询方法
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style >
.bill_manage .block .el-form >span{
  margin-right: 12px;
  font-size: 14px;
  color: #606266;
}
</style>