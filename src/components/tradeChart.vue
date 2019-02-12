<template>
  <div class="Provincial trade">
    <div id="myChart5" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: {
        target: null,
        option: {
          tooltip: { 
            // trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          grid: {
            left: "6%",
            right: "17%",
            top: '20%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              name: "(时间)",
              data: this.type3,
              axisPointer: {
                type: "shadow"
              },
              axisLine: { show: true, lineStyle: { color: "rgba(111, 150, 185, 0.5)" } }, //坐标轴 #0a3256
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
              name: "单位/万元",
              position: "left",
              axisLine: { show: false,lineStyle: { color: "rgb(93,219,255)"}}, 
               splitLine: {
                show: true,
                lineStyle: {
                    color: '#0a3256'
                }
              },
              axisLabel: {
                textStyle: {
                    color: 'rgb(93,219,255)',
                },
              },
              axisTick: [
                {
                  show: false
                }
              ]
            }
          ],
          series: [
            {
              name: "单位/万元",
              type: "line",
              data: this.amount3,
              itemStyle: {
                normal: {
                  color: "#28ffb3",
                  areaStyle: { 
                    type: "default",
                    color:['rgba(0,154,120,1))','rgba(0,0,0,0)']
                   }
                }
              }
            }
          ]
        }
      }
    };
  },
  props: ['data3'],
  watch: {
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
      window.addEventListener("resize", () => {  this.chart.target.resize();});
    },
    // 重绘
    draw() {
      var arr = [];
      let type = [];
      let amount = [];
      for(var key in this.data3){
        var obj = {};
        obj.type = key;
        obj.amount = this.data3[key];
        arr.push(obj);
      }
      arr = arr.sort((a1,a2)=>a1.type-a2.type);
      for(var i=0; i<arr.length; i++){
        type.push(arr[i].type);
        amount.push(arr[i].amount);
      }
      // 配置项需要变更
      let option = {
        xAxis: [
          {
            type: "category",
            data: type
          }
        ],
        yAxis: {
            type: 'value'
        },
        series: [
          {
            name: "单位/万元",
            type: "line",
            areaStyle: {},
            data: amount
          }
        ]
      };
     this.chart.target.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>
