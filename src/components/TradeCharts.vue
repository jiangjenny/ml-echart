<template>
  <div class="Provincial trade">
    <div id="myChart5" style="width: 400px;height:300px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: {
        target: null, //设定一个标识，当页面为空的时候后续进行初始化
        option: {
          title: {
            text: "交易走势图",
            x: "center",
            y: "top",
            textAlign: "left",
            textStyle: {
              //标题颜色
              // color: '#fff'
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          legend: {
            data: []
          },
          grid: {
            //绘图区调整
            left: "3%",
            right: "10%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              name: "日期",
              data: ["23", "24", "25", "26", "27", "28", "29"],
              axisPointer: {
                type: "shadow"
              },
              axisLine: { show: true, lineStyle: { color: "red" } }, //坐标轴 颜色修改
              axisTick: [
                {
                  //坐标轴小标记
                  show: false
                }
              ],
              splitLine: {
                //坐标轴网格线
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "万元",
              min: 0,
              // max: 3000,
              interval: 500,
              position: "left",
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: { show: true, lineStyle: { color: "red" } }, //坐标轴 颜色修改
              splitLine: {
                //坐标轴网格线
                show: false
              }
            },
            {
              type: "value",
              name: "",
              min: 0,
              position: "left",
              // max: ,
              interval: 500,
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: { show: true, lineStyle: { color: "red" } }, //坐标轴 颜色修改
              splitLine: {
                //坐标轴网格线
                show: false
              }
            }
          ],
          series: [
            {
              name: "交易额",
              type: "bar",
              data: [1578, 1790, 2500, 1508, 1690, 2790, 2987],
              barMinHeight: 20, //最小柱高
              barWidth: 25, //柱宽度
              barMaxWidth: 50, //最大柱宽度
              itemStyle: {
                normal: {
                  //柱状图颜色
                  color: "skyblue"
                }
              }
            },
            {
              name: "万元",
              type: "line",
              yAxisIndex: 1,
              data: [1578, 1790, 2500, 1508, 1690, 2790, 2987],
              itemStyle: {
                normal: {
                  //柱状图颜色
                  color: "orange"
                }
              }
            }
          ]
        }
      }
    };
  },
  props: ["chartData"],
   watch: {
    chartData() {
      if (this.chartData.length) {
        this.draw();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chartsInit();
    });
  },
  methods: {
    chartsInit() {
      // 基于准备好的dom，初始化echarts实例
      if (!this.chart.target) {
        this.chart.target = this.$echarts.init(
          document.getElementById("myChart5")
        );
      }
      // 绘制图表
      this.chart.target.setOption(this.chart.option);
    },
    // 重绘
    draw() {
      // 配置项需要变更
      let option = {
        series: [
          {
            name: "邮件营销",
            type: "line",
            data: this.chartData
          }
        ]
      };
      this.myChart5.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>