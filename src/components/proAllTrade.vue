<template>
  <div class="Provincial trade">
    <div id="myChart1" style="width:100%;height:100%;"></div>
    
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
            trigger: "item" //悬浮提示框不显示
          },
          legend: {
            data: ["单位：万元"],
            left: 25,
            bottom: 0,
            textStyle: {
              color: "rgb(94,222,255)",
              fontSize: "0.12rem"
            }, //图例的文字颜色修改
            icon: "none"
          },
          grid: {
            left: 55,
            top: 7,
            bottom: 10,
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
                  //坐标轴小标记
                  show: false
                }
              ],
              splitLine: {
                //坐标轴网格线
                show: false
              },
              axisLabel: {
                textStyle: {
                  fontSize: "0"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              data: this.type,
              axisLine: { show: true, lineStyle: { color: "rgb(93,219,255)" } }, //坐标轴
              axisTick: [
                {
                  //坐标轴小标记
                  show: false
                }
              ],
              axisLabel: {
                textStyle: {
                  color: "rgb(93,219,255)",
                  fontSize: "0.12rem"
                },
                interval: 0, //强制所有标签显示
                formatter: function(params) {
                  var index = 3;
                  var newstr = "";
                  for (var i = 0; i < params.length; i += index) {
                    var tmp = params.substring(i, i + index);
                    newstr += tmp;
                  }
                  if (newstr.length > 4)
                    return newstr.substring(0, 4) + "...";
                  else return newstr;
                }
              }
            }
          ],
          series: [
            {
              name: "单位：万元",
              type: "bar",
              tooltip: { show: true },
              barWidth: 12, //柱宽度
  	          barCategoryGap: 10, /*多个并排柱子设置柱子之间的间距*/
              data: this.amount,
              itemStyle: {
                normal: {
                  //柱状图颜色
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgb(254,155,26)" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgb(254,65,27)" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  },
                  label: {
                    show: true, //显示文本
                    position: "insideLeft", //数据值位置
                    textStyle: {
                      color: "#fff",
                      fontSize: "0.12rem"
                    }
                  }
                }
              }
            }
          ]
        }
      }
    };
  },
  props: ['data'],
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      //DOM更新完后执行初始化
      this.chartsInit();
    });
  },
  methods: {
    chartsInit() {
      if (!this.chart.target) {
        this.chart.target = this.$echarts.init(
          document.getElementById("myChart1")
        );
      }
      this.chart.target.setOption(this.chart.option);
      window.addEventListener("resize", () => {  this.chart.target.resize();});
    },
    // 重绘
    draw() {
      var arr = [];
      let type = [];
      let amount = [];
      for(var key in this.data){
        var obj = {};
        obj.type = key;
        obj.amount = this.data[key];
        arr.push(obj);
      }
      arr = arr.sort((a1,a2)=>a1.amount-a2.amount);
      for(var i=0; i<arr.length; i++){
        type.push(arr[i].type);
        amount.push(arr[i].amount);
      }
      // 配置项需要变更
      let option = {
        yAxis: [
          {
            type: "category",
            data: type
          }
        ],
        series: [
          {
            name: "单位：万元",
            type: "bar",
            data: amount
          },
          // {
          //   name: '占比',
          //   type: 'bar',
          //   stack: 'average',
          //   label: {
          //       normal: {
          //           offset:['50', '80'],
          //           show: true,
          //           position: 'right',
          //           formatter:'{c}',
          //           textStyle:{ color:'#000' }
          //       }
          //   },
          //   itemStyle:{
          //       normal:{
          //           color:'rgba(128, 128, 128, 0)'
          //       }
          //   },
          //   data: amount/总台数
          // }
        ]
      };
      this.chart.target.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>
