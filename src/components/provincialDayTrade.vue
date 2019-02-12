<template>
  <div class="Provincial trade">
    <div id="myChart4" style="width: 100%;height:100%;"></div>
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
            trigger: "item", //悬浮提示框不显示
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            //绘图区调整
            top: '10%',
            left: '18%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              show: false,
              type: "value",
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
              axisLabel: {
                textStyle: {
                  fontSize: "0"
                },
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              data: this.type4,
              axisLine: { show: true, lineStyle: { color: "rgb(93,219,255)" } }, 
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
                interval: 0, //强制所有标签显示
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
              name: "单位：元",
              type: "bar",
              tooltip: { show: true }, //显示提示信息
              barWidth: 15, 
              data: this.amount4,
              //配置样式
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList =["rgb(4,161,126)","rgb(36,156,249)","rgb(36,156,249)", "rgb(254,215,1)",'#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'];
                    return colorList[params.dataIndex];
                  },
                  label: {
                    show: true, //显示文本
                    position: "insideLeft", //数据值位置
                    textStyle: {
                      color: "#fff",
                      fontSize: "0.12rem"
                    }
                  }
                },
                //鼠标悬停时：
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
  props: { total: Object, data2: Object },
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
          document.getElementById("myChart4")
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
      // 配置项需要变更
      let option = {
        title: {
          subtext: "交易总金额：" + Number(this.total.amount)+' '+ "元"+'  '+"交易笔数："+ Number(this.total.count)+' '+ "笔", 
          left: 10,
          top: -5,
          subtextStyle: {
            color: "#fff",
            fontSize: "0.12rem"
          }
        },
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
