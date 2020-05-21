<template>
  <div class="goods_list">
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品特性">
              <span>{{ props.row.goodsfeature }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
             <el-form-item label="是否促销">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="规格">
              <span>{{ props.row.standard }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
            <el-form-item label="添加时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id" width='100'></el-table-column>
      <el-table-column label="商品名称" prop="goodsname"  width='150'></el-table-column>
      <el-table-column label="商品图片" width="200">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.imgUrl" width="40" height="40" /> -->
           <el-avatar :size="100"  shape="square" :src="scope.row.imgUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="goodsdesc" width='250'></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:20px;margin-left:10px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页数据
      currentPage: 1, //当前页码
      pageSize: 5, //每页5条数据
      total: 10, //总的数据条数
      //表格数据
      tableData: []
    };
  },
  methods: {
    // 发送请求，获取数据
    async render() {
      let d = await this.axios.get(`/sell/goods.php?a=list&currentPage=${this.currentPage}&pageSize=${this.pageSize}`);
      console.log(d);
      this.total = parseInt(d.data.total);
      this.tableData = d.data.data;
    },
    // 分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.render();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.render();
      console.log(`当前页: ${val}`);
    },
    //表格方法
    handleEdit(row) {
      //跳转路由并传值id
      let changeRoute = this.$router.push(`/home/goods_change/${row.id}`);
      // console.log(changeRoute);
    },
    //删除单条商品数据
    async handleDelete(row) {
      console.log(row.id);
      let d=await this.axios.get('/sell/goods.php?a=delete&id='+row.id)
      if(d.data.code===0){
        this.$message({type:'success',message:'该商品删除成功'})
        this.render();
      }
      else{
        this.$message.error('该商品删除失败')
      }
    }
  },
  // 获取商品列表
  created() {
    this.render();
  }
};
</script>

<style>
.goods_list {
  height: 100%;
  background: #fff;
}
.goods_list .demo-table-expand {
  font-size: 0;
}
.goods_list .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.goods_list .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>