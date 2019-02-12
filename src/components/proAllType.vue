<template>
  <div class="Provincial trade">
    <div id="myChart10" style="width: 100%;height:100%;"></div>
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
            trigger: "item", 
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            top: '18%',
            left: '1%',
            bottom: '2%',
            right: '12%',
            containLabel: true
          },
          xAxis: [
            {
              show: true,
              type: "value",
              name: '（单位：户）',
              boundaryGap: [0, 0.01],
              position: "bottom",
              axisTick: [
                {
                  show: false
                }
              ],
              splitLine: {
                show: false
              },
              axisLine: { show: true, lineStyle: { color: "rgba(111, 150, 185, 0.5)" } },
              axisLabel: {
                textStyle: {
                  fontSize: "0.12rem",
                  color: "rgb(93,219,255)"
                },
                formatter: "{value}"
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              name: '商户类型',
              data: this.type4,
              axisLine: { show: true, lineStyle: { color: "rgba(111, 150, 185)" } }, 
              axisTick: [
                {
                  show: false
                }
              ],
              axisLabel: {
                textStyle: {
                  color: "rgb(93,219,255)",
                  fontSize: "0.12rem",
                },
                interval: 0, 
                formatter: function(params) {
                  var index = 3;
                  var newstr = "";
                  for (var i = 0; i < params.length; i += index) {
                    var tmp = params.substring(i, i + index);
                    newstr += tmp;
                  }
                  if (newstr.length > 4) return newstr.substring(0, 4) + "...";
                  else return newstr;
                }
              }
            }
          ],
          series: [
            {
              name: "单位：户",
              type: "bar",
              tooltip: { show: true }, 
              barWidth: 15, 
              data: this.amount4,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = ["rgb(4,161,126)","rgb(36,156,249)","rgb(36,156,249)", "rgb(254,215,1)","rgb(103,224,227)","#ffaf00","rgb(205, 79, 226)", "rgb(120, 187, 239)","#9fa8da","skyblue","orange"];
                    return colorList[params.dataIndex];
                  },
                  label: {
                    show: true,
                    position: "insideLeft", 
                    textStyle: {
                      color: "#fff",
                      fontSize: "0.12rem"
                    }
                  }
                },
                emphasis: {
                  shadowBlur: 7,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.6)"
                }
              }
            }
          ]
        }
      }
    };
  },
  props: ['data2'],
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
          document.getElementById("myChart10")
        );
      }
      // 绘制图表
      this.chart.target.setOption(this.chart.option);
      window.addEventListener("resize", () => {
        this.chart.target.resize();
      });
    },
    // 重绘
    draw() {
      var arr = [];
      let type = [];
      let amount = [];
      for(var key in this.data2){
        var obj = {};
        obj.type = key;
        obj.amount = this.data2[key];
        arr.push(obj);
      }
      arr = arr.sort((a1,a2)=>a1.amount-a2.amount);
      for(var i=0; i<arr.length; i++){
        type.push(arr[i].type);
        amount.push(arr[i].amount);
      }
      let option = {
        yAxis: [
          {
            type: "category",
            data: type
          }
        ],
        series: [
          {
            name: "单位：元",
            type: "bar",
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
