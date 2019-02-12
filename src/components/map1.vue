<template>
  <div class="Provincial trade">
    <div id="myChart8" v-show="showBig" @click='showToggle' style="width:100%;height:100%;positive:relative;top:0;left:0"></div>
    <div id="myChart7" v-show="showSmall" @click='showToggle' style="width:100%;height:100%;positive:relative;top:0;left:0"></div>
  </div>
</template>

<script>
import hunan from '../../static/api/hunan.json'
import cityMap from '../../static/js/city-map.js'
export default {
  data(){
    return {
       myChart: {},
       myChart1: {},
       showBig: true,
       showSmall: false
    }
  },
  props: ['mapdata'],
  mounted() {
    this.$nextTick(()=>{
      this.initMap(this.mapdata)
      this.onCityClick()
      this.draw(this.mapdata)
    });
  },
  methods:{
    showToggle(){
      if(this.showBig || this.showSmall){
        this.showBig = !this.showBig;
        this.showSmall = !this.showSmall;
      }else{
         this.showBig = !this.showBig;
         this.showSmall = !this.showSmall;
      }
    },
    initMap (mapdata) {
      this.myChart = this.$echarts.init(document.getElementById('myChart8'));
      var geoJson = hunan;
      this.$echarts.registerMap('hunan', geoJson);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
      var option = {
          title: {
            top: 20,
            text: '',
            subtext: '',
            x: 'right',
            textStyle: {
              color: 'rgb(73,163,255)',
              fontSize: '0.12rem',
            }
          },
          legend: {
            show: true,
            orient: 'vertical',
            right: "5%",
            top:"top",
            data: ['Top 5'],
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
              // color: ['#3B5077', '#031525'], // 蓝黑
              // color: ['#ffc0cb', '#800080'] ,// 红紫
            },
          },
          geo: {
            show: true,
            map: 'hunan',
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: 'transparent',
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            },
            layoutCenter: ['49%', '50%'], //设置地图的大小
            layoutSize: 480
          }
      };
      this.myChart.setOption(option);
    },
    onCityClick(){
      this.myChart.on('click',(params)=>{
        this.$axios.get('api/citys/'+cityMap[params.name]+'.json').then((res)=>{
          this.$echarts.registerMap(params.name,res.data)
          this.myChart1 = this.$echarts.init(document.getElementById('myChart7'));
          window.addEventListener("resize", () => {
            this.myChart1.resize();
          });
          var d = [];
          for( var i=0;i<res.data.features.length;i++ ){
            d.push({
              name:res.data.features[i].properties.name
            })
          }
          let option = {
            title : {
                top: 10,
                text: params.name + '终端位置',
                subtext: '',
                left: 'center',
                textStyle:{
                    color: '#fff',
                    fontSize: 12,
                    fontWeight:'normal',
                    fontFamily:"Microsoft YaHei"
                }
            },
            legend: {  //加
              show: true,
              orient: 'vertical',
              right: "5%",
              top:"top",
              data: ['>=200','>=100','>=50','>0'],
              textStyle: {
                color: '#fff'
              }
            },
            visualMap: {
              show: false,
              min: 0,
              max: 500,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'], // 文本，默认为数值文本
              calculable: true,
              seriesIndex: [1],
              inRange: {
                // color: ['#3B5077', '#031525'], // 蓝黑
                // color: ['#ffc0cb', '#800080'] ,// 红紫
              },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            animationDuration:1000,
            animationEasing:'cubicOut',
            animationDurationUpdate:1000,
            series: [
              {
                name: params.name,
                type: 'map',
                mapType: params.name,
                // roam: false,
                roam: true,
                tooltip: { show: true },
                showLegendSymbol: true,
                nameMap:{
                  'hunan':'hunan'
                },
                label: {
                  normal:{
                    show:true,
                    textStyle:{
                      color:'#999',
                      fontSize:12
                    }  
                  },
                  emphasis: {
                    show: true,
                    textStyle:{
                      color:'#fff',
                      fontSize:12
                    }
                  }
                },
                itemStyle: {
                    normal: {
                        areaColor: 'transparent',
                        borderColor: '#3fdaff',
                        borderWidth: 2,
                        shadowColor: 'rgba(63, 218, 255, 0.5)',
                        shadowBlur: 30
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                data: d
              },

            ]
          };
          this.myChart1.setOption(option);
        }) 
        
      })
    },
    draw(mapdata){
      var geoCoordMap = {
          "邵阳市": [111.46923, 27.237842],
          "永州市": [111.608019, 26.434516],
          "张家界市": [110.479921, 29.127401],
          "株洲市": [113.45, 27.35],
          "湘西土家族苗族自治州": [109.739735, 28.314296],
          "常德市": [111.691347, 29.040225],
          "湘潭市": [112.944052, 27.82973],
          "怀化市": [109.97824, 27.550082],
          "岳阳市": [113.132855, 29.37029],
          "长沙市": [112.982279, 28.19409],
          "郴州市": [113.032067, 25.793589],
          "衡阳市": [112.607693, 26.900358],
          "娄底市": [112.008497, 27.728136],
          "益阳市": [112.355042, 28.570066]
      }
      var data = mapdata;
      var max = 480, min = 9; // todo 
      var maxSize4Pin = 100, minSize4Pin = 20;
      var convertData = function (data) {
        var res = [];
        var itemdata = [];
        var item = [];
        for (var i = 0; i < data.length; i++) {
          item.push(data[i].value);
          itemdata = item.sort((a,b)=> b-a); // 数据排序添加到data上用来控制图标大小
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              items: itemdata
            });
          }
        }
        return res;
      };
      
      let option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if(typeof (params.value)[2] == "null"){
                return '交易数据：' + '<br/>' + params.name + ' : ' + "0" + ' ' + '元';
              }
              else if (typeof (params.value)[2] == "undefined") {
                return '交易数据：' + '<br/>' + params.name + ' : ' + params.value + ' ' + '元';
              } else {
                return '交易数据：' + '<br/>' + params.name + ' : ' + params.value[2] + ' ' + '元';
              }
            }
        },
        geo: {
          itemStyle: {
              normal: {
                  areaColor: 'transparent',
                  borderColor: '#3fdaff',
                  borderWidth: 2,
                  shadowColor: 'rgba(63, 218, 255, 0.5)',
                  shadowBlur: 30
              },
              emphasis: {
                  areaColor: '#2B91B7',
              }
          }
        },
        series: [
            {
              name: 'light',
              type: 'scatter',
              legendHoverLink: true,
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val,data) {
                return Number(val[2] / data.data.items[0])*35; //动态显示图标大小
              },
              tooltip: { show: true }, //显示提示信息
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#F4E925'
                }
              }
            },
            {
              type: 'map',
              map: 'hunan',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              tooltip: { show: true }, //显示提示信息
              showLegendSymbol: true, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#FFFFFF',
                },
                emphasis: {
                  areaColor: '#2B91B7',
                  shadowBlur: 7,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.6)"
                }
              },
              animation: false,
              data: data
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function (val,data) {
                return Number(val[2] / data.data.items[0])*35;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#F4E925',
                  shadowBlur: 10,
                  shadowColor: '#05C3F9'
                }
              },
              zlevel: 1
            }
        ]
      };
      this.myChart.setOption(option);
    }
  }
}

</script>

<style>

</style>

