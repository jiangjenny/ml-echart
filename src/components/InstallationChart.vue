<template>
  <div class="Provincial trade">
    <div id="myChart2" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: {
        target: null, //设定一个标识，当页面为空的时候后续进行初始化
        option: {
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
            data: ["装机数", "拆机数"],
            textAlign: "right",
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            right: '4%',
            top: '2%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
          },
          grid: {
            //绘图区调整
            left: "2%",
            right: "17%",
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              name: "日期",
              data: ["23", "24", "25", "26", "27", "28", "29"],
              // data: this.type3,
              axisPointer: {
                type: "shadow"
              },
              axisLine: { show: true, lineStyle: { color: "rgba(111, 150, 185, 0.5)" } },
              axisTick: [
                {
                  show: false
                }
              ],
              splitLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: 'rgb(93,219,255)',
                  fontSize: "0.12rem",
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "单位/台",
              position: "left",
              axisLabel: {
                formatter: "{value}"
              },
              axisTick: [
                {
                  show: false
                }
              ],
             axisLine: { show: false,lineStyle: { color: "rgb(93,219,255)"}}, 
              splitLine: {
                show: false
              }
            },
            {
              type: "value",
              name: "",
              position: "left",
              axisLabel: {
                 textStyle: {
                  color: 'rgb(93,219,255)',
                },
                formatter: "{value}"
              },
              axisLine: { show: false, lineStyle: { color: "rgb(93,219,255)" } }, //坐标轴 颜色修改
              splitLine: {
                //坐标轴网格线
                show: false
              }
            }
          ],
          series: [
            {
              name: "装机数",
              type: "line",
              data: [167, 89, 98, 123, 190, 298, 300],
              itemStyle: {
                normal: {
                  color: 'rgb(244,94,35)'
                }
              },
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [
                  { type: "average", name: "平均值" },
                ]
              }
            },
            {
              name: "拆机数",
              type: "line",
              data: [36, 46, 78, 64, 47, 72, 85],
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              itemStyle: {
                normal: {
                  color: 'rgb(0,180,177)'
                }
              },
              markLine: {
                data: [
                  { type: "average", name: "平均值" },
                ]
              }
            }
          ]
        }
      }
    };
  },
  props: ["data3"],
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
          document.getElementById("myChart2")
        );
      }
      // 绘制图表
      this.chart.target.setOption(this.chart.option);
      window.addEventListener("resize", () => {  this.chart.target.resize();});
    },
    // 重绘
    draw() {
      // var arr = [];
      // let type = [];
      // let amount = [];
      // for(var key in this.data3){
      //   var obj = {};
      //   obj.type = key;
      //   obj.amount = this.data3[key];
      //   arr.push(obj);
      // }
      // arr = arr.sort((a1,a2)=>a1.type-a2.type);
      // for(var i=0; i<arr.length; i++){
      //   type.push(arr[i].type);
      //   amount.push(arr[i].amount);
      // }
      // 配置项需要变更
      let option = {
        // xAxis: [
        //   {
        //     type: "category",
        //     data: type
        //   }
        // ],
        // yAxis: {
        //     type: 'value'
        // },
        // series: [
        //   {
        //     name: "台",
        //     type: "line",
        //     areaStyle: {},
        //     data: amount
        //   }
        // ]
      };
      this.myChart2.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>