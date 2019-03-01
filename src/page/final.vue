<template>
  <div class="ml_page">
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
        <div class="l_middle">
          <div class="head">全省数据</div>
          <div class="m_data">
            <span>装机总数：10000台</span>
            <span>村镇总覆盖率：50%</span>
          </div>
        </div>
        <div class="l_top">
          <div class="head">地州市数据</div>
          <div class="l_body">
            <transition>
              <cityDayTrade ref="cityDayTrade" :data="data"></cityDayTrade>
            </transition>
          </div>
        </div>
        <div class="l_bottom">
          <div class="head l_head">滚动交易数据</div>
          <div class="l_trade">
            <transition>
              <finalTable :tableData="tableData"></finalTable>
            </transition>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="m_body">
          <div class="m-top">
            <span>各市终端位置图</span>
            <div class="bg"></div>
          </div>
          <div class="m-bottom">
            <transition>
              <Map1 ref="Map1" :mapdata="mapdata"></Map1>
               
               <!-- <BaiDuMap :mapdata="mapdata"></BaiDuMap> -->
            </transition>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="r_top">
          <div class="head">终端实时滚动数据</div>
          <div class="r_body">
            <rollTable :tableData="tableData"></rollTable>
          </div>
        </div>
        <div class="r_bottom">
          <div class="m-top b_top">
            <span>装机走势图</span>
            <div class="bg"></div>
          </div>
          <div class="b_body">
            <InstallationChart></InstallationChart>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import cityDayTrade from "../components/cityDayTrade";
import finalTable from "../components/finalTable";
import InstallationChart from "../components/InstallationChart";
import rollTable from "../components/rollTable";
import Map1 from "../components/map1";
// import "../../static/css/page.css";

import BaiDuMap from '../components/baiduMap'

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
      tableData: []
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
      let ws = new WebSocket(this.$store.getters.getStorage);
      window.onbeforeunload = function() {
        ws.close();
      };
      ws.onmessage = function(event) {
        var data = JSON.parse(event.data);
        this.getChartData(data);
        this.total.amount = data.amount;
        this.total.count = data.count;
      }.bind(this);
      window.onbeforeunload = function() {
        ws.close();
      };
    });
  },
  methods: {
    getChartData(data) {
      // 地州市当日交易数据
      let items = data.message[0];
      let arr1 = items.message;
      if (arr1 instanceof Array) {
        for (let i = 0; i < arr1.length; i++) {
          var lists = arr1[i];
          var obj = {};
          this.data[lists.type] =Math.round((Number(lists.amount) / 10000) * 1000) / 1000;
          obj.name = lists.type;
          obj.value = lists.amount;
          this.mapdata.push(obj);
        }
      } else {
        this.data[arr1.type] =Math.round((Number(arr1.amount) / 10000) * 1000) / 1000;
        // 地图交易热力数据
        for (let i = 0; i < this.mapdata.length; i++) {
          var mapitem = this.mapdata[i];
          if (mapitem.name == arr1.type) {
            mapitem.value = arr1.amount;
            break;
          }
        }
      }
      // 地州市
      this.$refs.cityDayTrade.$nextTick(() => {
        this.$refs.cityDayTrade.draw();
      });
      this.$refs.Map1.$nextTick(() => {
        this.$refs.Map1.draw(this.mapdata);
      });
      // 交易走势图
      let items3 = data.message[2];
      let arr3 = items3.message;
      if (arr3 instanceof Array) {
        for (var i = 0; i < arr3.length; i++) {
          var lists3 = arr3[i];
          this.amount3.push(
            Math.round((Number(lists3.amount) / 10000) * 1000) / 1000
          );
          this.type3.push(lists3.type);
          this.data3[lists3.type] =
            Math.round((Number(lists3.amount) / 10000) * 1000) / 1000;
        }
      } else {
        this.data3[arr3.type] =
          Math.round((Number(arr3.amount) / 10000) * 1000) / 1000;
      }
      this.$refs.tradeChart.$nextTick(() => {
        this.$refs.tradeChart.draw();
      });
      // 滚动交易数据
      if (data.message.length > 3) {
        let items4 = data.message[3];
        let obj = items4.message;
        this.tableData.unshift(obj);
      }
    }
  },
  components: {
    cityDayTrade,
    finalTable,
    rollTable,
    InstallationChart,
    Map1
    // BaiDuMap
  }
};
</script>

<style lang="less" scoped >
.ml_page {
  main {
    .left {
      width: 25%;
      .l_middle {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 9%;
        .head {
          height: 50%;
        }
        .m_data {
          position: absolute;
          top: 50%;
          left: 0;
          text-align: center;
          height: 50%;
          line-height: 2;
          width: 100%;
          font-size: 0.14rem;
          color: #fff;
          text-shadow: 2px 2px 10px #eaeff2;
          border: 2px solid rgba(31, 103, 163, 0.7);
          border-bottom: none;
          border-top: none;
          span {
            float: left;
            width: 50%;
          }
          span:nth-of-type(1) {
            border-right: 1px solid rgba(31, 103, 163, 0.7);
          }
        }
      }
      .l_bottom{
        height: 24%;
        .l_head{
          height: 20%;
        }
        .l_trade{
          height: 80%;
          top: 20%;
        }
      }
    }
    .right{
       width: 25%;
    }
    .middle{
      width: 47%;
    }
  }
}
.l_top .head::before,
.l_top .head::after{
 content: "";
  width: 0 !important;
  height: 0 !important;
  background-color: transparent !important;
}
</style>
