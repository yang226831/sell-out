<template>
  <div class="admin_list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" ref="multipleTable">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="账号" width="150">
            <template slot-scope="scope">
              <div slot="reference">
                <p>{{ scope.row.account }}</p>
              </div>
            </template>
          </el-table-column>
          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="160"></el-table-column>
          <!-- 日期 -->
          <el-table-column prop="ctime" label="创建时间" width="270"></el-table-column>
          <!-- 用户头像 -->
          <el-table-column label="头像" width="200">
            <template scope="scope">
              <img :src="scope.row.imgUrl" width="40" height="40" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row); dialogVisible = true">修改</el-button>
              <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <div style="margin-top:20px">
          <el-button type="danger" @click="delAll()">批量删除</el-button>
          <el-button type="primary" @click="toggleSelection()">取消按钮</el-button>
        </div>
      </div>
    </el-card>
    <!-- 模态框 -->
    <el-dialog title="修改账号" :visible.sync="dialogVisible">
      <el-form :model="accForm" size="small">
        <el-form-item label="账号" label-width="80px" style="width:290px;">
          <el-input v-model="accForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" label-width="80px">
          <el-select v-model="accForm.userGroup" placeholder="请选择用户组" style="width:290px;">
            <el-option value="超级管理员"></el-option>
            <el-option value="至尊管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeAcc(); dialogVisible = false;">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LoginVue from "../Login.vue";
export default {
  data() {
    let url = JSON.parse(sessionStorage.getItem("userLogin"));
    return {
      // 模态框默认不显示
      dialogVisible: false,
      url: url.imgUrl,
      //修改表单数据
      accForm: {
        account: "",
        userGroup: ""
      },
      // 分页数据
      currentPage: 1,
      total: 60,
      pageSize: 5,
      //表格数据
      tableData: [],
      multipleSelection: [],
      // 封装aixos请求函数,渲染页面，以便调用
      async rend() {
        let d = await this.axios.get(
          `/sell/users.php?a=list&currentPage=${this.currentPage}&pageSize=${this.pageSize}`
        );
        console.log(d);
        //字符串转换成数字
        this.total = parseInt(d.data.total);
        this.tableData = d.data.data;
      }
    };
  },

  //表单方法
  methods: {
    edit(row) {
      // 回填数据(浅拷贝),两个对象内的属性名一致
      this.accForm = { ...row };
      // console.log(this.accForm);
    },
    // 修改账号
    async changeAcc() {
      let obj = {
        account: this.accForm.account,
        userGroup: this.accForm.userGroup,
        id: this.accForm.id
      };
      let d = await this.axios.post(
        "/sell/users.php?a=edit",
        this.qs.stringify(obj)
      );
      // console.log(d);
      if (d.data.code === 0) {
        this.rend();
        this.$message({ type: "success", message: "修改成功!" });
      } else {
        this.$message.error("修改失败");
      }
    },
    //删除单条数据
    async del(row) {
      // console.log(row.id, row);
      let d = await this.axios.get(`/sell/users.php?a=delete&id=${row.id}`);
      console.log(d);
      if (d.data.code === 0) {
        this.$message({ type: "success", message: "删除成功" });
        this.rend();
      }
    },
    // 批量删除
    delAll() {
      this.$refs.multipleTable.selection.forEach(async item => {
        console.log(item.id);
        let d = await this.axios.get(`/sell/users.php?a=delete&id=${item.id}`);
        if (d.data.code === 0) {
          this.$message({ type: "success", message: "批量删除成功" });
          this.rend();
        }
      });
    },
    // 批量取消选中
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },
    // 分页方法
    //每页显示多少条
    handleSizeChange(val) {
      this.pageSize = val; //改变每页条数时，修改当前页码
      console.log(`每页 ${val} 条`);
      this.rend();
    },
    handleCurrentChange(val) {
      // 改变页码执行函数，获取当前页码数据
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.rend();
    },
    //模态框关闭方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
    this.rend();
  }
};
</script>


<style>
.admin_list .el-page-header__left {
  display: none;
}
.admin_list .el-page-header {
  background: #fff;
  /* padding-bottom: 20px; */
  border-bottom: 1px solid #f5f6fa;
  line-height: 50px;
  text-indent: 20px;
}
.admin_list .el-table {
  padding-top: 10px;
  padding-left: 20px;
}
.admin_list .el-pagination {
  margin-top: 20px;
}
.admin_list .el-dialog input {
  border-radius: 5px;
  text-indent: 3px;
}
.admin_list .el-form-item__content {
  width: 290px;
}
</style>