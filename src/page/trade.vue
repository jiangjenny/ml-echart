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
        <div class="l_top">
          <div class="head">地州市当日交易数据</div>
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
              <tradeTable :tableData="tableData"></tradeTable>
            </transition>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="m_body">
          <div class="m-top">
            <span>交易热力图</span>
            <div class="bg"></div>
          </div>
          <div class="m-bottom">
            <transition>
              <Map ref="Map" :mapdata="mapdata"></Map>
            </transition>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="r_top">
          <div class="head">全省当日交易数据</div>
          <div class="r_body">
            <provincialDayTrade ref="provincialDayTrade" :data2="data2" :total="total"></provincialDayTrade>
          </div>
        </div>
        <div class="r_bottom">
          <div class="m-top b_top">
            <span>交易走势图</span>
            <div class="bg"></div>
          </div>
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
import Map from "../components/map";
import "../../static/css/page.css";
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
      this.$refs.Map.$nextTick(() => {
        this.$refs.Map.draw(this.mapdata);
      });
      // 全省当日交易数据
      var items2 = data.message[1];
      let arr2 = items2.message;
      if (arr2 instanceof Array) {
        for (var i = 0; i < arr2.length; i++) {
          var lists2 = arr2[i];
          this.data2[lists2.type] = lists2.amount;
        }
      } else {
        this.data2[arr2.type] = arr2.amount;
      }
      this.$refs.provincialDayTrade.$nextTick(() => {
        this.$refs.provincialDayTrade.draw();
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
    tradeTable,
    provincialDayTrade,
    tradeChart,
    Map
  }
};
</script>

<style lang="less" scoped >

</style>
