<template>
  <div class="Provincial trade">
    <div id="myChart11" style="width: 100%;height:100%;position:relative;top: 0.25rem;left: 0;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chart: {
        target: null, 
        option: {
          color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea','#7BDD43', '#FEBE12', '#EBEC2F', '#FF7C44'],
          tooltip: {
            trigger: "item", 
            formatter: "{a}<br/>{b} : {c} ({d}%)"
          },
          calculable : true,
          series: [
            {
              name:'单位：户',
              type:'pie',
              tooltip: { show: true }, 
              radius: ['20%', '60%'],
              center : ['50%', '53%'],
              labelLine: {
                normal: {
                  show: true,
                  length: 5,
                  length2: 5,
                  lineStyle: {
                    width: 2
                  }
                }
              },
              label: {
                normal: {
                  formatter: '{c|{b}}\n{hr|}\n{d|{d}%}',
                  rich: {
                    b: {
                        fontSize: '12',
                        color: '#12EABE',
                        align: 'left',
                        padding: 1
                    },
                    hr: {
                        borderColor: '#12EABE',
                        width: '100%',
                        borderWidth: 2,
                        height: 0
                    },
                    d: {
                        fontSize: '12',
                        color: '#fff',
                        align: 'left',
                        padding: 3
                    },
                    c: {
                        fontSize: '12',
                        color: '#fff',
                        align: 'left',
                        padding: 3
                    }
                  }
                }
              },
            }
          ]
        }
      }
    };
  },
  props: ['arr3'],
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
          document.getElementById("myChart11")
        );
      }
      // 绘制图表
      this.chart.target.setOption(this.chart.option);
      window.addEventListener("resize", () => {
        this.chart.target.resize();
      });
    },
    draw() {
      let option = {
        series: [
          {
            data: this.arr3
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
