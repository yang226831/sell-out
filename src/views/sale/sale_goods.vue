<template>
  <div class="sale_goods">
    <div class="block">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <span class="demonstration">时间范围</span>
        <el-date-picker
          v-model="value2"
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
    <!-- echarts图表 -->
    <div id="myChart" :style="{width: '100%-20px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //日期选择器数据
      value1: "",
      value2: "",
      //表单数据
      formInline: {
        user: "",
        region: ""
      },
      category:[],
      num:[]
    };
  },
  methods: {
    //查询方法
    onSubmit() {
      console.log("submit!");
    },
    // 图表方法
    async drawLine() {
      let d=await this.axios.get('/sell/counter.php?a=goods&field=date')
      d.data.data.forEach(item=>{
        this.num.push(item.num)
        this.category.push(item.ctime)
      })     
      console.log(this.category);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "商品统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
      
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data:this.category
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data:this.num
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style>
#myChart {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
}
.sale_goods .block {
  margin-bottom: 20px;
}
.sale_goods .demonstration {
  color: #828487;
  margin-right: 10px;
}
</style>