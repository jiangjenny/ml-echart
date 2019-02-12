<template>
  <div class="ml_page">
    <header>
      <div class="header_top">
        <img src="../../static/img/logo.png" alt>
        <p>金湘通数据平台</p>
        <div class="format_date">
          <span class="date">{{ nowTime | formatDate }}</span>
          <span class="week">{{ nowTime | getWeek }}</span>
          <span class="time">{{ nowTime | formatTime }}</span>
        </div>
      </div>
      <div class="header_bottom">
        <div class="common">
          <span>商户数据</span>
          <div class="bg"></div>
        </div>
      </div>
    </header>
    <main>
      <div class="mer_left">
        <div class="mer_top">
          <div class="common">
             <span>商户基本情况</span>
             <div class="bg"></div>
          </div>
          <div class="mer_box">
            <div class="box">
              <div class="line"></div>
              <div class="in_box"></div>
              <div class="in_data">
                <span>商户总数</span>
                <span>100%</span>
                <span>18000</span>
              </div>
            </div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
          </div>
        </div>
        <div class="mer_bottom">
          <div class="common">
            <span>全省商户属性</span>
            <div class="bg"></div>
          </div>
          <proAllType ref="proAllType" :data2="data2" :total="total"></proAllType>
        </div>
      </div>
      <div class="mer_right">
        <div class="mer_top">
          <div class="common">
             <span>10月商户拓展维护</span>
             <div class="bg"></div>
          </div>
          <div class="mer_box">
            <div class="box">
              <div class="line"></div>
              <div class="in_box"></div>
              <div class="in_data">
                <span>商户总数</span>
                <span>100%</span>
                <span>18000</span>
              </div>
            </div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
            <div class="box"><div class="line"></div><div class="in_box"></div><div class="in_data"><span>商户总数</span><span>100%</span><span>18000</span></div></div>
          </div>
        </div>
        <div class="mer_bottom">
          <div class="common">
             <span>用户使用情况</span>
             <div class="bg"></div>
          </div>
          <userLikes ref="userLikes" :arr3="arr3"></userLikes>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import proAllType from "../components/proAllType";
import userLikes from '../components/userLikes'
import "../../static/css/page.css";
export default {
  data() {
    return {
      nowTime: new Date(), // 当前时间
      total: {},
      data2: {},
      arr3: []
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
      // 全省当日交易数据
      var items2 = data.message[1];
      let arr2 = items2.message;
      if (arr2 instanceof Array) {
        for (var i = 0; i < arr2.length; i++) {
          var lists2 = arr2[i];
          this.data2[lists2.type] = lists2.amount;
          var obj = {};
          obj.value = lists2.amount;
          obj.name = lists2.type;
          this.arr3.push(obj)
        }
      } else {
        this.data2[arr2.type] = arr2.amount;
        for(var i=0; i<this.arr3.length;i++){
          var item = this.arr3[i];
          if(item.name == arr2.type){
            item.value = arr2.amount;
            break;
          }
        }
      }
      this.$refs.proAllType.$nextTick(() => {
        this.$refs.proAllType.draw();
      });

      // 用户爱好
     
      console.log(this.arr3);
      this.$refs.userLikes.$nextTick(() => {
        this.$refs.userLikes.draw();
      });
    }
  },
  components: {
    proAllType,
    userLikes
  }
};
</script>

<style lang="less" scoped >
.ml_page{
  header{
    height: 16%;
  }
  .header_bottom{
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-43%);
    height: 30%;
    width: 35%;
  }
  .common{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0.38rem;
      left: 0;
      span {
        position: absolute;
        top: 0.58rem;
        height: 100%;
        text-align: center;
        color: #fff;
        font-size: 0.22rem;
        text-shadow: 2px 2px 5px #eaeff2;
        left: 50%;
        transform: translateX(-50%)
        }
        .bg {
          width: 100%;
          height: 100%;
          background: url("../../static/img/light.png") no-repeat center top;
          background-size: cover;
          position: absolute;
          top: 0.42rem;
          left: 0;
        }
    }
  main{
    height: 84%;
    .common{
      top: -0.03rem !important;
      height: 9%;
      width: 50%;
      left: 50%;
      transform: translateX(-50%);
      span{
        top: 0.1rem !important;
        font-size: 0.14rem;
      }
      .bg{
        top: 0 !important
      }
    }
    .mer_left{
      float: left;
      width: 53.9%;
    }
    .mer_right{
      float: right;
      width: 43.1%;
      .box{
        width: 33.5% !important;
      }
    }
    .mer_left,
    .mer_right {
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      .mer_top,
      .mer_bottom{
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        border: 2px solid rgba(31, 103, 163, 0.7);
        box-shadow: rgba(31, 70, 105, 0.3) 0px 0px 20px 15px inset;
        .mer_box{
          height: 91%;
          width: 100%;
          position: relative;
          top: 10%;
          left: 0;
          display: flex;
          justify-content: space-around;
          flex-flow: wrap;
          .box{
            width: 27.3%;
            height: 43%;
            margin-top: 0.05rem;
            border: 1px solid #3c62c0;
            border-radius: 10px 0 10px 0;
            position: relative;
            top: 0;
            left: 0;
            .in_box{
              margin: 0.27rem 0.3rem 0.25rem 0.4rem;
              float: left;
              border: 1px solid #3c62c0;
              width: 0.88rem;
              height: 0.88rem;
              box-shadow: rgba(31, 70, 105, 0.8) 0px 0px 10px 5px inset;
            }
            .in_data{
              float: left;
              margin: 0.3rem 0;
              span{
                display: block;
                font-size: 0.12rem;
                color: rgb(93,219,255);
              }
            }
          }
        }
      }
       .mer_top{
        height: 55%;
       }
      .mer_bottom{
        height: 44%;
        margin-top: 0.1rem;
      }
    }

  }
}
.box::before{
  content: "";
  position: absolute;
  top: 0.055rem;
  left: 0.065rem;
  width: 94%;
  height: 90%;
  border: 1px solid #3c62c0;
  border-radius: 10px 0 10px 0;
}
.box::after{
  content: "";
  position: absolute;
  top: 0.15rem;
  left: 0.18rem;
  width: 0.05rem;
  height: 0.05rem;
  border: 1px solid rgb(93,219,255);
  background-color: rgb(93,219,255);
  border-radius: 50%;
}
.line::before,
.line::after{
    content: "";
    position: absolute;
    width: 1.2rem;
    border: 1px solid #1a3a8a;
}
.line::before{
  top: -0.09rem;
  right: 0;
}
.line::after{
  bottom: -0.09rem;
  left: 0
}
</style>