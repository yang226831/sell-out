<template>
  <div class="index">
    <div class="data">
      <div class="order">
        <i
          class="el-icon-document"
          style="font-size:80px; color:#1296DB;width:50%;text-align: center;"
        ></i>
        <div>
          <h4>总订单</h4>
          <p>102,400</p>
        </div>
      </div>

      <div class="order">
        <i
          class="iconfont icon-dangrixiaoshoue"
          style="font-size:80px; color:#DE599A;width:50%;text-align: center;"
        ></i>
        <div>
          <h4>总销售额</h4>
          <p>102,400</p>
        </div>
      </div>

      <div class="order">
        <i
          class="el-icon-s-order"
          style="font-size:80px; color:#1296DB;width:50%;text-align: center;"
        ></i>
        <div>
          <h4>今日订单数</h4>
          <p>102,400</p>
        </div>
      </div>

      <div class="order">
        <i
          class="el-icon-document-copy"
          style="font-size:80px; color:#1AFA29;width:50%;text-align: center;"
        ></i>
        <div>
          <h4>今日销售额</h4>
          <p>102,400</p>
        </div>
      </div>
    </div>
    <div id="myChart" :style="{width: '100%-20px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dx:[],
      dy:[],
      Y:[],
      X:[]
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async drawLine() {
      let d=await this.axios.get('/sell/counter.php?a=users&field=date')
      let d1=await this.axios.get('/sell/counter.php?a=goods&field=date')
      
      d.data.data.forEach(item=>{
        this.dx.push(item.ctime)
        this.dy.push(item.num)
      })
 
      d1.data.data.forEach(item=>{
        this.X.push(item.ctime)
        this.Y.push(item.num)
      })
    
      
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["商品统计", "用户统计"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.X
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "商品统计",
            type: "line",
            // data: [120, 132, 101, 134, 90, 230, 210],
             data:this.Y
          },
          {
            name: "用户统计",
            type: "line",
            data: this.dy
          }
        ]
      });
    }
  }
};
</script>

<style>
#myChart {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
}
.index .data {
  display: flex;
  justify-content: space-between;
}
.index .data .order {
  width: 20%;
  display: flex;
  background: #fff;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}
.index .data .order div {
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.index .data .order div h4 {
  font-weight: 400;
  color: #cecece;
}
.index .data .order div p {
  font-weight: bold;
}
</style>