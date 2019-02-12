<template>
  <div class="ml_container">
    <header>
      <img src="../../static/img/logo.png" alt>
      <p>金湘通数据平台</p>
      <div class="format_date">
        <span class="date">{{ nowTime | formatDate }}</span>
        <span class="week">{{ nowTime | getWeek }}</span>
        <span class="time">{{ nowTime | formatTime }}</span>
      </div>
    </header>
    <main>
      <div class="left">
        <div class="middle">
          <div class="head">全省数据</div>
          <div class="m_data">
            <span>装机总数：10000台</span>
            <span>村镇总覆盖率：50%</span>
          </div>
        </div>
        <div class="top">
          <div class="head">地州市数据</div>
          <div class="l_body">
            <transition>
              <cityDayTrade ref="cityDayTrade" :data="data"></cityDayTrade>
            </transition>
          </div>
        </div>
        <div class="bottom">
          <div class="head">滚动交易数据</div>
          <div class="l_trade">
            <transition>
              <tradeTable :tableData='tableData'></tradeTable>
            </transition>
          </div>
        </div>
      </div>
      <div class="Middle">
        <div class="m_head"></div>
        <div class="m_body">
          <div class="m-top">各市终端位置图</div>
          <div class="m-bottom">
            <transition>
                <Map1 ref="Map1" :mapdata ="mapdata"></Map1>
            </transition>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="head">全省当日交易数据</div>
          <div class="r_body">
            <provincialDayTrade ref="provincialDayTrade" :data2="data2" :total="total"></provincialDayTrade>
          </div>
        </div>
        <div class="bottom">
          <div class="bg"></div>
          <div class="b_body">
            <tradeChart ref="tradeChart" :data3="data3"></tradeChart>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import cityDayTrade from "../components/cityDayTrade";
import tradeTable from "../components/tradeTable";
import provincialDayTrade from "../components/provincialDayTrade";
import tradeChart from "../components/tradeChart";
import Map1 from '../components/map1'
export default {
  data() {
    return {
      nowTime: new Date(), // 当前时间
      amount3: [],
      type3: [],
      total: {},
      mapdata: [],
      data: {},
      data2: {},
      data3: {},
      tableData: [],
    };
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "overflow:hidden;");
    document.getElementsByTagName("body")[0].className = "ml_container";
  },
  mounted() {
    setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
    this.$nextTick(() => {
      // let ws = new WebSocket("ws://weixin.meloon.cn/wb/websocket/zengwenzheng/CE797393C9CE153B1ECB611460DF00A5");
      let ws = new WebSocket(this.$store.getters.getStorage)
      window.onbeforeunload = function(){
        ws.close();
      }
      ws.onmessage = function(event){
        var data = JSON.parse(event.data);
        this.getChartData(data);
        this.total.amount = data.amount;
        this.total.count = data.count
      }.bind(this);
      window.onbeforeunload = function(){
        ws.close();
      }
    });
  },
  methods: {
     getChartData(data) {
      // 地州市当日交易数据
      let items = data.message[0];
      let arr1 = items.message;
      if(arr1 instanceof Array){
        for (let i = 0; i < arr1.length; i++) {
          var lists = arr1[i];
          var obj = {}; 
          this.data[lists.type] = Math.round(Number(lists.amount)/10000*1000)/1000;
          obj.name = lists.type;
          obj.value = lists.amount;
          this.mapdata.push(obj);
        }
      }else{
        this.data[arr1.type] =  Math.round(Number(arr1.amount)/10000*1000)/1000;
         // 地图交易热力数据
        for(var i = 0; i < this.mapdata.length; i++){
          var mapitem = this.mapdata[i];
          if(mapitem.name == arr1.type){
            mapitem.value = arr1.amount;
            break;
          }
        } 
      }
      // 地州市
      this.$refs.cityDayTrade.$nextTick(()=>{
         this.$refs.cityDayTrade.draw();
      })
      this.$refs.Map1.$nextTick(()=>{
         this.$refs.Map1.draw(this.mapdata); 
      })
      // 全省当日交易数据
      var items2 = data.message[1];
      let arr2 = items2.message;
      if(arr2 instanceof Array){
        for (var i = 0; i < arr2.length; i++) {
          var lists2 = arr2[i];
          this.data2[lists2.type] = lists2.amount;
        }
      }else{
        this.data2[arr2.type] = arr2.amount;
      }
      this.$refs.provincialDayTrade.$nextTick(()=>{
         this.$refs.provincialDayTrade.draw();
      })
      // 交易走势图
      let items3 = data.message[2];
      let arr3 = items3.message;
      if(arr3 instanceof Array){
        for (var i = 0; i < arr3.length; i++) {
          var lists3 = arr3[i];
          this.amount3.push( Math.round(Number(lists3.amount)/10000*1000)/1000);
          this.type3.push(lists3.type);
          this.data3[lists3.type] =  Math.round(Number(lists3.amount)/10000*1000)/1000;
        }
      }else{
        this.data3[arr3.type] =  Math.round(Number(arr3.amount)/10000*1000)/1000;
      }
      this.$refs.tradeChart.$nextTick(()=>{
         this.$refs.tradeChart.draw();
      })
      // 滚动交易数据  
      if(data.message.length >3){
        let items4 = data.message[3];
        let obj = items4.message
        this.tableData.unshift(obj);
      }
    }
  },
  components: {
    cityDayTrade,
    tradeTable,
    provincialDayTrade,
    tradeChart,
    Map1
  }
};
</script>

