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
  </div>
</template>
<script>
import  '../../static/css/baiduMap.css'
export default {
  props:{
    BMapMsg:{ keyword: String },
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
      // 百度地图API功能
      this.map = new BMap.Map("allmap");//实例化百度地图
      this.map.centerAndZoom(new BMap.Point(112.98,28.19), 12);//设置中心点位与缩放级别
      this.map.enableScrollWheelZoom();//启用滚动
    },
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
      var topArr = [];
      var smallArr = [];
      var midArr = [];
      var p = [];
      var topitem= '';
      var smallitem= '';
      var middleitem= '';
      for(var i=0;i<mapdata.length;i++){
        dataItem.push(mapdata[i].value);
        dataItem = dataItem.sort((a,b)=>b-a); //数据排序显示不同图标大小
        p.push(geoCoordMap[mapdata[i].name].concat(mapdata[i].value)); // 经纬度集合和金额数组

      }
      
      for(var j=0;j<dataItem.length;j++){
        topitem = dataItem.slice(0,5)[j];
        smallitem = dataItem.slice(-5)[j];
        middleitem = dataItem.slice(5,-5)[j];
      }
      for(var k=0;k<p.length;k++){
        var pp = p[k];
        
      }
      console.log(topitem); //un未定义
        if(topitem==pp[2]){  //如果两者相等 说明属于top5
        topArr.unshift({
          lng: p[0],
          lat: p[1],
          item: p[2]
        })
        
      }
      console.log(topArr);

        // else if(smallitem==p[2]){
        //   smallArr.push({
        //     lng: p[0],
        //     lat: p[1],
        //     item: p[3]
        //   })

        // }else if(middleitem==p[2]){
        //   midArr.push({
        //     lng: p[0],
        //     lat: p[1],
        //     item: p[3]
        //   })
        // }
      // icon
      var top5Icon = new BMap.Icon("../../static/img/top5.png", new BMap.Size(50,50));
      var middle = new BMap.Icon("../../static/img/middle.png", new BMap.Size(30,30));
      var small5 = new BMap.Icon("../../static/img/small5.png", new BMap.Size(15,15));
      var geoCoordMapValue = {};
      var marker=[];

      var pTop = {};
      var pSmall = {};
      var pMid = {};
      var pt = {};
      // 拿到前五的每一项
      // for(let j=0;j<topArr.length;j++){
      //     pTop = topArr[j];
      // }
      // console.log(pTop);
      // for(let k=0;k<smallArr.length;k++){
      //   pSmall = smallArr[k];
      // }
      // for(let m=0;m<midArr.length;m++){
      //   pMid = midArr[m];
      // }
      // 设置标注
      for(var i=0;i<mapdata.length;i++){
        var item = mapdata[i];
        geoCoordMapValue.lng= geoCoordMap[item.name][0];
        geoCoordMapValue.lat= geoCoordMap[item.name][1];
        pt = new BMap.Point(geoCoordMapValue.lng,geoCoordMapValue.lat);  
        //pt如果属于前五的数组中，说明是前五的可以加图片
   
        // if(pTop.lng==pt.lng && pTop.lat==pt.lat){
        //     // console.log(-1111);
        //     marker=new BMap.Marker(pt,{icon:top5Icon});//实例marker
        // }
        // for(let k=0;k<smallArr.length;k++){
        //   pSmall = smallArr[k];
        //   if(pSmall.lng==pt.lng && pSmall.lat==pt.lat){
        //     // console.log(pSmall);
        //     // console.log(-2222);
        //     marker=new BMap.Marker(pt,{icon:small5});//实例marker
        //   }
        // }
        // for(let m=0;m<midArr.length;m++){
        //   pMid = midArr[m];
        //   if(pMid.lng==pt.lng && pMid.lat==pt.lat){
        //     // console.log(-3333);
        //     marker=new BMap.Marker(pt,{icon:middle});//实例marker
        //   }
        // }
        // if(pTop.lng==pt.lng && pTop.lat==pt.lat){
        //   console.log(-1111);
        //   marker=new BMap.Marker(pt,{icon:top5Icon});//实例marker
        // }else if(pSmall.lng==pt.lng && pSmall.lat==pt.lat){
        //   console.log(pSmall);
        //    console.log(-2222);
        //   marker=new BMap.Marker(pt,{icon:small5});//实例marker
        // }else if(pMid.lng==pt.lng && pMid.lat==pt.lat){
        //    console.log(-3333);
          marker=new BMap.Marker(pt,{icon:middle});//实例marker
        // }
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
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng,p.getPosition().lat);
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


