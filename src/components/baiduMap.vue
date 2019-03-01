<template>
  <div class="box">
    <el-form :inline="true" :model="locationMsg" ref="locationMsg" class="search_form">
      <el-form-item label="商户类型" class='search_type'>
        <el-select v-model="formInline.type" placeholder="请选择商户类型">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="旗舰店" value="旗舰店"></el-option>
          <el-option label="普通商户" value="普通商户"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模糊搜索" class="search_key">
        <el-input v-model="locationMsg.keyword" placeholder="请输入关键字" id="suggestId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(locationMsg)">确定</el-button>
      </el-form-item>
    </el-form>
    <div id="allmap" style="height:91%"></div>
    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
  </div>
</template>
<script>
import  '../../static/css/baiduMap.css';
import bus from "../util/bus.js";
export default {
  props:{
    BMapMsg:{ keyword: String},
    mapdata:Array
  },
  data(){
    return {
       // 百度地图经纬度
      locationMsg: {
        keyword: ""
      },
      formInline: {
        type: ''
      },
      map: {}
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.loadmap()  //加载地图和相关组件
    });
  },
  methods: {
    // 地图js
    loadmap(){
      this.map = new BMap.Map("allmap");//实例化百度地图
      this.map.centerAndZoom(new BMap.Point(112.98,28.19), 12);//设置中心点位与缩放级别
      this.map.enableScrollWheelZoom();//启用滚动
      // // 模糊搜索
      this.searchVal();
      
    },
    // 模糊搜索
    searchVal(){
      var _this = this;
      var map = this.map;
       // 百度地图API功能
      function G(id) {
        return document.getElementById(id);
      }
      var geoc = new BMap.Geocoder();
      map.addEventListener("click", function(e) {
        var pt = e.point;
        _this.locationMsg.lnglat = pt.lng + "," + pt.lat;
        map.clearOverlays();
        map.addOverlay(new BMap.Marker(pt)); //添加标注
        geoc.getLocation(pt, function(rs) {
          var addComp = rs.address;
          if (addComp == "") {
            _this.locationMsg.address = "";
            _this.$message.error("无法获取当前位置信息");
          } else {
            _this.locationMsg.address = addComp;
          }
        });
      });
      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: map
      });
      ac.addEventListener("onhighlight", function(e) {
        //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        G("searchResultPanel").innerHTML =
          "onconfirm<br />index = " +
          e.item.index +
          "<br />myValue = " +
          myValue;

        setPlace();
      });

      function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          // console.log(local.getResults())
          var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          console.log(pp);
          map.centerAndZoom(pp, 15);
          map.addOverlay(new BMap.Marker(pp)); //添加标注
        }
        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
    },
    // 重绘
    draw(mapdata){
      this.map.clearOverlays();//清除到地图上所有的
      var geoCoordMap= {
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
      var dataItem = [];
      var mapArr = [];
      var topArr = [];
      var smallArr = [];
      var midArr = [];
      for(var i=0;i<mapdata.length;i++){
        dataItem.push(mapdata[i].value);
        dataItem = dataItem.sort((a,b)=>b-a); //数据排序显示不同图标大小
        mapArr.push({
          lng: geoCoordMap[mapdata[i].name][0],
          lat: geoCoordMap[mapdata[i].name][1],
          value: mapdata[i].value
        })
      }
      for(var j=0;j<mapArr.length;j++){
        var item = mapArr[j];
        for(var k=0;k<dataItem.length;k++){
          if(dataItem.slice(0,5)[k]==item.value){  //如果两者相等 说明属于top5
            topArr.push({
              lng: item.lng,
              lat: item.lat
            }) 
            break;
          }else if(dataItem.slice(-5)[k]==item.value){
            smallArr.push({
              lng: item.lng,
              lat: item.lat
            }) 
            break;
          }else if(dataItem.slice(5,-5)[k]==item.value){
            midArr.push({
              lng: item.lng,
              lat: item.lat
            }) 
            break;
          }
        }
      }
      var marker=[];
      var pt = {};
      // 设置标注
      for(var i=0;i<mapdata.length;i++){
        var item = mapdata[i];
        var geoCoordMapValue = {
          lng: geoCoordMap[item.name][0],
          lat: geoCoordMap[item.name][1]
        }
        pt = new BMap.Point(geoCoordMapValue.lng,geoCoordMapValue.lat);  
        //pt如果属于前五的数组中，说明是前五的可以加图片
        for(var j=0;j<topArr.length;j++){
          if(topArr[j].lng==pt.lng && topArr[j].lat==pt.lat){
             marker=new BMap.Marker(pt,{icon: new BMap.Icon("../../static/img/top5.png", new BMap.Size(50,50))});//实例marker
          }
        }
        for(var k=0;k<smallArr.length;k++){
          if(smallArr[k].lng==pt.lng && smallArr[k].lat==pt.lat){
             marker=new BMap.Marker(pt,{icon: new BMap.Icon("../../static/img/small5.png", new BMap.Size(30,30))});//实例marker
          }
        }
        for(var m=0;m<midArr.length;m++){
          if(midArr[m].lng==pt.lng && midArr[m].lat==pt.lat){
             marker=new BMap.Marker(pt,{icon: new BMap.Icon("../../static/img/middle.png", new BMap.Size(20,20))});//实例marker
          }
        }
        this.map.addOverlay(marker);//添加到地图上
        if(marker.point.lng===geoCoordMapValue.lng && marker.point.lat===geoCoordMapValue.lat ){
          this.addClickHandler(item.name + '：' + item.value + '元',marker);
        }
      }
    },
    // 点击marker方法
    addClickHandler(content,marker){
      marker.addEventListener("mouseover",(e)=>{
        this.openInfo(content,marker,e)}
      );
    },
    //开启信息窗口方法
    openInfo(content,marker,e){
      var opts = {
        width : 100,     // 信息窗口宽度
        height: 50,     // 信息窗口高度
        title : "<span style='font-size:16px;color: #333'>交易数据</span>",
        enableMessage:true//设置允许信息窗发送短息
      };
      // var p = e.target;
      var point = new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content,opts);  //创建信息窗口
      marker.openInfoWindow(infoWindow,point); //开启信息窗口
    },
    // 点击提交
    submitForm() {
      var _this = this;
      this.$refs.locationMsg.validate(valid => {
        if (valid) {
          bus.$emit("BDialogVisible", false);
          bus.$emit("locationMsg", _this.locationMsg);
          console.log(_this.locationMsg)
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style lang="less">
.ml_page main .right{
  top: -100.8%;
}
.ml_page main .m-top{
  height: 5%;
}
.ml_page main .middle .m_body .m-bottom{
  height: 95%;
}
.box {
  width: 100%;
  height: 100%;
  padding-top: 15px;
}
.search_form{
  margin: 0 30px;
  height: 9%;
  .search_type,.search_key{
    color: #ccc;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
  }
}
.ml_container .el-input__inner{
  padding: 0 40px 0 12px !important;
  font-size: 12px;
}
.el-form-item__content,.el-form-item__label,.el-input__inner,.el-input__innertId,.el-form--inline .el-form-item{
  height: 30px !important;
  line-height: 30px !important;
}
.el-form--inline .el-form-item__label{
  float: left !important;
}
.el-form-item__label{
  line-height: 30px;
  color: #ccc;
  font-size: 12px;
}
.el-form-item,.el-form--inline .el-form-item{
  margin: 0 !important;
}
// 按钮
.el-form-item__content{
  font-size: 12px;
}
.el-button{
  padding: 8px 15px;
  font-size: 12px;
}
// 箭头图标
.el-input__icon{
  line-height: 100%;
}
// 地图信息框
.BMap_bubble_title{
  color:white;
	font-size:13px;
	font-weight:bold;
	text-align:left;
	padding-left:7px;
	padding-top:5px;
	border-bottom:1px solid gray;
	background-color:#409EFF;
}
/* 消息内容 */
.BMap_bubble_content {
	background-color:white;
	padding-left:7px;
	padding-top:5px;
  padding-bottom:10px;
  font-size: 12px;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
	top:35px !important;
	border-radius:7px;
}
/* 左上角删除按键 */
.BMap_pop img {
	top:43px !important;
	left:215px !important;
}
.BMap_top {
	display:none;
}
.BMap_bottom {
	display:none;
}
.BMap_center {
	display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
	display:none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(5) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
}
</style>