<style lang="less" scoped >
.ml_container {
  width: 19.2rem;
  height: 100%;
  background: url("../../static/img/trade.jpg") no-repeat center top;
  background-size: cover;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 0.35rem 0.35rem;
  header {
    position: relative;
    top: 0;
    left: 0;
    height: 15%;
    img {
      width: 2.06rem;
      height: 0.49rem;
    }
    p {
      font-size: 0.4rem;
      color: #daf9ff;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      line-height: 0.94rem;
      letter-spacing: 0.08rem;
    }
    .format_date {
      font-size: 0.16rem;
      color: #01fafe;
      text-align: right;
      .date {
        position: absolute;
        top: 0.37rem;
        right: 0.07rem;
      }
      .week {
        position: absolute;
        top: 0.68rem;
        right: 0.85rem;
      }
      .time {
        position: absolute;
        top: 0.68rem;
        right: 0.05rem;
      }
    }
  }
  .l_body,
  .l_trade,
  .r_body,
  .m_trade,
  .b_body,
  .m_data {
    border: 1px solid rgba(31, 103, 163, 0.7);
    border-top: none;
    box-shadow: rgb(18,158,237) 0px 0px 1px 1px inset;
  }
  main {
    height: 85%;
    position: relative;
    left: 0;
    top: 0;
    .head {
      width: 100%;
      height: 0.38rem;
      font-size: 0.16rem;
      line-height: 0.38rem;
      color: #eaeff2;
      text-align: center;
      text-shadow: 2px 2px 5px #eaeff2;
      box-shadow: rgb(18,158,237) 0px 0px 1px 1px inset;
      position: relative;
      top: 0;
      left: 0;
    }
    .left {
      width: 23.3%;
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      .middle{
        .m_data{
          text-align: center;
          height: 0.38rem;
          line-height: 0.38rem;
          font-size: 0.14rem;
          color: #fff;
          border-bottom: none;
          border-top: none;
          span{
            float: left;
            width: 50%;
          }
          span:nth-of-type(1){
            border-right: 1px solid #fff;
          }
        }
      }
      .top {
        width: 100%;
        height: 64%;
        .l_body {
          width: 100%;
          height: 92.5%;
        }
      }
      .bottom {
        width: 100%;
        height: 22%;
        margin-top: 0.2rem;
        .l_trade {
          width: 100%;
          height: 83%;
        }
      }
    }
     .right {
      width: 23.3%;
      height: 100%;
      position: relative;
      left: 0;
      top: -100%;
      .top{
         height: 57%;
      }
      .bottom{
         height: 45%;
      }
      .top,
      .bottom {
        width: 100%;
        .head {
          width: 100%;
        }
        .r_body,
        .b_body{
          width: 100%;
          height: 89%;
        }
      }
      .bottom {
        margin-top: 0.2rem;
        position: relative;
        top: 0;
        left: 0;
        .bg {
          width: 100%;
          height: 11%;
          background: url("../../static/img/light.png") no-repeat center top;
          background-size: cover;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .Middle{
      width: 50%;
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      margin: 0 auto;
      border: 2px solid rgba(31, 103, 163, 0.7);
      box-shadow: rgba(31, 70, 105, 0.8) 0px 0px 2px 2px inset;
      .m_body{
        height: 100%;
        box-sizing: border-box;
        .m-top{
          height: 0.41rem;
          width: 100%;
          line-height: 0.5rem;
          text-align: center;
          color: #fff;
          font-size: 0.20rem;
          font-weight: 700;
          text-shadow: 2px 2px 5px #eaeff2;
        }
        .m-bottom{
          height: 95%;
          width: 100%;
        }
      }
    }
  }
}
.head::before,
.head::after,
.l_body::before,
.l_body::after,
.l_trade::before,
.l_trade::after,
.r_body::before,
.r_body::after,
.m_trade::before,
.m_trade::after,
.b_body::before,
.b_body::after,
.bg::before,
.bg::after,
.m-top::before,
.m-top::after,
.m-bottom::before,
.m-bottom::after {
  content: "";
  position: absolute;
  width: 0.03rem;
  height: 0.03rem;
  border: 1px solid rgba(22, 145, 224, 0.2);
  background-color: #0d93e8;
  box-shadow: #fff 0px 0px 10px;
}
.head::before {
  top: -0.04rem;
  left: -0.04rem;
}
.head::after {
  top: -0.04rem;
  right: -0.04rem;
}
.l_body::before {
  top: 4.72rem;
  left: -0.01rem;
}
.l_body::after {
  top: 4.72rem;
  right: -0.01rem;
}
.l_trade::before {
  top: 7.36rem;
  left: -0.03rem;
}
.l_trade::after {
  top: 7.36rem;
  right: -0.01rem;
}
.r_body::before{
  top: 2.45rem;
  left: -0.01rem;
}
.r_body::after{
  top: 2.45rem;
  right: -0.01rem;
}
.m_trade::before{
  top: 5.1rem;
  left: -0.01rem;
}
.m_trade::after{
  top: 5.1rem;
  right: -0.01rem;
}
.b_body::before{
  top: 2.13rem;
  left: -0.01rem;
}
.b_body::after{
  top: 2.13rem;
  right: -0.01rem;
}
.bg::before{
  top: -0.01rem;
  left:-0.01rem
}
.bg::after{
  top: -0.01rem;
  right:-0.01rem
}
.m-top::before{
  top: -0.04rem;
  left:-0.04rem
}
.m-top::after{
  top: -0.04rem;
  right:-0.04rem
}
.m-bottom::before{
  bottom: -0.04rem;
  left: -0.04rem;
}
.m-bottom::after{
  bottom: -0.04rem;
  right: -0.04rem;
}
.Provincial {
  height: 100% !important;
}

</style>
